"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import {
  portfolioCategories,
  portfolioProjects,
  type PortfolioProject,
  type PortfolioCategory,
} from "@/lib/portfolio-data";

// 카테고리별 배경 색상
const categoryColors: Record<string, string> = {
  "brand-design": "from-violet-950/80 via-purple-900/40 to-transparent",
  "brand-book":   "from-emerald-950/80 via-green-900/40 to-transparent",
  "website":      "from-blue-950/80 via-blue-900/40 to-transparent",
};

function ProjectCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const categoryLabel =
    portfolioCategories.find((c) => c.value === project.category)?.label ?? project.category;
  const bgGradient = categoryColors[project.category] ?? "from-zinc-900 to-transparent";

  return (
    <motion.article
      className="group relative overflow-hidden rounded-xl border border-white/8 bg-[#111]"
      style={{ minHeight: "280px" }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      {/* 배경 그라디언트 */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgGradient} transition-opacity duration-300 group-hover:opacity-80`}
      />

      {/* 호버 오버레이 */}
      <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/5" />

      {/* 콘텐츠 */}
      <div className="relative flex h-full flex-col justify-between p-6 lg:p-8">
        {/* 상단: 카테고리 + 링크 */}
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
            {categoryLabel}
          </span>
          <Link
            href={`/portfolio/${project.slug}`}
            className="flex size-8 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/40 transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        {/* 하단: 타이틀 + 태그 */}
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
    </motion.article>
  );
}

export function PortfolioSection() {
  const [category, setCategory] = useState<PortfolioCategory>("all");

  const filtered = useMemo(() => {
    if (category === "all") return portfolioProjects;
    return portfolioProjects.filter((p) => p.category === category);
  }, [category]);

  return (
    <section id="portfolio" className="py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">

        {/* 헤더 */}
        <div className="mb-16 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Portfolio
              </span>
            </div>
            <h2
              className="font-bold leading-tight tracking-[-0.02em] text-foreground"
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
            >
              대표 프로젝트
            </h2>
          </div>

          {/* 탭 필터 */}
          <div className="flex flex-wrap gap-2">
            {portfolioCategories.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setCategory(item.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  category === item.value
                    ? "bg-primary text-primary-foreground"
                    : "border border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2×N 균등 그리드 — 모바일 1열, sm 이상 2열 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
