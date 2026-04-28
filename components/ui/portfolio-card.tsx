"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLocale } from "next-intl";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { TypeBadge } from "@/components/ui/type-badge";
import type { ServiceCategory } from "@/lib/services-data";

interface PortfolioCardProps {
  project: PortfolioProject;
  className?: string;
}

export function PortfolioCard({ project, className = "" }: PortfolioCardProps) {
  const locale = useLocale() as "ko" | "en";
  const isExternal = project.mediaPolicy === "external-link";
  const href = isExternal ? (project.links.live ?? project.links.case) : project.links.case;
  const target = isExternal ? "_blank" : undefined;
  const rel = isExternal ? "noreferrer" : undefined;

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-card transition-all duration-300 hover:border-white/16 hover:shadow-xl ${className}`}
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
        {project.cover && project.cover !== "/portfolio/placeholder.webp" ? (
          <Image
            src={project.cover}
            alt={project.title[locale]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl opacity-20">
              {project.type === "web" ? "🌐" : project.type === "app" ? "📱" : project.type === "design" ? "🎨" : project.type === "video" ? "🎬" : "⚙️"}
            </span>
          </div>
        )}

        {/* External link icon overlay */}
        {isExternal && (
          <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
            <ExternalLink className="size-3.5 text-white/80" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <TypeBadge type={project.type as ServiceCategory} />
          <span className="text-xs text-muted-foreground">{project.duration}</span>
        </div>

        <div>
          <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
            {project.title[locale]}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
            {project.summary[locale]}
          </p>
        </div>

        {/* Stack tags */}
        <div className="mt-auto flex flex-wrap gap-1">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-4 right-4 flex h-7 w-7 translate-y-1 items-center justify-center rounded-full bg-primary opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="size-3.5 text-primary-foreground" />
      </div>
    </Link>
  );
}
