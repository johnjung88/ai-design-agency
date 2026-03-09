"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems: { label: string; href: string }[] = [
  { label: "서비스", href: "#services" },
  { label: "포트폴리오", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border/80 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="#"
          className="flex items-center gap-2 text-sm font-semibold tracking-[0.14em] transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
        >
          <span className="size-2 rounded-full bg-primary shadow-md shadow-primary/60" />
          D-AIO
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button className="h-10 rounded-full px-5 text-sm font-semibold">프로젝트 시작하기</Button>
        </div>

        <button
          type="button"
          aria-label="모바일 메뉴"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border/80 bg-card/70 text-foreground/90 transition-colors hover:bg-card focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none md:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border/80 bg-card/95 px-4 py-5 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:bg-muted/60 focus-visible:text-foreground focus-visible:outline-none"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button className="mt-2 h-10 rounded-full text-sm font-semibold">프로젝트 시작하기</Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
