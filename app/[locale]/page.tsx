import { HeroSection } from "@/components/sections/hero-section";
import { KpiStrip } from "@/components/sections/kpi-strip";
import { FeaturedMasonry } from "@/components/sections/featured-masonry";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyUsSection } from "@/components/sections/why-us-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ChannelBadges } from "@/components/sections/channel-badges";
import { getFeaturedProjects } from "@/lib/portfolio-data";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: `AIO에이전시 · 정재홍 | ${t("headline")}`,
    description: t("subheadline"),
  };
}

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <HeroSection />
      <KpiStrip />

      {/* Featured portfolio */}
      <section id="portfolio" className="py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Portfolio
              </span>
            </div>
          </div>
          <FeaturedMasonry projects={featuredProjects} />
        </div>
      </section>

      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />

      {/* CTA + Channels */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="flex flex-col items-start gap-8 rounded-2xl border border-white/8 bg-card p-8 md:flex-row md:items-center md:justify-between lg:p-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                바로 시작할 준비가 됐나요?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                1시간 내 임시 답변 · 24시간 내 견적 제안서
              </p>
            </div>
            <ChannelBadges />
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
