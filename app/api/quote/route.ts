import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase";
import { createResendClient, getInquiryRecipient } from "@/lib/resend";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const quoteSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().default(""),
  category: z.enum([
    "website",
    "shopping-mall",
    "logo-business-card",
    "detail-page",
    "ppt-design",
    "automation-app",
    "video-content",
  ]),
  subtype: z.string().trim().max(80).optional().default(""),
  budget_range: z.string().trim().max(80).optional().default(""),
  timeline: z.string().trim().max(80).optional().default(""),
  rush: z.boolean().optional().default(false),
  source: z.enum(["soomgo", "kmong", "email"]).optional().default("email"),
  description: z.string().trim().min(1).max(3000),
  contact_method: z.enum(["email", "phone"]).optional().default("email"),
  locale: z.enum(["ko", "en"]),
});

async function sendQuoteEmail(payload: z.infer<typeof quoteSchema>, inquiryId?: string) {
  const resend = createResendClient();
  if (!resend) return;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "AIO Agency <onboarding@resend.dev>",
    to: getInquiryRecipient(),
    subject: `[AIO Quote] ${payload.category}${payload.subtype ? ` / ${payload.subtype}` : ""} - ${payload.name}`,
    text: [
      `Inquiry ID: ${inquiryId ?? "not saved"}`,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "-"}`,
      `Category: ${payload.category}`,
      `Subtype: ${payload.subtype || "-"}`,
      `Budget: ${payload.budget_range || "-"}`,
      `Timeline: ${payload.timeline || "-"}`,
      `Rush: ${payload.rush ? "yes" : "no"}`,
      `Source: ${payload.source || "-"}`,
      `Preferred contact: ${payload.contact_method}`,
      "",
      payload.description,
    ].join("\n"),
  });
}

export async function POST(request: Request) {
  try {
    const rawBody: unknown = await request.json();
    const parsed = quoteSchema.safeParse(rawBody);

    if (!parsed.success) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Invalid request body",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const payload = parsed.data;
    const supabase = createSupabaseServerClient();

    let { data, error } = await supabase
      .from("quote_requests")
      .insert({
        source: payload.source,
        raw_text: payload.description,
        category: payload.category,
        subtype: payload.subtype || null,
        budget_estimate: payload.budget_range || null,
        urgency: payload.rush ? "high" : payload.timeline,
        draft_response: null,
        status: "new",
        notes: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          timeline: payload.timeline,
          contact_method: payload.contact_method,
          locale: payload.locale,
        }),
      })
      .select("id")
      .single<{ id: string }>();

    if (error) {
      console.error("[quote] quote_requests insert error:", error.message);
      const fallback = await supabase
        .from("ada_inquiries")
        .insert({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          service_category: payload.category,
          source: payload.source,
          budget_range: payload.budget_range || null,
          message: [
            `[Structured quote]`,
            `Subtype: ${payload.subtype || "-"}`,
            `Timeline: ${payload.timeline || "-"}`,
            `Rush: ${payload.rush ? "yes" : "no"}`,
            `Contact method: ${payload.contact_method}`,
            "",
            payload.description,
          ].join("\n"),
          locale: payload.locale,
        })
        .select("id")
        .single<{ id: string }>();

      data = fallback.data;
      error = fallback.error;

      if (error) {
        console.error("[quote] fallback insert error:", error.message);
        const errorResponse: ApiResponse<null> = { success: false, error: error.message };
        return NextResponse.json(errorResponse, { status: 500 });
      }
    }

    if (!data) {
      const errorResponse: ApiResponse<null> = { success: false, error: "Quote was not saved" };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    try {
      await sendQuoteEmail(payload, data.id);
    } catch (emailError) {
      const message = emailError instanceof Error ? emailError.message : "Unknown email error";
      console.error("[quote] email error:", message);
    }

    const successResponse: ApiResponse<{ quoteId: string }> = {
      success: true,
      data: { quoteId: data.id },
    };
    return NextResponse.json(successResponse, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    console.error("[quote] unhandled error:", message);
    const errorResponse: ApiResponse<null> = { success: false, error: message };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
