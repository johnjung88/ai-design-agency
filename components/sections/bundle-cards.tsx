"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

interface Bundle {
  id: string;
  name: { ko: string; en: string };
  description: { ko: string; en: string };
  items: { ko: string; en: string }[];
  eventPrice: string;
  regularPrice: string;
  savings: string;
  featured?: boolean;
}

const BUNDLES: Bundle[] = [
  {
    id: "a",
    name: { ko: "런치 번들", en: "Launch Bundle" },
    description: { ko: "창업·MVP 론칭에 최적", en: "Perfect for startup launch" },
    items: [
      { ko: "랜딩페이지 (1P)", en: "Landing page (1P)" },
      { ko: "로고 디자인", en: "Logo design" },
      { ko: "명함 디자인", en: "Business card" },
    ],
    eventPrice: "₩60,000~",
    regularPrice: "₩400,000~",
    savings: "-25%",
  },
  {
    id: "b",
    name: { ko: "그로스 번들", en: "Growth Bundle" },
    description: { ko: "홈페이지 + 마케팅 콘텐츠", en: "Site + marketing content" },
    featured: true,
    items: [
      { ko: "홈페이지 기본 5P", en: "Site Basic (5 pages)" },
      { ko: "마케팅 영상 30초", en: "Marketing video 30s" },
      { ko: "카드뉴스 5장", en: "Card news ×5" },
      { ko: "SNS 프로필 세팅", en: "SNS profile setup" },
    ],
    eventPrice: "₩350,000~",
    regularPrice: "₩1,300,000~",
    savings: "-30%",
  },
  {
    id: "c",
    name: { ko: "풀 패키지", en: "Full Package" },
    description: { ko: "앱·웹·자동화 통합", en: "App + web + automation" },
    items: [
      { ko: "홈페이지 기본 5P", en: "Site Basic (5 pages)" },
      { ko: "앱 MVP 기본", en: "App MVP Basic" },
      { ko: "간단 자동화 1종", en: "Simple automation ×1" },
    ],
    eventPrice: "₩700,000~",
    regularPrice: "₩3,000,000~",
    savings: "-35%",
  },
];

export function BundleCards() {
  const locale = useLocale() as "ko" | "en";
  const base = `/${locale}`;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {BUNDLES.map((bundle) => (
        <div
          key={bundle.id}
          className={`relative flex flex-col gap-5 rounded-2xl border p-6 ${
            bundle.featured
              ? "border-primary/40 bg-primary/5"
              : "border-white/8 bg-card"
          }`}
        >
          {bundle.featured && (
            <span className="absolute right-4 top-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground">
              BEST
            </span>
          )}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Bundle {bundle.id.toUpperCase()}
            </p>
            <h3 className="mt-1 text-lg font-bold text-foreground">
              {bundle.name[locale]}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {bundle.description[locale]}
            </p>
          </div>

          <ul className="flex flex-col gap-2">
            {bundle.items.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Check className="size-3.5 shrink-0 text-primary" />
                {item[locale]}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-end justify-between border-t border-white/8 pt-4">
            <div>
              <p className="font-mono text-xl font-bold text-primary">{bundle.eventPrice}</p>
              <p className="text-xs text-muted-foreground line-through">{bundle.regularPrice}</p>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-400">
              {bundle.savings}
            </span>
          </div>

          <Link
            href={`${base}/quote`}
            className="inline-flex h-9 items-center justify-center rounded-full border border-white/12 text-xs font-semibold text-foreground transition-colors hover:border-white/25 hover:bg-white/5"
          >
            {locale === "ko" ? "견적 문의" : "Get a Quote"}
          </Link>
        </div>
      ))}
    </div>
  );
}
