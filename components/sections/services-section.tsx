"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ServiceCategory {
  id: string;
  num: string;
  title: string;
  description: string;
  items: string[];
}

const services: ServiceCategory[] = [
  {
    id: "brand-design",
    num: "01",
    title: "브랜드 디자인",
    description: "로고부터 가이드라인까지, 브랜드의 시각적 정체성 전체를 설계합니다.",
    items: ["로고 디자인", "명함 / 봉투 / 서식류", "브랜드 가이드라인", "SNS 프로필 / 썸네일"],
  },
  {
    id: "brand-book",
    num: "02",
    title: "브랜드 소개서",
    description: "회사와 서비스의 가치를 설득력 있는 비주얼로 전달합니다.",
    items: ["회사 소개서", "제품 / 서비스 소개서", "제안서 / IR 덱", "인포그래픽"],
  },
  {
    id: "website",
    num: "03",
    title: "웹사이트 제작",
    description: "브랜드 가치를 담은 반응형 웹사이트를 빠르고 정교하게 구현합니다.",
    items: ["상세 페이지", "브랜드 사이트", "포트폴리오 사이트", "반응형 최적화"],
  },
];

export function ServicesSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">

        {/* 섹션 레이블 */}
        <div className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Services
            </span>
          </div>
          <span className="text-xs text-muted-foreground">(03)</span>
        </div>

        {/* 에디토리얼 리스트 */}
        <div className="divide-y divide-white/8 border-t border-white/8">
          {services.map((service) => (
            <div key={service.id}>
              <button
                type="button"
                onClick={() => setOpen(open === service.id ? null : service.id)}
                className="group flex w-full items-center gap-6 py-8 text-left focus-visible:outline-none lg:py-10"
              >
                {/* 번호 */}
                <span className="w-10 shrink-0 text-xs font-medium text-muted-foreground lg:w-14">
                  {service.num}
                </span>

                {/* 타이틀 — 에디토리얼 대형 */}
                <span
                  className="flex-1 font-bold tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary"
                  style={{ fontSize: "clamp(28px, 4vw, 64px)", lineHeight: 1.05 }}
                >
                  {service.title}
                </span>

                {/* 아이콘 */}
                <ArrowUpRight
                  className={`size-6 shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-primary ${
                    open === service.id ? "rotate-45 text-primary" : ""
                  }`}
                />
              </button>

              {/* 펼침 영역 */}
              <AnimatePresence initial={false}>
                {open === service.id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-6 pb-10 pl-16 lg:pl-20 lg:flex-row lg:items-start lg:gap-16">
                      <p className="w-full max-w-full text-base leading-8 text-muted-foreground lg:max-w-md">
                        {service.description}
                      </p>
                      <ul className="flex flex-col gap-y-3 sm:flex-wrap sm:flex-row sm:gap-x-8 sm:gap-y-3">
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-base text-foreground/70"
                          >
                            <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
