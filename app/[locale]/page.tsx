import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { WhyMeStrip } from "@/components/sections/why-me-strip";
import { FeaturedMasonry } from "@/components/sections/featured-masonry";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ChannelBadges } from "@/components/sections/channel-badges";
import { getFeaturedPortfolios } from "@/lib/portfolio";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: `AIO에이전시 | ${t("headline")}`,
    description: t("subheadline"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = locale as "ko" | "en";
  const featuredProjects = await getFeaturedPortfolios();

  return (
    <>
      {/* ① 히어로 — 헤드라인 + 카테고리 선택 카드 */}
      <HeroSection locale={locale} />

      {/* ② Why Me — 핵심 수치 3종 */}
      <WhyMeStrip locale={locale} />

      {/* ③ 대표 포트폴리오 */}
      {featuredProjects.length > 0 && (
        <section id="portfolio" className="py-20 sm:py-24 lg:py-32">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
            <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-10 bg-primary" />
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                    Portfolio
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  {l === "ko" ? "납품 실적" : "Delivered Work"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {l === "ko"
                    ? "결과물을 먼저 확인하고 맡기세요."
                    : "Review actual results before hiring."}
                </p>
              </div>
              <Link
                href={`/${locale}/portfolio`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                {l === "ko" ? "전체 보기" : "View all"}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <FeaturedMasonry projects={featuredProjects} />
          </div>
        </section>
      )}

      {/* ④ 고객 후기 */}
      <TestimonialsSection limit={3} mixed />

      {/* ⑤ FAQ */}
      <FaqSection scope="general" limit={6} />

      {/* ⑥ 빠른 문의 CTA */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-white/8 bg-card p-7 sm:gap-8 sm:p-10 md:flex-row md:items-center md:justify-between lg:p-12">
            <div>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
                {l === "ko" ? "바로 시작할 준비가 됐나요?" : "Ready to start now?"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {l === "ko"
                  ? "1시간 내 임시 답변 · 24시간 내 견적 제안서"
                  : "First reply within 1 hour · quote proposal within 24 hours"}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/quote`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-80"
              >
                {l === "ko" ? "견적 문의" : "Get a quote"}
                <ArrowUpRight className="size-4" />
              </Link>
              <ChannelBadges />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
