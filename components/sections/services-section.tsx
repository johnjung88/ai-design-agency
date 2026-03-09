"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  accentLabel: string;
  accentClass: string;
  items: string[];
}

const services: ServiceCategory[] = [
  {
    id: "brand-design",
    title: "브랜드 디자인",
    description: "브랜드의 첫 인상을 완성하는 시각 아이덴티티 시스템을 구축합니다.",
    accentLabel: "BRAND",
    accentClass: "border-violet/45 bg-violet/10 text-violet",
    items: [
      "로고 디자인",
      "명함 / 봉투 / 서식류",
      "브랜드 가이드라인",
      "SNS 프로필 / 썸네일",
    ],
  },
  {
    id: "brand-book",
    title: "브랜드 소개서",
    description: "회사와 서비스의 가치를 설득력 있는 비주얼로 전달합니다.",
    accentLabel: "DECK",
    accentClass: "border-lime/45 bg-lime/10 text-lime",
    items: [
      "회사 소개서",
      "제품 / 서비스 소개서",
      "제안서 / IR 덱",
      "인포그래픽",
    ],
  },
  {
    id: "website",
    title: "웹사이트 제작",
    description: "브랜드 가치를 담은 반응형 웹사이트를 빠르고 정교하게 구현합니다.",
    accentLabel: "WEB",
    accentClass: "border-cyan/45 bg-cyan/10 text-cyan",
    items: [
      "상세 페이지",
      "브랜드 사이트",
      "포트폴리오 사이트",
      "반응형 최적화",
    ],
  },
];

function ServiceCard({ service }: { service: ServiceCategory }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-border/80 bg-card/70 transition-all duration-200 hover:border-primary/35 hover:bg-card hover:shadow-lg hover:shadow-primary/10">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-start justify-between gap-4 p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset"
        aria-expanded={open}
      >
        <div className="flex-1">
          <span
            className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${service.accentClass}`}
          >
            {service.accentLabel}
          </span>
          <h3 className="mt-3 text-xl font-semibold tracking-tight">{service.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.description}</p>
        </div>
        <ChevronDown
          className={`mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="grid grid-cols-2 gap-2 border-t border-border/60 px-6 py-4">
              {service.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary/60" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-primary">Services</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          필요한 디자인, 하나의 팀으로
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
