"use client";

import Link from "next/link";
import { ArrowUpRight, Clock, WalletCards } from "lucide-react";
import { useLocale } from "next-intl";
import { hotItems } from "@/lib/hot-items";
import { TypeBadge } from "@/components/ui/type-badge";

export function HotItemsSection() {
  const locale = useLocale() as "ko" | "en";
  const base = `/${locale}`;

  return (
    <section className="border-y border-white/8 bg-white/[0.02] py-10">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Hot Items
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {locale === "ko" ? "지금 가장 빠르게 받을 수 있는 작업" : "Fastest services available now"}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            {locale === "ko"
              ? "7개 판매 카테고리의 가격, 납기, 결과물 예시를 한 번에 확인하세요."
              : "See price, timeline, and proof across all 7 service categories."}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {hotItems.map((item) => (
            <Link
              key={item.id}
              href={`${base}${item.href}`}
              className="group flex min-h-[230px] flex-col rounded-lg border border-white/8 bg-card p-5 transition-colors hover:border-primary/50 hover:bg-white/[0.045]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <TypeBadge type={item.type} />
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{item.title[locale]}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                {item.description[locale]}
              </p>
              <div className="mt-5 grid gap-2 text-xs text-foreground/80">
                <span className="inline-flex items-center gap-2">
                  <WalletCards className="size-3.5 text-primary" />
                  {item.price[locale]}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-3.5 text-primary" />
                  {item.duration[locale]}
                </span>
              </div>
              <div className="mt-auto pt-5 text-xs font-medium text-primary">
                {item.proof[locale]}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
