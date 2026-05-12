import Link from "next/link";
import { MagazineEyebrow } from "./magazine-eyebrow";

interface Props {
  locale: string;
}

type Discipline = {
  num: string;
  name: string;
  nameEn: string;
  tagline: string;
  sub: string;
  price?: string;
  days?: string;
  href?: (locale: string) => string;
  available: boolean;
};

const disciplines: Discipline[] = [
  {
    num: "01",
    name: "개발",
    nameEn: "development",
    tagline: "만드는 분야",
    sub: "웹 · 앱 · 자동화 · 프로그램",
    price: "9.9만~",
    days: "1-7 DAYS",
    href: (locale: string) => `/${locale}/services/development`,
    available: true,
  },
  {
    num: "02",
    name: "디자인",
    nameEn: "design",
    tagline: "보이는 분야",
    sub: "브랜드브리프 · 상세페이지",
    price: "4.9만~",
    days: "1-3 DAYS",
    href: (locale: string) => `/${locale}/services/design`,
    available: true,
  },
  {
    num: "03",
    name: "비즈",
    nameEn: "business",
    tagline: "쓰는 분야",
    sub: "사업계획서 · PPT · 정부지원금",
    price: "4.0만~",
    days: "1-5 DAYS",
    href: (locale: string) => `/${locale}/services/business`,
    available: true,
  },
  {
    num: "04",
    name: "영상",
    nameEn: "video",
    tagline: "찍는 분야",
    sub: "촬영 · 편집 · 모션",
    available: false,
  },
  {
    num: "05",
    name: "마케팅",
    nameEn: "marketing",
    tagline: "퍼뜨리는 분야",
    sub: "퍼포먼스 · 콘텐츠 · 자동화",
    available: false,
  },
];

export function MagazineToc({ locale }: Props) {
  return (
    <section
      id="toc"
      className="max-w-[1280px] mx-auto relative text-center scroll-mt-24"
      style={{
        padding: "var(--space-section) var(--space-edge)",
      }}
    >
      {/* Eyebrow */}
      <MagazineEyebrow className="mb-4 md:mb-6">Index · 05 Categories</MagazineEyebrow>

      {/* H2 — 토큰 기반 */}
      <h2
        className="font-normal mx-auto mb-5 md:mb-7 max-w-[1100px]"
        style={{
          fontFamily: "var(--font-marcellus)",
          fontSize: "var(--text-h1)",
          lineHeight: "var(--leading-display)",
          letterSpacing: "-0.014em",
          color: "var(--tone-magazine-ink)",
        }}
      >
        다섯 분야의
        <br />
        <em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 500 }}>
          전문가들
        </em>
      </h2>

      {/* Lede — H2 보완 한 줄 */}
      <p
        className="mx-auto mb-10 md:mb-16"
        style={{
          fontFamily: "var(--font-pretendard)",
          fontSize: "var(--text-lead)",
          lineHeight: 1.8,
          color: "var(--tone-magazine-ink-2)",
          maxWidth: "42ch",
          fontWeight: 400,
        }}
      >
        각 <strong style={{ color: "var(--tone-magazine-ink)", fontWeight: 600 }}>분야 페이지</strong>에서
        <br />
        그 <strong style={{ color: "var(--tone-magazine-ink)", fontWeight: 600 }}>분야 전문가</strong>가 직접 인사드립니다
      </p>

      {/* Rows */}
      <div
        style={{
          borderTop: "1px solid var(--tone-magazine-ink)",
          borderBottom: "1px solid var(--tone-magazine-ink)",
        }}
      >
        {disciplines.map((d, idx) => {
          const isLast = idx === disciplines.length - 1;
          const inkActive = d.available
            ? "var(--tone-magazine-ink)"
            : "var(--tone-magazine-ink-faint)";
          const inkSubActive = d.available
            ? "var(--tone-magazine-ink-2)"
            : "var(--tone-magazine-ink-faint)";

          const rowStyle: React.CSSProperties = {
            borderBottom: isLast
              ? "none"
              : "1px solid var(--tone-magazine-line-2)",
            color: inkActive,
            textDecoration: "none",
            transition: "background 0.4s cubic-bezier(0.4,0,0.2,1)",
          };

          const inner = (
            <div
              className="
                grid items-center gap-y-2 md:gap-y-3 gap-x-3 md:gap-x-4
                grid-cols-[24px_1fr]
                md:grid-cols-[56px_minmax(220px,auto)_1fr_minmax(200px,auto)_40px]
                px-3 md:px-6 py-3.5 md:py-8
              "
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "clamp(12px, 1vw, 13px)",
                  color: inkSubActive,
                  letterSpacing: "0.06em",
                  textAlign: "left",
                  alignSelf: "start",
                  paddingTop: 4,
                }}
              >
                {d.num}
              </span>

              {/* Name (Korean + English italic) */}
              <div className="text-center md:text-left">
                <div
                  className="inline-flex items-baseline gap-2 md:gap-4 flex-wrap justify-center md:justify-start"
                  style={{
                    fontFamily: "var(--font-marcellus)",
                    fontSize: "var(--text-h2)",
                    lineHeight: "var(--leading-display)",
                    letterSpacing: "-0.012em",
                    color: inkActive,
                  }}
                >
                  {d.name}
                  <em
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      color: inkSubActive,
                      fontWeight: 500,
                      fontSize: "0.5em",
                      letterSpacing: 0,
                    }}
                  >
                    {d.nameEn}
                  </em>
                  {/* 모바일 인라인 화살표 */}
                  <span
                    className="md:hidden"
                    style={{
                      fontFamily: "var(--font-marcellus)",
                      fontSize: "0.55em",
                      color: inkSubActive,
                      lineHeight: 1,
                      marginLeft: 4,
                    }}
                  >
                    {d.available ? "→" : "·"}
                  </span>
                </div>
              </div>

              {/* Tagline + sub-services — full width on mobile (col-span-3), center column on PC */}
              <div className="col-span-2 md:col-span-1 text-center px-1 md:px-2">
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "var(--text-lead)",
                    lineHeight: 1.55,
                    color: inkSubActive,
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  {d.tagline}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-pretendard)",
                    fontSize: "var(--text-small)",
                    lineHeight: 1.55,
                    color: d.available ? "var(--tone-magazine-ink-3)" : "var(--tone-magazine-ink-faint)",
                    margin: "4px 0 0",
                    fontWeight: 400,
                  }}
                >
                  {d.sub}
                </p>
              </div>

              {/* Meta (price + days) — full width row on mobile, right column on PC */}
              <div className="col-span-2 md:col-span-1 flex items-baseline justify-center md:justify-end gap-2.5 md:gap-4">
                {d.available && d.price ? (
                  <>
                    <span
                      style={{
                        fontFamily: "var(--font-marcellus)",
                        fontSize: "clamp(18px, 1.7vw, 22px)",
                        color: "var(--tone-magazine-ink)",
                        letterSpacing: "-0.01em",
                        lineHeight: 1,
                      }}
                    >
                      {d.price}
                    </span>
                    <span
                      style={{
                        color: "var(--tone-magazine-ink-faint)",
                        fontSize: "clamp(11px, 1vw, 13px)",
                      }}
                    >
                      ·
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "clamp(11.5px, 1vw, 12px)",
                        color: "var(--tone-magazine-ink-2)",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      {d.days}
                    </span>
                  </>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "clamp(10.5px, 1vw, 12px)",
                      color: "var(--tone-magazine-ink-faint)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    Coming soon
                  </span>
                )}
              </div>

              {/* Arrow — last col on PC, top-right on mobile */}
              <span
                className="hidden md:inline text-right justify-self-end self-start md:self-center"
                style={{
                  fontFamily: "var(--font-marcellus)",
                  fontSize: "clamp(22px, 2vw, 30px)",
                  color: inkSubActive,
                  lineHeight: 1,
                  transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
                  paddingTop: 4,
                }}
              >
                {d.available ? "→" : "·"}
              </span>
            </div>
          );

          if (d.available && d.href) {
            return (
              <Link
                key={d.num}
                href={d.href(locale)}
                style={rowStyle}
                className="block hover:bg-[var(--tone-magazine-paper-2)] [&:hover_span:last-child]:translate-x-2"
              >
                {inner}
              </Link>
            );
          }

          return (
            <div key={d.num} style={{ ...rowStyle, cursor: "default" }}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
