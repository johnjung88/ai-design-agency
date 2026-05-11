"use client";
import { useState, useEffect } from "react";
import { MagazineEyebrow } from "./magazine-eyebrow";

const testimonials = [
  {
    quote: "빠른 제작이라 퀄리티가 걱정됐지만",
    quoteEm: "퀄리티가 걱정됐지만",
    body: "첫 화면 카피와 버튼 위치까지 영업에 바로 쓸 수 있게 잡아주셨어요",
    name: "김 대표",
    role: "교육 컨설팅 · 랜딩 3일",
    stat: "+42%",
    statCap: "문의 전환",
  },
  {
    quote: "기존 쇼핑몰을 다시 만든 게 아니라,",
    quoteEm: "첫 화면·배너·동선",
    body: "을 같이 정리해주셨어요",
    name: "박 사장",
    role: "식품몰 · 카페24 메인 5일",
    stat: "+28%",
    statCap: "매출",
  },
  {
    quote: "시드 라운드 IR Deck",
    quoteEm: "5일 만에",
    body: "임원진이 만족할 수준의 결과를 받았습니다",
    name: "이 대표",
    role: "스타트업 · IR Deck 5일",
    stat: "$2M",
    statCap: "시드 통과",
  },
  {
    quote: "단순히 예쁜 게 아니라",
    quoteEm: "실제 구매 결정",
    body: "에 영향을 미치는 흐름으로 짜여 있습니다",
    name: "정 마케터",
    role: "뷰티 브랜드 · 상세 2일",
    stat: "+52%",
    statCap: "전환율",
  },
  {
    quote: "자사몰을 7일 안에 운영 가능 수준으로",
    quoteEm: "결제·배송·알림",
    body: "까지 검증된 상태로",
    name: "최 대표",
    role: "피트니스 · 자사몰 7일",
    stat: "×1.2",
    statCap: "월 매출",
  },
];

export function MagazineVoices() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <section
      className="py-28 px-9 max-w-[1200px] mx-auto relative text-center"
      style={{ padding: "clamp(80px,10vw,120px) clamp(24px,3vw,36px)" }}
    >
      {/* Eyebrow */}
      <MagazineEyebrow className="mb-6">Voices from the Field</MagazineEyebrow>

      <h2
        className="font-normal mx-auto mb-14"
        style={{ fontFamily: "var(--font-marcellus)", fontSize: "clamp(48px,6vw,96px)", lineHeight: 1.0, letterSpacing: "-0.014em", color: "var(--tone-magazine-ink)" }}
      >
        의뢰인의{" "}
        <em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 500 }}>편지</em>
      </h2>

      {/* Slide area */}
      <div className="relative min-h-[360px] max-w-[880px] mx-auto py-[60px] flex flex-col justify-center items-center gap-8">
        <div
          style={{ fontFamily: "var(--font-cormorant)", fontSize: 132, color: "var(--tone-magazine-ink-faint)", lineHeight: 0.6, fontWeight: 400, userSelect: "none" }}
        >
          &ldquo;
        </div>

        <blockquote
          key={active}
          className="mx-auto max-w-[720px] animate-fade-in"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(22px,2.8vw,38px)",
            lineHeight: 1.45,
            letterSpacing: "-0.01em",
            color: "var(--tone-magazine-ink)",
          }}
        >
          {t.quote}{" "}
          <em style={{ fontStyle: "italic", fontWeight: 500 }}>{t.quoteEm}</em>
          {t.body ? `, ${t.body}` : ""}
        </blockquote>

        <div className="flex items-baseline justify-center gap-4 md:gap-5 flex-wrap mt-2">
          {/* Name + Role */}
          <div className="inline-flex items-baseline gap-3">
            <span
              style={{
                fontFamily: "var(--font-marcellus)",
                fontSize: "clamp(18px, 1.7vw, 22px)",
                color: "var(--tone-magazine-ink)",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              {t.name}
            </span>
            <span
              style={{
                fontFamily: "var(--font-pretendard)",
                fontSize: "clamp(12px, 1vw, 13.5px)",
                color: "var(--tone-magazine-ink-3)",
                fontWeight: 400,
                letterSpacing: "-0.003em",
              }}
            >
              {t.role}
            </span>
          </div>

          {/* divider */}
          <span
            className="hidden sm:inline-block"
            style={{ width: 1, height: 22, background: "var(--tone-magazine-line-2)" }}
          />

          {/* Stat (큰 숫자) + StatCap */}
          <div className="inline-flex items-baseline gap-2">
            <span
              style={{
                fontFamily: "var(--font-marcellus)",
                fontSize: "clamp(26px, 2.6vw, 36px)",
                color: "var(--tone-magazine-red)",
                letterSpacing: "-0.018em",
                lineHeight: 1,
              }}
            >
              {t.stat}
            </span>
            <span
              style={{
                fontFamily: "var(--font-pretendard)",
                fontSize: "clamp(11.5px, 1vw, 13px)",
                color: "var(--tone-magazine-ink-2)",
                fontWeight: 500,
                letterSpacing: "-0.003em",
              }}
            >
              {t.statCap}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div
        className="inline-flex gap-[10px] mt-8 items-center px-[18px] py-3 rounded-full"
        style={{ border: "1px solid var(--tone-magazine-line-2)", background: "var(--tone-magazine-paper-2)" }}
      >
        {testimonials.map((_, i) => (
          <button
            key={i}
            aria-label={`${i + 1}번 후기`}
            onClick={() => setActive(i)}
            style={{
              width: 22,
              height: 1.5,
              background: i === active ? "var(--tone-magazine-ink)" : "var(--tone-magazine-ink-faint)",
              border: 0,
              cursor: "pointer",
              transition: "background 0.3s",
              padding: 0,
            }}
          />
        ))}
        <span
          className="ml-3 pl-[14px]"
          style={{
            borderLeft: "1px solid var(--tone-magazine-line-2)",
            fontFamily: "var(--font-jetbrains)",
            fontSize: 11,
            color: "var(--tone-magazine-ink-2)",
            letterSpacing: "0.16em",
          }}
        >
          {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
