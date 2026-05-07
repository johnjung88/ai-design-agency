// 텔레그램 발송 유틸 — Markdown 옵션 지원
// 메시지 포맷 명세: docs/_aio_bot_specs/메시지템플릿_v1.md

export type TelegramSendOptions = {
  parseMode?: "Markdown" | "MarkdownV2" | "HTML" | "none";
  disableWebPagePreview?: boolean;
  disableNotification?: boolean;
};

export async function notifyTelegram(text: string, options: TelegramSendOptions = {}): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  await sendTelegramMessage(chatId, text, options);
}

export async function sendTelegramMessage(
  chatId: string | number,
  text: string,
  options: TelegramSendOptions = {},
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  const parseMode = options.parseMode ?? "Markdown";
  const body: Record<string, unknown> = {
    chat_id: chatId,
    text,
    disable_web_page_preview: options.disableWebPagePreview ?? true,
  };
  if (parseMode !== "none") {
    body.parse_mode = parseMode;
  }
  if (options.disableNotification) {
    body.disable_notification = true;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[telegram] non-OK response:", res.status, detail.slice(0, 300));
    }
  } catch (error) {
    console.error("[telegram] notification error:", error instanceof Error ? error.message : error);
  }
}
