import Link from "next/link";

interface Props {
  locale: string;
}

export function ConsultHero({ locale }: Props) {
  return (
    <section
      className="mx-auto text-center"
      style={{ padding: "96px clamp(20px,3vw,24px) 80px", maxWidth: 1280 }}
    >
      {/* Eyebrow */}
      <div
        className="inline-flex items-center gap-[14px] mb-7 text-[11.5px] tracking-[0.3em] uppercase font-medium"
        style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "var(--tone-consult-navy)" }}
      >
        <span style={{ width: 28, height: 1, background: "var(--tone-consult-gold)", display: "inline-block" }} />
        Presentation · Design
      </div>

      {/* H1 */}
      <h1
        className="font-bold mx-auto mb-8"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "clamp(48px,7.4vw,124px)",
          letterSpacing: "-0.035em",
          lineHeight: 0.96,
          color: "var(--tone-consult-ink)",
          maxWidth: 1100,
        }}
      >
        <span style={{ color: "var(--tone-consult-ink-3)", fontWeight: 600 }}>한 장이</span>
        <br />
        <em
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            color: "var(--tone-consult-navy)",
            fontWeight: 500,
          }}
        >
          결정짓는
        </em>{" "}
        발표
      </h1>

      {/* Sub */}
      <p
        className="mx-auto mb-11"
        style={{
          fontFamily: "var(--font-pretendard)",
          fontSize: "clamp(16px,1.3vw,19px)",
          lineHeight: 1.6,
          color: "var(--tone-consult-ink-2)",
          maxWidth: 660,
        }}
      >
        IR 덱 · 사업 제안서 · 컨설팅 보고서까지.{" "}
        <strong style={{ color: "var(--tone-consult-ink)", fontWeight: 600 }}>의사결정자를 설득하는</strong>{" "}
        <em
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            color: "var(--tone-consult-navy)",
            fontWeight: 500,
          }}
        >
          슬라이드 한 세트
        </em>
        .
      </p>

      {/* CTAs */}
      <div className="inline-flex gap-3 flex-wrap justify-center mb-16">
        <Link
          href={`/${locale}/quote`}
          className="inline-flex items-center gap-2 px-[22px] py-[13px] text-[13px] font-semibold transition-all hover:-translate-y-0.5"
          style={{
            fontFamily: "var(--font-inter)",
            background: "var(--tone-consult-ink)",
            color: "var(--tone-consult-paper)",
            textDecoration: "none",
            letterSpacing: "-0.005em",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--tone-consult-navy)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--tone-consult-ink)"; }}
        >
          견적 시작 →
        </Link>
        <Link
          href={`/${locale}/services/ppt-design/portfolio`}
          className="inline-flex items-center gap-2 px-[22px] py-[13px] text-[13px] font-medium transition-all hover:-translate-y-0.5"
          style={{
            fontFamily: "var(--font-inter)",
            background: "transparent",
            color: "var(--tone-consult-ink)",
            border: "1px solid var(--tone-consult-line-2)",
            textDecoration: "none",
            letterSpacing: "-0.005em",
          }}
        >
          포트폴리오 보기
        </Link>
      </div>

      {/* Hero slide mockup */}
      <div
        className="w-full mx-auto relative overflow-hidden"
        style={{
          maxWidth: 1120,
          aspectRatio: "16/9",
          borderRadius: 4,
          boxShadow: "0 30px 80px rgba(14,26,43,0.32)",
          background: "linear-gradient(135deg, #1B3B5F 0%, #0E1A2B 60%, #050A14 100%)",
        }}
      >
        {/* Overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(27,59,95,0.5) 0%, rgba(14,26,43,0) 50%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(201,169,97,0.18), transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            opacity: 0.5,
          }}
        />

        {/* Top left */}
        <div
          className="absolute top-8 left-9 inline-flex items-center gap-2 text-[10.5px] tracking-[0.22em] uppercase z-10"
          style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "rgba(255,255,255,0.55)" }}
        >
          <span style={{ width: 16, height: 1, background: "var(--tone-consult-gold)", display: "inline-block" }} />
          AIO Studio · PPT
        </div>

        {/* Top right */}
        <div
          className="absolute top-8 right-9 text-[10.5px] tracking-[0.22em] uppercase z-10"
          style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "rgba(255,255,255,0.4)" }}
        >
          2026 · CONFIDENTIAL
        </div>

        {/* Center */}
        <div
          className="absolute z-10 text-left"
          style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "100%", padding: "0 56px" }}
        >
          <div
            className="mb-5 text-[10.5px] tracking-[0.28em] uppercase font-medium"
            style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "var(--tone-consult-gold)" }}
          >
            Series A IR Deck · 2026
          </div>
          <div
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(32px,4.8vw,64px)",
              fontWeight: 600,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              maxWidth: 720,
            }}
          >
            투자자를 설득하는{" "}
            <em
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                color: "var(--tone-consult-gold)",
                fontWeight: 500,
              }}
            >
              한 장
            </em>
          </div>
        </div>

        {/* Bottom left */}
        <div
          className="absolute bottom-8 left-9 text-[10.5px] tracking-[0.16em] z-10"
          style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "rgba(255,255,255,0.45)" }}
        >
          aio-make.com
        </div>

        {/* Bottom right — gold badge */}
        <div
          className="absolute bottom-8 right-9 px-[14px] py-[6px] text-[10.5px] font-semibold tracking-[0.16em] uppercase z-10"
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            background: "var(--tone-consult-gold)",
            color: "var(--tone-consult-ink)",
          }}
        >
          4만~
        </div>
      </div>
    </section>
  );
}
