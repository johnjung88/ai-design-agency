import Link from "next/link";
import { ArrowRight, Bot, Inbox, Send, Users } from "lucide-react";
import { getDashboardMetrics } from "@/lib/admin/data";

function formatWon(value: number): string {
  return `₩${value.toLocaleString("ko-KR")}`;
}

export default async function AdminDashboardPage() {
  const { metrics, recentItems, error } = await getDashboardMetrics();
  const cards = [
    { label: "전체 리드", value: metrics.totalLeads.toLocaleString("ko-KR"), icon: Users },
    { label: "신규 요청", value: metrics.newRequests.toLocaleString("ko-KR"), icon: Inbox },
    { label: "발송 견적", value: metrics.sentQuotes.toLocaleString("ko-KR"), icon: Send },
    { label: "누적 매출", value: formatWon(metrics.revenue), icon: Bot },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase text-primary">Today</p>
          <h2 className="mt-2 text-3xl font-semibold">AIO 의장님 대시보드</h2>
          <p className="mt-2 text-sm text-muted-foreground">사이트 견적, 외부 플랫폼 응답, 매출 흐름을 한 화면에서 확인합니다.</p>
        </div>
        <Link href="/admin/bot" className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">
          응답 작성
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {error && <p className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{error}</p>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-lg border border-white/10 bg-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <Icon className="size-4 text-primary" />
              </div>
              <p className="mt-4 text-2xl font-semibold">{card.value}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-white/10 bg-card">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <h3 className="font-semibold">최근 인박스</h3>
            <Link href="/admin/inbox" className="text-sm text-primary">
              전체 보기
            </Link>
          </div>
          <div className="divide-y divide-white/10">
            {recentItems.length === 0 ? (
              <p className="px-5 py-8 text-sm text-muted-foreground">아직 표시할 견적 요청이 없습니다.</p>
            ) : (
              recentItems.map((item) => (
                <Link key={item.requestId} href="/admin/inbox" className="block px-5 py-4 transition hover:bg-white/[0.03]">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium">{item.customerName}</p>
                    <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-muted-foreground">{item.channel}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.rawText}</p>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-card p-5">
          <h3 className="font-semibold">오늘 우선순위</h3>
          <div className="mt-5 space-y-3 text-sm">
            <p className="rounded-lg bg-white/5 px-4 py-3">1. 신규 요청은 1시간 이내 응답</p>
            <p className="rounded-lg bg-white/5 px-4 py-3">2. 외부 플랫폼 글은 `/admin/bot`에서 초안 생성 후 직접 발송</p>
            <p className="rounded-lg bg-white/5 px-4 py-3">3. 발송 후 인박스 상태를 `sent`로 정리</p>
          </div>
        </div>
      </section>
    </div>
  );
}
