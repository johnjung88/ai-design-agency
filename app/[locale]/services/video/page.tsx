import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aio-make.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";
  return {
    title: isKo ? "영상 서비스 (커밍순) — AIO" : "Video Services (Coming Soon) — AIO",
    description: isKo ? "촬영·편집·모션 — 곧 시작합니다." : "Filming, editing, motion — coming soon.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/services/video`,
      languages: { ko: `${SITE_URL}/ko/services/video`, en: `${SITE_URL}/en/services/video` },
    },
  };
}

const upcoming = [
  { num: "01", name: "촬영", nameEn: "filming", desc: "현장·제품·인터뷰" },
  { num: "02", name: "편집", nameEn: "editing", desc: "유튜브·SNS 숏폼·광고" },
  { num: "03", name: "모션", nameEn: "motion", desc: "로고 모션·인포그래픽" },
];

export default async function VideoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main style={{ background: "var(--tone-life-cream)", color: "var(--tone-life-ink)", minHeight: "100vh" }}>
      <section className="max-w-[1100px] mx-auto text-center" style={{ padding: "var(--space-section) var(--space-edge)" }}>
        <div className="mb-8 md:mb-10 inline-flex items-center gap-3" style={{ fontFamily: "var(--font-jakarta)", fontSize: 11, color: "var(--tone-life-ink-3)", letterSpacing: "0.28em", textTransform: "uppercase" }}>
          <span style={{ width: 24, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
          Video · Coming Soon
          <span style={{ width: 24, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
        </div>
        <h1 className="font-normal mb-7 md:mb-9 mx-auto max-w-[900px]" style={{ fontFamily: "var(--font-fraunces)", fontSize: "var(--text-display)", lineHeight: "var(--leading-display)", letterSpacing: "-0.014em", color: "var(--tone-life-ink)", fontWeight: 400 }}>
          장면을{" "}
          <em style={{ fontStyle: "italic", color: "var(--tone-life-rose)", fontWeight: 500 }}>담는</em>
          <br />
          분야
        </h1>
        <p className="mb-10 mx-auto max-w-[48ch]" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-lead)", lineHeight: 1.8, color: "var(--tone-life-ink-2)" }}>
          곧 시작합니다.
          <br />
          출시 전 알림 받으시고 30% 얼리버드 혜택 받으세요
        </p>
        <Link href={`/${locale}/quote?interest=video`} className="inline-flex items-center gap-2 px-8 py-4 transition-all hover:-translate-y-0.5" style={{ background: "var(--tone-life-rose)", color: "var(--tone-life-cream)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 600, borderRadius: 999 }}>
          출시 알림 받기 →
        </Link>
      </section>

      <section className="max-w-[1100px] mx-auto" style={{ padding: "0 var(--space-edge) var(--space-section)" }}>
        <div className="mb-10 md:mb-14 inline-flex items-center gap-3" style={{ fontFamily: "var(--font-jakarta)", fontSize: 11, color: "var(--tone-life-ink-3)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
          <span style={{ width: 24, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
          Upcoming · 03 Sub-services
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {upcoming.map((s) => (
            <div key={s.num} style={{ padding: "clamp(28px, 3.2vw, 44px)", background: "var(--tone-life-cream-2)", border: "1px dashed var(--tone-life-line-2)", borderRadius: 16, opacity: 0.75 }}>
              <div className="mb-6" style={{ fontFamily: "var(--font-jakarta)", fontSize: 12, color: "var(--tone-life-ink-3)", letterSpacing: "0.18em" }}>{s.num}</div>
              <div className="mb-3 inline-flex items-baseline gap-3 flex-wrap" style={{ fontFamily: "var(--font-fraunces)", fontSize: "var(--text-h2)", lineHeight: 1.05, color: "var(--tone-life-ink)", fontWeight: 400, letterSpacing: "-0.012em" }}>
                {s.name}
                <em style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontSize: "0.5em", color: "var(--tone-life-ink-3)", fontWeight: 400 }}>{s.nameEn}</em>
              </div>
              <p style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-body)", lineHeight: 1.7, color: "var(--tone-life-ink-2)" }}>{s.desc}</p>
              <div className="mt-5 pt-5" style={{ borderTop: "1px dashed var(--tone-life-line-2)", fontFamily: "var(--font-jakarta)", fontSize: 11, color: "var(--tone-life-ink-faint)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Coming Soon</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto text-center" style={{ padding: "var(--space-section) var(--space-edge)", borderTop: "1px solid var(--tone-life-line)" }}>
        <p className="mb-6" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-lead)", color: "var(--tone-life-ink-2)" }}>
          영상 분야는 준비 중입니다. 다른 분야 먼저 둘러보세요
        </p>
        <Link href={`/${locale}/#toc`} className="inline-flex items-center gap-2 px-8 py-4 transition-all hover:-translate-y-0.5" style={{ background: "transparent", color: "var(--tone-life-ink)", border: "1px solid var(--tone-life-line-2)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 500, borderRadius: 999 }}>
          다른 분야 보기 →
        </Link>
      </section>
    </main>
  );
}
