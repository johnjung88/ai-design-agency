import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aio-make.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";
  return {
    title: isKo ? "마케팅 서비스 (커밍순) — AIO" : "Marketing Services (Coming Soon) — AIO",
    description: isKo ? "퍼포먼스·콘텐츠·자동화 — 곧 시작합니다." : "Performance, content, automation — coming soon.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/services/marketing`,
      languages: { ko: `${SITE_URL}/ko/services/marketing`, en: `${SITE_URL}/en/services/marketing` },
    },
  };
}

const upcoming = [
  { num: "01", name: "퍼포먼스", nameEn: "performance", desc: "메타·구글 광고 운영" },
  { num: "02", name: "콘텐츠", nameEn: "content", desc: "블로그·인스타·릴스 기획·제작" },
  { num: "03", name: "자동화", nameEn: "automation", desc: "리드 nurturing·이메일·CRM" },
];

export default async function MarketingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main style={{ background: "var(--tone-consult-paper)", color: "var(--tone-consult-ink)", minHeight: "100vh" }}>
      <section className="max-w-[1100px] mx-auto text-center" style={{ padding: "var(--space-section) var(--space-edge)" }}>
        <div className="mb-8 md:mb-10 inline-flex items-center gap-3" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 11, color: "var(--tone-consult-ink-3)", letterSpacing: "0.28em", textTransform: "uppercase" }}>
          <span style={{ width: 24, height: 1, background: "var(--tone-consult-gold)", display: "inline-block" }} />
          Marketing · Coming Soon
          <span style={{ width: 24, height: 1, background: "var(--tone-consult-gold)", display: "inline-block" }} />
        </div>
        <h1 className="font-normal mb-7 md:mb-9 mx-auto max-w-[900px]" style={{ fontFamily: "var(--font-inter)", fontSize: "var(--text-display)", lineHeight: "var(--leading-display)", letterSpacing: "-0.018em", color: "var(--tone-consult-ink)", fontWeight: 600 }}>
          고객을 부르는
          <br />
          <span style={{ color: "var(--tone-consult-navy)", fontWeight: 700 }}>한 줄</span>
        </h1>
        <p className="mb-10 mx-auto max-w-[48ch]" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-lead)", lineHeight: 1.8, color: "var(--tone-consult-ink-2)" }}>
          곧 시작합니다.
          <br />
          출시 전 알림 받으시고 30% 얼리버드 혜택 받으세요
        </p>
        <Link href={`/${locale}/quote?interest=marketing`} className="inline-flex items-center gap-2 px-8 py-4 transition-all hover:-translate-y-0.5" style={{ background: "var(--tone-consult-navy)", color: "var(--tone-consult-paper)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 600, borderRadius: 2 }}>
          출시 알림 받기 →
        </Link>
      </section>

      <section className="max-w-[1100px] mx-auto" style={{ padding: "0 var(--space-edge) var(--space-section)" }}>
        <div className="mb-10 md:mb-14 inline-flex items-center gap-3" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 11, color: "var(--tone-consult-ink-3)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
          <span style={{ width: 24, height: 1, background: "var(--tone-consult-gold)", display: "inline-block" }} />
          Upcoming · 03 Sub-services
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {upcoming.map((s) => (
            <div key={s.num} style={{ padding: "clamp(24px, 2.8vw, 36px)", background: "var(--tone-consult-paper-2)", border: "1px dashed var(--tone-consult-line-2)", borderRadius: 2, opacity: 0.75 }}>
              <div className="mb-6" style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 12, color: "var(--tone-consult-ink-3)", letterSpacing: "0.18em" }}>{s.num}</div>
              <div className="mb-3 inline-flex items-baseline gap-3 flex-wrap" style={{ fontFamily: "var(--font-inter)", fontSize: "var(--text-h2)", lineHeight: 1.1, color: "var(--tone-consult-ink)", fontWeight: 600, letterSpacing: "-0.012em" }}>
                {s.name}
                <span style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "0.5em", color: "var(--tone-consult-ink-3)", fontWeight: 500 }}>{s.nameEn}</span>
              </div>
              <p style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-body)", lineHeight: 1.7, color: "var(--tone-consult-ink-2)" }}>{s.desc}</p>
              <div className="mt-5 pt-5" style={{ borderTop: "1px dashed var(--tone-consult-line-2)", fontFamily: "var(--font-ibm-plex-mono)", fontSize: 11, color: "var(--tone-consult-ink-faint)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Coming Soon</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto text-center" style={{ padding: "var(--space-section) var(--space-edge)", borderTop: "1px solid var(--tone-consult-line)" }}>
        <p className="mb-6" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-lead)", color: "var(--tone-consult-ink-2)" }}>
          마케팅 분야는 준비 중입니다. 다른 분야 먼저 둘러보세요
        </p>
        <Link href={`/${locale}/#toc`} className="inline-flex items-center gap-2 px-8 py-4 transition-all hover:-translate-y-0.5" style={{ background: "transparent", color: "var(--tone-consult-ink)", border: "1px solid var(--tone-consult-line-2)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 500, borderRadius: 2 }}>
          다른 분야 보기 →
        </Link>
      </section>
    </main>
  );
}
