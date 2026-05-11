import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { servicesData } from "@/lib/services-data";
import type { ServiceCategory } from "@/lib/services-data";
import { SubcategoryGrid } from "@/components/sections/subcategory-grid";

const DEV_IDS: ServiceCategory[] = ["shopping-mall", "website", "automation-app"];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aio-make.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";
  return {
    title: isKo ? "개발 서비스 — AIO" : "Development Services — AIO",
    description: isKo
      ? "쇼핑몰, 웹사이트, 자동화 앱까지 코드로 구현하는 모든 것."
      : "Shopping malls, websites, and automation apps — all in code.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/services/development`,
      languages: {
        ko: `${SITE_URL}/ko/services/development`,
        en: `${SITE_URL}/en/services/development`,
      },
    },
  };
}

export default async function DevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale === "ko" ? "ko" : "en";
  const devServices = servicesData.filter((s) => DEV_IDS.includes(s.id));

  return (
    <main className="pb-24 pt-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <Link
          href={`/${locale}#services`}
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {lang === "ko" ? "서비스 목록으로" : "All services"}
        </Link>

        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Development
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            {lang === "ko" ? "개발" : "Development"}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            {lang === "ko"
              ? "쇼핑몰, 랜딩페이지, 회사 홈페이지, 자동화 앱까지 코드로 구현하는 모든 것."
              : "Shopping malls, landing pages, company sites, and automation apps — all in code."}
          </p>
        </div>

        <SubcategoryGrid services={devServices} locale={locale} />
      </div>
    </main>
  );
}
