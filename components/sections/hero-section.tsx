"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { GuaranteeBadge } from "@/components/ui/guarantee-badge";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const base = `/${locale}`;

  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden">
      <div className="pt-24" />

      <div className="mx-auto w-full max-w-[1400px] flex-1 px-6 lg:px-12">
        <div className="flex flex-col justify-center" style={{ minHeight: "calc(100vh - 220px)" }}>

          {/* 레이블 + 보장 배지 */}
          <FadeUp delay={0} className="mb-8 flex flex-wrap items-center gap-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {t("label")}
            </span>
            <GuaranteeBadge label={t("promiseBadge")} />
          </FadeUp>

          {/* 메인 헤드라인 */}
          <div style={{ width: "100%" }}>
            <div className="overflow-hidden">
              <motion.h1
                className="block w-full font-bold leading-[0.92] tracking-[-0.03em] text-foreground"
                style={{ fontSize: "clamp(38px, 8.5vw, 136px)" }}
                initial={{ opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {t("headline")}
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.p
                className="block w-full font-bold leading-[1.1] tracking-[-0.02em] text-foreground/45"
                style={{ fontSize: "clamp(28px, 5.5vw, 88px)" }}
                initial={{ opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {t("subheadline")}
              </motion.p>
            </div>
          </div>

          {/* 하단 CTA */}
          <FadeUp
            delay={0.4}
            className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={`${base}/portfolio`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-80"
              >
                {t("ctaPrimary")}
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href={`${base}/contact`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 px-6 text-sm font-semibold text-foreground transition-colors hover:border-white/25 hover:bg-white/5"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* 마퀴 배너 */}
      <div className="w-full overflow-hidden border-t border-white/8 py-4">
        <motion.div
          className="flex whitespace-nowrap text-sm font-medium uppercase tracking-[0.1em] text-muted-foreground"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mr-10">
              {t("marquee")}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
