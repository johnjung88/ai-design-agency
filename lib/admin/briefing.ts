import "server-only";
import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase";
import {
  buildDailyBrief,
  buildWeeklySummary,
  escapeMd,
  formatDueLabel,
  formatWon,
  type DailyBriefingPayload,
  type DailyTask,
  type WeeklySummaryPayload,
  toKstDate,
} from "@/lib/admin/telegram-templates";
import {
  kstToday,
  listTodayCompleted,
  listTodayTasks,
  listWeekTasks,
} from "@/lib/admin/tasks";

// =====================================================
// 시간대 헬퍼 — KST 기준 day boundary 계산
// =====================================================
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

function startOfKstDay(d: Date): Date {
  const kst = toKstDate(d);
  // KST 자정의 UTC 인스턴트 (= KST 자정 - 9h)
  return new Date(Date.UTC(kst.getFullYear(), kst.getMonth(), kst.getDate()) - KST_OFFSET_MS);
}

function startOfKstMonth(d: Date): Date {
  const kst = toKstDate(d);
  return new Date(Date.UTC(kst.getFullYear(), kst.getMonth(), 1) - KST_OFFSET_MS);
}

function addDaysUtc(d: Date, days: number): Date {
  return new Date(d.getTime() + days * 86_400_000);
}

function getIsoWeekNumberKst(d: Date): number {
  // 단순 ISO 주차 (월요일 시작)
  const kst = toKstDate(d);
  const target = new Date(Date.UTC(kst.getFullYear(), kst.getMonth(), kst.getDate()));
  const dayNr = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const firstThursdayDayNr = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstThursdayDayNr + 3);
  return 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 86_400_000));
}

function startOfKstWeek(d: Date): Date {
  // 주의 시작: 월요일 00:00 KST
  const kst = toKstDate(d);
  const dow = kst.getDay(); // 0=일 ~ 6=토
  const daysFromMon = (dow + 6) % 7;
  return new Date(
    Date.UTC(kst.getFullYear(), kst.getMonth(), kst.getDate() - daysFromMon) - KST_OFFSET_MS,
  );
}

// =====================================================
// 데이터 fetch — Supabase
// =====================================================

type ProjectRow = {
  id: string;
  product_name: string | null;
  contracted_amount: number | null;
  due_date: string | null;
  status: string | null;
  channel: string | null;
};

type InvoiceRow = {
  id: string;
  project_id: string | null;
  net_amount: number;
  paid_amount: number | null;
  outstanding_amount: number | null;
  payment_status: string | null;
  paid_at: string | null;
  contracted_at: string | null;
};

type ExpenseRow = {
  id: string;
  date: string;
  amount: number;
  category: string;
  item: string;
};

type LeadRow = {
  id: string;
  created_at: string;
};

async function fetchActiveProjects(): Promise<ProjectRow[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, product_name, contracted_amount, due_date, status, channel")
    .in("status", ["in_progress", "review", "blocked"])
    .order("due_date", { ascending: true, nullsFirst: false });
  if (error) {
    console.error("[briefing] fetchActiveProjects error:", error.message);
    return [];
  }
  return (data ?? []) as ProjectRow[];
}

async function fetchInvoices(monthStart: Date, until: Date): Promise<InvoiceRow[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("id, project_id, net_amount, paid_amount, outstanding_amount, payment_status, paid_at, contracted_at")
    .gte("contracted_at", monthStart.toISOString())
    .lte("contracted_at", until.toISOString());
  if (error) {
    console.error("[briefing] fetchInvoices error:", error.message);
    return [];
  }
  return (data ?? []) as InvoiceRow[];
}

async function fetchInvoicesPaidBetween(start: Date, end: Date): Promise<InvoiceRow[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("id, project_id, net_amount, paid_amount, outstanding_amount, payment_status, paid_at, contracted_at")
    .gte("paid_at", start.toISOString())
    .lt("paid_at", end.toISOString());
  if (error) {
    console.error("[briefing] fetchInvoicesPaidBetween error:", error.message);
    return [];
  }
  return (data ?? []) as InvoiceRow[];
}

async function fetchExpenses(start: Date, end: Date): Promise<ExpenseRow[]> {
  const supabase = createSupabaseAdminClient();
  const startDate = toKstDate(start).toISOString().slice(0, 10);
  const endDate = toKstDate(end).toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("expenses")
    .select("id, date, amount, category, item")
    .gte("date", startDate)
    .lte("date", endDate);
  if (error) {
    // expenses 테이블 미배포 시 무시
    if (error.code !== "42P01") console.error("[briefing] fetchExpenses error:", error.message);
    return [];
  }
  return (data ?? []) as ExpenseRow[];
}

async function fetchInquiries(start: Date, end: Date): Promise<LeadRow[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("leads")
    .select("id, created_at")
    .gte("created_at", start.toISOString())
    .lt("created_at", end.toISOString());
  if (error) {
    console.error("[briefing] fetchInquiries error:", error.message);
    return [];
  }
  return (data ?? []) as LeadRow[];
}

// =====================================================
// 빌더 — 일일 브리핑 데이터 조립
// =====================================================
export async function buildDailyBriefingMessage(now: Date = new Date()): Promise<string> {
  if (!hasSupabaseAdminConfig()) {
    return buildFallbackDaily(now, "Supabase 설정 미완료");
  }

  try {
    const today = startOfKstDay(now);
    const yesterday = addDaysUtc(today, -1);
    const monthStart = startOfKstMonth(now);
    const monthEnd = addDaysUtc(today, 1);

    const [projects, invoicesMonth, paidYesterday, expensesYesterday, expensesMonth, newInquiriesYesterday] =
      await Promise.all([
        fetchActiveProjects(),
        fetchInvoices(monthStart, monthEnd),
        fetchInvoicesPaidBetween(yesterday, today),
        fetchExpenses(yesterday, yesterday),
        fetchExpenses(monthStart, today),
        fetchInquiries(yesterday, today),
      ]);

    // 오늘 할 일 — 진행 중 프로젝트 due_date 기반
    const tasks: DailyTask[] = projects.slice(0, 10).map((p): DailyTask => {
      const isP0 = isP0Task(p, now);
      return {
        priority: isP0 ? "P0" : "P1",
        text: p.product_name ?? "외주 작업",
        amount: p.contracted_amount ?? undefined,
        due: p.due_date ?? undefined,
      };
    });

    // 누계
    const revenueConfirmed = sum(invoicesMonth, (r) => r.net_amount);
    const paidIn = sum(invoicesMonth, (r) => r.paid_amount ?? 0);
    const expenses = sum(expensesMonth, (r) => r.amount);
    const profit = revenueConfirmed - expenses;

    // 지난 24시간
    const revenueIncrease = sum(paidYesterday, (r) => r.paid_amount ?? r.net_amount);
    const expenseIncrease = sum(expensesYesterday, (r) => r.amount);

    // 파이프라인
    const inProgress = projects.filter((p) => p.status === "in_progress").length;
    const pendingPaymentAmount = sum(invoicesMonth.filter((r) => (r.payment_status ?? "unpaid") !== "paid"), (r) => r.outstanding_amount ?? Math.max(r.net_amount - (r.paid_amount ?? 0), 0));

    const payload: DailyBriefingPayload = {
      today: now,
      tasks,
      yesterday: {
        revenueIncrease,
        revenueNote: revenueIncrease > 0 ? `${paidYesterday.length}건 입금` : undefined,
        expenseIncrease,
        expenseNote: expensesYesterday[0]?.item,
        newInquiries: newInquiriesYesterday.length,
      },
      monthSummary: {
        revenueConfirmed,
        paidIn,
        expenses,
        profit,
      },
      pipeline: {
        inProgress,
        pendingPaymentAmount,
      },
    };

    return buildDailyBrief(payload);
  } catch (error) {
    console.error("[briefing] daily error:", error instanceof Error ? error.message : error);
    return buildFallbackDaily(now, "데이터 조회 실패");
  }
}

function buildFallbackDaily(now: Date, reason: string): string {
  return buildDailyBrief({
    today: now,
    tasks: [],
    yesterday: { revenueIncrease: 0, expenseIncrease: 0, newInquiries: 0 },
    monthSummary: { revenueConfirmed: 0, paidIn: 0, expenses: 0, profit: 0 },
    pipeline: { inProgress: 0, pendingPaymentAmount: 0 },
  }) + `\n\n_⚠️ ${reason} — Supabase 데이터 입력 후 정상화_`;
}

function isP0Task(p: ProjectRow, now: Date): boolean {
  // P0 = 마감 D-1 이내 또는 status === "review"
  if (p.status === "review") return true;
  if (!p.due_date) return false;
  const dueKst = toKstDate(p.due_date);
  const todayKst = toKstDate(now);
  const a = Date.UTC(dueKst.getFullYear(), dueKst.getMonth(), dueKst.getDate());
  const b = Date.UTC(todayKst.getFullYear(), todayKst.getMonth(), todayKst.getDate());
  const diff = Math.round((a - b) / 86_400_000);
  return diff <= 1; // 오늘 또는 내일 마감
}

function sum<T>(arr: T[], pick: (t: T) => number): number {
  return arr.reduce((acc, x) => acc + (pick(x) || 0), 0);
}

// =====================================================
// 빌더 — 저녁 점검 데이터 조립
// =====================================================
export async function buildEveningCheckMessage(now: Date = new Date()): Promise<string> {
  if (!hasSupabaseAdminConfig()) {
    return buildFallbackEvening(now, "Supabase 설정 미완료");
  }

  try {
    const today = startOfKstDay(now);
    const tomorrow = addDaysUtc(today, 1);
    const monthStart = startOfKstMonth(now);

    const [todayTasks, weekTasks, completedToday, activeProjects, invoicesMonth, paidToday, expensesToday, expensesMonth] =
      await Promise.all([
        listTodayTasks(now),
        listWeekTasks(now),
        listTodayCompleted(now),
        fetchActiveProjects(),
        fetchInvoices(monthStart, tomorrow),
        fetchInvoicesPaidBetween(today, tomorrow),
        fetchExpenses(today, today),
        fetchExpenses(monthStart, today),
      ]);

    const monthRevenue = sum(invoicesMonth, (r) => r.net_amount);
    const monthPaid = sum(invoicesMonth, (r) => r.paid_amount ?? 0);
    const monthExpense = sum(expensesMonth, (r) => r.amount);
    const paidTodayAmount = sum(paidToday, (r) => r.paid_amount ?? r.net_amount);
    const expenseTodayAmount = sum(expensesToday, (r) => r.amount);
    const pendingPayment = sum(
      invoicesMonth.filter((r) => (r.payment_status ?? "unpaid") !== "paid"),
      (r) => r.outstanding_amount ?? Math.max(r.net_amount - (r.paid_amount ?? 0), 0),
    );

    const overdueProjects = activeProjects.filter((p) => p.due_date && isP0Task(p, addDaysUtc(now, 2)));
    const p0Tomorrow = activeProjects.filter((p) => isP0Task(p, addDaysUtc(now, 1))).slice(0, 5);
    const remainingToday = todayTasks.filter((t) => t.status !== "completed");
    const weekP0 = weekTasks.filter((t) => t.priority === "P0");

    const lines: string[] = [];
    lines.push(`🌙 *${escapeMd(kstToday(now))} 저녁 점검*`);
    lines.push("");
    lines.push("📋 *오늘 할 일*");
    lines.push(`- 완료: *${completedToday.length}건*`);
    lines.push(`- 미완: *${remainingToday.length}건*${remainingToday.some((t) => t.priority === "P0") ? " 🚨 P0 포함" : ""}`);
    if (remainingToday.length > 0) {
      for (const task of remainingToday.slice(0, 5)) {
        lines.push(`  · ${task.priority} ${escapeMd(task.title)}${task.due_date ? ` (${formatDueLabel(task.due_date, now)})` : ""}`);
      }
      if (remainingToday.length > 5) lines.push(`  · 외 ${remainingToday.length - 5}건`);
    }
    lines.push("");
    lines.push("🚀 *외주 진행*");
    lines.push(`- 진행/검수/블로킹: *${activeProjects.length}건*`);
    lines.push(`- D-day 위험: *${p0Tomorrow.length}건* / 지연 후보: *${overdueProjects.length}건*`);
    for (const project of p0Tomorrow.slice(0, 3)) {
      lines.push(`  · ${escapeMd(project.product_name ?? "외주 작업")}${project.due_date ? ` (${formatDueLabel(project.due_date, now)})` : ""}`);
    }
    lines.push("");
    lines.push("💰 *입금/지출*");
    lines.push(`- 오늘 입금: ${formatWon(paidTodayAmount, { bold: true })} (${paidToday.length}건)`);
    lines.push(`- 오늘 지출: ${formatWon(expenseTodayAmount, { bold: true })} (${expensesToday.length}건)`);
    lines.push(`- 이번 달 매출/입금/지출: ${formatWon(monthRevenue)} / ${formatWon(monthPaid)} / ${formatWon(monthExpense)}`);
    lines.push(`- 미수금: ${formatWon(pendingPayment, { bold: true })}`);
    lines.push("");
    lines.push("🧭 *내일/이번 주 우선순위*");
    if (weekP0.length === 0 && p0Tomorrow.length === 0) {
      lines.push("- 등록된 P0 없음 — 신규 영업/포트폴리오 생산 루틴 유지");
    } else {
      const nextItems = [...p0Tomorrow.map((p) => p.product_name ?? "외주 작업"), ...weekP0.map((t) => t.title)];
      for (const item of nextItems.slice(0, 5)) lines.push(`- ${escapeMd(item)}`);
    }
    lines.push("");
    lines.push("📎 업무관리 xlsx 스냅샷을 이어서 첨부합니다.");

    return lines.join("\n");
  } catch (error) {
    console.error("[briefing] evening error:", error instanceof Error ? error.message : error);
    return buildFallbackEvening(now, "데이터 조회 실패");
  }
}

function buildFallbackEvening(now: Date, reason: string): string {
  return [
    `🌙 *${escapeMd(kstToday(now))} 저녁 점검*`,
    "",
    `_⚠️ ${escapeMd(reason)} — Supabase 데이터 입력 후 정상화_`,
    "",
    "📎 업무관리 xlsx 첨부는 별도 단계에서 시도합니다.",
  ].join("\n");
}

// =====================================================
// 빌더 — 주간 요약 데이터 조립
// =====================================================
export async function buildWeeklySummaryMessage(now: Date = new Date()): Promise<string> {
  if (!hasSupabaseAdminConfig()) {
    return buildFallbackWeekly(now, "Supabase 설정 미완료");
  }

  try {
    const weekEnd = startOfKstWeek(now);            // 이번 주 월요일 00:00 KST (today)
    const weekStart = addDaysUtc(weekEnd, -7);      // 지난 주 월요일 00:00 KST
    const lastWeekDisplayStart = addDaysUtc(weekEnd, -7);
    const lastWeekDisplayEnd = addDaysUtc(weekEnd, -1);
    const nextWeekStart = weekEnd;
    const nextWeekEnd = addDaysUtc(weekEnd, 6);

    const [invoices, paidInvoices, expenses] = await Promise.all([
      fetchInvoices(weekStart, weekEnd),
      fetchInvoicesPaidBetween(weekStart, weekEnd),
      fetchExpenses(weekStart, weekEnd),
    ]);

    const confirmedTotal = sum(invoices, (r) => r.net_amount);
    const paidIn = sum(paidInvoices, (r) => r.paid_amount ?? r.net_amount);
    const pendingInvoices = invoices.filter((r) => (r.payment_status ?? "unpaid") !== "paid");
    const pendingPayment = sum(pendingInvoices, (r) => r.outstanding_amount ?? Math.max(r.net_amount - (r.paid_amount ?? 0), 0));

    const totalExpense = sum(expenses, (r) => r.amount);
    const expenseByCategory = groupSum(expenses, (r) => r.category, (r) => r.amount);

    // 매출 항목별 (project 이름)
    const items = await fetchProjectsForInvoices(invoices.map((i) => i.project_id).filter(Boolean) as string[]);
    const itemMap = new Map(items.map((p) => [p.id, p]));
    const revenueItems = invoices
      .filter((i) => i.project_id)
      .map((i) => ({
        label: itemMap.get(i.project_id!)?.product_name ?? "외주",
        amount: i.net_amount,
      }))
      .slice(0, 12);

    const payload: WeeklySummaryPayload = {
      weekNumber: getIsoWeekNumberKst(lastWeekDisplayStart),
      weekStart: lastWeekDisplayStart,
      weekEnd: lastWeekDisplayEnd,
      revenue: {
        confirmed: confirmedTotal,
        paidIn,
        paidInCount: paidInvoices.length,
        pendingPayment,
        pendingPaymentCount: pendingInvoices.length,
        items: revenueItems,
      },
      expense: {
        total: totalExpense,
        breakdown: Object.entries(expenseByCategory).map(([k, v]) => ({
          label: categoryLabel(k),
          amount: v,
        })),
      },
      nextWeek: {
        weekNumber: getIsoWeekNumberKst(nextWeekStart),
        weekStart: nextWeekStart,
        weekEnd: nextWeekEnd,
        goals: [],
      },
    };

    return buildWeeklySummary(payload);
  } catch (error) {
    console.error("[briefing] weekly error:", error instanceof Error ? error.message : error);
    return buildFallbackWeekly(now, "데이터 조회 실패");
  }
}

function buildFallbackWeekly(now: Date, reason: string): string {
  const weekEnd = startOfKstWeek(now);
  const weekStart = addDaysUtc(weekEnd, -7);
  return buildWeeklySummary({
    weekNumber: getIsoWeekNumberKst(weekStart),
    weekStart,
    weekEnd: addDaysUtc(weekEnd, -1),
    revenue: {
      confirmed: 0,
      paidIn: 0,
      paidInCount: 0,
      pendingPayment: 0,
      pendingPaymentCount: 0,
      items: [],
    },
    expense: { total: 0, breakdown: [] },
    nextWeek: {
      weekNumber: getIsoWeekNumberKst(weekEnd),
      weekStart: weekEnd,
      weekEnd: addDaysUtc(weekEnd, 6),
      goals: [],
    },
  }) + `\n\n_⚠️ ${reason} — Supabase 데이터 입력 후 정상화_`;
}

async function fetchProjectsForInvoices(ids: string[]): Promise<ProjectRow[]> {
  if (ids.length === 0) return [];
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, product_name, contracted_amount, due_date, status, channel")
    .in("id", ids);
  if (error) return [];
  return (data ?? []) as ProjectRow[];
}

function groupSum<T>(arr: T[], key: (t: T) => string, value: (t: T) => number): Record<string, number> {
  const out: Record<string, number> = {};
  for (const x of arr) {
    const k = key(x) || "other";
    out[k] = (out[k] ?? 0) + value(x);
  }
  return out;
}

function categoryLabel(k: string): string {
  const map: Record<string, string> = {
    platform_fee: "플랫폼 수수료",
    tools: "도구·구독",
    marketing: "마케팅",
    outsourcing: "외주 인건비",
    tax_office: "세금·사무",
    assets: "자산",
    other: "기타",
  };
  return map[k] ?? k;
}
