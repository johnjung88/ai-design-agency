import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { generateQuoteDraft } from "@/lib/admin/quote-assistant";

const requestSchema = z.object({
  source: z.enum(["soomgo", "kmong", "wishket", "elancer", "notefolio", "upwork", "contra"]),
  rawText: z.string().trim().min(10).max(8000),
});

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }

  const draft = await generateQuoteDraft(parsed.data.source, parsed.data.rawText);
  return NextResponse.json({ success: true, data: draft });
}
