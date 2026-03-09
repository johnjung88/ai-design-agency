"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  portfolioCategories,
  portfolioProjects,
  type PortfolioProject,
  type PortfolioCategory,
} from "@/lib/portfolio-data";

const sizeClass: Record<PortfolioProject["size"], string> = {
  sm: "min-h-44",
  md: "min-h-56",
  lg: "min-h-72",
};

const categoryValues = new Set<PortfolioCategory>(
  portfolioCategories.map((item) => item.value)
);

export function PortfolioSection() {
  const [category, setCategory] = useState<PortfolioCategory>("all");

  const filtered = useMemo(() => {
    if (category === "all") {
      return portfolioProjects;
    }

    return portfolioProjects.filter((project) => project.category === category);
  }, [category]);

  return (
    <section id="portfolio" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-accent">Portfolio</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              카테고리별 대표 프로젝트
            </h2>
          </div>

          <Tabs
            value={category}
            onValueChange={(value) => {
              if (categoryValues.has(value as PortfolioCategory)) {
                setCategory(value as PortfolioCategory);
              }
            }}
          >
            <TabsList className="bg-muted/40">
              {portfolioCategories.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="px-3 text-xs data-active:bg-card data-active:text-foreground"
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-10 columns-1 gap-4 md:columns-2 lg:columns-3">
          {filtered.map((project) => (
            <article
              key={project.id}
              className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br p-6 transition-all duration-200 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 ${project.gradient} ${sizeClass[project.size]}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-36 rounded-full bg-accent/0 blur-3xl transition-colors duration-200 group-hover:bg-accent/20"
              />
              <Badge variant="secondary" className="relative bg-background/45 text-foreground/90">
                {portfolioCategories.find((c) => c.value === project.category)?.label ?? project.category.toUpperCase()}
              </Badge>
              <h3 className="relative mt-4 text-lg leading-snug font-semibold text-foreground">{project.title}</h3>
              <p className="relative mt-3 text-sm leading-6 text-foreground/85">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="relative rounded-full border border-border/70 bg-background/40 px-2.5 py-1 text-xs text-foreground/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/portfolio/${project.slug}`}
                className="relative mt-5 inline-flex text-sm font-medium text-foreground/90 underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:underline focus-visible:outline-none"
              >
                상세 보기
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
