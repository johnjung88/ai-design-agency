"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";

const marqueeItems = [
  "브랜드 디자인",
  "브랜드 소개서",
  "웹사이트 제작",
  "빠른 납기",
  "고퀄리티",
];

const marqueeText = marqueeItems.map((item) => `${item} ·`).join("  ") + "  ";

// ── 3D 틸트 카드 ──
interface CategoryCardProps {
  title: string;
  description: string;
  accentColor: string;
  href: string;
  index: number;
}

function CategoryCard({ title, description, accentColor, href, index }: CategoryCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={href}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.4, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 800,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col gap-3 rounded-2xl border border-border/80 bg-card/70 p-6 transition-shadow duration-200 hover:border-primary/35 hover:bg-card hover:shadow-xl hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 60% 30%, ${accentColor}22 0%, transparent 70%)`,
        }}
      />
      <span
        className="inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold"
        style={{ background: `${accentColor}20`, color: accentColor }}
      >
        {["01", "02", "03"][index]}
      </span>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
        자세히 보기 <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </motion.a>
  );
}

const categories: Omit<CategoryCardProps, "index">[] = [
  {
    title: "브랜드 디자인",
    description: "로고부터 브랜드 가이드라인까지, 브랜드의 첫 인상을 완성합니다.",
    accentColor: "#a78bfa",
    href: "#services",
  },
  {
    title: "브랜드 소개서",
    description: "회사 소개서, 제안서, IR 덱 — 설득력 있는 비주얼로 메시지를 전달합니다.",
    accentColor: "#34d399",
    href: "#services",
  },
  {
    title: "웹사이트 제작",
    description: "브랜드 사이트부터 상세 페이지까지, 반응형으로 빠르게 구축합니다.",
    accentColor: "#60a5fa",
    href: "#services",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      {/* 배경 블러 orbs */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.6, 0.35], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="absolute left-[-15%] top-[-25%] h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute right-[-12%] top-[-10%] h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[40%] h-96 w-96 rounded-full bg-violet/20 blur-3xl" />
      </motion.div>

      {/* 타이틀 영역 */}
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="max-w-3xl text-3xl leading-tight font-semibold tracking-tight sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          브랜드를 만들고
          <br />
          경험을 설계합니다.
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
        >
          브랜드 디자인부터 웹사이트까지, 하나의 팀으로 빠르고 정교하게.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35, ease: "easeOut" }}
        >
          <Button className="h-11 rounded-full px-6 text-sm font-semibold">
            무료 전략 미팅
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-full border-border/80 bg-card/70 px-6 text-sm font-semibold text-foreground hover:bg-card focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            포트폴리오 보기
          </Button>
        </motion.div>
      </div>

      {/* 마퀴 */}
      <div className="relative mt-14 overflow-hidden border-y border-border/50 bg-muted/20 py-3.5">
        <motion.div
          className="flex whitespace-nowrap text-sm font-medium text-muted-foreground"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {/* 2번 반복해야 이음새 없는 루프 */}
          <span className="mr-8">{marqueeText.repeat(4)}</span>
          <span className="mr-8">{marqueeText.repeat(4)}</span>
        </motion.div>
      </div>

      {/* 3D 카테고리 카드 */}
      <div className="relative mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} {...cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
