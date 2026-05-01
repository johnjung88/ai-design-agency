"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

const testimonials = [
  {
    service: { ko: "웹사이트", en: "Website" },
    name: { ko: "교육 컨설팅 대표", en: "Education consulting founder" },
    meta: { ko: "랜딩페이지 · 3일 납품", en: "Landing page · 3-day delivery" },
    image: "/marketplace/kmong-portfolio/website-portfolio-cover.png",
    quote: {
      ko: "처음에는 빠른 제작이라 퀄리티가 걱정됐는데, 첫 화면 문구와 문의 버튼 위치까지 바로 영업에 쓸 수 있게 잡아주셨어요. 응답도 빨라서 수정 방향을 주고받는 과정이 편했습니다.",
      en: "I was worried fast delivery would hurt quality, but the first screen copy and inquiry flow were ready for sales use. The response speed also made revisions easy.",
    },
  },
  {
    service: { ko: "쇼핑몰", en: "Shopping Mall" },
    name: { ko: "식품몰 운영자", en: "Food store operator" },
    meta: { ko: "카페24 메인 · 모바일 구성", en: "Cafe24 main · mobile layout" },
    image: "/marketplace/kmong-portfolio/shopping-mall-portfolio-cover.png",
    quote: {
      ko: "기존 쇼핑몰은 상품이 많아도 뭘 먼저 봐야 할지 복잡했는데, 메인 배너와 카테고리 흐름이 정리되니 훨씬 전문적으로 보였습니다. 모바일 화면까지 같이 확인해준 점이 좋았습니다.",
      en: "Our old store felt crowded even with good products. The new main banner and category flow made it look much more professional, and I liked reviewing mobile screens together.",
    },
  },
  {
    service: { ko: "로고 및 명함", en: "Logo & Card" },
    name: { ko: "카페 창업 고객", en: "Cafe startup client" },
    meta: { ko: "로고·명함 세트 · 1일 납품", en: "Logo/card kit · 1-day delivery" },
    image: "/marketplace/kmong-portfolio/brand-portfolio-cover.png",
    quote: {
      ko: "브랜드명만 정해진 상태였는데 로고, 명함, 온라인 프로필까지 한 번에 맞춰져서 오픈 준비가 빨라졌습니다. 과하게 꾸미기보다 실제로 쓰기 좋게 정리된 점이 만족스러웠습니다.",
      en: "We only had the brand name, but the logo, card, and online profile assets came together at once. It felt practical rather than over-designed.",
    },
  },
  {
    service: { ko: "상세페이지", en: "Detail Page" },
    name: { ko: "뷰티 스마트스토어 판매자", en: "Beauty store seller" },
    meta: { ko: "세로형 상세 · 판매 카피 구성", en: "Vertical detail page · sales copy" },
    image: "/marketplace/kmong-portfolio/detail-page-portfolio-cover.png",
    quote: {
      ko: "제품 설명을 어떻게 풀어야 할지 막막했는데, 고객 고민부터 사용 장면, 구매 전 확인 사항까지 순서가 잡히니 페이지가 훨씬 설득력 있어졌습니다. 결과물도 예상보다 빨랐습니다.",
      en: "I did not know how to explain the product, but the flow from customer concern to usage scenes and purchase checks made the page much more persuasive.",
    },
  },
  {
    service: { ko: "PPT 디자인", en: "PPT Design" },
    name: { ko: "B2B 제안 담당자", en: "B2B proposal manager" },
    meta: { ko: "제안서 리디자인 · 원본 납품", en: "Proposal redesign · editable deck" },
    image: "/marketplace/kmong-portfolio/ppt-portfolio-cover.png",
    quote: {
      ko: "내용은 있는데 장표가 산만해서 고민이었는데, 흐름과 표지가 정리되니 제안서가 훨씬 믿음직해 보였습니다. 원본 파일까지 받아 내부에서 바로 수정할 수 있었던 점도 좋았습니다.",
      en: "We had the content, but the slides looked scattered. Once the flow and cover were cleaned up, the proposal felt much more credible, and the editable file helped internally.",
    },
  },
];

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const locale = useLocale() as "ko" | "en";

  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">

        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                {t("sectionTitle")}
              </span>
            </div>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
              {locale === "ko"
                ? "속도, 응대, 결과물까지 확인하고 맡기는 제작 파트너"
                : "A production partner clients choose for speed, response, and results"}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            {locale === "ko"
              ? "초기 상담에서 자주 나오는 만족 포인트를 실제 의뢰 상황처럼 정리한 후기 예시입니다."
              : "Sample review-style notes based on common satisfaction points during early consultations."}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <article
              key={item.service.ko}
              className={`overflow-hidden rounded-lg border border-white/8 bg-card ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className={`grid h-full ${index === 0 ? "md:grid-cols-[0.95fr_1.05fr]" : ""}`}>
                <div className="relative min-h-[190px] overflow-hidden bg-secondary">
                  <Image
                    src={item.image}
                    alt={`${item.service[locale]} ${locale === "ko" ? "작업 예시" : "work sample"}`}
                    fill
                    className="object-cover object-top"
                    sizes={index === 0 ? "(max-width: 1024px) 100vw, 430px" : "(max-width: 1024px) 100vw, 33vw"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full border border-primary/25 bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                    {item.service[locale]}
                  </span>
                </div>
                <div className="flex min-h-[260px] flex-col justify-between p-6">
                  <div>
                    <div className="mb-4 flex gap-1 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-base font-semibold leading-8 text-foreground">
                      “{item.quote[locale]}”
                    </p>
                  </div>
                  <div className="mt-6 border-t border-white/8 pt-4">
                    <p className="text-sm font-bold text-foreground">{item.name[locale]}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.meta[locale]}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
