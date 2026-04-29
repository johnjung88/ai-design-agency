"use client";

import { useTranslations } from "next-intl";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { PortfolioCard } from "@/components/ui/portfolio-card";

interface FeaturedMasonryProps {
  projects: PortfolioProject[];
}

export function FeaturedMasonry({ projects }: FeaturedMasonryProps) {
  const t = useTranslations("common");

  if (projects.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-white/15 text-sm text-muted-foreground">
        {t("comingSoon")}
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <PortfolioCard key={project.id} project={project} />
      ))}
    </div>
  );
}
