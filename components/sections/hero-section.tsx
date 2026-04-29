"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { GuaranteeBadge } from "@/components/ui/guarantee-badge";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const base = `/${locale}`;

  return (
    <section className="relative flex min-h-[590px] flex-col justify-between overflow-hidden md:min-h-[630px] lg:min-h-screen">
      <div className="pt-24" />

      <div className="mx-auto w-full max-w-[1400px] flex-1 px-6 lg:px-12">
        <div className="grid min-h-[410px] items-center gap-10 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:min-h-[560px] lg:py-12">

          <div>
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                {t("label")}
              </span>
              <GuaranteeBadge label={t("promiseBadge")} />
            </div>

            <div className="w-full">
              <h1 className="block w-full text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-5xl lg:text-8xl">
                {t("headline")}
              </h1>
              <p className="mt-4 block max-w-3xl text-2xl font-bold leading-tight text-foreground/50 sm:text-3xl md:text-3xl lg:text-6xl">
                {t("subheadline")}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10">
                <Link
                  href={`${base}/quote`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-80"
                >
                  {t("ctaSecondary")}
                  <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href={`${base}/portfolio`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 px-6 text-sm font-semibold text-foreground transition-colors hover:border-white/25 hover:bg-white/5"
                >
                  {t("ctaPrimary")}
                </Link>
            </div>
          </div>

          <div className="relative hidden min-h-[460px] items-center justify-center lg:flex">
            <div className="absolute inset-8 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative w-full max-w-[470px] rounded-lg border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
              <Image
                src="/brand/aio-logo.png"
                alt="AIO logo"
                width={900}
                height={900}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
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
