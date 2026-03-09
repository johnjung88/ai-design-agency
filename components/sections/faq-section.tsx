"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "프로젝트 평균 기간은 어느 정도인가요?",
    answer: "일반적으로 2주에서 6주 사이이며, 범위와 승인 속도에 따라 조정됩니다.",
  },
  {
    question: "초기 기획이 없어도 진행 가능한가요?",
    answer: "가능합니다. 킥오프에서 목표와 우선순위를 정의한 뒤 기획부터 함께 진행합니다.",
  },
  {
    question: "디자인만 의뢰하고 개발은 내부에서 진행해도 되나요?",
    answer: "가능합니다. 개발 핸드오프 기준으로 컴포넌트 문서와 가이드를 함께 전달합니다.",
  },
  {
    question: "운영 단계에서 추가 지원도 가능한가요?",
    answer: "월 단위 운영 옵션을 통해 캠페인/페이지/콘텐츠 제작을 지속 지원합니다.",
  },
  {
    question: "커뮤니케이션 방식은 어떻게 되나요?",
    answer: "주간 리포트와 고정 미팅, 필요 시 실시간 채널을 병행해 의사결정을 빠르게 맞춥니다.",
  },
  {
    question: "수정 요청 횟수 제한이 있나요?",
    answer: "패키지별로 기본 라운드가 있으며, 추가 라운드는 사전 합의된 방식으로 확장 가능합니다.",
  },
  {
    question: "견적은 어떤 기준으로 산정되나요?",
    answer: "범위, 일정, 산출물 난이도, 운영 포함 여부를 기준으로 산정해 투명하게 공유합니다.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-cyan">FAQ</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">자주 묻는 질문</h2>

        <Accordion className="mt-8 rounded-2xl border border-border/80 bg-card/70 px-5 py-2">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index + 1}`}>
              <AccordionTrigger className="text-base font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-sm leading-6 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
