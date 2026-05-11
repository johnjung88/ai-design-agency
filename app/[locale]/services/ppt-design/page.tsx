import { ConsultNav } from "@/components/consultant/consult-nav";
import { ConsultTabs } from "@/components/consultant/consult-tabs";
import { ConsultHero } from "@/components/consultant/consult-hero";
import { ConsultTrust } from "@/components/consultant/consult-trust";
import { ConsultTypes } from "@/components/consultant/consult-types";
import { ConsultPricing } from "@/components/consultant/consult-pricing";
import { ConsultCta } from "@/components/consultant/consult-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return {
    title: "AIO · PPT 디자인 — 한 장이 결정짓는 발표",
    description: "IR 덱·사업 제안서·컨설팅 보고서까지. 의사결정자를 설득하는 슬라이드 한 세트. 1–5일 납품.",
  };
}

export default async function PptDesignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const tabs = [
    { num: "01", label: "서비스", href: `/${locale}/services/ppt-design`, active: true },
    { num: "02", label: "포트폴리오", href: `/${locale}/services/ppt-design/portfolio` },
    { num: "03", label: "꿀팁 자료", href: `/${locale}/services/ppt-design/resources` },
  ];

  return (
    <main data-tone="consultant" style={{ background: "var(--tone-consult-paper)", minHeight: "100vh" }}>
      <ConsultNav locale={locale} />
      <ConsultTabs tabs={tabs} />
      <ConsultHero locale={locale} />
      <ConsultTrust />
      <ConsultTypes />
      <ConsultPricing locale={locale} />
      <ConsultCta locale={locale} />
    </main>
  );
}
