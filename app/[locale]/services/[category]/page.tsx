import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getServiceById } from "@/lib/services-data";
import type { ServiceCategory } from "@/lib/services-data";
import { TypeBadge } from "@/components/ui/type-badge";
import { GuaranteeBadge } from "@/components/ui/guarantee-badge";
import { PricingTable } from "@/components/sections/pricing-table";
import { AddonsTable } from "@/components/sections/addons-table";
import { getProjectsByType } from "@/lib/portfolio-data";
import { PortfolioCard } from "@/components/ui/portfolio-card";

const VALID: ServiceCategory[] = ["web", "app", "design", "video", "automation"];

export async function generateStaticParams() {
  return VALID.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const service = getServiceById(category as ServiceCategory);
  if (!service) return {};
  return { title: service.title[locale as "ko" | "en"] };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;

  if (!VALID.includes(category as ServiceCategory)) notFound();

  const service = getServiceById(category as ServiceCategory);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "common" });
  const l = locale as "ko" | "en";
  const base = `/${locale}`;

  const relatedProjects = getProjectsByType(category as ServiceCategory).slice(0, 3);

  return (
    <main className="pb-24 pt-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">

        <Link
          href={`${base}/services`}
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          {t("back")}
        </Link>

        {/* 헤더 */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <TypeBadge type={service.id} />
              <GuaranteeBadge />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {service.title[l]}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              {service.description[l]}
            </p>
          </div>
          <Link
            href={`${base}/contact`}
            className="inline-flex h-10 shrink-0 items-center rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-80"
          >
            {service.cta[l]}
          </Link>
        </div>

        {/* 제공 항목 */}
        <div className="mb-12">
          <h2 className="mb-5 text-sm font-semibold text-foreground">포함 항목</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.items.map((item) => (
              <div
                key={item.name[l]}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-card p-4"
              >
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name[l]}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.detail[l]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 가격표 */}
        <div className="mb-12">
          <h2 className="mb-5 text-sm font-semibold text-foreground">가격표</h2>
          <PricingTable tiers={service.pricing} />
        </div>

        {/* 추가 요금 */}
        {service.addons && service.addons.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-sm font-semibold text-foreground">추가 요금</h2>
            <AddonsTable addons={service.addons} />
          </div>
        )}

        {/* 프로세스 */}
        <div className="mb-12">
          <h2 className="mb-5 text-sm font-semibold text-foreground">진행 과정</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="flex flex-col gap-3 rounded-xl border border-white/8 bg-card p-5"
              >
                <span className="font-mono text-xs text-primary">{step.step}</span>
                <p className="text-sm font-semibold text-foreground">{step.title[l]}</p>
                <p className="text-xs leading-5 text-muted-foreground">{step.description[l]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 관련 포트폴리오 */}
        {relatedProjects.length > 0 && (
          <div>
            <h2 className="mb-5 text-sm font-semibold text-foreground">관련 포트폴리오</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
