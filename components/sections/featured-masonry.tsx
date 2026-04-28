"use client";

import Masonry from "react-masonry-css";
import { useTranslations } from "next-intl";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { PortfolioCard } from "@/components/ui/portfolio-card";

interface FeaturedMasonryProps {
  projects: PortfolioProject[];
}

const breakpointCols = {
  default: 3,
  1024: 2,
  640: 1,
};

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
    <Masonry
      breakpointCols={breakpointCols}
      className="-ml-5 flex w-auto"
      columnClassName="pl-5"
    >
      {projects.map((project) => (
        <PortfolioCard key={project.id} project={project} className="mb-5" />
      ))}
    </Masonry>
  );
}
