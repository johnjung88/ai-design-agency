export function MagazineCover() {
  return (
    <section
      className="px-9 pt-20 pb-24 max-w-[1500px] mx-auto relative text-center"
      style={{ padding: "clamp(56px,6vw,100px) clamp(24px,3vw,36px) clamp(72px,8vw,100px)" }}
    >
      {/* Cover meta */}
      <div
        className="pb-4 border-b mb-16 inline-flex flex-wrap items-center gap-[18px] justify-center"
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
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--tone-magazine-ink-3)", display: "inline-block" }} />
        <span style={{ fontFamily: "var(--font-marcellus)", letterSpacing: "0.4em", color: "var(--tone-magazine-ink)" }}>
          A&nbsp;·&nbsp;I&nbsp;·&nbsp;O&nbsp;&nbsp; S T U D I O
        </span>
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--tone-magazine-ink-3)", display: "inline-block" }} />
        <span>est 2024 · Korea</span>
      </div>

      {/* Watermark */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-[1] select-none"
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
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <g fill="currentColor">
            <path d="M50 0 L54 46 L100 50 L54 54 L50 100 L46 54 L0 50 L46 46 Z" opacity="0.85" />
            <circle cx="50" cy="50" r="3" />
          </g>
        </svg>
      </div>

      {/* Eyebrow */}
      <div
        className="mb-8 inline-flex items-center gap-4"
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "11.5px",
          color: "var(--tone-magazine-ink-3)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ width: 32, height: 1, background: "var(--tone-magazine-ink-3)", display: "inline-block" }} />
        Volume One — The Studio
        <span style={{ width: 32, height: 1, background: "var(--tone-magazine-ink-3)", display: "inline-block" }} />
      </div>

      {/* Cover Title */}
      <h1
        className="font-normal mx-auto mb-9 max-w-[1300px]"
        style={{
          fontFamily: "var(--font-marcellus)",
          fontSize: "clamp(56px, 11vw, 168px)",
          lineHeight: 0.96,
          letterSpacing: "-0.012em",
          color: "var(--tone-magazine-ink)",
        }}
      >
        <span style={{ color: "var(--tone-magazine-ink-3)" }}>각 분야의</span>
        <br />
        <span>
          <em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "var(--tone-magazine-red)", fontWeight: 500 }}>
            전문가
          </em>
          가 만든다
        </span>
      </h1>

      {/* Lede */}
      <p
        className="mx-auto mb-14 font-normal max-w-[760px]"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(19px, 1.7vw, 25px)",
          lineHeight: 1.6,
          color: "var(--tone-magazine-ink-2)",
        }}
      >
        AIO는{" "}
        <strong style={{ color: "var(--tone-magazine-ink)", fontWeight: 500 }}>분야별 전문가가 모여 협업하는</strong>{" "}
        외주 스튜디오입니다
        <br />
        웹 · 상세페이지 · PPT — 각자 다른 손이, 같은 약속으로 만듭니다
        <br />
        <em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "var(--tone-magazine-ink)", fontWeight: 500 }}>
          1시간 응답, 5일 납품, 1개월 무상 A/S
        </em>
      </p>

      {/* Hero Graph Card */}
      <div
        className="w-full max-w-[1100px] mx-auto mb-[72px] rounded-[4px] overflow-hidden relative"
        style={{
          aspectRatio: "21/9",
          boxShadow: "0 30px 80px rgba(26,22,20,0.22), 0 0 0 1px rgba(26,22,20,0.14)",
          background: "radial-gradient(ellipse 80% 90% at 50% 60%, #3A2818 0%, #1F1610 60%, #100A06 100%)",
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,240,232,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.45,
          }}
        />
        {/* Top label */}
        <div className="absolute top-7 left-9 right-9 flex justify-between items-center z-[3]">
          <span
            style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11, color: "rgba(245,240,232,0.6)", letterSpacing: "0.24em", textTransform: "uppercase" }}
          >
            — Vital Sign · 누적 작업 16개월
          </span>
          <span
            className="flex items-center gap-[7px] px-3 py-1 rounded-[2px]"
            style={{ background: "var(--tone-magazine-red)", fontFamily: "var(--font-jetbrains)", fontSize: 9, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--tone-magazine-paper)" }}
          >
            <span className="w-[5px] h-[5px] rounded-full bg-white animate-dot-pulse-mag inline-block" />
            Live
          </span>
        </div>

        {/* Curve SVG */}
        <div className="absolute left-0 right-0" style={{ top: 70, bottom: 110 }}>
          <svg viewBox="0 0 1200 400" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="hi-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(232,184,154,0.5)" />
                <stop offset="100%" stopColor="rgba(232,184,154,0)" />
              </linearGradient>
            </defs>
            <line x1="0" y1="80" x2="1200" y2="80" stroke="rgba(245,240,232,0.08)" strokeDasharray="2 5" />
            <line x1="0" y1="160" x2="1200" y2="160" stroke="rgba(245,240,232,0.08)" strokeDasharray="2 5" />
            <line x1="0" y1="240" x2="1200" y2="240" stroke="rgba(245,240,232,0.08)" strokeDasharray="2 5" />
            <line x1="0" y1="320" x2="1200" y2="320" stroke="rgba(245,240,232,0.08)" strokeDasharray="2 5" />
            <path
              d="M 0 360 C 100 340, 200 310, 350 270 C 500 220, 650 160, 850 100 C 1000 50, 1100 25, 1200 12 L 1200 400 L 0 400 Z"
              fill="url(#hi-grad)"
              style={{ opacity: 0, animation: "curveDrawMag 1.2s ease-out 2.8s both" }}
            />
            <path
              d="M 0 360 C 100 340, 200 310, 350 270 C 500 220, 650 160, 850 100 C 1000 50, 1100 25, 1200 12"
              fill="none"
              stroke="#E8B89A"
              strokeWidth="2.4"
              strokeDasharray="2400"
              strokeDashoffset="2400"
              className="animate-curve-draw-mag"
            />
            <circle cx="1196" cy="14" r="14" fill="#C8472D" opacity="0.32" className="animate-pulse-ring-mag" style={{ transformOrigin: "1196px 14px" }} />
            <circle cx="1196" cy="14" r="6" fill="#C8472D" />
            <text x="14" y="392" fill="rgba(245,240,232,0.45)" fontFamily="var(--font-jetbrains)" fontSize="11" letterSpacing="2">JAN 25</text>
            <text x="425" y="392" fill="rgba(245,240,232,0.45)" fontFamily="var(--font-jetbrains)" fontSize="11" letterSpacing="2">SEP 25</text>
            <text x="855" y="392" fill="rgba(245,240,232,0.45)" fontFamily="var(--font-jetbrains)" fontSize="11" letterSpacing="2">JAN 26</text>
            <text x="1085" y="392" fill="#E8B89A" fontFamily="var(--font-jetbrains)" fontSize="11" letterSpacing="2">MAY 26 ●</text>
          </svg>
        </div>

        {/* Bottom stats */}
        <div className="absolute bottom-7 left-9 right-9 flex justify-between items-end z-[3]">
          <div className="text-left">
            <div style={{ fontFamily: "var(--font-marcellus)", fontSize: "clamp(40px,4.8vw,72px)", color: "var(--tone-magazine-paper)", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
              <em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "#E8B89A", fontWeight: 500 }}>142</em>
            </div>
            <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: 10, color: "rgba(245,240,232,0.55)", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 8 }}>의뢰 고객</div>
          </div>
          <div className="text-right">
            <div style={{ fontFamily: "var(--font-marcellus)", fontSize: "clamp(40px,4.8vw,72px)", color: "var(--tone-magazine-paper)", lineHeight: 0.95, letterSpacing: "-0.02em" }}>98%</div>
            <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: 10, color: "rgba(245,240,232,0.55)", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 8 }}>재의뢰율</div>
          </div>
        </div>
      </div>

      {/* Vital stats bar */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          borderTop: "1px solid var(--tone-magazine-ink)",
          borderBottom: "1px solid var(--tone-magazine-ink)",
        }}
      >
        {/* Mini curve */}
        <div
          className="flex flex-col gap-5 items-center py-8 px-7"
          style={{ borderRight: "1px solid var(--tone-magazine-line-2)" }}
        >
          <div
            className="flex items-center gap-[10px]"
            style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10.5px", color: "var(--tone-magazine-ink-2)", letterSpacing: "0.22em", textTransform: "uppercase" }}
          >
            — 누적 작업 16개월
            <span style={{ padding: "2px 8px", background: "var(--tone-magazine-red)", color: "var(--tone-magazine-paper)", borderRadius: 2, fontFamily: "var(--font-jetbrains)", fontSize: "8.5px", letterSpacing: "0.16em" }}>live</span>
          </div>
          <svg viewBox="0 0 600 140" preserveAspectRatio="none" style={{ width: "100%", maxWidth: 360, height: 140 }}>
            <line x1="0" y1="30" x2="600" y2="30" stroke="var(--tone-magazine-line)" strokeWidth="1" strokeDasharray="2 3" />
            <line x1="0" y1="70" x2="600" y2="70" stroke="var(--tone-magazine-line)" strokeWidth="1" strokeDasharray="2 3" />
            <line x1="0" y1="110" x2="600" y2="110" stroke="var(--tone-magazine-line)" strokeWidth="1" strokeDasharray="2 3" />
            <path
              d="M 0 124 C 60 116, 120 108, 200 92 C 280 72, 340 52, 420 30 C 480 14, 540 8, 600 4 L 600 140 L 0 140 Z"
              fill="var(--tone-magazine-red-soft)"
              style={{ animation: "curveDrawMag 1s ease-out 0.3s both", opacity: 0 }}
            />
            <path
              d="M 0 124 C 60 116, 120 108, 200 92 C 280 72, 340 52, 420 30 C 480 14, 540 8, 600 4"
              fill="none"
              stroke="var(--tone-magazine-ink)"
              strokeWidth="1.5"
              strokeDasharray="1500"
              strokeDashoffset="1500"
              style={{ animation: "curveDrawMag 2.5s cubic-bezier(0.16,1,0.3,1) 0.3s forwards" }}
            />
            <circle cx="600" cy="4" r="6" fill="var(--tone-magazine-red)" opacity="0.32" className="animate-pulse-ring-mag" style={{ transformOrigin: "600px 4px" }} />
            <circle cx="600" cy="4" r="4" fill="var(--tone-magazine-red)" />
          </svg>
        </div>

        {/* Stat 1 */}
        <div
          className="flex flex-col justify-between gap-4 items-center py-8 px-7"
          style={{ borderRight: "1px solid var(--tone-magazine-line-2)" }}
        >
          <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10.5px", color: "var(--tone-magazine-ink-2)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
            — 의뢰 고객
          </span>
          <div
            style={{
              fontFamily: "var(--font-marcellus)",
              fontSize: "clamp(56px, 6vw, 92px)",
              lineHeight: 0.92,
              letterSpacing: "-0.025em",
              color: "var(--tone-magazine-ink)",
            }}
          >
            142
          </div>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 14, color: "var(--tone-magazine-ink-2)", lineHeight: 1.55, maxWidth: 280 }}>
            첫 의뢰 142명 중 <strong style={{ color: "var(--tone-magazine-ink)", fontWeight: 500 }}>139명이 다시 돌아왔습니다</strong>
          </p>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col justify-between gap-4 items-center py-8 px-7">
          <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10.5px", color: "var(--tone-magazine-ink-2)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
            — 응답 · 납품 평균
          </span>
          <div
            style={{
              fontFamily: "var(--font-marcellus)",
              fontSize: "clamp(56px, 6vw, 92px)",
              lineHeight: 0.92,
              letterSpacing: "-0.025em",
              color: "var(--tone-magazine-ink)",
            }}
          >
            <em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 500 }}>1h</em> · 5d
          </div>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 14, color: "var(--tone-magazine-ink-2)", lineHeight: 1.55, maxWidth: 280 }}>
            평균 응답 23분, 평균 납기 4.6일
          </p>
        </div>
      </div>
    </section>
  );
}
