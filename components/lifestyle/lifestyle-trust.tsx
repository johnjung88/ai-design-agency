const trustItems = [
  {
    num: "42",
    numEm: false,
    label: "상세페이지 납품",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    num: "+42%",
    numEm: true,
    label: "평균 전환율 향상",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    num: "1–3일",
    numEm: false,
    label: "빠른 납기",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    num: "4.9",
    numEm: true,
    label: "의뢰인 평점",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    num: "30일",
    numEm: false,
    label: "무상 A/S",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

export function LifestyleTrust() {
  return (
    <div
      className="flex justify-around items-center flex-wrap"
      style={{
        padding: "32px 36px",
        maxWidth: 1480,
        margin: "0 auto",
        borderTop: "1px solid var(--tone-life-line)",
        borderBottom: "1px solid var(--tone-life-line)",
        background: "var(--tone-life-cream-2)",
        gap: 24,
      }}
    >
      {trustItems.map((item) => (
        <div key={item.label} className="flex items-center gap-[10px]">
          <span style={{ color: "var(--tone-life-rose)" }}>{item.icon}</span>
          <div
            className="flex items-baseline gap-[4px]"
            style={{ fontFamily: "var(--font-jetbrains)", fontSize: 12, color: "var(--tone-life-ink-2)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-fraunces)",
                color: "var(--tone-life-ink)",
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: "-0.02em",
                fontStyle: item.numEm ? "italic" : "normal",
              }}
            >
              {item.num}
            </span>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
