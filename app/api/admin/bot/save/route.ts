import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { notifyTelegram } from "@/lib/admin/telegram";
import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase";

const quoteCategories = ["website", "shop", "logo", "detail", "ppt", "automation", "video", "bundle", "other"] as const;

const saveSchema = z.object({
  source: z.enum(["soomgo", "kmong", "wishket", "elancer", "notefolio", "upwork", "contra"]),
  rawText: z.string().trim().min(10).max(8000),
  category: z.enum(quoteCategories).optional(),
  confidence: z.number().min(0).max(1).optional(),
  priceTier: z.enum(["standard", "deluxe", "premium", "custom"]).optional(),
  eventPrice: z.number().int().nonnegative().optional(),
  regularPrice: z.number().int().nonnegative().optional(),
  deliveryDays: z.string().trim().optional(),
  summary: z.string().trim().optional(),
  responseText: z.string().trim().min(1).max(12000),
  markSent: z.boolean().optional().default(false),
});

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!hasSupabaseAdminConfig()) {
    return NextResponse.json({ success: false, error: "Supabase 관리자 환경변수가 없어 저장할 수 없습니다." }, { status: 503 });
  }

  const parsed = saveSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }

  const payload = parsed.data;
  const sentAt = payload.markSent ? new Date().toISOString() : null;
  const supabase = createSupabaseAdminClient();
  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .insert({
      channel: payload.source,
      customer_name: "외부 플랫폼 고객",
      source_meta: {
        source: payload.source,
        created_from: "admin_bot",
      },
    })
    .select("id")
    .single<{ id: string }>();

  if (leadError || !lead) {
    return NextResponse.json({ success: false, error: leadError?.message ?? "Lead was not saved" }, { status: 500 });
  }

  const { data: quoteRequest, error: requestError } = await supabase
    .from("quote_requests")
    .insert({
      lead_id: lead.id,
      channel: payload.source,
      raw_text: payload.rawText,
      category: payload.category ?? null,
      category_confidence: payload.confidence ?? null,
      customer_summary: payload.summary ?? null,
      urgency: "normal",
      status: payload.markSent ? "sent" : "draft",
    })
    .select("id")
    .single<{ id: string }>();

  if (requestError || !quoteRequest) {
    return NextResponse.json({ success: false, error: requestError?.message ?? "Request was not saved" }, { status: 500 });
  }

  const { data: quoteResponse, error: responseError } = await supabase
    .from("quote_responses")
    .insert({
      request_id: quoteRequest.id,
      template_category: payload.category ?? null,
      price_tier: payload.priceTier ?? "custom",
      event_price: payload.eventPrice ?? null,
      regular_price: payload.regularPrice ?? null,
      delivery_days: payload.deliveryDays ?? null,
      ai_generated_text: payload.responseText,
      edited_text: payload.responseText,
      sent_at: sentAt,
    })
    .select("id")
    .single<{ id: string }>();

  if (responseError || !quoteResponse) {
    return NextResponse.json({ success: false, error: responseError?.message ?? "Response was not saved" }, { status: 500 });
  }

  const { error: conversationError } = await supabase.from("conversations").insert([
    {
      lead_id: lead.id,
      channel: payload.source,
      role: "customer",
      content: payload.rawText,
      metadata: {
        request_id: quoteRequest.id,
        created_from: "admin_bot",
      },
    },
    {
      lead_id: lead.id,
      channel: payload.source,
      role: "assistant",
      content: payload.responseText,
      metadata: {
        request_id: quoteRequest.id,
        response_id: quoteResponse.id,
        mark_sent: payload.markSent,
        price_tier: payload.priceTier ?? "custom",
        event_price: payload.eventPrice ?? null,
        regular_price: payload.regularPrice ?? null,
        delivery_days: payload.deliveryDays ?? null,
      },
    },
  ]);

  const warnings = conversationError ? [`Conversation log was not saved: ${conversationError.message}`] : [];

  await notifyTelegram(
    [
      payload.markSent ? "✅ 외부 플랫폼 견적 발송 완료" : "📝 외부 플랫폼 견적 초안 저장",
      `채널: ${payload.source}`,
      `카테고리: ${payload.category ?? "미분류"}`,
      `견적: ${payload.eventPrice ? `₩${payload.eventPrice.toLocaleString("ko-KR")}` : "확인 필요"}`,
      `요약: ${payload.summary ?? payload.rawText.slice(0, 80)}`,
    ].join("\n"),
  );

  return NextResponse.json({
    success: true,
    data: {
      leadId: lead.id,
      requestId: quoteRequest.id,
      responseId: quoteResponse.id,
    },
    warning: warnings.length > 0 ? warnings.join(" / ") : undefined,
  });
}
