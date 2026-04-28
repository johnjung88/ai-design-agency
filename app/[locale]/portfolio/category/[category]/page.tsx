import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getProjectsByType } from "@/lib/portfolio-data";
import type { PortfolioType } from "@/lib/portfolio-data";
import { PortfolioCard } from "@/components/ui/portfolio-card";

const VALID_CATEGORIES: PortfolioType[] = ["web", "app", "design", "video", "automation"];

const categoryLabels: Record<PortfolioType, { ko: string; en: string }> = {
  web: { ko: "웹사이트", en: "Web" },
  app: { ko: "모바일 앱", en: "App" },
  design: { ko: "디자인", en: "Design" },
  video: { ko: "영상", en: "Video" },
  automation: { ko: "자동화", en: "Automation" },
};

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  if (!VALID_CATEGORIES.includes(category as PortfolioType)) return {};
  const label = categoryLabels[category as PortfolioType][locale as "ko" | "en"];
  return { title: `${label} 포트폴리오` };
}

export default async function CategoryPortfolioPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });

  if (!VALID_CATEGORIES.includes(category as PortfolioType)) {
    notFound();
  }

  const type = category as PortfolioType;
  const projects = getProjectsByType(type);
  const label = categoryLabels[type][locale as "ko" | "en"];

  return (
    <main className="pb-24 pt-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {t("sectionTitle")}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{label}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{projects.length}개 작업물</p>
        </div>

        {projects.length === 0 ? (
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-white/15 text-sm text-muted-foreground">
            {t("comingSoon")} — 5월부터 채워집니다
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
