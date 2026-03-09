interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "김지현",
    role: "SaaS 스타트업 CEO",
    quote: "브랜드와 웹을 동시에 정리해서, 투자자 미팅에서 전달력이 크게 좋아졌습니다.",
  },
  {
    name: "박민수",
    role: "커머스 마케팅 리드",
    quote: "캠페인 에셋 제작 속도가 빨라져 운영팀 전체 생산성이 올라갔습니다.",
  },
  {
    name: "이서윤",
    role: "핀테크 프로덕트 매니저",
    quote: "전환 퍼널 관점으로 디자인을 풀어줘서 실적 개선까지 바로 연결됐습니다.",
  },
  {
    name: "정하늘",
    role: "헬스케어 브랜드 총괄",
    quote: "톤앤매너 기준이 생기면서 팀 간 협업 충돌이 줄고 결과물이 안정화됐습니다.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-violet">Testimonials</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">고객 후기</h2>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-border/80 bg-card/70 p-6 transition-all duration-200 hover:border-violet/40 hover:bg-card hover:shadow-lg hover:shadow-violet/10"
            >
              <p className="text-sm leading-relaxed text-foreground/85">“{item.quote}”</p>
              <p className="mt-4 text-sm font-medium">{item.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
