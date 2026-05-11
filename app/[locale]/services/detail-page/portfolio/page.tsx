import { LifestyleNav } from "@/components/lifestyle/lifestyle-nav";
import { LifestyleTabs } from "@/components/lifestyle/lifestyle-tabs";
import { LifestylePortfolio } from "@/components/lifestyle/lifestyle-portfolio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return {
    title: "AIO · 상세페이지 포트폴리오 — 실제 매출이 일어난 89개",
    description: "뷰티·식품·패션·리빙까지. 전환율이 증명된 89개 상세페이지 포트폴리오.",
  };
}

export default async function DetailPagePortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const tabs = [
    { num: "01", label: "서비스", href: `/${locale}/services/detail-page` },
    { num: "02", label: "포트폴리오", href: `/${locale}/services/detail-page/portfolio`, active: true },
    { num: "03", label: "꿀팁 자료", href: `/${locale}/services/detail-page/resources` },
  ];

  return (
    <main data-tone="lifestyle" style={{ background: "var(--tone-life-cream)", minHeight: "100vh" }}>
      <LifestyleNav locale={locale} />
      <LifestyleTabs tabs={tabs} />
      <LifestylePortfolio locale={locale} />
    </main>
  );
}
