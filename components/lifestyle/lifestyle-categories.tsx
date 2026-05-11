const categories = [
  {
    name: "뷰티 · 스킨케어",
    nameEn: "Beauty",
    desc: "세럼·크림·앰플·선크림. Before/After + 성분 스토리텔링.",
    tags: ["Before/After", "성분표", "리뷰 사례"],
    accent: "var(--tone-life-rose)",
    bg: "linear-gradient(135deg, #F5C2C7 0%, #D9526E 100%)",
  },
  {
    name: "식품 · 밀키트",
    nameEn: "Food",
    desc: "건강식·밀키트·건강기능식품. 신선함·원산지·영양 강조.",
    tags: ["원산지", "영양성분", "레시피"],
    accent: "var(--tone-life-terra)",
    bg: "linear-gradient(135deg, #F5E0C7 0%, #C56849 100%)",
  },
  {
    name: "패션 · 의류",
    nameEn: "Fashion",
    desc: "의류·신발·가방. 착용샷 구성 + 소재·핏·컬러 가이드.",
    tags: ["착용컷", "소재표", "사이즈 가이드"],
    accent: "var(--tone-life-ink)",
    bg: "linear-gradient(135deg, #D4CFC5 0%, #2A2418 100%)",
  },
  {
    name: "리빙 · 가구",
    nameEn: "Living",
    desc: "가구·인테리어·생활용품. 공간 활용 시나리오 구성.",
    tags: ["공간 연출", "치수", "소재"],
    accent: "var(--tone-life-olive)",
    bg: "linear-gradient(135deg, #D9E4C4 0%, #7B8E3F 100%)",
  },
  {
    name: "건강 · 헬스케어",
    nameEn: "Health",
    desc: "영양제·건강기능식품·의료기기. 효능 근거 + 임상 데이터.",
    tags: ["임상 근거", "복용법", "효능"],
    accent: "var(--tone-life-mustard)",
    bg: "linear-gradient(135deg, #F5E4C4 0%, #D4A53B 100%)",
  },
  {
    name: "펫 · 반려동물",
    nameEn: "Pet",
    desc: "펫푸드·용품·케어. 성분 안전성 + 반려동물 중심 스토리.",
    tags: ["안전성", "성분", "후기"],
    accent: "var(--tone-life-rose)",
    bg: "linear-gradient(135deg, #F5C2D7 0%, #A03060 100%)",
  },
];

export function LifestyleCategories() {
  return (
    <section
      className="mx-auto"
      style={{ padding: "110px clamp(20px,3vw,24px)", maxWidth: 1480 }}
    >
      {/* Head */}
      <div className="mx-auto mb-16 max-w-[720px] text-center">
        <div
          className="inline-flex items-center gap-[14px] mb-[22px] text-[11.5px] tracking-[0.28em] uppercase"
          style={{ fontFamily: "var(--font-jetbrains)", color: "var(--tone-life-rose)" }}
        >
          <span style={{ width: 28, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
          Category · 6 Verticals
          <span style={{ width: 28, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
        </div>
        <h2
          className="font-medium mb-[18px]"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(36px,5vw,72px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.0,
            color: "var(--tone-life-ink)",
          }}
        >
          카테고리마다{" "}
          <em style={{ fontStyle: "italic", color: "var(--tone-life-rose)" }}>다른 전략</em>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-pretendard)",
            fontSize: 17,
            color: "var(--tone-life-ink-2)",
            lineHeight: 1.55,
          }}
        >
          뷰티는 <strong style={{ color: "var(--tone-life-ink)", fontWeight: 600 }}>Before/After</strong>, 식품은{" "}
          <strong style={{ color: "var(--tone-life-ink)", fontWeight: 600 }}>신선함</strong>, 패션은{" "}
          <strong style={{ color: "var(--tone-life-ink)", fontWeight: 600 }}>착용컷</strong>.
          카테고리별 전환 공식이 있습니다.
        </p>
      </div>

      {/* Grid */}
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}
      >
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="group overflow-hidden transition-all duration-300 cursor-default"
            style={{
              background: "var(--tone-life-cream)",
              border: "1px solid var(--tone-life-line)",
              borderRadius: 12,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 50px rgba(42,36,24,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            {/* Cover */}
            <div
              className="w-full"
              style={{
                aspectRatio: "16/7",
                background: cat.bg,
                position: "relative",
              }}
            >
              <span
                className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {cat.nameEn}
              </span>
            </div>

            <div className="p-5">
              <h3
                className="font-medium mb-2"
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: 20,
                  letterSpacing: "-0.015em",
                  color: "var(--tone-life-ink)",
                }}
              >
                {cat.name}
              </h3>
              <p
                className="mb-4 text-[13.5px] leading-relaxed"
                style={{ fontFamily: "var(--font-pretendard)", color: "var(--tone-life-ink-2)", lineHeight: 1.6 }}
              >
                {cat.desc}
              </p>
              <div className="flex flex-wrap gap-[6px]">
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-[4px] text-[11.5px] rounded-full"
                    style={{
                      fontFamily: "var(--font-jakarta)",
                      background: "var(--tone-life-cream-2)",
                      border: "1px solid var(--tone-life-line)",
                      color: "var(--tone-life-ink-2)",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
