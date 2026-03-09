"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavDropdown, MobileNavAccordion } from "@/components/ui/nav-dropdown";

const serviceItems = [
  { label: "브랜드 디자인", href: "/services/brand-design", description: "로고·가이드라인·시각 정체성" },
  { label: "브랜드 소개서", href: "/services/brand-book", description: "회사소개서·IR덱·인포그래픽" },
  { label: "웹사이트 제작", href: "/services/website", description: "반응형 브랜드·포트폴리오 사이트" },
];

const portfolioItems = [
  { label: "브랜드 디자인", href: "/portfolio/category/brand-design" },
  { label: "브랜드 소개서", href: "/portfolio/category/brand-book" },
  { label: "웹사이트", href: "/portfolio/category/website" },
];

const simpleNavItems = [{ label: "FAQ", href: "#faq" }];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80 focus-visible:outline-none"
          aria-label="D-AIO 홈"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#a3e635"/>
          </svg>
          <span className="text-sm font-bold tracking-[0.12em] text-foreground">D-AIO</span>
        </Link>

        {/* 데스크톱 네비 */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavDropdown label="서비스" items={serviceItems} />
          <NavDropdown label="포트폴리오" items={portfolioItems} />
          {simpleNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#faq"
            className="inline-flex h-9 items-center rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-80"
          >
            프로젝트 시작하기
          </a>
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
              label="서비스"
              items={serviceItems}
              onClose={() => setMobileOpen(false)}
            />
            <MobileNavAccordion
              label="포트폴리오"
              items={portfolioItems}
              onClose={() => setMobileOpen(false)}
            />
            {simpleNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="#faq"
              className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              프로젝트 시작하기
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
