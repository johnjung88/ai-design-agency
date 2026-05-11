const trustItems = [
  { num: "38", numEm: false, label: "PPT 납품" },
  { num: "$2M+", numEm: true, label: "투자 유치 지원" },
  { num: "1–3일", numEm: false, label: "빠른 납기" },
  { num: "4.9", numEm: true, label: "의뢰인 평점" },
];

export function ConsultTrust() {
  return (
    <div
      className="grid"
      style={{
        padding: "28px 36px",
        maxWidth: 1480,
        margin: "0 auto",
        borderTop: "1px solid var(--tone-consult-ink)",
        borderBottom: "1px solid var(--tone-consult-ink)",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 0,
      }}
    >
      {trustItems.map((item, i) => (
        <div
          key={item.label}
          className="flex flex-col items-center gap-1 py-2"
          style={{
            borderRight: i < trustItems.length - 1 ? "1px solid var(--tone-consult-line-2)" : "none",
          }}
        >
          <div
            style={{
              fontFamily: item.numEm ? "var(--font-cormorant)" : "var(--font-inter)",
              fontStyle: item.numEm ? "italic" : "normal",
              color: item.numEm ? "var(--tone-consult-navy)" : "var(--tone-consult-ink)",
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {item.num}
          </div>
          <div
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: 10,
              color: "var(--tone-consult-ink-2)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
