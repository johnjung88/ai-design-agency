import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";

import { getPortfolioProjectBySlug, portfolioProjects } from "@/lib/portfolio-data";

const slugSchema = z.object({
  slug: z.string().min(1),
});

interface PortfolioDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const parsed = slugSchema.safeParse(await params);

  if (!parsed.success) {
    notFound();
  }

  const project = getPortfolioProjectBySlug(parsed.data.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-16 pt-28">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/#portfolio"
          className="text-sm text-accent transition-colors hover:text-accent/80 focus-visible:text-accent/80 focus-visible:outline-none"
        >
          ← 포트폴리오로 돌아가기
        </Link>

        <section className="mt-6 rounded-2xl border border-border/80 bg-card/70 p-6 sm:p-8">
          <p className="text-xs font-medium tracking-[0.14em] text-primary">{project.category.toUpperCase()}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs text-foreground/85"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-border/80 bg-card/70 p-5">
            <p className="text-sm font-medium text-violet">Challenge</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.challenge}</p>
          </article>
          <article className="rounded-2xl border border-border/80 bg-card/70 p-5">
            <p className="text-sm font-medium text-accent">Solution</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.solution}</p>
          </article>
          <article className="rounded-2xl border border-border/80 bg-card/70 p-5">
            <p className="text-sm font-medium text-primary">Impact</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.impact}</p>
          </article>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold tracking-tight">Before / After</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="overflow-hidden rounded-2xl border border-border/80 bg-card/70">
              <div className="h-56 bg-gradient-to-br from-muted via-background to-card" />
              <div className="p-5">
                <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground/80">BEFORE</p>
                <p className="mt-2 text-sm text-foreground/80">{project.beforeLabel}</p>
              </div>
            </article>
            <article className="overflow-hidden rounded-2xl border border-border/80 bg-card/70">
              <div className={`h-56 bg-gradient-to-br ${project.gradient}`} />
              <div className="p-5">
                <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground/80">AFTER</p>
                <p className="mt-2 text-sm text-foreground/80">{project.afterLabel}</p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
