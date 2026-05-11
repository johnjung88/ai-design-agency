import { IdeTitlebar } from "@/components/ide/ide-titlebar";
import { IdeTabbar } from "@/components/ide/ide-tabbar";
import { IdeHero } from "@/components/ide/ide-hero";
import { IdeIndustries } from "@/components/ide/ide-industries";
import { IdePricing } from "@/components/ide/ide-pricing";
import { IdeCta } from "@/components/ide/ide-cta";
import { IdeStatusbar } from "@/components/ide/ide-statusbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return {
    title: "AIO · 웹 개발 — 5일 후, 결과물을 받습니다",
    description: "병원·법률·쇼핑몰까지. 업종별 전문 사이트를 운영 가능한 수준으로. 5일 납품.",
  };
}

export default async function WebsiteServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const tabs = [
    { num: "01", label: "services.tsx", href: `/${locale}/services/website`, active: true },
    { num: "02", label: "portfolio.tsx", href: `/${locale}/services/website/portfolio` },
    { num: "03", label: "resources.md", href: `/${locale}/services/website/resources` },
  ];

  return (
    <main data-tone="ide" style={{ background: "var(--tone-ide-bg)", minHeight: "100vh" }}>
      <IdeTitlebar locale={locale} />
      <IdeTabbar tabs={tabs} />
      <IdeHero locale={locale} />
      <IdeIndustries />
      <IdePricing locale={locale} />
      <IdeCta locale={locale} />
      <IdeStatusbar locale={locale} />
    </main>
  );
}
