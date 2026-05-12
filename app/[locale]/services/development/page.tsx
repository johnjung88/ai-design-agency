import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aio-make.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";
  return {
    title: isKo ? "개발 서비스 — AIO" : "Development Services — AIO",
    description: isKo
      ? "웹·앱·자동화·프로그램 — 코드로 만드는 모든 것."
      : "Web, app, automation, programs — built in code.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/services/development`,
      languages: {
        ko: `${SITE_URL}/ko/services/development`,
        en: `${SITE_URL}/en/services/development`,
      },
    },
  };
}

type SubService = {
  num: string;
  name: string;
  nameEn: string;
  desc: string;
  priceMan: string;
  priceCheon: string;
  days: string;
  stack: string;
};

const subs: SubService[] = [
  { num: "01", name: "웹", nameEn: "website", desc: "운영 가능한 홈페이지/쇼핑몰을 빠르게", priceMan: "9", priceCheon: "9", days: "1-5 DAYS", stack: "Next.js · 카페24 · WordPress" },
  { num: "02", name: "앱", nameEn: "app", desc: "iOS·Android, 한 코드베이스로", priceMan: "99", priceCheon: "", days: "7-30 DAYS", stack: "React Native · Flutter · Native" },
  { num: "03", name: "자동화", nameEn: "automation", desc: "반복 업무를 코드에게", priceMan: "19", priceCheon: "", days: "3-7 DAYS", stack: "n8n · Make · Python" },
  { num: "04", name: "프로그램", nameEn: "program", desc: "데스크탑/CLI 도구를 직접", priceMan: "29", priceCheon: "", days: "5-14 DAYS", stack: "Electron · Python · 매크로" },
];

const steps = [
  { step: "01", title: "의뢰", desc: "분야·범위·기한을 한 번에 정리" },
  { step: "02", title: "견적", desc: "24시간 안에 명확한 가격과 일정" },
  { step: "03", title: "작업", desc: "매일 진행 상황 공유" },
  { step: "04", title: "납품", desc: "운영 가능 상태로 손에" },
  { step: "05", title: "유지보수", desc: "1개월 무상 + 텔레그램 상시 응대" },
];

const faqs = [
  { q: "수정은 몇 회까지 가능한가요?", a: "주요 분기점(시안 · 1차 결과물 · 최종)에서 무제한. 큰 방향 전환은 별도 협의." },
  { q: "도메인·서버는 직접 준비해야 하나요?", a: "Vercel·카페24 등 권장 인프라 셋업까지 포함. 도메인 구매만 의뢰인이 진행." },
  { q: "유지보수 범위는?", a: "1개월 무상 = 코드 버그 수정·도메인 이슈·내용 소소 변경. 신규 기능은 별도 견적." },
  { q: "결제는 어떻게 진행하나요?", a: "착수 50% / 납품 50%. 세금계산서 발행 가능." },
];

export default async function DevelopmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main style={{ background: "var(--tone-ide-bg)", color: "var(--tone-ide-fg)", minHeight: "100vh" }}>
      <HeroSection locale={locale} />
      <SubServicesSection />
      <ProcessSection />
      <FaqSection />
      <CtaSection locale={locale} />
    </main>
  );
}

function HeroSection({ locale }: { locale: string }) {
  return (
    <section className="max-w-[1400px] mx-auto relative" style={{ padding: "var(--space-section) var(--space-edge)" }}>
      <div className="mb-8 md:mb-10 inline-flex items-center gap-2 flex-wrap" style={{ fontFamily: "var(--font-jetbrains)", fontSize: 12, color: "var(--tone-ide-fg-3)", letterSpacing: "0.06em" }}>
        <span style={{ color: "var(--tone-ide-mint)" }}>~/services</span>
        <span style={{ color: "var(--tone-ide-fg-faint)" }}>/</span>
        <span>development</span>
        <span className="ml-3 inline-flex items-center gap-1.5" style={{ padding: "2px 8px", background: "var(--tone-ide-mint-soft)", color: "var(--tone-ide-mint)", borderRadius: 2, fontSize: 10.5, letterSpacing: "0.18em" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--tone-ide-mint)" }} className="inline-block animate-dot-pulse-mag" />
          LIVE · 04 SUBS
        </span>
      </div>
      <h1 className="font-normal mb-7 md:mb-9 max-w-[1100px]" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "var(--text-display)", lineHeight: "var(--leading-display)", letterSpacing: "-0.014em", color: "var(--tone-ide-fg)", fontWeight: 500 }}>
        <span style={{ color: "var(--tone-ide-fg-3)" }}>const </span>
        <span style={{ color: "var(--tone-ide-syntax-blue)" }}>development</span>
        <span style={{ color: "var(--tone-ide-fg-3)" }}> = </span>
        <span style={{ color: "var(--tone-ide-syntax-string)" }}>&quot;코드로 만든다&quot;</span>
      </h1>
      <p className="mb-10 md:mb-14 max-w-[60ch]" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-lead)", lineHeight: 1.8, color: "var(--tone-ide-fg-2)" }}>
        웹·앱·자동화·프로그램 — 네 갈래로 나뉘지만 결국 한 사람의 손에서 끝납니다
        <br />
        <strong style={{ color: "var(--tone-ide-fg)", fontWeight: 600 }}>매일 진행 상황을 공유하고, 1개월 무상 유지보수까지</strong>
      </p>
      <div className="flex flex-col md:inline-flex md:flex-row md:flex-wrap gap-3 max-w-[280px] md:max-w-none">
        <Link href={`/${locale}/quote`} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:py-3 transition-all hover:-translate-y-0.5" style={{ background: "var(--tone-ide-mint)", color: "var(--tone-ide-bg)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 600, borderRadius: 2 }}>
          견적 문의 →
        </Link>
        <Link href="#subs" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:py-3 transition-all hover:-translate-y-0.5" style={{ background: "transparent", color: "var(--tone-ide-fg)", border: "1px solid var(--tone-ide-line)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 500, borderRadius: 2 }}>
          sub 분야 보기
        </Link>
      </div>
    </section>
  );
}

function SubServicesSection() {
  return (
    <section id="subs" className="max-w-[1400px] mx-auto" style={{ padding: "var(--space-section) var(--space-edge)" }}>
      <SectionEyebrow label="// 04 sub-services" />
      <h2 className="font-normal mb-8 md:mb-12 max-w-[900px]" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "var(--text-h1)", lineHeight: "var(--leading-head)", letterSpacing: "-0.012em", color: "var(--tone-ide-fg)", fontWeight: 500 }}>
        네 갈래의 <span style={{ color: "var(--tone-ide-mint)" }}>전문 분야</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {subs.map((s) => <SubCard key={s.num} s={s} />)}
      </div>
    </section>
  );
}

function SubCard({ s }: { s: SubService }) {
  return (
    <div className="group transition-all hover:-translate-y-1" style={{ padding: "clamp(24px, 3vw, 40px)", background: "var(--tone-ide-bg-2)", border: "1px solid var(--tone-ide-line)", borderRadius: 4 }}>
      <div className="flex items-start justify-between mb-6">
        <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: 12, color: "var(--tone-ide-fg-3)", letterSpacing: "0.06em" }}>{s.num}</span>
        <span style={{ padding: "2px 8px", background: "var(--tone-ide-mint-soft)", color: "var(--tone-ide-mint)", borderRadius: 2, fontFamily: "var(--font-jetbrains)", fontSize: 10, letterSpacing: "0.18em" }}>AVAILABLE</span>
      </div>
      <div className="mb-3 inline-flex items-baseline gap-3" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "var(--text-h2)", lineHeight: 1, color: "var(--tone-ide-fg)", fontWeight: 500, letterSpacing: "-0.012em" }}>
        {s.name}
        <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.5em", color: "var(--tone-ide-fg-3)", fontStyle: "italic", fontWeight: 400 }}>{s.nameEn}</span>
      </div>
      <p className="mb-5" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-body)", lineHeight: 1.7, color: "var(--tone-ide-fg-2)" }}>{s.desc}</p>
      <div className="mb-5 pb-5" style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11, color: "var(--tone-ide-syntax-purple)", letterSpacing: "0.04em", borderBottom: "1px dashed var(--tone-ide-line)" }}>{s.stack}</div>
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <span style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-body)", fontWeight: 600, color: "var(--tone-ide-fg)" }}>
          <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "1.45em", fontWeight: 500, color: "var(--tone-ide-mint)" }}>{s.priceMan}</span>
          <span style={{ marginLeft: 2 }}>만</span>
          {s.priceCheon && (<>{" "}<span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "1.45em", fontWeight: 500, color: "var(--tone-ide-mint)" }}>{s.priceCheon}</span><span style={{ marginLeft: 2 }}>천</span></>)}
          <span style={{ marginLeft: 2, color: "var(--tone-ide-fg-3)", fontWeight: 400 }}>원~</span>
        </span>
        <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11, color: "var(--tone-ide-fg-3)", letterSpacing: "0.18em" }}>{s.days}</span>
      </div>
    </div>
  );
}

function ProcessSection() {
  return (
    <section className="max-w-[1400px] mx-auto" style={{ padding: "var(--space-section) var(--space-edge)" }}>
      <SectionEyebrow label="// 05 steps" />
      <h2 className="font-normal mb-10 md:mb-14" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "var(--text-h1)", lineHeight: "var(--leading-head)", color: "var(--tone-ide-fg)", fontWeight: 500 }}>
        의뢰부터 운영까지 <span style={{ color: "var(--tone-ide-mint)" }}>5단계</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {steps.map((p) => (
          <div key={p.step} style={{ padding: "clamp(20px, 2.5vw, 28px)", background: "var(--tone-ide-bg-2)", border: "1px solid var(--tone-ide-line)", borderRadius: 4 }}>
            <div className="mb-3" style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11, color: "var(--tone-ide-mint)", letterSpacing: "0.06em" }}>{p.step}</div>
            <h3 className="mb-2" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "var(--text-h3)", color: "var(--tone-ide-fg)", fontWeight: 500, lineHeight: 1.2 }}>{p.title}</h3>
            <p style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-small)", lineHeight: 1.65, color: "var(--tone-ide-fg-3)" }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="max-w-[1100px] mx-auto" style={{ padding: "var(--space-section) var(--space-edge)" }}>
      <SectionEyebrow label="// FAQ" />
      <h2 className="font-normal mb-10 md:mb-14" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "var(--text-h1)", lineHeight: "var(--leading-head)", color: "var(--tone-ide-fg)", fontWeight: 500 }}>
        자주 묻는 질문
      </h2>
      <div className="space-y-2">
        {faqs.map((f, i) => (
          <details key={i} className="group" style={{ padding: "clamp(16px, 2vw, 24px) clamp(20px, 2.5vw, 28px)", background: "var(--tone-ide-bg-2)", border: "1px solid var(--tone-ide-line)", borderRadius: 4 }}>
            <summary className="cursor-pointer flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-body)", fontWeight: 500, color: "var(--tone-ide-fg)", listStyle: "none" }}>
              <span>{f.q}</span>
              <span className="transition-transform group-open:rotate-45" style={{ fontFamily: "var(--font-jetbrains)", color: "var(--tone-ide-mint)", fontSize: 18, lineHeight: 1 }}>+</span>
            </summary>
            <p className="mt-4" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-body)", lineHeight: 1.8, color: "var(--tone-ide-fg-2)" }}>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CtaSection({ locale }: { locale: string }) {
  return (
    <section className="max-w-[1400px] mx-auto text-center" style={{ padding: "var(--space-section) var(--space-edge)", borderTop: "1px solid var(--tone-ide-line)" }}>
      <h2 className="font-normal mb-6 md:mb-8" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "var(--text-display)", lineHeight: "var(--leading-display)", color: "var(--tone-ide-fg)", fontWeight: 500, letterSpacing: "-0.018em" }}>
        코드로 만들 게 있나요?
      </h2>
      <p className="mb-10 mx-auto max-w-[48ch]" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-lead)", lineHeight: 1.8, color: "var(--tone-ide-fg-2)" }}>
        24시간 안에 견적 회신 · 5일 안에 첫 결과물
      </p>
      <div className="inline-flex flex-wrap gap-3 justify-center">
        <Link href={`/${locale}/quote`} className="inline-flex items-center gap-2 px-8 py-4 transition-all hover:-translate-y-0.5" style={{ background: "var(--tone-ide-mint)", color: "var(--tone-ide-bg)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 600, borderRadius: 2 }}>
          견적 문의 →
        </Link>
        <Link href={`/${locale}/#toc`} className="inline-flex items-center gap-2 px-8 py-4 transition-all hover:-translate-y-0.5" style={{ background: "transparent", color: "var(--tone-ide-fg)", border: "1px solid var(--tone-ide-line)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 500, borderRadius: 2 }}>
          다른 분야 보기
        </Link>
      </div>
    </section>
  );
}

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="mb-10 md:mb-14 inline-flex items-center gap-2" style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11, color: "var(--tone-ide-fg-3)", letterSpacing: "0.22em" }}>
      <span style={{ width: 32, height: 1, background: "var(--tone-ide-line)", display: "inline-block" }} />
      {label}
    </div>
  );
}
