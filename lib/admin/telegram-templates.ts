// AIO 텔레그램 메시지 템플릿 (헬퍼 + 빌더)
// 명세: docs/_aio_bot_specs/메시지템플릿_v1.md

const KO_DAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

// =====================================================
// 시간대 (KST) 헬퍼
// =====================================================
const KST_OFFSET_MIN = 9 * 60;

export function toKstDate(input?: Date | string | number): Date {
  const d = input instanceof Date ? input : input == null ? new Date() : new Date(input);
  const utc = d.getTime() + d.getTimezoneOffset() * 60_000;
  return new Date(utc + KST_OFFSET_MIN * 60_000);
}

// =====================================================
// 포맷터 — 날짜·시간·금액
// =====================================================
export function formatDate(input?: Date | string | number): string {
  const d = toKstDate(input);
  return `${d.getMonth() + 1}/${d.getDate()} (${KO_DAYS[d.getDay()]})`;
}

export function formatTime(input?: Date | string | number): string {
  const d = toKstDate(input);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function formatDateTime(input?: Date | string | number): string {
  return `${formatDate(input)} ${formatTime(input)}`;
}

export function formatDateRange(start: Date | string, end: Date | string): string {
  return `${formatDate(start)} ~ ${formatDate(end)}`;
}

/**
 * 마감 표기. due가 오늘이면 "오늘 마감", 미래면 "D-N", 과거면 "D+N (지연)"
 */
export function formatDueLabel(due: Date | string, now: Date = new Date()): string {
  const dueKst = toKstDate(due);
  const nowKst = toKstDate(now);
  // 일 단위로 자르기
  const a = Date.UTC(dueKst.getFullYear(), dueKst.getMonth(), dueKst.getDate());
  const b = Date.UTC(nowKst.getFullYear(), nowKst.getMonth(), nowKst.getDate());
  const diffDays = Math.round((a - b) / 86_400_000);
  if (diffDays === 0) return "오늘 마감";
  if (diffDays === 1) return "내일 마감 (D-1)";
  if (diffDays > 0) return `D-${diffDays}`;
  return `D+${Math.abs(diffDays)} _(지연)_`;
}

export function formatWon(amount: number, options: { bold?: boolean } = {}): string {
  const formatted = `₩${Math.round(amount).toLocaleString("ko-KR")}`;
  return options.bold ? `*${formatted}*` : formatted;
}

export function formatManwon(amount: number, options: { bold?: boolean } = {}): string {
  const v = Math.round(amount / 10_000);
  const formatted = `${v.toLocaleString("ko-KR")}만`;
  return options.bold ? `*${formatted}*` : formatted;
}

// =====================================================
// Markdown escape (Telegram 일반 Markdown)
// 일반 Markdown 모드에서 *_ ` [ ] 만 escape
// =====================================================
export function escapeMd(s: string | null | undefined): string {
  if (!s) return "";
  return s.replace(/([_*`\[\]])/g, "\\$1");
}

// =====================================================
// 메시지 빌더 — A. 즉시 알림 (Event)
// =====================================================
export type EventNotification = {
  emoji: string;          // 예: "💰"
  title: string;          // 예: "빌더스 PPT 입금 완료"
  lines: string[];        // 본문 (각 줄 1개 정보)
  cta?: string;           // 다음 액션
};

export function buildEventNotification(payload: EventNotification): string {
  const lines = [`${payload.emoji} *${escapeMd(payload.title)}*`, ""];
  for (const line of payload.lines) {
    lines.push(line);
  }
  if (payload.cta) {
    lines.push("", `👉 _${escapeMd(payload.cta)}_`);
  }
  return lines.join("\n");
}

// =====================================================
// 메시지 빌더 — B. 일일 브리핑 (Daily, KST 07:00)
// =====================================================
export type DailyTask = {
  priority: "P0" | "P1";
  text: string;             // "클린앵커 사이트 마감"
  amount?: number;          // 50000 (있으면 ₩50,000 형태로)
  due?: Date | string;      // 마감일
};

export type DailyBriefingPayload = {
  today: Date;
  tasks: DailyTask[];
  yesterday: {
    revenueIncrease: number;
    revenueNote?: string;       // "빌더스+세종시 입금"
    expenseIncrease: number;
    expenseNote?: string;       // "Claude Max"
    newInquiries: number;
  };
  monthSummary: {
    revenueConfirmed: number;
    paidIn: number;
    expenses: number;
    profit: number;
  };
  pipeline: {
    inProgress: number;
    pendingPaymentAmount: number;
  };
};

export function buildDailyBrief(p: DailyBriefingPayload): string {
  const out: string[] = [];
  out.push(`📅 *${formatDate(p.today)} 일일 브리핑*`);
  out.push("");
  out.push("━━━━━━━━━━━━━━━━━━━━━");
  out.push("🎯 *오늘 할 일*");

  const p0 = p.tasks.filter((t) => t.priority === "P0");
  const p1 = p.tasks.filter((t) => t.priority === "P1");

  if (p0.length > 0) {
    out.push("");
    out.push("🔥 *P0 (필수)*");
    for (const t of p0) {
      out.push(formatTaskLine(t));
    }
  }

  if (p1.length > 0) {
    out.push("");
    out.push("🟢 *P1 (권장)*");
    for (const t of p1) {
      out.push(formatTaskLine(t));
    }
  }

  if (p.tasks.length === 0) {
    out.push("");
    out.push("_등록된 할 일 없음_");
  }

  out.push("");
  out.push("━━━━━━━━━━━━━━━━━━━━━");
  out.push("📥 *지난 24시간*");
  out.push("");
  out.push(`매출: *+${formatWonRaw(p.yesterday.revenueIncrease)}*${p.yesterday.revenueNote ? ` _(${escapeMd(p.yesterday.revenueNote)})_` : ""}`);
  out.push(`지출: *+${formatWonRaw(p.yesterday.expenseIncrease)}*${p.yesterday.expenseNote ? ` _(${escapeMd(p.yesterday.expenseNote)})_` : ""}`);
  out.push(`신규 견적: ${p.yesterday.newInquiries}건`);

  out.push("");
  out.push("━━━━━━━━━━━━━━━━━━━━━");
  out.push("📊 *5월 누계*");
  out.push("");
  out.push(`매출 확정: ${formatWon(p.monthSummary.revenueConfirmed, { bold: true })}`);
  out.push(`입금 완료: ${formatWon(p.monthSummary.paidIn, { bold: true })}`);
  out.push(`지출: ${formatWon(p.monthSummary.expenses, { bold: true })}`);
  const sign = p.monthSummary.profit >= 0 ? "+" : "-";
  out.push(`영업이익: *${sign}${formatWonRaw(Math.abs(p.monthSummary.profit))}*`);

  out.push("");
  out.push("━━━━━━━━━━━━━━━━━━━━━");
  out.push(`👉 _진행 중 ${p.pipeline.inProgress}건, 입금 대기 ${formatWonRaw(p.pipeline.pendingPaymentAmount)}_`);

  return out.join("\n");
}

function formatTaskLine(t: DailyTask): string {
  let line = `• ${escapeMd(t.text)}`;
  if (t.amount && t.amount > 0) {
    line += ` *_${formatWonRaw(t.amount)}_*`;
  }
  if (t.due) {
    const label = formatDueLabel(t.due);
    line += ` _(${label})_`;
  }
  return line;
}

function formatWonRaw(amount: number): string {
  return `₩${Math.round(amount).toLocaleString("ko-KR")}`;
}

// =====================================================
// 메시지 빌더 — C. 주간 요약 (Weekly, 월요일 KST 07:00)
// =====================================================
export type WeeklySummaryPayload = {
  weekNumber: number;
  weekStart: Date;
  weekEnd: Date;
  revenue: {
    confirmed: number;
    target?: number;
    paidIn: number;
    paidInCount: number;
    pendingPayment: number;
    pendingPaymentCount: number;
    items: Array<{ label: string; amount: number }>;
  };
  expense: {
    total: number;
    breakdown: Array<{ label: string; amount: number }>;
  };
  insights?: string[];
  nextWeek: {
    weekNumber: number;
    weekStart: Date;
    weekEnd: Date;
    goals: string[];
    revenueTarget?: number;
  };
  footerNote?: string;          // 예: "숨고 마켓 5/30 폐쇄까지 D-22"
};

export function buildWeeklySummary(p: WeeklySummaryPayload): string {
  const out: string[] = [];
  out.push(`📊 *Week ${p.weekNumber} (${formatDateRange(p.weekStart, p.weekEnd)}) 주간 요약*`);
  out.push("");

  // 매출
  out.push("━━━━━━━━━━━━━━━━━━━━━");
  out.push("💰 *매출 실적*");
  out.push("");
  if (p.revenue.target) {
    const pct = Math.round((p.revenue.confirmed / p.revenue.target) * 100);
    out.push(`확정: ${formatWon(p.revenue.confirmed, { bold: true })} _(목표 ${formatWonRaw(p.revenue.target)} → ${pct}%)_`);
  } else {
    out.push(`확정: ${formatWon(p.revenue.confirmed, { bold: true })}`);
  }
  out.push(`입금 완료: ${formatWon(p.revenue.paidIn, { bold: true })} _(${p.revenue.paidInCount}건)_`);
  out.push(`입금 대기: ${formatWon(p.revenue.pendingPayment, { bold: true })} _(${p.revenue.pendingPaymentCount}건)_`);

  if (p.revenue.items.length > 0) {
    out.push("");
    for (const item of p.revenue.items) {
      out.push(`• ${escapeMd(item.label)} *_${formatWonRaw(item.amount)}_*`);
    }
  }

  // 지출
  out.push("");
  out.push("━━━━━━━━━━━━━━━━━━━━━");
  out.push("💸 *지출*");
  out.push("");
  out.push(`총: ${formatWon(p.expense.total, { bold: true })}`);
  if (p.expense.breakdown.length > 0) {
    for (const item of p.expense.breakdown) {
      out.push(`• ${escapeMd(item.label)}: *${formatWonRaw(item.amount)}*`);
    }
  }

  // 인사이트
  if (p.insights && p.insights.length > 0) {
    out.push("");
    out.push("━━━━━━━━━━━━━━━━━━━━━");
    out.push("💡 *핵심 인사이트*");
    out.push("");
    for (const line of p.insights) {
      out.push(`• ${escapeMd(line)}`);
    }
  }

  // 다음 주 목표
  out.push("");
  out.push("━━━━━━━━━━━━━━━━━━━━━");
  out.push(`🎯 *Week ${p.nextWeek.weekNumber} (${formatDateRange(p.nextWeek.weekStart, p.nextWeek.weekEnd)}) 목표*`);
  out.push("");
  for (const g of p.nextWeek.goals) {
    out.push(`• ${escapeMd(g)}`);
  }
  if (p.nextWeek.revenueTarget) {
    out.push(`• 매출 목표: ${formatWon(p.nextWeek.revenueTarget, { bold: true })}`);
  }

  if (p.footerNote) {
    out.push("");
    out.push(`👉 _${escapeMd(p.footerNote)}_`);
  }

  return out.join("\n");
}
