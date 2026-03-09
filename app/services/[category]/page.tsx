import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

import { getServiceById, serviceCategories, type ServiceCategory } from "@/lib/services-data";
import { getPortfolioProjectBySlug } from "@/lib/portfolio-data";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return serviceCategories.map((s) => ({ category: s.value }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const service = getServiceById(category as ServiceCategory);
  if (!service) return {};
  return {
    title: `${service.title} — D-AIO`,
    description: service.description,
  };
}

const KAKAO_URL = "https://open.kakao.com/o/s0000000"; // TODO: 실제 오픈채팅 URL로 교체

export default async function ServiceCategoryPage({ params }: Props) {
  const { category } = await params;
  const service = getServiceById(category as ServiceCategory);
  if (!service) notFound();

  const relatedProjects = service.relatedPortfolio
    .map(getPortfolioProjectBySlug)
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/8 pb-20 pt-32">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <Link
            href="/#services"
            className="mb-12 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            서비스 목록
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {service.subtitle}
            </span>
          </div>

          <h1
            className="font-bold leading-[0.92] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(40px, 8vw, 120px)" }}
          >
            {service.title}
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground">
            {service.description}
          </p>

          <div className="mt-10">
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-80"
            >
              <MessageCircle className="size-4" />
              {service.cta}
            </a>
          </div>
        </div>
      </section>

      {/* 세부 서비스 */}
      <section className="py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              What We Do
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {service.items.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-white/8 bg-white/[0.02] p-8"
              >
                <span className="mb-4 block text-2xl text-primary">{item.icon}</span>
                <h3 className="mb-3 text-lg font-bold text-foreground">{item.name}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 작업 프로세스 */}
      <section className="border-t border-white/8 py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Process
            </span>
          </div>

          <div className="grid grid-cols-1 gap-0 divide-y divide-white/8 border-t border-white/8">
            {service.process.map((step) => (
              <div key={step.step} className="flex items-start gap-8 py-8">
                <span className="w-10 shrink-0 text-xs font-medium text-muted-foreground">
                  {step.step}
                </span>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 관련 포트폴리오 */}
      {relatedProjects.length > 0 && (
        <section className="border-t border-white/8 py-24">
          <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
            <div className="mb-12 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  Related Work
                </span>
              </div>
              <Link
                href="/#portfolio"
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                전체 보기 <ArrowUpRight className="size-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {relatedProjects.map((project) => project && (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-white/8 bg-[#111] p-8 transition-colors hover:border-white/16"
                  style={{ minHeight: "200px" }}
                >
                  <span className="mb-4 block rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-medium text-white/60 w-fit">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.summary}</p>
                  <ArrowUpRight className="absolute right-6 top-6 size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-white/8 py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12 text-center">
          <h2
            className="font-bold tracking-[-0.02em] text-foreground"
            style={{ fontSize: "clamp(32px, 4vw, 64px)" }}
          >
            프로젝트를 시작할 준비가 됐나요?
          </h2>
          <p className="mt-6 text-base text-muted-foreground">
            카카오톡으로 문의하시면 24시간 내 답변드립니다.
          </p>
          <div className="mt-10">
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-80"
            >
              <MessageCircle className="size-5" />
              카카오톡 상담하기
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
