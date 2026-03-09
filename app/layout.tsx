import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D-AIO — 브랜드 디자인 대행사",
  description: "브랜드 디자인, 소개서, 웹사이트를 빠르고 정교하게 제작합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={geistSans.variable}>
        {children}
      </body>
    </html>
  );
}
