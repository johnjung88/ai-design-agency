import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  service_type: z.enum([
    "branding",
    "web-design",
    "motion-graphics",
    "full-package",
  ]),
  budget_range: z.enum([
    "under-1000",
    "1000-3000",
    "3000-5000",
    "5000-plus",
  ]),
  message: z.string().trim().min(10).max(2000),
  locale: z.enum(["ko", "en"]),
});

type ContactInsertResult = {
  id: string;
};

export async function POST(request: Request) {
  try {
    const rawBody: unknown = await request.json();
    const parsed = contactSchema.safeParse(rawBody);

    if (!parsed.success) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Invalid request body",
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    const supabase = createSupabaseServerClient();
    const payload = parsed.data;

    const { data, error } = await supabase
      .from("ada_inquiries")
      .insert({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        service_type: payload.service_type,
        budget_range: payload.budget_range,
        message: payload.message,
        locale: payload.locale,
      })
      .select("id")
      .single<ContactInsertResult>();

    if (error) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: error.message,
      };

      return NextResponse.json(errorResponse, { status: 500 });
    }

    const successResponse: ApiResponse<{ inquiryId: string }> = {
      success: true,
      data: {
        inquiryId: data.id,
      },
    };

    return NextResponse.json(successResponse, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: message,
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
