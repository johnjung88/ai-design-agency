import { ConsultNav } from "@/components/consultant/consult-nav";
import { ConsultTabs } from "@/components/consultant/consult-tabs";
import { ConsultPortfolio } from "@/components/consultant/consult-portfolio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return {
    title: "AIO · PPT 포트폴리오 — 실제 발표에 쓰인 156개 덱",
    description: "IR·사업제안서·컨설팅 보고서까지. 의사결정자를 설득한 156개 PPT 포트폴리오.",
  };
}

export default async function PptPortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const tabs = [
    { num: "01", label: "서비스", href: `/${locale}/services/ppt-design` },
    { num: "02", label: "포트폴리오", href: `/${locale}/services/ppt-design/portfolio`, active: true },
    { num: "03", label: "꿀팁 자료", href: `/${locale}/services/ppt-design/resources` },
  ];

  return (
    <main data-tone="consultant" style={{ background: "var(--tone-consult-paper)", minHeight: "100vh" }}>
      <ConsultNav locale={locale} />
      <ConsultTabs tabs={tabs} />
      <ConsultPortfolio locale={locale} />
    </main>
  );
}
