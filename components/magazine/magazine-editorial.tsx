"use client";
import Link from "next/link";

interface Props {
  locale: string;
}

export function MagazineEditorial({ locale }: Props) {
  return (
    <section
      className="py-36 px-9 max-w-[1500px] mx-auto text-center relative"
      style={{
        padding: "clamp(96px,10vw,140px) clamp(24px,3vw,36px)",
        borderTop: "1px solid var(--tone-magazine-ink)",
      }}
    >
      {/* Meta */}
      <div
        className="pb-4 mb-16 border-b inline-flex flex-wrap items-center gap-[18px] justify-center"
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: 11,
          color: "var(--tone-magazine-ink-2)",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          borderColor: "var(--tone-magazine-line-2)",
        }}
      >
        <span>Editorial · Founder&apos;s note</span>
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--tone-magazine-ink-3)", display: "inline-block" }} />
        <span style={{ fontFamily: "var(--font-marcellus)", letterSpacing: "0.4em", color: "var(--tone-magazine-ink)" }}>
          A&nbsp;·&nbsp;I&nbsp;·&nbsp;O&nbsp;&nbsp; S T U D I O
        </span>
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--tone-magazine-ink-3)", display: "inline-block" }} />
        <span>May 2026</span>
      </div>

      {/* Ornament */}
      <div
        className="w-14 h-14 mx-auto mb-9 text-[var(--tone-magazine-red)] animate-orn-spin-reverse"
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <g fill="currentColor">
            <path d="M50 0 L54 46 L100 50 L54 54 L50 100 L46 54 L0 50 L46 46 Z" opacity="0.85" />
            <circle cx="50" cy="50" r="3" />
          </g>
        </svg>
      </div>

      {/* Headline */}
      <h2
        className="font-normal mx-auto mb-12 max-w-[1200px]"
        style={{
          fontFamily: "var(--font-marcellus)",
          fontSize: "clamp(48px,8vw,144px)",
          lineHeight: 0.96,
          letterSpacing: "-0.018em",
          color: "var(--tone-magazine-ink)",
        }}
      >
        <span style={{ color: "var(--tone-magazine-ink-3)" }}>결과를 보고</span>
        <br />
        <em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "var(--tone-magazine-red)", fontWeight: 500 }}>
          맡기는
        </em>{" "}
        외주
      </h2>

      {/* Body */}
      <div className="max-w-[720px] mx-auto mb-16">
        <p
          className="mb-[18px]"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: 19, lineHeight: 1.7, color: "var(--tone-magazine-ink-2)" }}
        >
          AIO는{" "}
          <strong style={{ color: "var(--tone-magazine-ink)", fontWeight: 500 }}>각 분야 전문가</strong>가 직접 손을 대는 외주
          스튜디오입니다 의뢰가 들어오면, 그 분야의 전문가가 처음부터 끝까지 책임집니다
        </p>
        <p
          style={{ fontFamily: "var(--font-cormorant)", fontSize: 19, lineHeight: 1.7, color: "var(--tone-magazine-ink-2)" }}
        >
          매주 새 작품이 더해지고, 그게 다음 의뢰인의 결정을 돕습니다 결과물을 먼저 보고, 가격을 확인하고,{" "}
          <em style={{ fontStyle: "italic", color: "var(--tone-magazine-ink)", fontWeight: 500 }}>그 다음에 맡기세요</em>
        </p>
      </div>

      {/* CTAs */}
      <div className="inline-flex gap-[14px] flex-wrap justify-center">
        <Link
          href={`/${locale}/quote`}
          className="inline-flex items-center gap-[10px] px-8 py-4 transition-all hover:-translate-y-0.5"
          style={{
            background: "var(--tone-magazine-ink)",
            color: "var(--tone-magazine-paper)",
            fontFamily: "var(--font-pretendard)",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            border: "1px solid var(--tone-magazine-ink)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--tone-magazine-red)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--tone-magazine-red)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--tone-magazine-ink)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--tone-magazine-ink)";
          }}
        >
          견적 문의 →
        </Link>
        <Link
          href="#toc"
          className="inline-flex items-center gap-[10px] px-8 py-4 transition-all hover:-translate-y-0.5 hover:bg-[var(--tone-magazine-ink)] hover:text-[var(--tone-magazine-paper)]"
          style={{
            background: "transparent",
            color: "var(--tone-magazine-ink)",
            fontFamily: "var(--font-pretendard)",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            border: "1px solid var(--tone-magazine-ink)",
          }}
        >
          분야별 전문가 보기
        </Link>
      </div>
    </section>
  );
}
