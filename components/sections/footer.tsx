"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ChannelBadges } from "@/components/sections/channel-badges";
import { BrandLogo } from "@/components/ui/brand-logo";
import { serviceCategories } from "@/lib/services-data";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const base = `/${locale}`;

  return (
    <footer className="border-t border-white/8 py-12">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* 브랜드 */}
          <div className="flex flex-col gap-4">
            <div>
              <BrandLogo variant="footer" />
              <p className="mt-2 max-w-xs text-xs leading-6 text-muted-foreground">
                {t("tagline")}
              </p>
            </div>
            <ChannelBadges size="sm" />
          </div>

          {/* 링크 */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("services")}
              </p>
              {serviceCategories.map((service) => (
                <Link
                  key={service.value}
                  href={`${base}/services/${service.value}`}
                  className="text-xs text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  {service.label[locale as "ko" | "en"]}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("company")}
              </p>
              {[
                { label: t("about"), href: `${base}/about` },
                { label: t("portfolio"), href: `${base}/portfolio` },
                { label: t("pricing"), href: `${base}/pricing` },
                { label: t("contact"), href: `${base}/quote` },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("contact")}
              </p>
              <Link
                href="mailto:koreabencb@gmail.com"
                className="text-xs text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                koreabencb@gmail.com
              </Link>
            </div>
          </div>
        </div>

        {/* 사업자 정보 */}
        <div className="mt-10 border-t border-white/8 pt-6">
          <p className="text-xs leading-6 text-muted-foreground/50">
            사업자명: 에이아이오 (AIO) &nbsp;|&nbsp; 사업자번호: 682-01-02748 &nbsp;|&nbsp; 주소: 경기도 김포시 대곶면 흥신로67
            &nbsp;|&nbsp; © {new Date().getFullYear()} AIO에이전시. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
