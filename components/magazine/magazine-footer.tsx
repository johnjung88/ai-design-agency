"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Handshake, Mail, ShoppingBag } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";


const disciplines = [
  { label: "웹 개발", href: "/services/website", available: true },
  { label: "상세페이지", href: "/services/detail-page", available: true },
  { label: "PPT 디자인", href: "/services/ppt-design", available: true },
  { label: "자동화", href: null, available: false },
  { label: "앱 개발", href: null, available: false },
  { label: "영상", href: null, available: false },
  { label: "마케팅", href: null, available: false },
];

export function MagazineFooter() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const base = `/${locale}`;
  const isKo = locale === "ko";

  const channels = [
    {
      id: "soomgo",
      label: "숨고",
      href: `${base}/quote?source=soomgo`,
      icon: <Handshake className="size-3.5" />,
    },
    {
      id: "kmong",
      label: "크몽",
      href: `${base}/quote?source=kmong`,
      icon: <ShoppingBag className="size-3.5" />,
    },
    {
      id: "email",
      label: isKo ? "이메일" : "Email",
      href: "mailto:aiomake2023@gmail.com",
      icon: <Mail className="size-3.5" />,
    },
  ];

  return (
    <footer
      style={{
        background: "var(--tone-magazine-paper)",
        borderTop: "1px solid var(--tone-magazine-ink)",
        color: "var(--tone-magazine-ink-2)",
      }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12 py-16">
        {/* Top meta row */}
        <div
          className="flex flex-wrap items-center justify-center gap-[18px] pb-6 mb-12"
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: 11,
            color: "var(--tone-magazine-ink-3)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            borderBottom: "1px solid var(--tone-magazine-line-2)",
          }}
        >
          <span>Issue 2026 · May</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--tone-magazine-ink-3)" }} />
          <span style={{ fontFamily: "var(--font-marcellus)", letterSpacing: "0.4em", color: "var(--tone-magazine-ink)" }}>
            A&nbsp;·&nbsp;I&nbsp;·&nbsp;O&nbsp;&nbsp; S T U D I O
          </span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--tone-magazine-ink-3)" }} />
          <span>est 2024 · Korea</span>
        </div>

        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-sm">
            <BrandLogo variant="footer" />
            <p
              style={{
                fontFamily: "var(--font-pretendard)",
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--tone-magazine-ink-2)",
                fontWeight: 400,
                letterSpacing: "-0.005em",
              }}
            >
              {t("tagline")}
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {channels.map((c) => (
                <Link
                  key={c.id}
                  href={c.href}
                  className="inline-flex items-center gap-2 px-4 py-2 transition-all hover:-translate-y-0.5"
                  style={{
                    background: "transparent",
                    color: "var(--tone-magazine-ink)",
                    border: "1px solid var(--tone-magazine-ink-2)",
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    borderRadius: 2,
                  }}
                >
                  {c.icon}
                  {c.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 sm:grid-cols-3">
            {/* Services */}
            <div className="flex flex-col gap-3">
              <p
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "10.5px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--tone-magazine-ink-3)",
                }}
              >
                — {t("services")}
              </p>
              {disciplines.map((d) => {
                const linkStyle = {
                  fontFamily: "var(--font-pretendard)",
                  fontSize: 14.5,
                  fontWeight: 400,
                  letterSpacing: "-0.005em",
                  color: d.available
                    ? "var(--tone-magazine-ink)"
                    : "var(--tone-magazine-ink-faint)",
                };
                if (d.available && d.href) {
                  return (
                    <Link
                      key={d.label}
                      href={`${base}${d.href}`}
                      className="transition-colors hover:!text-[var(--tone-magazine-red)]"
                      style={linkStyle}
                    >
                      {d.label}
                    </Link>
                  );
                }
                return (
                  <span key={d.label} style={{ ...linkStyle, cursor: "default" }}>
                    {d.label}
                    <span
                      style={{
                        marginLeft: 6,
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: 9,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--tone-magazine-ink-faint)",
                      }}
                    >
                      soon
                    </span>
                  </span>
                );
              })}
            </div>

            {/* Company */}
            <div className="flex flex-col gap-3">
              <p
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "10.5px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--tone-magazine-ink-3)",
                }}
              >
                — {t("company")}
              </p>
              {[
                { label: locale === "ko" ? "회사 소개" : "About", href: `${base}/about` },
                { label: t("contact"), href: `${base}/quote` },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:!text-[var(--tone-magazine-red)]"
                  style={{
                    fontFamily: "var(--font-pretendard)",
                    fontSize: 14.5,
                    color: "var(--tone-magazine-ink)",
                    fontWeight: 400,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <p
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "10.5px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--tone-magazine-ink-3)",
                }}
              >
                — {t("contact")}
              </p>
              <Link
                href="mailto:aiomake2023@gmail.com"
                className="transition-colors hover:!text-[var(--tone-magazine-red)]"
                style={{
                  fontFamily: "var(--font-pretendard)",
                  fontSize: 15,
                  color: "var(--tone-magazine-ink)",
                }}
              >
                aiomake2023@gmail.com
              </Link>
            </div>
          </div>
        </div>

        {/* Business info bar */}
        <div
          className="mt-14 pt-6 text-center"
          style={{ borderTop: "1px solid var(--tone-magazine-line-2)" }}
        >
          <div
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "clamp(9.5px, 0.9vw, 10.5px)",
              letterSpacing: "0.18em",
              color: "var(--tone-magazine-ink-3)",
              lineHeight: 1.85,
            }}
          >
            <p>
              사업자명: 에이아이오 (AIO) &nbsp;|&nbsp; 사업자번호: 682-01-02748 &nbsp;|&nbsp; 통신판매업신고: 제 2026-경기김포-3656 호
            </p>
            <p>
              주소: 경기도 김포시 대곶면 흥신로67 &nbsp;|&nbsp; © {new Date().getFullYear()} AIO에이전시. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
