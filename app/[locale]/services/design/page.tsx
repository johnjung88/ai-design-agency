import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { servicesData } from "@/lib/services-data";
import type { ServiceCategory } from "@/lib/services-data";
import { SubcategoryGrid } from "@/components/sections/subcategory-grid";

const DESIGN_IDS: ServiceCategory[] = ["logo-business-card", "detail-page", "ppt-design"];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aio-make.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";
  return {
    title: isKo ? "디자인 서비스 — AIO" : "Design Services — AIO",
    description: isKo
      ? "브랜드디자인, 상세페이지, PPT 등 시각적 결과물 전반을 담당합니다."
      : "Brand design, detail pages, and presentations — full visual output.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/services/design`,
      languages: { ko: `${SITE_URL}/ko/services/design`, en: `${SITE_URL}/en/services/design` },
    },
  };
}

export default async function DesignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale === "ko" ? "ko" : "en";
  const designServices = servicesData.filter((s) => DESIGN_IDS.includes(s.id));

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
              Design
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">
            {lang === "ko" ? "디자인" : "Design"}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            {lang === "ko"
              ? "로고, 브랜드 아이덴티티부터 상품 상세페이지, 제안서 디자인까지 시각적 결과물 전반을 담당합니다."
              : "From logo and brand identity to product detail pages and presentation design."}
          </p>
        </div>

        <SubcategoryGrid services={designServices} locale={locale} />
      </div>
    </main>
  );
}
