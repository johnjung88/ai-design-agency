import Link from "next/link";

interface Props {
  locale: string;
}

const disciplines = [
  {
    num: "01",
    name: "웹 개발",
    nameEn: "web development",
    tagline: "5일이면 운영 가능한 사이트로",
    price: "₩9.9만~",
    days: "1–5 days",
    href: (locale: string) => `/${locale}/services/website`,
    available: true,
  },
  {
    num: "02",
    name: "상세페이지",
    nameEn: "detail page",
    tagline: "스크롤 한 번에, 결제 버튼까지",
    price: "₩4.9만~",
    days: "1–3 days",
    href: (locale: string) => `/${locale}/services/detail-page`,
    available: true,
  },
  {
    num: "03",
    name: "PPT 디자인",
    nameEn: "presentation",
    tagline: "한 장이 결정짓는 발표",
    price: "₩4만~",
    days: "1–3 days",
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
      className="py-28 px-9 max-w-[1200px] mx-auto relative text-center"
      style={{ padding: "clamp(80px,10vw,120px) clamp(24px,3vw,36px)" }}
    >
      {/* Eyebrow */}
      <div
        className="mb-6 inline-flex items-center gap-[14px]"
        style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11.5px", color: "var(--tone-magazine-ink-2)", letterSpacing: "0.3em", textTransform: "uppercase" }}
      >
        <span style={{ width: 28, height: 1, background: "var(--tone-magazine-ink-3)", display: "inline-block" }} />
        Index · 07 Disciplines
        <span style={{ width: 28, height: 1, background: "var(--tone-magazine-ink-3)", display: "inline-block" }} />
      </div>

      <h2
        className="font-normal mx-auto mb-7 max-w-[1100px]"
        style={{ fontFamily: "var(--font-marcellus)", fontSize: "clamp(48px,6vw,96px)", lineHeight: 1.0, letterSpacing: "-0.014em", color: "var(--tone-magazine-ink)" }}
      >
        일곱 분야의
        <br />
        <em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 500 }}>전문가들</em>
      </h2>

      <p
        className="mx-auto mb-16"
        style={{ fontFamily: "var(--font-cormorant)", fontSize: 19, lineHeight: 1.6, color: "var(--tone-magazine-ink-2)", maxWidth: 600 }}
      >
        지금 의뢰 가능한 <strong style={{ color: "var(--tone-magazine-ink)", fontWeight: 500 }}>3분야</strong>와 곧 합류할{" "}
        <strong style={{ color: "var(--tone-magazine-ink)", fontWeight: 500 }}>4분야</strong>
        <br />
        각 분야 페이지에서 그 분야 전문가가 직접 인사드립니다
      </p>

      <div
        style={{
          borderTop: "1px solid var(--tone-magazine-ink)",
          borderBottom: "1px solid var(--tone-magazine-ink)",
        }}
      >
        {disciplines.map((d) => {
          const rowStyle: React.CSSProperties = {
            display: "grid",
            gridTemplateColumns: "60px 1fr 60px",
            gap: 32,
            alignItems: "center",
            padding: "28px 32px",
            borderBottom: "1px solid var(--tone-magazine-line-2)",
            color: d.available ? "var(--tone-magazine-ink)" : "var(--tone-magazine-ink-faint)",
            textDecoration: "none",
            transition: "background 0.4s cubic-bezier(0.4,0,0.2,1)",
          };

          const inner = (
            <>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: 13,
                  color: d.available ? "var(--tone-magazine-ink-2)" : "var(--tone-magazine-ink-faint)",
                  letterSpacing: "0.06em",
                  textAlign: "left",
                }}
              >
                {d.num}
              </span>

              <div className="text-center">
                <div
                  className="inline-flex items-baseline gap-[14px] flex-wrap justify-center"
                  style={{ fontFamily: "var(--font-marcellus)", fontSize: "clamp(26px,3.2vw,40px)", lineHeight: 1, letterSpacing: "-0.01em" }}
                >
                  {d.name}
                  <em
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      color: d.available ? "var(--tone-magazine-ink-2)" : "var(--tone-magazine-ink-faint)",
                      fontWeight: 500,
                      fontSize: "0.55em",
                      letterSpacing: 0,
                    }}
                  >
                    {d.nameEn}
                  </em>
                </div>
                <div
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: 15, lineHeight: 1.45, color: d.available ? "var(--tone-magazine-ink-2)" : "var(--tone-magazine-ink-faint)", fontStyle: "italic", marginTop: 8 }}
                >
                  {d.tagline}
                </div>
                {d.available && d.price && (
                  <div
                    className="inline-flex gap-4 items-center mt-3"
                    style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11, color: "var(--tone-magazine-ink-2)", letterSpacing: "0.16em", textTransform: "uppercase" }}
                  >
                    <span style={{ fontFamily: "var(--font-marcellus)", fontSize: 16, color: "var(--tone-magazine-ink)", letterSpacing: 0, textTransform: "none" }}>{d.price}</span>
                    <span style={{ color: "var(--tone-magazine-ink-faint)" }}>·</span>
                    <span>{d.days}</span>
                  </div>
                )}
                {!d.available && (
                  <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11, color: "var(--tone-magazine-ink-faint)", letterSpacing: "0.16em", textTransform: "uppercase", marginTop: 12 }}>
                    Coming soon
                  </div>
                )}
              </div>

              <span
                style={{
                  fontFamily: "var(--font-marcellus)",
                  fontSize: 26,
                  color: d.available ? "var(--tone-magazine-ink-2)" : "var(--tone-magazine-ink-faint)",
                  lineHeight: 1,
                  textAlign: "right",
                  transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {d.available ? "→" : "·"}
              </span>
            </>
          );

          if (d.available && d.href) {
            return (
              <Link
                key={d.num}
                href={d.href(locale)}
                style={rowStyle}
                className="hover:bg-[var(--tone-magazine-paper-2)] [&:hover_span:last-child]:translate-x-2"
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
