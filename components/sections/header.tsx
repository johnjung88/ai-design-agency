"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { NavDropdown, MobileNavAccordion } from "@/components/ui/nav-dropdown";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function Header() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base = `/${locale}`;

  const serviceItems = [
    { label: t("servicesWeb"), href: `${base}/services/web`, description: "랜딩·홈페이지·CMS" },
    { label: t("servicesApp"), href: `${base}/services/app`, description: "React Native MVP" },
    { label: t("servicesDesign"), href: `${base}/services/design`, description: "로고·명함·PPT·상세" },
    { label: t("servicesVideo"), href: `${base}/services/video`, description: "마케팅·쇼츠·Remotion" },
    { label: t("servicesAutomation"), href: `${base}/services/automation`, description: "블로그·SNS·n8n" },
  ];

  const portfolioItems = [
    { label: t("portfolioAll"), href: `${base}/portfolio` },
    { label: t("portfolioWeb"), href: `${base}/portfolio/category/web` },
    { label: t("portfolioApp"), href: `${base}/portfolio/category/app` },
    { label: t("portfolioDesign"), href: `${base}/portfolio/category/design` },
    { label: t("portfolioVideo"), href: `${base}/portfolio/category/video` },
    { label: t("portfolioAutomation"), href: `${base}/portfolio/category/automation` },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "border-b border-white/8 bg-[#0a0a0a]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-6 lg:px-12">
        {/* 로고 */}
        <Link
          href={base}
          className="flex items-center gap-2 transition-opacity hover:opacity-80 focus-visible:outline-none"
          aria-label="AIO에이전시 홈"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#a3e635"/>
            <text x="10" y="14" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0a0a0a" fontFamily="system-ui">A</text>
          </svg>
          <span className="text-sm font-bold tracking-[0.12em] text-foreground">AIO</span>
        </Link>

        {/* 데스크톱 네비 */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavDropdown label={t("services")} items={serviceItems} />
          <NavDropdown label={t("portfolio")} items={portfolioItems} />
          <Link
            href={`${base}/pricing`}
            className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none"
          >
            {t("pricing")}
          </Link>
          <Link
            href={`${base}/about`}
            className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none"
          >
            {t("about")}
          </Link>
        </nav>

        {/* 우측 액션 */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link
            href={`${base}/contact`}
            className="inline-flex h-9 items-center rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-80"
          >
            {t("contact")}
          </Link>
        </div>

        {/* 모바일 토글 */}
        <button
          type="button"
          aria-label="메뉴"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-full border border-white/10 text-foreground/80 transition-colors hover:border-white/20 md:hidden"
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="border-t border-white/8 bg-[#0a0a0a]/95 px-6 py-6 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2">
            <MobileNavAccordion
              label={t("services")}
              items={serviceItems}
              onClose={() => setMobileOpen(false)}
            />
            <MobileNavAccordion
              label={t("portfolio")}
              items={portfolioItems}
              onClose={() => setMobileOpen(false)}
            />
            {[
              { label: t("pricing"), href: `${base}/pricing` },
              { label: t("about"), href: `${base}/about` },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex items-center gap-3">
              <LanguageSwitcher />
              <Link
                href={`${base}/contact`}
                className="flex-1 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {t("contact")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
