import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { portfolioProjects, portfolioCategories } from "@/lib/portfolio-data";
import { serviceCategories } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "D-AIO 소개 — 브랜드 디자인 에이전시",
  description: "D-AIO는 AI 기반 브랜드 디자인 에이전시입니다. 브랜드 디자인, 소개서, 웹사이트를 빠르고 정교하게 제작합니다.",
};

const KAKAO_URL = "https://open.kakao.com/o/s0000000"; // TODO: 실제 URL로 교체

const stats = [
  { value: "7일", label: "평균 납기" },
  { value: "100+", label: "완료 프로젝트" },
  { value: "98%", label: "재의뢰율" },
  { value: "24h", label: "평균 응답시간" },
];

const categoryColors: Record<string, string> = {
  "brand-design": "from-violet-950/80 via-purple-900/40 to-transparent",
  "brand-book":   "from-emerald-950/80 via-green-900/40 to-transparent",
  "website":      "from-blue-950/80 via-blue-900/40 to-transparent",
};

export default function AboutPage() {
  const highlights = portfolioProjects.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-foreground">
      {/* Hero */}
      <section className="border-b border-white/8 pb-20 pt-32">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              About D-AIO
            </span>
          </div>

          <h1
            className="font-bold leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: "clamp(40px, 8vw, 120px)" }}
          >
            <span className="text-foreground">브랜드를 만들고,</span>
            <br />
            <span className="text-foreground">가치를</span>
            <span className="text-foreground/45"> 설계합니다.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground">
            D-AIO는 AI 기반 브랜드 디자인 에이전시입니다. 로고부터 웹사이트까지,
            스타트업과 기업의 브랜드 경험을 빠르고 정교하게 구축합니다.
          </p>
        </div>
      </section>

      {/* 실적 */}
      <section className="border-b border-white/8 py-16">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-bold text-primary"
                  style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 스토리 */}
      <section className="py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Our Story
            </span>
          </div>
          <div className="max-w-3xl">
            <p className="text-base leading-9 text-muted-foreground">
              D-AIO는 &ldquo;디자인은 빠르고 좋을 수 없다&rdquo;는 편견을 깨기 위해 시작했습니다.
              AI와 전문 디자이너의 협업으로, 기존 에이전시 대비 3배 빠른 납기와
              동등한 품질을 실현합니다.
            </p>
            <p className="mt-6 text-base leading-9 text-muted-foreground">
              브랜드 디자인, 소개서, 웹사이트까지 하나의 팀에서 일관된 비주얼 언어로
              처음부터 끝까지 책임집니다. 사업자 규모에 관계없이,
              세계 수준의 브랜드 경험을 합리적인 비용으로 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 서비스 역량 */}
      <section className="border-t border-white/8 py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Services
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {serviceCategories.map((service) => (
              <Link
                key={service.value}
                href={`/services/${service.value}`}
                className="group rounded-xl border border-white/8 bg-white/[0.02] p-8 transition-colors hover:border-white/16 hover:bg-white/[0.04]"
              >
                <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {service.label}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  자세히 보기 <ArrowUpRight className="size-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 포트폴리오 하이라이트 */}
      <section className="border-t border-white/8 py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Portfolio Highlights
              </span>
            </div>
            <Link
              href="/#portfolio"
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              전체 보기 <ArrowUpRight className="size-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((project) => {
              const bgGradient = categoryColors[project.category] ?? "from-zinc-900 to-transparent";
              const label = portfolioCategories.find((c) => c.value === project.category)?.label ?? "";
              return (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-white/8 bg-[#111] transition-colors hover:border-white/16"
                  style={{ minHeight: "240px" }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${bgGradient} transition-opacity duration-300 group-hover:opacity-80`}
                  />
                  <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/5" />
                  <div className="relative flex h-full flex-col justify-between p-6 lg:p-8">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
                        {label}
                      </span>
                      <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <div>
                      <h3
                        className="font-bold leading-tight tracking-tight text-foreground"
                        style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
                      >
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground line-clamp-2">
                        {project.summary}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/8 py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12 text-center">
          <h2
            className="font-bold tracking-[-0.02em] text-foreground"
            style={{ fontSize: "clamp(32px, 4vw, 64px)" }}
          >
            함께 브랜드를 만들어요.
          </h2>
          <p className="mt-6 text-base text-muted-foreground">
            카카오톡으로 문의하시면 24시간 내 답변드립니다.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-80"
            >
              <MessageCircle className="size-5" />
              카카오톡 상담하기
            </a>
            <Link
              href="/brand-guide"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-white/12 px-8 text-base font-semibold text-foreground transition-colors hover:border-white/25 hover:bg-white/5"
            >
              브랜드 가이드 보기
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
