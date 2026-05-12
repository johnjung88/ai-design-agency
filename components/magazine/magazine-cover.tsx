import { MagazineVitalSign } from "./magazine-vital-sign";

export function MagazineCover() {
  return (
    <section
      className="max-w-[1500px] mx-auto relative text-center"
      style={{
        padding: "var(--space-section) var(--space-edge)",
      }}
    >
      {/* Cover meta */}
      <div
        className="pb-4 border-b mb-10 md:mb-16 inline-flex flex-wrap items-center gap-2.5 md:gap-[18px] justify-center"
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: 11,
          color: "var(--tone-magazine-ink-3)",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          borderColor: "var(--tone-magazine-ink)",
        }}
      >
        <span>Issue 2026 · May</span>
        <span
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "var(--tone-magazine-ink-3)",
            display: "inline-block",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-marcellus)",
            letterSpacing: "0.4em",
            color: "var(--tone-magazine-ink)",
          }}
        >
          A&nbsp;·&nbsp;I&nbsp;·&nbsp;O&nbsp;&nbsp; S T U D I O
        </span>
        <span
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "var(--tone-magazine-ink-3)",
            display: "inline-block",
          }}
        />
        <span>est 2024 · Korea</span>
      </div>

      {/* Watermark */}
      <div
        aria-hidden
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-[1] select-none"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(280px, 45vw, 720px)",
          color: "var(--tone-magazine-ink)",
          opacity: 0.04,
          lineHeight: 0.8,
          fontStyle: "italic",
        }}
      >
        A
      </div>

      {/* Ornament */}
      <div className="w-16 h-16 mx-auto mb-9 text-[var(--tone-magazine-red)] animate-orn-spin">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <g fill="currentColor">
            <path
              d="M50 0 L54 46 L100 50 L54 54 L50 100 L46 54 L0 50 L46 46 Z"
              opacity="0.85"
            />
            <circle cx="50" cy="50" r="3" />
          </g>
        </svg>
      </div>

      {/* Eyebrow */}
      <div
        className="mb-6 md:mb-8 inline-flex items-center gap-3 md:gap-4"
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "10.5px",
          color: "var(--tone-magazine-ink-3)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: 32,
            height: 1,
            background: "var(--tone-magazine-ink-3)",
            display: "inline-block",
          }}
        />
        Volume One — The Studio
        <span
          style={{
            width: 32,
            height: 1,
            background: "var(--tone-magazine-ink-3)",
            display: "inline-block",
          }}
        />
      </div>

      {/* Cover Title — Display 토큰 */}
      <h1
        className="font-normal mx-auto mb-7 md:mb-9 max-w-[1300px]"
        style={{
          fontFamily: "var(--font-marcellus)",
          fontSize: "var(--text-display)",
          lineHeight: "var(--leading-display)",
          letterSpacing: "-0.014em",
          color: "var(--tone-magazine-ink)",
        }}
      >
        <span>각 분야의</span>
        <br />
        <span>
          <em
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              color: "var(--tone-magazine-red)",
              fontWeight: 500,
            }}
          >
            전문가
          </em>
          가 만든다
        </span>
      </h1>

      {/* Lede — 토큰 + 카피 사전 통일 */}
      <p
        className="mx-auto mb-10 md:mb-14 font-normal"
        style={{
          fontFamily: "var(--font-pretendard)",
          fontSize: "var(--text-lead)",
          lineHeight: 1.8,
          color: "var(--tone-magazine-ink-2)",
          maxWidth: "48ch",
          fontWeight: 400,
        }}
      >
        AIO는{" "}
        <strong
          style={{
            color: "var(--tone-magazine-ink)",
            fontWeight: 600,
          }}
        >
          분야별 전문가가 모여 협업하는
        </strong>{" "}
        외주 스튜디오입니다
        <br />각자 다른 손이, 같은 약속으로 만듭니다
        <br />
        <span
          style={{
            fontFamily: "var(--font-pretendard)",
            color: "var(--tone-magazine-ink)",
            fontWeight: 600,
            fontSize: "1.02em",
            letterSpacing: "-0.005em",
          }}
        >
          1시간 응답
          <span style={{ color: "var(--tone-magazine-red)", margin: "0 0.5em", fontWeight: 400 }}>·</span>
          5일 납품
          <span style={{ color: "var(--tone-magazine-red)", margin: "0 0.5em", fontWeight: 400 }}>·</span>
          1개월 유지보수
        </span>
      </p>

      {/* Hero Graph Card — extracted to client component with rich motion */}
      <MagazineVitalSign />

      {/* Vital stats bar — typography fixed */}
      <div
        className="grid grid-cols-2 md:grid-cols-3"
        style={{
          borderTop: "1px solid var(--tone-magazine-ink)",
          borderBottom: "1px solid var(--tone-magazine-ink)",
        }}
      >
        {/* Mini curve */}
        <div
          className="col-span-2 md:col-span-1 flex flex-col gap-3 md:gap-5 items-center py-5 md:py-8 px-4 md:px-7 border-b md:border-b-0 md:border-r"
          style={{ borderColor: "var(--tone-magazine-line-2)" }}
        >
          <div
            className="flex items-center gap-[10px]"
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "10.5px",
              color: "var(--tone-magazine-ink-2)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            — 16개월 운영
            <span
              style={{
                padding: "2px 8px",
                background: "var(--tone-magazine-red)",
                color: "var(--tone-magazine-paper)",
                borderRadius: 2,
                fontFamily: "var(--font-jetbrains)",
                fontSize: "8.5px",
                letterSpacing: "0.16em",
              }}
            >
              live
            </span>
          </div>
          <svg
            viewBox="0 0 600 140"
            preserveAspectRatio="none"
            style={{ width: "100%", maxWidth: 360, height: "clamp(72px, 14vw, 140px)" }}
          >
            <line
              x1="0"
              y1="30"
              x2="600"
              y2="30"
              stroke="var(--tone-magazine-line)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <line
              x1="0"
              y1="70"
              x2="600"
              y2="70"
              stroke="var(--tone-magazine-line)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <line
              x1="0"
              y1="110"
              x2="600"
              y2="110"
              stroke="var(--tone-magazine-line)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <path
              d="M 0 124 C 60 116, 120 108, 200 92 C 280 72, 340 52, 420 30 C 480 14, 540 8, 600 4 L 600 140 L 0 140 Z"
              fill="var(--tone-magazine-red-soft)"
              style={{
                animation: "curveDrawMag 1s ease-out 0.3s both",
                opacity: 0,
              }}
            />
            <path
              d="M 0 124 C 60 116, 120 108, 200 92 C 280 72, 340 52, 420 30 C 480 14, 540 8, 600 4"
              fill="none"
              stroke="var(--tone-magazine-ink)"
              strokeWidth="1.5"
              strokeDasharray="1500"
              strokeDashoffset="1500"
              style={{
                animation: "curveDrawMag 2.5s cubic-bezier(0.16,1,0.3,1) 0.3s forwards",
              }}
            />
            <circle
              cx="600"
              cy="4"
              r="6"
              fill="var(--tone-magazine-red)"
              opacity="0.32"
              className="animate-pulse-ring-mag"
              style={{ transformOrigin: "600px 4px" }}
            />
            <circle cx="600" cy="4" r="4" fill="var(--tone-magazine-red)" />
          </svg>
        </div>

        {/* Stat 1 — 의뢰 고객 */}
        <div
          className="flex flex-col justify-between gap-2.5 md:gap-4 items-center py-6 md:py-10 px-4 md:px-7 border-r md:border-r"
          style={{ borderColor: "var(--tone-magazine-line-2)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "10.5px",
              color: "var(--tone-magazine-ink-2)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            — 의뢰 고객
          </span>
          <div
            style={{
              fontFamily: "var(--font-marcellus)",
              fontSize: "clamp(48px, 7vw, 104px)",
              lineHeight: 0.9,
              letterSpacing: "-0.025em",
              color: "var(--tone-magazine-ink)",
            }}
          >
            142
          </div>
          <p
            style={{
              fontFamily: "var(--font-pretendard)",
              fontSize: "var(--text-small)",
              color: "var(--tone-magazine-ink-2)",
              lineHeight: 1.7,
              maxWidth: 280,
              fontWeight: 400,
            }}
          >
            첫 의뢰{" "}
            <strong
              style={{
                color: "var(--tone-magazine-ink)",
                fontWeight: 600,
              }}
            >
              142명
            </strong>{" "}
            중{" "}
            <strong
              style={{
                color: "var(--tone-magazine-ink)",
                fontWeight: 600,
              }}
            >
              139명
            </strong>
            이
            <br />
            다시 돌아왔습니다
          </p>
        </div>

        {/* Stat 2 — 응답·납품 평균 */}
        <div className="flex flex-col justify-between gap-2.5 md:gap-4 items-center py-6 md:py-10 px-4 md:px-7">
          <span
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "10.5px",
              color: "var(--tone-magazine-ink-2)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            — 응답 · 납품 평균
          </span>
          <div
            className="inline-flex items-baseline gap-3"
            style={{
              fontFamily: "var(--font-marcellus)",
              fontSize: "clamp(48px, 7vw, 104px)",
              lineHeight: 0.9,
              letterSpacing: "-0.025em",
              color: "var(--tone-magazine-ink)",
            }}
          >
            <span>
              1
              <span
                style={{
                  fontSize: "0.42em",
                  color: "var(--tone-magazine-ink-2)",
                  marginLeft: 3,
                  fontFamily: "var(--font-jetbrains)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                h
              </span>
            </span>
            <span
              style={{
                fontSize: "0.5em",
                color: "var(--tone-magazine-ink-faint)",
              }}
            >
              ·
            </span>
            <span>
              5
              <span
                style={{
                  fontSize: "0.42em",
                  color: "var(--tone-magazine-ink-2)",
                  marginLeft: 3,
                  fontFamily: "var(--font-jetbrains)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                d
              </span>
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-pretendard)",
              fontSize: "var(--text-small)",
              color: "var(--tone-magazine-ink-2)",
              lineHeight: 1.7,
              maxWidth: 280,
              fontWeight: 400,
            }}
          >
            평균 응답{" "}
            <strong
              style={{
                color: "var(--tone-magazine-ink)",
                fontWeight: 600,
              }}
            >
              23분
            </strong>
            , 평균 납기{" "}
            <strong
              style={{
                color: "var(--tone-magazine-ink)",
                fontWeight: 600,
              }}
            >
              4.6일
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
