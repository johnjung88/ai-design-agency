import { getAllPortfolios } from "@/lib/portfolio";
import { PortfolioPageClient } from "@/components/sections/portfolio-page-client";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const projects = await getAllPortfolios();

  return <PortfolioPageClient projects={projects} locale={locale} />;
}
