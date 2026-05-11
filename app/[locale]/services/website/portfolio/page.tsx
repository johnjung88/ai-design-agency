import { IdeTitlebar } from "@/components/ide/ide-titlebar";
import { IdeTabbar } from "@/components/ide/ide-tabbar";
import { IdePortfolio } from "@/components/ide/ide-portfolio";
import { IdeStatusbar } from "@/components/ide/ide-statusbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return {
    title: "AIO · 웹 개발 포트폴리오 — 실제 운영 중인 사이트 56개",
    description: "병원·법률·쇼핑몰·교육까지. 전환율이 증명된 56개 사이트 포트폴리오.",
  };
}

export default async function WebsitePortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const tabs = [
    { num: "01", label: "services.tsx", href: `/${locale}/services/website` },
    { num: "02", label: "portfolio.tsx", href: `/${locale}/services/website/portfolio`, active: true },
    { num: "03", label: "resources.md", href: `/${locale}/services/website/resources` },
  ];

  return (
    <main data-tone="ide" style={{ background: "var(--tone-ide-bg)", minHeight: "100vh" }}>
      <IdeTitlebar locale={locale} />
      <IdeTabbar tabs={tabs} />
      <IdePortfolio locale={locale} />
      <IdeStatusbar locale={locale} />
    </main>
  );
}
