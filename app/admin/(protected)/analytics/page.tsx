import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase";
import { Users, MousePointerClick, TrendingUp, Eye } from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  website:            "웹사이트",
  "shopping-mall":    "쇼핑몰",
  "logo-business-card": "로고·명함",
  "detail-page":      "상세페이지",
  "ppt-design":       "PPT",
  "automation-app":   "자동화·앱",
  "video-content":    "영상",
};

async function getAnalyticsData() {
  if (!hasSupabaseAdminConfig()) return null;
  const supabase = createSupabaseAdminClient();

  const [sessions, events, funnel, categoryInterest] = await Promise.all([
    supabase
      .from("visitor_sessions")
      .select("id, has_converted, total_pageviews", { count: "exact" })
      .gte("first_seen_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    supabase
      .from("visitor_events")
      .select("id", { count: "exact" })
      .gte("occurred_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    supabase.from("v_channel_funnel").select("*"),
    supabase.from("v_category_interest").select("*"),
  ]);

  const sessionList = sessions.data ?? [];
  const totalSessions  = sessions.count ?? 0;
  const totalEvents    = events.count ?? 0;
  const conversions    = sessionList.filter((s) => s.has_converted).length;
  const convRate       = totalSessions > 0 ? ((conversions / totalSessions) * 100).toFixed(1) : "0.0";

  return {
    kpi: { totalSessions, totalEvents, conversions, convRate },
    funnel: funnel.data ?? [],
    categoryInterest: categoryInterest.data ?? [],
  };
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium uppercase text-primary">Analytics</p>
        <h2 className="mt-2 text-3xl font-semibold">방문자 분석</h2>
        <p className="mt-2 text-sm text-muted-foreground">최근 30일 기준</p>
      </div>

      {!data ? (
        <p className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Supabase 관리자 환경변수가 없어 분석 데이터를 표시할 수 없습니다.
        </p>
      ) : (
        <>
          {/* KPI 카드 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "총 세션",    value: data.kpi.totalSessions.toLocaleString("ko-KR"),  icon: Users },
              { label: "총 이벤트",  value: data.kpi.totalEvents.toLocaleString("ko-KR"),    icon: MousePointerClick },
              { label: "전환(견적)", value: data.kpi.conversions.toLocaleString("ko-KR"),    icon: TrendingUp },
              { label: "전환율",     value: `${data.kpi.convRate}%`,                         icon: Eye },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-card p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <Icon className="size-4 text-primary" />
                </div>
                <p className="mt-4 text-2xl font-semibold">{value}</p>
              </div>
            ))}
          </div>

          {/* 채널 퍼널 */}
          <section className="rounded-xl border border-white/10 bg-card">
            <div className="border-b border-white/10 px-5 py-4">
              <h3 className="text-sm font-semibold">채널별 유입 퍼널</h3>
            </div>
            {data.funnel.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-muted-foreground">데이터가 없습니다.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8 text-left text-xs text-muted-foreground">
                      <th className="px-5 py-3">채널</th>
                      <th className="px-5 py-3">캠페인</th>
                      <th className="px-5 py-3 text-right">세션</th>
                      <th className="px-5 py-3 text-right">2페이지+</th>
                      <th className="px-5 py-3 text-right">전환</th>
                      <th className="px-5 py-3 text-right">전환율</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {data.funnel.map((row: Record<string, unknown>, i: number) => (
                      <tr key={i} className="hover:bg-white/5">
                        <td className="px-5 py-3 font-medium">{String(row.source ?? "-")}</td>
                        <td className="px-5 py-3 text-muted-foreground">{String(row.campaign ?? "-")}</td>
                        <td className="px-5 py-3 text-right">{String(row.sessions)}</td>
                        <td className="px-5 py-3 text-right">{String(row.engaged)}</td>
                        <td className="px-5 py-3 text-right">{String(row.converted)}</td>
                        <td className="px-5 py-3 text-right text-primary">{String(row.conversion_rate ?? "0")}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* 카테고리 관심도 */}
          <section className="rounded-xl border border-white/10 bg-card">
            <div className="border-b border-white/10 px-5 py-4">
              <h3 className="text-sm font-semibold">카테고리별 관심도</h3>
            </div>
            {data.categoryInterest.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-muted-foreground">데이터가 없습니다.</p>
            ) : (
              <div className="space-y-3 p-5">
                {data.categoryInterest.map((row: Record<string, unknown>) => {
                  const catId = String(row.category_id);
                  const sessions = Number(row.sessions);
                  const maxSessions = Number(data.categoryInterest[0]?.sessions ?? 1);
                  const pct = Math.round((sessions / maxSessions) * 100);
                  return (
                    <div key={catId} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{CATEGORY_LABELS[catId] ?? catId}</span>
                        <span className="text-muted-foreground">{sessions}세션</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
