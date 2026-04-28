"use client";

import { useTranslations } from "next-intl";
import type { PortfolioType } from "@/lib/portfolio-data";

type FilterValue = PortfolioType | "all";

interface PortfolioFilterProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
  counts?: Partial<Record<FilterValue, number>>;
}

const FILTERS: { key: FilterValue; icon: string }[] = [
  { key: "all", icon: "" },
  { key: "web", icon: "🌐" },
  { key: "app", icon: "📱" },
  { key: "design", icon: "🎨" },
  { key: "video", icon: "🎬" },
  { key: "automation", icon: "⚙️" },
];

export function PortfolioFilter({ active, onChange, counts = {} }: PortfolioFilterProps) {
  const t = useTranslations("portfolioTypes");

  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map(({ key, icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
            }`}
          >
            {icon && <span>{icon}</span>}
            {t(key)}
            {counts[key] !== undefined && (
              <span
                className={`rounded-full px-1.5 text-[10px] ${
                  isActive ? "bg-primary-foreground/20" : "bg-white/10"
                }`}
              >
                {counts[key]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
