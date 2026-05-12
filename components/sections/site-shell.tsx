"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { MagazineHeader } from "@/components/magazine/magazine-header";
import { MagazineFooter } from "@/components/magazine/magazine-footer";
import { ConsultFooter } from "@/components/consultant/consult-footer";
import { LifestyleFooter } from "@/components/lifestyle/lifestyle-footer";
import { IdeFooter } from "@/components/ide/ide-footer";

/**
 * 톤 매핑:
 * - 매거진: /, /about, /quote
 * - IDE: /services/development (구 /services/website 유지)
 * - 라이프스타일: /services/design, /services/video, /services/detail-page(구)
 * - 컨설턴트: /services/business, /services/marketing, /services/ppt-design(구)
 */
function getTone(
  pathname: string
): "magazine" | "consultant" | "lifestyle" | "ide" | "default" {
  if (/^\/[a-z]{2}(\/(about|quote))?\/?$/.test(pathname)) return "magazine";
  if (/^\/[a-z]{2}\/services\/(development|website)(\/.*)?$/.test(pathname)) return "ide";
  if (/^\/[a-z]{2}\/services\/(design|video|detail-page)(\/.*)?$/.test(pathname)) return "lifestyle";
  if (/^\/[a-z]{2}\/services\/(business|marketing|ppt-design)(\/.*)?$/.test(pathname)) return "consultant";
  return "default";
}

export function SiteHeader() {
  const pathname = usePathname();
  const tone = getTone(pathname);
  // 컨설턴트·라이프스타일·IDE는 자체 Nav를 page.tsx에서 렌더 → SiteHeader 생략
  if (tone === "consultant" || tone === "lifestyle" || tone === "ide") return null;
  if (tone === "magazine") return <MagazineHeader />;
  return <Header />;
}

export function SiteFooter() {
  const pathname = usePathname();
  const tone = getTone(pathname);
  if (tone === "magazine") return <MagazineFooter />;
  if (tone === "consultant") return <ConsultFooter />;
  if (tone === "lifestyle") return <LifestyleFooter />;
  if (tone === "ide") return <IdeFooter />;
  return <Footer />;
}
