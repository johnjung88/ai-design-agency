"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

const stats: StatItem[] = [
  { label: "완료 프로젝트", value: 180, suffix: "+" },
  { label: "누적 고객사", value: 74, suffix: "+" },
  { label: "고객 만족도", value: 98, suffix: "%" },
  { label: "평균 납기", value: 9, suffix: "일" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isInView, motionValue, value]);

  return (
    <p ref={ref} className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </p>
  );
}

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-violet">Why Us</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          숫자로 증명되는 실행력
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-border/80 bg-card/70 p-6 transition-all duration-200 hover:border-violet/40 hover:bg-card hover:shadow-lg hover:shadow-violet/10"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
