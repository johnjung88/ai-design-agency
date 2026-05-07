import { NextResponse } from "next/server";
import { createContractRecord, findLatestInvoiceForCustomer, updateContractRecord, updateInvoicePayment } from "@/lib/admin/contracts";
import { sendTelegramMessage } from "@/lib/admin/telegram";
import { parseTelegramContractCommand, TELEGRAM_CONTRACT_HELP, validateTelegramCommand } from "@/lib/admin/telegram-contract-parser";
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
    await reply(chatId, "텍스트 메시지만 처리할 수 있습니다.\n\n" + TELEGRAM_CONTRACT_HELP);
    return NextResponse.json({ ok: true });
  }

  const command = parseTelegramContractCommand(text);
  if (command.kind === "help") {
    await reply(chatId, TELEGRAM_CONTRACT_HELP);
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
