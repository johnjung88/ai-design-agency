import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowLeft, Github } from "lucide-react";
import type { Metadata } from "next";
import { getPortfolioProjectBySlug, portfolioProjects } from "@/lib/portfolio-data";
import { TypeBadge } from "@/components/ui/type-badge";
import { GuaranteeBadge } from "@/components/ui/guarantee-badge";
import type { ServiceCategory } from "@/lib/services-data";

export async function generateStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getPortfolioProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title[locale as "ko" | "en"] };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  const project = getPortfolioProjectBySlug(slug);
  if (!project) notFound();

  const l = locale as "ko" | "en";
  const base = `/${locale}`;

  return (
    <main className="pb-24 pt-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">

        {/* 뒤로가기 */}
        <Link
          href={`${base}/portfolio`}
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          {t("back")}
        </Link>

        {/* 커버 */}
        {project.cover && project.cover !== "/portfolio/placeholder.webp" && (
          <div className="relative mb-10 aspect-[16/7] w-full overflow-hidden rounded-2xl bg-secondary">
            <Image
              src={project.cover}
              alt={project.title[l]}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1400px) 100vw"
            />
          </div>
        )}

        {/* 헤더 */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <TypeBadge type={project.type as ServiceCategory} />
              <GuaranteeBadge />
              <span className="text-xs text-muted-foreground">{project.duration}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {project.title[l]}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              {project.summary[l]}
            </p>
          </div>

          {/* 링크 */}
          <div className="flex shrink-0 flex-wrap gap-3">
            {project.links.live && (
              <Link
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-80"
              >
                <ExternalLink className="size-3.5" />
                {t("liveLink")}
              </Link>
            )}
            {project.links.github && (
              <Link
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 px-5 text-xs font-semibold text-foreground transition-colors hover:border-white/25"
              >
                <Github className="size-3.5" />
                GitHub
              </Link>
            )}
          </div>
        </div>

        {/* 본문 — Problem · Solution · Impact */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {[
            { label: "Problem", text: project.problem[l] },
            { label: "Solution", text: project.solution[l] },
            { label: "Impact", text: project.impact[l] },
          ].map(({ label, text }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/8 bg-card p-6"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                {label}
              </p>
              <p className="text-sm leading-7 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        {/* KPI 카드 */}
        {project.kpis && project.kpis.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-sm font-semibold text-foreground">Key Metrics</h2>
            <div className="flex flex-wrap gap-4">
              {project.kpis.map((kpi, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 rounded-xl border border-white/8 bg-card px-6 py-4 text-center"
                >
                  <span className="font-mono text-3xl font-bold text-primary">
                    {kpi.value}
                    {kpi.unit && <span className="ml-0.5 text-lg">{kpi.unit}</span>}
                  </span>
                  <span className="text-xs text-muted-foreground">{kpi.label[l]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 스택 */}
        <div className="mb-12">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 갤러리 */}
        {project.gallery.length > 0 && (
          <div>
            <h2 className="mb-4 text-sm font-semibold text-foreground">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[16/10] overflow-hidden rounded-xl bg-secondary"
                >
                  <Image
                    src={src}
                    alt={`${project.title[l]} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
