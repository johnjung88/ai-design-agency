"use client";

import { motion } from "framer-motion";

interface ProcessStep {
  title: string;
  desc: string;
  duration: string;
}

const processSteps: ProcessStep[] = [
  {
    title: "브랜드 진단",
    desc: "목표, 타깃, 현재 자산을 분석해 실행 우선순위를 정의합니다.",
    duration: "Day 1",
  },
  {
    title: "전략 설계",
    desc: "메시지 구조와 시각 방향성을 합의 가능한 문서로 정리합니다.",
    duration: "Day 2",
  },
  {
    title: "시안 제작",
    desc: "AI 워크플로우로 빠르게 다수 시안을 생성하고 품질을 선별합니다.",
    duration: "Day 3-4",
  },
  {
    title: "고도화",
    desc: "피드백을 반영해 디자인 시스템/컴포넌트 단위로 완성도를 높입니다.",
    duration: "Day 5-6",
  },
  {
    title: "런칭/운영",
    desc: "웹 반영과 운영 가이드를 함께 전달해 즉시 실행 가능 상태로 전환합니다.",
    duration: "Day 7+",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-cyan">Process</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          5단계 제작 프로세스
        </h2>

        <div className="relative mt-10 space-y-6">
          <div aria-hidden className="absolute bottom-0 left-4 top-0 w-px bg-border/80 sm:left-1/2" />

          {processSteps.map((step, index) => (
            <motion.article
              key={step.title}
              className="relative sm:grid sm:grid-cols-2 sm:gap-10"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
            >
              <span className="absolute left-4 top-6 size-3 -translate-x-1/2 rounded-full border border-accent/60 bg-background ring-4 ring-accent/15 sm:left-1/2" />

              <div className={index % 2 === 0 ? "sm:col-start-1" : "sm:col-start-2"}>
                <div className="rounded-2xl border border-border/80 bg-card/70 p-6 transition-colors hover:bg-card">
                  <p className="text-xs font-medium text-accent/90">{step.duration}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
