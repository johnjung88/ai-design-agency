import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import {
  portfolioProjects,
  portfolioCategories,
  type PortfolioCategory,
} from "@/lib/portfolio-data";

interface Props {
  params: Promise<{ category: string }>;
}

const validCategories = ["brand-design", "brand-book", "website"] as const;

export async function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = portfolioCategories.find((c) => c.value === category)?.label;
  if (!label) return {};
  return {
    title: `${label} 포트폴리오 — D-AIO`,
    description: `D-AIO의 ${label} 프로젝트 포트폴리오를 확인하세요.`,
  };
}

const categoryColors: Record<string, string> = {
  "brand-design": "from-violet-950/80 via-purple-900/40 to-transparent",
  "brand-book":   "from-emerald-950/80 via-green-900/40 to-transparent",
  "website":      "from-blue-950/80 via-blue-900/40 to-transparent",
};

export default async function PortfolioCategoryPage({ params }: Props) {
  const { category } = await params;

  if (!validCategories.includes(category as (typeof validCategories)[number])) {
    notFound();
  }

  const cat = category as PortfolioCategory;
  const label = portfolioCategories.find((c) => c.value === cat)?.label ?? category;
  const projects = portfolioProjects.filter((p) => p.category === cat);
  const others = portfolioCategories.filter((c) => c.value !== "all" && c.value !== cat);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-foreground">
      {/* Hero */}
      <section className="border-b border-white/8 pb-20 pt-32">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <Link
            href="/#portfolio"
            className="mb-12 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            포트폴리오
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Portfolio
            </span>
          </div>

          <h1
            className="font-bold leading-[0.92] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(40px, 7vw, 100px)" }}
          >
            {label}
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            D-AIO의 {label} 프로젝트 포트폴리오입니다.
          </p>
        </div>
      </section>

      {/* 그리드 */}
      <section className="py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project, index) => {
              const bgGradient = categoryColors[project.category] ?? "from-zinc-900 to-transparent";
              return (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-white/8 bg-[#111] transition-colors hover:border-white/16"
                  style={{ minHeight: "280px" }}
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
                      <span className="flex size-8 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/40 transition-all group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:text-primary">
                        <ArrowUpRight className="size-3.5" />
                      </span>
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
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/8 px-2.5 py-0.5 text-xs text-white/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 다른 카테고리 */}
      <section className="border-t border-white/8 py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Other Categories
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {others.map((other) => (
              <Link
                key={other.value}
                href={`/portfolio/category/${other.value}`}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-5 text-sm font-medium text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
              >
                {other.label}
                <ArrowUpRight className="size-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
