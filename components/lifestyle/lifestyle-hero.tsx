import Link from "next/link";

interface Props {
  locale: string;
}

export function LifestyleHero({ locale }: Props) {
  return (
    <section
      className="mx-auto text-center"
      style={{ padding: "100px clamp(20px,3vw,24px) 70px", maxWidth: 1280 }}
    >
      {/* Eyebrow */}
      <div
        className="inline-flex items-center gap-[14px] mb-7 text-[11.5px] tracking-[0.28em] uppercase"
        style={{ fontFamily: "var(--font-jetbrains)", color: "var(--tone-life-rose)" }}
      >
        <span style={{ width: 32, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
        Detail Page · Commerce
        <span style={{ width: 32, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
      </div>

      {/* H1 */}
      <h1
        className="font-medium mx-auto mb-8"
        style={{
          fontFamily: "var(--font-fraunces)",
          fontSize: "clamp(48px,8vw,132px)",
          letterSpacing: "-0.03em",
          lineHeight: 0.96,
          color: "var(--tone-life-ink)",
          maxWidth: 1100,
        }}
      >
        <span style={{ color: "var(--tone-life-ink-3)", fontWeight: 400 }}>스크롤 한 번에,</span>
        <br />
        <em style={{ fontStyle: "italic", color: "var(--tone-life-rose)" }}>결제 버튼</em>까지
      </h1>

      {/* Sub */}
      <p
        className="mx-auto mb-11"
        style={{
          fontFamily: "var(--font-pretendard)",
          fontSize: "clamp(17px,1.4vw,21px)",
          lineHeight: 1.55,
          color: "var(--tone-life-ink-2)",
          maxWidth: 640,
        }}
      >
        뷰티 · 식품 · 패션 · 리빙까지.{" "}
        <strong style={{ color: "var(--tone-life-ink)", fontWeight: 600 }}>커머스 상세페이지</strong>를{" "}
        <em
          style={{
            fontFamily: "var(--font-fraunces)",
            fontStyle: "italic",
            color: "var(--tone-life-rose)",
            fontWeight: 500,
          }}
        >
          전환율 중심
        </em>
        으로.
      </p>

      {/* CTAs */}
      <div className="inline-flex gap-3 flex-wrap justify-center mb-14">
        <Link
          href={`/${locale}/quote`}
          className="inline-flex items-center gap-2 px-7 py-[14px] text-[14px] font-semibold rounded-full transition-all hover:-translate-y-0.5"
          style={{
            fontFamily: "var(--font-jakarta)",
            background: "var(--tone-life-ink)",
            color: "var(--tone-life-cream)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--tone-life-rose)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--tone-life-ink)"; }}
        >
          견적 시작 →
        </Link>
        <Link
          href={`/${locale}/services/detail-page/portfolio`}
          className="inline-flex items-center gap-2 px-7 py-[14px] text-[14px] font-medium rounded-full transition-all hover:-translate-y-0.5"
          style={{
            fontFamily: "var(--font-jakarta)",
            background: "transparent",
            color: "var(--tone-life-ink)",
            border: "1.5px solid var(--tone-life-line-2)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--tone-life-ink)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--tone-life-line-2)";
          }}
        >
          포트폴리오 보기
        </Link>
      </div>

      {/* Hero cover image */}
      <div
        className="w-full mx-auto relative overflow-hidden"
        style={{
          maxWidth: 1100,
          aspectRatio: "3/2",
          borderRadius: 4,
          boxShadow: "0 30px 80px rgba(42,36,24,0.18)",
          background: "linear-gradient(135deg, #F5C2C7 0%, #D9526E 50%, #8E2F45 100%)",
        }}
      >
        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            opacity: 0.4,
          }}
        />
        {/* Product shape */}
        <div
          className="absolute"
          style={{
            top: "22%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "24%",
            height: "56%",
            background: "radial-gradient(ellipse at 30% 30%, #FCEAEC 0%, #F8B0BC 40%, #6F2838 90%)",
            borderRadius: "30% 50% 30% 50% / 50% 30% 50% 30%",
            boxShadow: "inset -10px -20px 50px rgba(80,30,40,0.32), 0 30px 60px rgba(80,30,40,0.4)",
          }}
        />
        {/* Corner captions */}
        <span
          className="absolute top-7 left-8 text-[10.5px] tracking-[0.24em] uppercase z-10"
          style={{ fontFamily: "var(--font-jetbrains)", color: "rgba(255,255,255,0.65)" }}
        >
          Detail · Commerce
        </span>
        <span
          className="absolute top-7 right-8 text-[10.5px] tracking-[0.24em] uppercase z-10"
          style={{ fontFamily: "var(--font-jetbrains)", color: "rgba(255,255,255,0.65)" }}
        >
          2026 · AIO
        </span>
        <div className="absolute bottom-7 left-8 z-10">
          <div
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(20px,2.4vw,32px)",
              fontWeight: 500,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.012em",
            }}
          >
            전환율을{" "}
            <em style={{ fontStyle: "italic", color: "#FCEAEC" }}>높이는</em>
            <br />
            상세페이지
          </div>
          <div
            className="mt-[6px] text-[10px] tracking-[0.18em] uppercase"
            style={{ fontFamily: "var(--font-jetbrains)", color: "rgba(255,255,255,0.7)" }}
          >
            평균 전환율 +42%
          </div>
        </div>
        <span
          className="absolute bottom-7 right-8 px-[14px] py-[6px] rounded-full text-[10.5px] uppercase tracking-[0.16em] z-10"
          style={{
            fontFamily: "var(--font-jetbrains)",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            color: "white",
          }}
        >
          4.9만~
        </span>
      </div>
    </section>
  );
}
