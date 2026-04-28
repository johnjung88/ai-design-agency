"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { PricingTier } from "@/lib/services-data";

interface PricingTableProps {
  tiers: PricingTier[];
  /** Show toggle for event vs regular price. Default true. */
  showToggle?: boolean;
}

export function PricingTable({ tiers, showToggle = true }: PricingTableProps) {
  const [isEvent, setIsEvent] = useState(true);
  const locale = useLocale() as "ko" | "en";
  const t = useTranslations("pricing");

  return (
    <div className="space-y-6">
      {showToggle && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsEvent(true)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              isEvent
                ? "bg-primary text-primary-foreground"
                : "bg-white/8 text-muted-foreground hover:bg-white/12"
            }`}
          >
            {t("eventPrice")} (~5/31)
          </button>
          <button
            type="button"
            onClick={() => setIsEvent(false)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              !isEvent
                ? "bg-primary text-primary-foreground"
                : "bg-white/8 text-muted-foreground hover:bg-white/12"
            }`}
          >
            {t("regularPrice")}
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name[locale]}
            className={`relative flex flex-col gap-4 rounded-2xl border p-6 transition-colors ${
              tier.recommended
                ? "border-primary/40 bg-primary/8"
                : "border-white/8 bg-card"
            }`}
          >
            {tier.recommended && (
              <span className="absolute right-4 top-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                {t("recommended")}
              </span>
            )}

            <div>
              <h3 className="text-sm font-semibold text-foreground">{tier.name[locale]}</h3>
              <p className="mt-1 font-mono text-2xl font-bold text-primary">
                {isEvent ? tier.eventPrice : tier.regularPrice}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t("duration")}: {tier.duration}
              </p>
            </div>

            <ul className="flex flex-col gap-2">
              {tier.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {item[locale]}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
