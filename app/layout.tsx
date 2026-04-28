import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AIO에이전시 · 정재홍 | 5일 결과물 보장",
    template: "%s | AIO에이전시",
  },
  description:
    "최대 5일 결과물 보장. 협의 시 긴급 1일 가능. 합리적 가격에 속도 최우선. 웹사이트·앱·디자인·영상·자동화.",
  keywords: [
    "랜딩페이지 제작",
    "홈페이지 제작",
    "앱 개발 MVP",
    "상세페이지 제작",
    "로고 디자인",
    "마케팅 영상 제작",
    "업무 자동화",
    "5일 완성",
    "긴급 당일 작업",
    "가성비",
  ],
  authors: [{ name: "정재홍", url: "https://aio-agency.vercel.app" }],
  creator: "정재홍 (AIO에이전시)",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "AIO에이전시",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
