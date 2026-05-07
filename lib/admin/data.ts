import "server-only";

import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase";

export type InboxItem = {
  requestId: string;
  responseId?: string;
  leadId?: string;
  channel: string;
  customerName: string;
  companyName?: string;
  email?: string;
  phone?: string;
  rawText: string;
  category?: string;
  status: string;
  urgency?: string;
  budget?: number;
  deadlineText?: string;
  createdAt: string;
  responseText?: string;
  sentAt?: string;
};

export type DashboardMetrics = {
  totalLeads: number;
  newRequests: number;
  sentQuotes: number;
  contracted: number;
  revenue: number;
};

const EMPTY_METRICS: DashboardMetrics = {
  totalLeads: 0,
  newRequests: 0,
  sentQuotes: 0,
  contracted: 0,
  revenue: 0,
};

function getLeadField(lead: unknown, field: string): string | undefined {
  if (!lead || typeof lead !== "object") return undefined;
  const value = (lead as Record<string, unknown>)[field];
  return typeof value === "string" ? value : undefined;
}

function toInboxItem(row: Record<string, unknown>): InboxItem {
  const lead = Array.isArray(row.leads) ? row.leads[0] : row.leads;
  const responses = Array.isArray(row.quote_responses) ? row.quote_responses : [];
  const response = responses[0] as Record<string, unknown> | undefined;

  return {
    requestId: String(row.id),
    responseId: response?.id ? String(response.id) : undefined,
    leadId: row.lead_id ? String(row.lead_id) : undefined,
    channel: String(row.channel ?? row.source ?? "website"),
    customerName: getLeadField(lead, "customer_name") ?? "이름 미입력",
    companyName: getLeadField(lead, "company_name"),
    email: getLeadField(lead, "email"),
    phone: getLeadField(lead, "phone"),
    rawText: String(row.raw_text ?? ""),
    category: row.category ? String(row.category) : undefined,
    status: String(row.status ?? "new"),
    urgency: row.urgency ? String(row.urgency) : undefined,
    budget: typeof row.budget === "number" ? row.budget : undefined,
    deadlineText: row.deadline_text ? String(row.deadline_text) : undefined,
    createdAt: String(row.created_at ?? new Date().toISOString()),
    responseText: response?.edited_text || response?.ai_generated_text ? String(response.edited_text || response.ai_generated_text) : undefined,
    sentAt: response?.sent_at ? String(response.sent_at) : undefined,
  };
}

export async function getInboxItems(limit = 50): Promise<{ items: InboxItem[]; error?: string }> {
  if (!hasSupabaseAdminConfig()) {
    return { items: [], error: "Supabase 관리자 환경변수가 없어 로컬 빈 인박스로 표시합니다." };
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("quote_requests")
      .select(
        "id, lead_id, channel, raw_text, category, status, urgency, budget, deadline_text, created_at, leads(customer_name, company_name, email, phone), quote_responses(id, edited_text, ai_generated_text, sent_at)",
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) return { items: [], error: error.message };
    return { items: ((data ?? []) as Record<string, unknown>[]).map(toInboxItem) };
  } catch (error) {
    return {
      items: [],
      error: error instanceof Error ? error.message : "인박스를 불러오지 못했습니다.",
    };
  }
}

export async function getDashboardMetrics(): Promise<{ metrics: DashboardMetrics; recentItems: InboxItem[]; error?: string }> {
  const { items, error } = await getInboxItems(8);
  if (!hasSupabaseAdminConfig()) {
    return { metrics: EMPTY_METRICS, recentItems: items, error };
  }

  try {
    const supabase = createSupabaseAdminClient();
    const [leadsCount, newCount, sentCount, contractedCount, invoiceRows] = await Promise.all([
      supabase.from("leads").select("id", { count: "exact", head: true }),
      supabase.from("quote_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("quote_requests").select("id", { count: "exact", head: true }).eq("status", "sent"),
      supabase.from("quote_requests").select("id", { count: "exact", head: true }).eq("status", "contracted"),
      supabase.from("invoices").select("net_amount"),
    ]);

    const revenue = ((invoiceRows.data ?? []) as Array<{ net_amount?: number }>).reduce((sum, row) => sum + (row.net_amount ?? 0), 0);
    return {
      metrics: {
        totalLeads: leadsCount.count ?? 0,
        newRequests: newCount.count ?? 0,
        sentQuotes: sentCount.count ?? 0,
        contracted: contractedCount.count ?? 0,
        revenue,
      },
      recentItems: items,
      error,
    };
  } catch (metricsError) {
    return {
      metrics: EMPTY_METRICS,
      recentItems: items,
      error: metricsError instanceof Error ? metricsError.message : error,
    };
  }
}
