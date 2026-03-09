"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const marqueeText =
  "브랜드 디자인 · 브랜드 소개서 · 웹사이트 제작 · 빠른 납기 · 고퀄리티 · ";

const STAGGER = 0.08;

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden">
      {/* 상단 헤더 여백 보정 */}
      <div className="pt-24" />

      {/* 메인 타이포그래피 */}
      <div className="mx-auto w-full max-w-[1400px] flex-1 px-6 lg:px-12">
        <div className="flex flex-col justify-center" style={{ minHeight: "calc(100vh - 220px)" }}>

          {/* 스몰 레이블 */}
          <FadeUp delay={0} className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Design Agency
            </span>
          </FadeUp>

          {/* 메인 타이틀 — 두 줄 left-align 일치 */}
          <div style={{ width: "100%" }}>
            <div className="overflow-hidden">
              <motion.h1
                className="block w-full font-bold leading-[0.92] tracking-[-0.03em] text-foreground"
                style={{
                  fontSize: "clamp(40px, 9.5vw, 152px)",
                }}
                initial={{ opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                브랜드를 만들고,
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                className="block w-full font-bold leading-[0.92] tracking-[-0.03em]"
                style={{
                  fontSize: "clamp(40px, 9.5vw, 152px)",
                }}
                initial={{ opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-foreground">가치를</span>
                <span className="text-foreground/45"> 설계합니다.</span>
              </motion.h1>
            </div>
          </div>

          {/* 하단 메타 영역 */}
          <FadeUp
            delay={0.4}
            className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              브랜드 디자인부터 웹사이트까지,
              <br />
              하나의 팀으로 빠르고 정교하게.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#services"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-80"
              >
                서비스 보기
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 px-6 text-sm font-semibold text-foreground transition-colors hover:border-white/25 hover:bg-white/5"
              >
                포트폴리오
              </a>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* 마퀴 배너 — 하단 고정 */}
      <div className="w-full overflow-hidden border-t border-white/8 py-4">
        <motion.div
          className="flex whitespace-nowrap text-sm font-medium uppercase tracking-[0.1em] text-muted-foreground"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mr-10">
              {marqueeText}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
