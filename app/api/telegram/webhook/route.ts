import { NextResponse } from "next/server";
import { createContractRecord, findLatestInvoiceForCustomer, updateContractRecord, updateInvoicePayment } from "@/lib/admin/contracts";
import { sendTelegramMessage } from "@/lib/admin/telegram";
import { parseTelegramContractCommand, TELEGRAM_CONTRACT_HELP, validateTelegramCommand } from "@/lib/admin/telegram-contract-parser";
import { isTelegramTaskCommand, parseTelegramTaskCommand, TELEGRAM_TASK_HELP } from "@/lib/admin/telegram-task-parser";
import {
  createTask,
  updateTaskStatus,
  deferTask,
  deleteTask,
  findTaskByIdPrefix,
  findActiveTaskByNumber,
} from "@/lib/admin/tasks";
import { buildTaskListResponse } from "@/lib/admin/briefing";
import { buildTaskAddedMessage, buildTaskCompletedMessage } from "@/lib/admin/telegram-templates";
import { buildOperationsExcel } from "@/lib/admin/excel-export";
import { sendTelegramDocument } from "@/lib/admin/telegram";
import { hasSupabaseAdminConfig } from "@/lib/supabase";

export const runtime = "nodejs";

type TelegramUpdate = {
  update_id?: number;
  message?: TelegramMessage;
  edited_message?: TelegramMessage;
};

type TelegramMessage = {
  message_id?: number;
  text?: string;
  chat?: {
    id?: number;
    type?: string;
  };
  from?: {
    id?: number;
    username?: string;
  };
};

function isAuthorized(request: Request, chatId?: number): boolean {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret) return false;
  if (request.headers.get("x-telegram-bot-api-secret-token") !== secret) return false;

  const allowedChatId = process.env.TELEGRAM_CHAT_ID;
  if (allowedChatId && chatId !== undefined && String(chatId) !== allowedChatId) return false;
  return true;
}

function formatWon(value: number): string {
  return `₩${value.toLocaleString("ko-KR")}`;
}

async function reply(chatId: number | undefined, text: string): Promise<void> {
  if (chatId === undefined) return;
  await sendTelegramMessage(chatId, text);
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "AIO Telegram contract webhook",
    configured: Boolean(process.env.TELEGRAM_WEBHOOK_SECRET && process.env.TELEGRAM_BOT_TOKEN && hasSupabaseAdminConfig()),
  });
}

export async function POST(request: Request) {
  const update = (await request.json()) as TelegramUpdate;
  const message = update.message ?? update.edited_message;
  const chatId = message?.chat?.id;

  if (!isAuthorized(request, chatId)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!hasSupabaseAdminConfig()) {
    await reply(chatId, "Supabase 관리자 환경변수가 없어 계약을 저장할 수 없습니다.");
    return NextResponse.json({ ok: true });
  }

  const text = message?.text?.trim();
  if (!text) {
    await reply(chatId, "텍스트 메시지만 처리할 수 있습니다.\n\n" + TELEGRAM_CONTRACT_HELP + "\n\n" + TELEGRAM_TASK_HELP);
    return NextResponse.json({ ok: true });
  }

  // ─── /엑셀 — 즉시 운영 데이터 xlsx 첨부 ───
  if (/^\/?(엑셀|excel)\b/i.test(text)) {
    return handleExcelCommand(chatId);
  }

  // ─── task 명령 우선 처리 ───
  if (isTelegramTaskCommand(text)) {
    return handleTaskCommand(text, chatId, message?.message_id);
  }

  const command = parseTelegramContractCommand(text);
  if (command.kind === "help") {
    await reply(chatId, TELEGRAM_CONTRACT_HELP + "\n\n" + TELEGRAM_TASK_HELP);
    return NextResponse.json({ ok: true });
  }

  const validationError = validateTelegramCommand(command);
  if (validationError) {
    await reply(chatId, `${validationError}\n\n${TELEGRAM_CONTRACT_HELP}`);
    return NextResponse.json({ ok: true });
  }

  try {
    if (command.kind === "create_contract") {
      const result = await createContractRecord({
        ...command,
        sourceMeta: {
          created_from: "telegram_contract",
          telegram_update_id: update.update_id,
          telegram_message_id: message?.message_id,
          telegram_from_id: message?.from?.id,
          telegram_username: message?.from?.username,
        },
      });

      await reply(
        chatId,
        [
          "계약이 자동 등록되었습니다.",
          `고객: ${command.customerName}`,
          `계약명: ${command.productName}`,
          `계약금액: ${formatWon(command.contractedAmount)}`,
          `입금: ${formatWon(command.paidAmount)}`,
          `미수: ${formatWon(Math.max(command.contractedAmount - command.paidAmount, 0))}`,
          command.dueDate ? `마감: ${command.dueDate}` : null,
          `프로젝트ID: ${result.projectId}`,
          `관리자: ${process.env.NEXT_PUBLIC_SITE_URL ?? "https://aio-make.com"}/admin/contracts`,
        ]
          .filter(Boolean)
          .join("\n"),
      );
      return NextResponse.json({ ok: true, data: result });
    }

    if (command.kind === "update_payment") {
      const invoice = await findLatestInvoiceForCustomer(command);
      if (!invoice) {
        await reply(chatId, "입금 업데이트 대상을 찾지 못했습니다. 프로젝트ID를 함께 보내주세요.");
        return NextResponse.json({ ok: true });
      }
      const result = await updateInvoicePayment(invoice.invoiceId, command.paidAmount);
      await reply(
        chatId,
        [
          "입금액이 업데이트되었습니다.",
          `프로젝트ID: ${invoice.projectId}`,
          `입금: ${formatWon(result.paidAmount)}`,
          `미수: ${formatWon(result.outstandingAmount)}`,
          `상태: ${result.paymentStatus}`,
        ].join("\n"),
      );
      return NextResponse.json({ ok: true });
    }

    if (command.kind === "update_status") {
      await updateContractRecord({
        projectId: command.projectId,
        status: command.status,
        dueDate: command.dueDate,
      });
      await reply(chatId, `계약 상태가 업데이트되었습니다.\n프로젝트ID: ${command.projectId}\n상태: ${command.status}`);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const messageText = error instanceof Error ? error.message : "계약 자동 업데이트 중 오류가 발생했습니다.";
    await reply(chatId, `처리 실패: ${messageText}`);
    return NextResponse.json({ ok: true, error: messageText });
  }
}

// =====================================================
// 할 일 명령 처리
// =====================================================
async function handleTaskCommand(
  text: string,
  chatId: number | undefined,
  messageId: number | undefined,
): Promise<NextResponse> {
  const cmd = parseTelegramTaskCommand(text);
  if (!cmd) {
    await reply(chatId, TELEGRAM_TASK_HELP);
    return NextResponse.json({ ok: true });
  }

  try {
    if (cmd.kind === "task_help") {
      await reply(chatId, TELEGRAM_TASK_HELP);
      return NextResponse.json({ ok: true });
    }

    if (cmd.kind === "task_list") {
      const msg = await buildTaskListResponse(cmd.scope);
      await sendTelegramMessage(chatId!, msg, { parseMode: "Markdown" });
      return NextResponse.json({ ok: true });
    }

    if (cmd.kind === "task_add") {
      const task = await createTask({
        title: cmd.title,
        scope: cmd.scope,
        priority: cmd.priority,
        dueDate: cmd.dueDate,
        source: "telegram",
        telegramMessageId: messageId,
      });
      const msg = buildTaskAddedMessage({
        title: task.title,
        scope: task.scope,
        priority: task.priority,
        idHint: task.id.slice(0, 6),
        due: task.due_date ?? undefined,
      });
      await sendTelegramMessage(chatId!, msg, { parseMode: "Markdown" });
      return NextResponse.json({ ok: true, taskId: task.id });
    }

    if (cmd.kind === "task_complete") {
      const target = await resolveTask(cmd.idOrNumber);
      if (!target) {
        await reply(chatId, `🔍 task를 찾지 못했습니다: \`${cmd.idOrNumber}\`\n\n_/목록 으로 번호 확인_`);
        return NextResponse.json({ ok: true });
      }
      await updateTaskStatus(target.id, "completed");
      await sendTelegramMessage(
        chatId!,
        buildTaskCompletedMessage({ title: target.title, idHint: target.id.slice(0, 6) }),
        { parseMode: "Markdown" },
      );
      return NextResponse.json({ ok: true });
    }

    if (cmd.kind === "task_defer") {
      const target = await resolveTask(cmd.idOrNumber);
      if (!target) {
        await reply(chatId, `🔍 task를 찾지 못했습니다: \`${cmd.idOrNumber}\``);
        return NextResponse.json({ ok: true });
      }
      const next = await deferTask(target.id, cmd.newScope);
      const scopeLabel = cmd.newScope === "today" ? "오늘" : cmd.newScope === "week" ? "이 주" : "이 달";
      await reply(chatId, `🔁 *${target.title}* → *${scopeLabel}* 로 이월 (ID: \`#${next.id.slice(0, 6)}\`)`);
      return NextResponse.json({ ok: true });
    }

    if (cmd.kind === "task_delete") {
      const target = await resolveTask(cmd.idOrNumber);
      if (!target) {
        await reply(chatId, `🔍 task를 찾지 못했습니다: \`${cmd.idOrNumber}\``);
        return NextResponse.json({ ok: true });
      }
      await deleteTask(target.id);
      await reply(chatId, `🗑 삭제됨: ${target.title}`);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const messageText = error instanceof Error ? error.message : "task 처리 중 오류";
    await reply(chatId, `처리 실패: ${messageText}`);
    return NextResponse.json({ ok: true, error: messageText });
  }
}

/** "1" 같은 숫자 또는 "abc123" 같은 ID prefix를 task로 해석 */
async function resolveTask(idOrNumber: string) {
  const trimmed = idOrNumber.replace(/^#/, "").trim();
  // 1-2자리 정수면 번호
  if (/^\d{1,2}$/.test(trimmed)) {
    return findActiveTaskByNumber(Number(trimmed));
  }
  return findTaskByIdPrefix(trimmed);
}

// =====================================================
// /엑셀 명령 — 운영 데이터 xlsx 즉시 첨부 발송
// =====================================================
async function handleExcelCommand(chatId: number | undefined): Promise<NextResponse> {
  if (chatId === undefined) return NextResponse.json({ ok: true });
  try {
    await reply(chatId, "📊 _운영 데이터를 정리 중입니다…_");
    const { buffer, filename, summary } = await buildOperationsExcel();
    const caption = [
      "📎 *AIO 운영 데이터*",
      "",
      `할 일: 오늘 ${summary.tasks.today} / 이주 ${summary.tasks.week} / 이달 ${summary.tasks.month}`,
      `외주: 진행 ${summary.activeProjects}건${summary.overdue > 0 ? ` · 🚨 지연 ${summary.overdue}` : ""}`,
      `매출 ₩${summary.monthRevenue.toLocaleString("ko-KR")} / 지출 ₩${summary.monthExpense.toLocaleString("ko-KR")}`,
    ].join("\n");
    await sendTelegramDocument(chatId, buffer, filename, { caption, parseMode: "Markdown" });
    return NextResponse.json({ ok: true, route: "excel", filename, size: buffer.length });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown";
    await reply(chatId, `엑셀 생성 실패: ${detail}`);
    return NextResponse.json({ ok: true, error: detail });
  }
}
