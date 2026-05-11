import { LifestyleNav } from "@/components/lifestyle/lifestyle-nav";
import { LifestyleTabs } from "@/components/lifestyle/lifestyle-tabs";
import { LifestyleHero } from "@/components/lifestyle/lifestyle-hero";
import { LifestyleTrust } from "@/components/lifestyle/lifestyle-trust";
import { LifestyleCategories } from "@/components/lifestyle/lifestyle-categories";
import { LifestylePricing } from "@/components/lifestyle/lifestyle-pricing";
import { LifestyleCta } from "@/components/lifestyle/lifestyle-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return {
    title: "AIO · 상세페이지 — 스크롤 한 번에, 결제 버튼까지",
    description: "뷰티·식품·패션·리빙까지. 커머스 상세페이지를 전환율 중심으로. 1–3일 납품.",
  };
}

export default async function DetailPageService({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const tabs = [
    { num: "01", label: "서비스", href: `/${locale}/services/detail-page`, active: true },
    { num: "02", label: "포트폴리오", href: `/${locale}/services/detail-page/portfolio` },
    { num: "03", label: "꿀팁 자료", href: `/${locale}/services/detail-page/resources` },
  ];

  return (
    <main data-tone="lifestyle" style={{ background: "var(--tone-life-cream)", minHeight: "100vh" }}>
      <LifestyleNav locale={locale} />
      <LifestyleTabs tabs={tabs} />
      <LifestyleHero locale={locale} />
      <LifestyleTrust />
      <LifestyleCategories />
      <LifestylePricing locale={locale} />
      <LifestyleCta locale={locale} />
    </main>
  );
}
