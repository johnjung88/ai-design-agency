"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === "ko" ? "en" : "ko";

  const toggle = () => {
    // pathname always starts with /ko/... or /en/... (localePrefix: "always")
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-7 w-14 items-center justify-center rounded-full border border-white/12 text-xs font-medium tracking-[0.1em] text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground focus-visible:outline-none"
      aria-label={`Switch to ${nextLocale === "ko" ? "Korean" : "English"}`}
    >
      {locale === "ko" ? "EN" : "KO"}
    </button>
  );
}
