import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase";

const channels = ["website", "soomgo", "kmong", "wishket", "elancer", "notefolio", "upwork", "contra", "cafe24", "referral", "other"] as const;
const categories = ["website", "shop", "logo", "detail", "ppt", "automation", "video", "bundle", "other"] as const;
const projectStatuses = ["in_progress", "blocked", "review", "completed", "canceled"] as const;

const createSchema = z.object({
  customerName: z.string().trim().min(1).max(100),
  companyName: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email().max(255).optional().or(z.literal("")).default(""),
  phone: z.string().trim().max(40).optional().default(""),
  channel: z.enum(channels).default("other"),
  category: z.enum(categories).default("other"),
  productName: z.string().trim().min(1).max(160),
  contractedAmount: z.number().int().nonnegative(),
  paidAmount: z.number().int().nonnegative().optional().default(0),
  startDate: z.string().trim().optional().default(""),
  dueDate: z.string().trim().optional().default(""),
  notes: z.string().trim().max(2000).optional().default(""),
});

const patchSchema = z.object({
  projectId: z.string().uuid(),
  invoiceId: z.string().uuid().optional(),
  status: z.enum(projectStatuses).optional(),
  dueDate: z.string().trim().optional(),
  paidAmount: z.number().int().nonnegative().optional(),
});

function paymentStatus(netAmount: number, paidAmount: number): "unpaid" | "partial" | "paid" {
  if (paidAmount <= 0) return "unpaid";
  if (paidAmount >= netAmount) return "paid";
  return "partial";
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!hasSupabaseAdminConfig()) {
    return NextResponse.json({ success: false, error: "Supabase 관리자 환경변수가 없습니다." }, { status: 503 });
  }

  const parsed = createSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }

  const payload = parsed.data;
  const supabase = createSupabaseAdminClient();
  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .insert({
      channel: payload.channel,
      customer_name: payload.customerName,
      company_name: payload.companyName || null,
      email: payload.email || null,
      phone: payload.phone || null,
      last_contact_at: new Date().toISOString(),
      source_meta: { created_from: "admin_contract" },
    })
    .select("id")
    .single<{ id: string }>();

  if (leadError || !lead) {
    return NextResponse.json({ success: false, error: leadError?.message ?? "Lead was not saved" }, { status: 500 });
  }

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert({
      lead_id: lead.id,
      channel: payload.channel,
      category: payload.category,
      product_name: payload.productName,
      contracted_amount: payload.contractedAmount,
      start_date: payload.startDate || null,
      due_date: payload.dueDate || null,
      status: "in_progress",
      notes: payload.notes || null,
    })
    .select("id")
    .single<{ id: string }>();

  if (projectError || !project) {
    return NextResponse.json({ success: false, error: projectError?.message ?? "Project was not saved" }, { status: 500 });
  }

  const paidAmount = Math.min(payload.paidAmount, payload.contractedAmount);
  const status = paymentStatus(payload.contractedAmount, paidAmount);
  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .insert({
      project_id: project.id,
      lead_id: lead.id,
      channel: payload.channel,
      gross_amount: payload.contractedAmount,
      net_amount: payload.contractedAmount,
      paid_amount: paidAmount,
      outstanding_amount: Math.max(payload.contractedAmount - paidAmount, 0),
      payment_status: status,
      paid_at: status === "paid" ? new Date().toISOString() : null,
      due_date: payload.dueDate || null,
      contracted_at: new Date().toISOString(),
    })
    .select("id")
    .single<{ id: string }>();

  if (invoiceError || !invoice) {
    return NextResponse.json({ success: false, error: invoiceError?.message ?? "Invoice was not saved" }, { status: 500 });
  }

  return NextResponse.json({ success: true, data: { leadId: lead.id, projectId: project.id, invoiceId: invoice.id } }, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!hasSupabaseAdminConfig()) {
    return NextResponse.json({ success: false, error: "Supabase 관리자 환경변수가 없습니다." }, { status: 503 });
  }

  const parsed = patchSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const payload = parsed.data;
  const projectUpdate: Record<string, string | null> = {};
  if (payload.status) {
    projectUpdate.status = payload.status;
    projectUpdate.completed_date = payload.status === "completed" ? new Date().toISOString().slice(0, 10) : null;
  }
  if (payload.dueDate !== undefined) projectUpdate.due_date = payload.dueDate || null;

  if (Object.keys(projectUpdate).length > 0) {
    const { error } = await supabase.from("projects").update(projectUpdate).eq("id", payload.projectId);
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  if (payload.invoiceId && payload.paidAmount !== undefined) {
    const { data: invoice, error: readError } = await supabase
      .from("invoices")
      .select("net_amount")
      .eq("id", payload.invoiceId)
      .single<{ net_amount: number }>();
    if (readError || !invoice) {
      return NextResponse.json({ success: false, error: readError?.message ?? "Invoice not found" }, { status: 500 });
    }

    const paidAmount = Math.min(payload.paidAmount, invoice.net_amount);
    const status = paymentStatus(invoice.net_amount, paidAmount);
    const { error } = await supabase
      .from("invoices")
      .update({
        paid_amount: paidAmount,
        outstanding_amount: Math.max(invoice.net_amount - paidAmount, 0),
        payment_status: status,
        paid_at: status === "paid" ? new Date().toISOString() : null,
      })
      .eq("id", payload.invoiceId);
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
