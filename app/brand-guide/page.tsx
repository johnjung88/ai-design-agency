import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "브랜드 가이드 — D-AIO",
  description: "D-AIO 브랜드의 컬러, 타이포그래피, 로고 사용 가이드입니다.",
};

const colors = [
  { name: "Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]", border: "border-white/20", text: "text-white" },
  { name: "White", hex: "#ffffff", bg: "bg-white", border: "border-black/10", text: "text-black" },
  { name: "Lime", hex: "#a3e635", bg: "bg-[#a3e635]", border: "border-black/10", text: "text-black" },
  { name: "Muted", hex: "#71717a", bg: "bg-[#71717a]", border: "border-white/20", text: "text-white" },
];

const typographySizes = [
  { name: "Display", size: "clamp(56px, 9.5vw, 152px)", usage: "히어로 타이틀" },
  { name: "H1", size: "clamp(40px, 6vw, 96px)", usage: "섹션 주제목" },
  { name: "H2", size: "clamp(28px, 4vw, 64px)", usage: "서비스명·카테고리" },
  { name: "H3", size: "18–24px", usage: "카드 타이틀" },
  { name: "Body", size: "16px", usage: "본문·설명" },
  { name: "Small", size: "14px", usage: "보조 텍스트" },
  { name: "Caption", size: "12px", usage: "레이블·메타" },
];

const logoRules = [
  { type: "금지", rule: "로고 색상 임의 변경" },
  { type: "금지", rule: "로고 비율 변형 (늘리기/찌그러뜨리기)" },
  { type: "금지", rule: "로고에 그림자·외곽선 추가" },
  { type: "금지", rule: "배경과 대비가 낮은 색상 위 배치" },
  { type: "권장", rule: "라임 도트 + 흰색 텍스트 조합 유지" },
  { type: "권장", rule: "최소 크기 24px (화면), 10mm (인쇄)" },
];

export default function BrandGuidePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-foreground">
      {/* Hero */}
      <section className="border-b border-white/8 pb-20 pt-32">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Brand Guide
            </span>
          </div>
          <h1
            className="font-bold leading-[0.92] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(40px, 8vw, 120px)" }}
          >
            D-AIO
            <br />
            Brand Guide
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground">
            D-AIO 브랜드의 시각 정체성을 일관되게 유지하기 위한 가이드라인입니다.
            로고, 컬러, 타이포그래피 사용 규칙을 정의합니다.
          </p>
        </div>
      </section>

      {/* 브랜드 오버뷰 */}
      <section className="py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Overview</span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-8">
              <h3 className="mb-4 text-lg font-bold text-primary">미션</h3>
              <p className="text-base leading-8 text-muted-foreground">
                AI 기반 디자인 에이전시로, 빠르고 정교한 브랜드 경험을 제공합니다.
                모든 프로젝트에서 브랜드의 본질적 가치를 시각 언어로 번역합니다.
              </p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-8">
              <h3 className="mb-4 text-lg font-bold text-primary">비전</h3>
              <p className="text-base leading-8 text-muted-foreground">
                스타트업부터 엔터프라이즈까지, 모든 브랜드가 세계 수준의 디자인을
                빠르고 합리적으로 경험할 수 있는 에이전시를 만듭니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 로고 가이드 */}
      <section className="border-t border-white/8 py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Logo</span>
          </div>

          {/* 로고 미리보기 */}
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-center rounded-xl border border-white/8 bg-[#111] p-12">
              <div className="flex items-center gap-3">
                <div className="size-5 rounded-full bg-primary" />
                <span className="text-2xl font-bold tracking-[0.1em] text-foreground">D-AIO</span>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-xl border border-black/20 bg-white p-12">
              <div className="flex items-center gap-3">
                <div className="size-5 rounded-full bg-[#a3e635]" />
                <span className="text-2xl font-bold tracking-[0.1em] text-black">D-AIO</span>
              </div>
            </div>
          </div>

          {/* 사용 규칙 */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {logoRules.map((rule, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 rounded-lg border p-4 ${
                  rule.type === "권장"
                    ? "border-primary/20 bg-primary/5"
                    : "border-red-500/20 bg-red-500/5"
                }`}
              >
                <span
                  className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    rule.type === "권장"
                      ? "bg-primary/20 text-primary"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {rule.type}
                </span>
                <span className="text-sm text-foreground/80">{rule.rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 컬러 팔레트 */}
      <section className="border-t border-white/8 py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Colors</span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {colors.map((color) => (
              <div key={color.name}>
                <div
                  className={`mb-3 h-24 rounded-xl border ${color.bg} ${color.border}`}
                />
                <p className="text-sm font-semibold text-foreground">{color.name}</p>
                <p className="text-xs font-mono text-muted-foreground">{color.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 타이포그래피 */}
      <section className="border-t border-white/8 py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Typography</span>
          </div>

          <p className="mb-8 text-sm text-muted-foreground">
            Font: <span className="font-mono text-foreground">Geist Sans</span>
          </p>

          <div className="divide-y divide-white/8 border-t border-white/8">
            {typographySizes.map((t) => (
              <div key={t.name} className="flex items-center gap-8 py-6">
                <span className="w-24 shrink-0 text-xs font-mono text-muted-foreground">{t.name}</span>
                <span className="flex-1 font-bold text-foreground" style={{ fontSize: t.size }}>
                  {t.name}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground hidden sm:block">{t.size}</span>
                <span className="shrink-0 text-xs text-muted-foreground hidden md:block">{t.usage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
