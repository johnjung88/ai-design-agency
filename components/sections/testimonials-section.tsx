"use client";

import { useTranslations } from "next-intl";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">

        <div className="mb-16 flex items-center gap-3">
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {t("sectionTitle")}
          </span>
        </div>

        {/* 빈 상태 폴백 */}
        <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-card/30 px-8 text-center">
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">{t("empty")}</p>
        </div>
      </div>
    </section>
  );
}
