import Link from "next/link";
import { MagazineEyebrow } from "./magazine-eyebrow";

interface Props {
  locale: string;
}

const disciplines = [
  {
    num: "01",
    name: "웹 개발",
    nameEn: "web development",
    tagline: "5일이면 운영 가능한 사이트로",
    price: "9.9만~",
    days: "1-5 DAYS",
    href: (locale: string) => `/${locale}/services/website`,
    available: true,
  },
  {
    num: "02",
    name: "상세페이지",
    nameEn: "detail page",
    tagline: "스크롤 한 번에, 결제 버튼까지",
    price: "4.9만~",
    days: "1-3 DAYS",
    href: (locale: string) => `/${locale}/services/detail-page`,
    available: true,
  },
  {
    num: "03",
    name: "PPT 디자인",
    nameEn: "presentation",
    tagline: "한 장이 결정짓는 발표",
    price: "4.0만~",
    days: "1-3 DAYS",
    href: (locale: string) => `/${locale}/services/ppt-design`,
    available: true,
  },
  { num: "04", name: "자동화", nameEn: "automation", tagline: "반복 업무는 코드에게 맡기는 일", available: false },
  { num: "05", name: "앱 개발", nameEn: "app development", tagline: "손 안에 들어가는 서비스로", available: false },
  { num: "06", name: "영상", nameEn: "video", tagline: "스크롤을 멈추는 한 컷", available: false },
  { num: "07", name: "마케팅", nameEn: "marketing", tagline: "고객을 부르는 한 줄", available: false },
];

export function MagazineToc({ locale }: Props) {
  return (
    <section
      id="toc"
      className="py-20 md:py-28 max-w-[1280px] mx-auto relative text-center scroll-mt-24"
      style={{
        padding:
          "clamp(80px,10vw,120px) clamp(16px,3vw,40px)",
      }}
    >
      {/* Eyebrow */}
      <MagazineEyebrow className="mb-6">Index · 07 Disciplines</MagazineEyebrow>

      {/* H2 */}
      <h2
        className="font-normal mx-auto mb-7 max-w-[1100px]"
        style={{
          fontFamily: "var(--font-marcellus)",
          fontSize: "clamp(32px,6vw,96px)",
          lineHeight: 1.0,
          letterSpacing: "-0.014em",
          color: "var(--tone-magazine-ink)",
        }}
      >
        일곱 분야의
        <br />
        <em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 500 }}>
          전문가들
        </em>
      </h2>

      {/* Lede — Pretendard for Korean body */}
      <p
        className="mx-auto mb-12 md:mb-16"
        style={{
          fontFamily: "var(--font-pretendard)",
          fontSize: "clamp(14px, 1.3vw, 17px)",
          lineHeight: 1.75,
          color: "var(--tone-magazine-ink-2)",
          maxWidth: 600,
          fontWeight: 400,
        }}
      >
        지금 의뢰 가능한{" "}
        <strong style={{ color: "var(--tone-magazine-ink)", fontWeight: 600 }}>3분야</strong>
        와 곧 합류할{" "}
        <strong style={{ color: "var(--tone-magazine-ink)", fontWeight: 600 }}>4분야</strong>
        <br className="hidden sm:inline" />
        {" "}각 분야 페이지에서 그 분야 전문가가 직접 인사드립니다
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
                grid items-center gap-y-3 gap-x-4
                grid-cols-[28px_1fr_22px]
                md:grid-cols-[56px_minmax(220px,auto)_1fr_minmax(200px,auto)_40px]
                px-3 md:px-6 py-5 md:py-8
              "
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "clamp(11px, 1vw, 13px)",
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
                  className="inline-flex items-baseline gap-3 md:gap-4 flex-wrap justify-center md:justify-start"
                  style={{
                    fontFamily: "var(--font-marcellus)",
                    fontSize: "clamp(22px, 3.6vw, 46px)",
                    lineHeight: 1,
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
                </div>
              </div>

              {/* Tagline — full width on mobile (col-span-3), center column on PC */}
              <div className="col-span-3 md:col-span-1 text-center px-2">
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(12.5px, 1.3vw, 17px)",
                    lineHeight: 1.55,
                    color: inkSubActive,
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  {d.tagline}
                </p>
              </div>

              {/* Meta (price + days) — full width row on mobile, right column on PC */}
              <div className="col-span-3 md:col-span-1 flex items-baseline justify-center md:justify-end gap-3 md:gap-4">
                {d.available && d.price ? (
                  <>
                    <span
                      style={{
                        fontFamily: "var(--font-marcellus)",
                        fontSize: "clamp(16px, 1.7vw, 22px)",
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
                        fontSize: "clamp(10.5px, 1vw, 12px)",
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
                className="text-right justify-self-end self-start md:self-center"
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
