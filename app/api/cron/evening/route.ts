import { NextResponse } from "next/server";
import { buildEveningCheckMessage } from "@/lib/admin/briefing";
import { buildOperationsExcel } from "@/lib/admin/excel-export";
import { notifyTelegram, notifyTelegramDocument } from "@/lib/admin/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Evening check cron — 매일 KST 21:00 (= UTC 12:00 같은 날)
 * 오늘 처리 / 미완 / 입금 / 지출 + 내일 P0 미리보기.
 * 메시지 발송 후 AIO_업무관리_*.xlsx 자동 첨부 (옵션 C).
 */
export async function GET(request: Request): Promise<NextResponse> {
  const authError = verifyCronAuth(request);
  if (authError) return authError;

  const results: Record<string, unknown> = { route: "evening", at: new Date().toISOString() };

  // 1) 저녁 점검 메시지
  try {
    const message = await buildEveningCheckMessage();
    await notifyTelegram(message, { parseMode: "Markdown" });
    results.message = "sent";
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown";
    console.error("[cron/evening] message error:", detail);
    results.message = `error: ${detail}`;
  }

  // 2) AIO_업무관리.xlsx 자동 첨부
  try {
    const { buffer, filename, summary } = await buildOperationsExcel();
    const caption = [
      "📎 *오늘의 운영 데이터 스냅샷*",
      "",
      `할 일: 오늘 ${summary.tasks.today} / 이주 ${summary.tasks.week} / 이달 ${summary.tasks.month} _(완료 ${summary.tasks.completedToday})_`,
      `외주: 진행 ${summary.activeProjects}건${summary.overdue > 0 ? ` · 🚨 지연 ${summary.overdue}` : ""}`,
      `매출 ₩${summary.monthRevenue.toLocaleString("ko-KR")} / 입금 ₩${summary.monthPaid.toLocaleString("ko-KR")} / 지출 ₩${summary.monthExpense.toLocaleString("ko-KR")}`,
    ].join("\n");
    await notifyTelegramDocument(buffer, filename, { caption, parseMode: "Markdown" });
    results.xlsx = { filename, size: buffer.length };
  } catch (xlsxErr) {
    const detail = xlsxErr instanceof Error ? xlsxErr.message : "unknown";
    console.error("[cron/evening] xlsx attach error:", detail);
    results.xlsx = `error: ${detail}`;
    await notifyTelegram(`_⚠️ 엑셀 첨부 실패: ${detail}_`).catch(() => {});
  }

  return NextResponse.json({ ok: true, ...results });
}

export async function POST(request: Request): Promise<NextResponse> {
  return GET(request);
}

function verifyCronAuth(request: Request): NextResponse | null {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "CRON_SECRET not configured" }, { status: 503 });
  }
  const auth = request.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  return null;
}
