import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aio-make.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";
  return {
    title: isKo ? "디자인 서비스 — AIO" : "Design Services — AIO",
    description: isKo ? "브랜드브리프·상세페이지 — 감각을 입히는 분야." : "Brand briefs and detail pages — visual identity made fast.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/services/design`,
      languages: { ko: `${SITE_URL}/ko/services/design`, en: `${SITE_URL}/en/services/design` },
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
  scope: string;
};

const subs: SubService[] = [
  { num: "01", name: "브랜드브리프", nameEn: "brand brief", desc: "로고·명함·브랜드 가이드를 한 세트로", priceMan: "19", priceCheon: "", days: "3-7 DAYS", scope: "로고 · 명함 · 컬러/타입 가이드" },
  { num: "02", name: "상세페이지", nameEn: "detail page", desc: "스크롤 한 번에, 결제 버튼까지", priceMan: "4", priceCheon: "9", days: "1-3 DAYS", scope: "쇼핑몰 상세 · 랜딩 · 이벤트" },
];

const steps = [
  { step: "01", title: "의뢰", desc: "분야·범위·기한을 한 번에 정리" },
  { step: "02", title: "견적", desc: "24시간 안에 명확한 가격과 일정" },
  { step: "03", title: "초안", desc: "기획·시안 1차 공유" },
  { step: "04", title: "납품", desc: "원본 파일과 함께" },
  { step: "05", title: "유지보수", desc: "1개월 무상 + 텔레그램 상시 응대" },
];

const faqs = [
  { q: "수정은 몇 회까지 가능한가요?", a: "초안 · 1차 · 최종 분기점에서 무제한. 큰 방향 전환은 별도 협의." },
  { q: "원본 파일(AI / PSD)도 받을 수 있나요?", a: "네, 모든 작업물의 편집 가능한 원본 파일을 함께 전달드립니다." },
  { q: "상세페이지는 어디서 사용할 수 있나요?", a: "스마트스토어 · 쿠팡 · 카페24 · 자체 쇼핑몰 등 어디든 사용 가능합니다." },
  { q: "결제는 어떻게 진행하나요?", a: "착수 50% / 납품 50%. 세금계산서 발행 가능." },
];

export default async function DesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main style={{ background: "var(--tone-life-cream)", color: "var(--tone-life-ink)", minHeight: "100vh" }}>
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
    <section className="max-w-[1400px] mx-auto relative text-center" style={{ padding: "var(--space-section) var(--space-edge)" }}>
      <div className="mb-8 md:mb-10 inline-flex items-center gap-3 flex-wrap" style={{ fontFamily: "var(--font-jakarta)", fontSize: 11, color: "var(--tone-life-ink-3)", letterSpacing: "0.28em", textTransform: "uppercase" }}>
        <span style={{ width: 24, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
        Design · 02 Sub-services
      </div>
      <h1 className="font-normal mb-7 md:mb-9 max-w-[1100px] mx-auto" style={{ fontFamily: "var(--font-fraunces)", fontSize: "var(--text-display)", lineHeight: "var(--leading-display)", letterSpacing: "-0.014em", color: "var(--tone-life-ink)", fontWeight: 400 }}>
        감각을{" "}
        <em style={{ fontStyle: "italic", color: "var(--tone-life-rose)", fontWeight: 500 }}>입히는</em>
        <br />
        분야
      </h1>
      <p className="mb-10 md:mb-14 max-w-[60ch] mx-auto" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-lead)", lineHeight: 1.8, color: "var(--tone-life-ink-2)" }}>
        로고에서 상세페이지까지, 보이는 것의 첫인상을 만듭니다
        <br />
        <strong style={{ color: "var(--tone-life-ink)", fontWeight: 600 }}>예쁜 것을 넘어, 결정에 영향을 주는 흐름까지</strong>
      </p>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-3 max-w-[280px] md:max-w-none items-center mx-auto md:justify-center">
        <Link href={`/${locale}/quote`} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:py-3 transition-all hover:-translate-y-0.5" style={{ background: "var(--tone-life-rose)", color: "var(--tone-life-cream)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 600, borderRadius: 999 }}>
          견적 문의 →
        </Link>
        <Link href="#subs" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:py-3 transition-all hover:-translate-y-0.5" style={{ background: "transparent", color: "var(--tone-life-ink)", border: "1px solid var(--tone-life-line-2)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 500, borderRadius: 999 }}>
          sub 분야 보기
        </Link>
      </div>
    </section>
  );
}

function SubServicesSection() {
  return (
    <section id="subs" className="max-w-[1400px] mx-auto text-center" style={{ padding: "var(--space-section) var(--space-edge)" }}>
      <SectionEyebrow label="Sub-services · 02" />
      <h2 className="font-normal mb-8 md:mb-12 max-w-[900px] mx-auto" style={{ fontFamily: "var(--font-fraunces)", fontSize: "var(--text-h1)", lineHeight: "var(--leading-head)", letterSpacing: "-0.012em", color: "var(--tone-life-ink)", fontWeight: 400 }}>
        두 갈래의{" "}
        <em style={{ fontStyle: "italic", color: "var(--tone-life-rose)", fontWeight: 500 }}>감각</em>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {subs.map((s) => <SubCard key={s.num} s={s} />)}
      </div>
    </section>
  );
}

function SubCard({ s }: { s: SubService }) {
  return (
    <div className="group transition-all hover:-translate-y-1 text-center" style={{ padding: "clamp(28px, 3.2vw, 44px)", background: "var(--tone-life-cream-2)", border: "1px solid var(--tone-life-line)", borderRadius: 16 }}>
      <div className="flex items-start justify-between mb-6">
        <span style={{ fontFamily: "var(--font-jakarta)", fontSize: 12, color: "var(--tone-life-ink-3)", letterSpacing: "0.18em", textTransform: "uppercase" }}>{s.num}</span>
        <span style={{ padding: "3px 10px", background: "var(--tone-life-rose-soft)", color: "var(--tone-life-rose)", borderRadius: 999, fontFamily: "var(--font-jakarta)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>Available</span>
      </div>
      <div className="mb-3 inline-flex items-baseline gap-3 flex-wrap" style={{ fontFamily: "var(--font-fraunces)", fontSize: "var(--text-h2)", lineHeight: 1.05, color: "var(--tone-life-ink)", fontWeight: 400, letterSpacing: "-0.012em" }}>
        {s.name}
        <em style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontSize: "0.5em", color: "var(--tone-life-ink-3)", fontWeight: 400 }}>{s.nameEn}</em>
      </div>
      <p className="mb-5" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-body)", lineHeight: 1.7, color: "var(--tone-life-ink-2)" }}>{s.desc}</p>
      <div className="mb-5 pb-5" style={{ fontFamily: "var(--font-jakarta)", fontSize: 11.5, color: "var(--tone-life-olive)", letterSpacing: "0.06em", borderBottom: "1px dashed var(--tone-life-line)" }}>{s.scope}</div>
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <span style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-body)", fontWeight: 600, color: "var(--tone-life-ink)" }}>
          <span style={{ fontFamily: "var(--font-fraunces)", fontSize: "1.45em", fontWeight: 500, color: "var(--tone-life-rose)" }}>{s.priceMan}</span>
          <span style={{ marginLeft: 2 }}>만</span>
          {s.priceCheon && (<>{" "}<span style={{ fontFamily: "var(--font-fraunces)", fontSize: "1.45em", fontWeight: 500, color: "var(--tone-life-rose)" }}>{s.priceCheon}</span><span style={{ marginLeft: 2 }}>천</span></>)}
          <span style={{ marginLeft: 2, color: "var(--tone-life-ink-3)", fontWeight: 400 }}>원~</span>
        </span>
        <span style={{ fontFamily: "var(--font-jakarta)", fontSize: 11, color: "var(--tone-life-ink-3)", letterSpacing: "0.18em" }}>{s.days}</span>
      </div>
    </div>
  );
}

function ProcessSection() {
  return (
    <section className="max-w-[1400px] mx-auto text-center" style={{ padding: "var(--space-section) var(--space-edge)" }}>
      <SectionEyebrow label="Process · 05 steps" />
      <h2 className="font-normal mb-10 md:mb-14 mx-auto" style={{ fontFamily: "var(--font-fraunces)", fontSize: "var(--text-h1)", lineHeight: "var(--leading-head)", color: "var(--tone-life-ink)", fontWeight: 400 }}>
        의뢰부터 운영까지{" "}
        <em style={{ fontStyle: "italic", color: "var(--tone-life-rose)", fontWeight: 500 }}>5단계</em>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
        {steps.map((p) => (
          <div key={p.step} style={{ padding: "clamp(20px, 2.5vw, 28px)", background: "var(--tone-life-cream-2)", border: "1px solid var(--tone-life-line)", borderRadius: 12 }}>
            <div className="mb-3" style={{ fontFamily: "var(--font-jakarta)", fontSize: 11, color: "var(--tone-life-rose)", letterSpacing: "0.18em", textTransform: "uppercase" }}>{p.step}</div>
            <h3 className="mb-2" style={{ fontFamily: "var(--font-fraunces)", fontSize: "var(--text-h3)", color: "var(--tone-life-ink)", fontWeight: 400, lineHeight: 1.2 }}>{p.title}</h3>
            <p style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-small)", lineHeight: 1.65, color: "var(--tone-life-ink-3)" }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="max-w-[1100px] mx-auto text-center" style={{ padding: "var(--space-section) var(--space-edge)" }}>
      <SectionEyebrow label="FAQ" />
      <h2 className="font-normal mb-10 md:mb-14 mx-auto" style={{ fontFamily: "var(--font-fraunces)", fontSize: "var(--text-h1)", lineHeight: "var(--leading-head)", color: "var(--tone-life-ink)", fontWeight: 400 }}>
        자주 묻는 질문
      </h2>
      <div className="space-y-2">
        {faqs.map((f, i) => (
          <details key={i} className="group" style={{ padding: "clamp(16px, 2vw, 24px) clamp(20px, 2.5vw, 28px)", background: "var(--tone-life-cream-2)", border: "1px solid var(--tone-life-line)", borderRadius: 12 }}>
            <summary className="cursor-pointer flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-body)", fontWeight: 500, color: "var(--tone-life-ink)", listStyle: "none" }}>
              <span>{f.q}</span>
              <span className="transition-transform group-open:rotate-45" style={{ fontFamily: "var(--font-fraunces)", color: "var(--tone-life-rose)", fontSize: 22, lineHeight: 1 }}>+</span>
            </summary>
            <p className="mt-4" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-body)", lineHeight: 1.8, color: "var(--tone-life-ink-2)" }}>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CtaSection({ locale }: { locale: string }) {
  return (
    <section className="max-w-[1400px] mx-auto text-center" style={{ padding: "var(--space-section) var(--space-edge)", borderTop: "1px solid var(--tone-life-line)" }}>
      <h2 className="font-normal mb-6 md:mb-8" style={{ fontFamily: "var(--font-fraunces)", fontSize: "var(--text-display)", lineHeight: "var(--leading-display)", color: "var(--tone-life-ink)", fontWeight: 400, letterSpacing: "-0.018em" }}>
        감각을 입힐{" "}
        <em style={{ fontStyle: "italic", color: "var(--tone-life-rose)", fontWeight: 500 }}>작업</em>이 있나요?
      </h2>
      <p className="mb-10 mx-auto max-w-[48ch]" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-lead)", lineHeight: 1.8, color: "var(--tone-life-ink-2)" }}>
        24시간 안에 견적 회신 · 3-7일 안에 결과물
      </p>
      <div className="inline-flex flex-wrap gap-3 justify-center">
        <Link href={`/${locale}/quote`} className="inline-flex items-center gap-2 px-8 py-4 transition-all hover:-translate-y-0.5" style={{ background: "var(--tone-life-rose)", color: "var(--tone-life-cream)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 600, borderRadius: 999 }}>
          견적 문의 →
        </Link>
        <Link href={`/${locale}/#toc`} className="inline-flex items-center gap-2 px-8 py-4 transition-all hover:-translate-y-0.5" style={{ background: "transparent", color: "var(--tone-life-ink)", border: "1px solid var(--tone-life-line-2)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 500, borderRadius: 999 }}>
          다른 분야 보기
        </Link>
      </div>
    </section>
  );
}

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="mb-10 md:mb-14 inline-flex items-center gap-3" style={{ fontFamily: "var(--font-jakarta)", fontSize: 11, color: "var(--tone-life-ink-3)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
      <span style={{ width: 24, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
      {label}
    </div>
  );
}
