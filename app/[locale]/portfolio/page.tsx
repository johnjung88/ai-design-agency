"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PortfolioFilter } from "@/components/sections/portfolio-filter";
import { PortfolioCard } from "@/components/ui/portfolio-card";
import { portfolioProjects, getProjectsByType } from "@/lib/portfolio-data";
import type { PortfolioType } from "@/lib/portfolio-data";

type FilterValue = PortfolioType | "all";

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filtered =
    activeFilter === "all"
      ? portfolioProjects
      : getProjectsByType(activeFilter);

  const counts: Partial<Record<FilterValue, number>> = {
    all: portfolioProjects.length,
    web: getProjectsByType("web").length,
    app: getProjectsByType("app").length,
    design: getProjectsByType("design").length,
    video: getProjectsByType("video").length,
    automation: getProjectsByType("automation").length,
  };

  return (
    <main className="pb-24 pt-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {t("sectionTitle")}
            </span>
          </div>
          <PortfolioFilter
            active={activeFilter}
            onChange={setActiveFilter}
            counts={counts}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-white/15 text-sm text-muted-foreground">
            {t("noItems")}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
