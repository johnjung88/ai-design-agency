"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Plan {
  name: "Basic" | "Pro" | "Enterprise";
  price: string;
  desc: string;
  features: string[];
  highlight?: boolean;
}

type ServiceTab = "branding" | "web" | "motion";

const plansByTab: Record<ServiceTab, Plan[]> = {
  branding: [
    {
      name: "Basic",
      price: "₩1,900,000",
      desc: "브랜드 시작 패키지",
      features: ["브랜드 무드보드", "로고 2안", "컬러/타이포 가이드"],
    },
    {
      name: "Pro",
      price: "₩4,500,000",
      desc: "핵심 런칭 패키지",
      features: ["로고 4안", "브랜드 톤앤매너 문서", "핵심 소셜 템플릿 10종"],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "맞춤 견적",
      desc: "전사 디자인 시스템",
      features: ["브랜드 시스템 구축", "팀 온보딩 세션", "운영 가이드라인"],
    },
  ],
  web: [
    {
      name: "Basic",
      price: "₩2,900,000",
      desc: "단일 랜딩 페이지",
      features: ["기획/디자인", "반응형 구현", "기본 SEO 세팅"],
    },
    {
      name: "Pro",
      price: "₩7,500,000",
      desc: "전환 중심 사이트",
      features: ["페이지 5개 내외", "컴포넌트 시스템", "퍼널 최적화 구조"],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "맞춤 견적",
      desc: "대규모 서비스 구축",
      features: ["다국어/권한 구조", "운영 자동화", "유지보수 SLA 옵션"],
    },
  ],
  motion: [
    {
      name: "Basic",
      price: "₩1,500,000",
      desc: "캠페인 모션 세트",
      features: ["15초 모션 3종", "기본 자막 스타일", "썸네일 3종"],
    },
    {
      name: "Pro",
      price: "₩3,800,000",
      desc: "숏폼 운영 패키지",
      features: ["15초 모션 10종", "플랫폼별 비율 대응", "템플릿 파일 제공"],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "맞춤 견적",
      desc: "브랜드 모션 시스템",
      features: ["모션 디자인 시스템", "콘텐츠 파이프라인", "정기 운영 지원"],
    },
  ],
};

const serviceTabs: { label: string; value: ServiceTab }[] = [
  { label: "브랜딩", value: "branding" },
  { label: "웹", value: "web" },
  { label: "모션", value: "motion" },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-lime">Pricing</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          서비스별 요금제
        </h2>

        <Tabs defaultValue="branding" className="mt-8">
          <TabsList className="bg-muted/40">
            {serviceTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="px-3 text-xs">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {serviceTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {plansByTab[tab.value].map((plan) => (
                  <article
                    key={`${tab.value}-${plan.name}`}
                    className={`rounded-2xl border p-6 transition-all duration-200 ${
                      plan.highlight
                        ? "border-primary/50 bg-primary/10 shadow-lg shadow-primary/10"
                        : "border-border/80 bg-card/70 hover:border-border hover:bg-card"
                    }`}
                  >
                    <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight">{plan.price}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{plan.desc}</p>
                    <ul className="mt-5 space-y-2 text-sm text-foreground/85">
                      {plan.features.map((feature) => (
                        <li key={feature} className="rounded-md border border-border/60 bg-background/55 px-3 py-2">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
