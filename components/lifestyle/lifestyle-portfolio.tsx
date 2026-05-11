"use client";
import { useState } from "react";
import Link from "next/link";

interface Props { locale: string }

const cats = [
  { id: "all", label: "전체", count: 89 },
  { id: "beauty", label: "뷰티", count: 21 },
  { id: "food", label: "식품", count: 18 },
  { id: "health", label: "건강", count: 14 },
  { id: "fashion", label: "패션", count: 12 },
  { id: "living", label: "리빙", count: 9 },
  { id: "kids", label: "키즈", count: 7 },
  { id: "tech", label: "가전", count: 5 },
  { id: "edu", label: "교육", count: 3 },
];

const gradients: Record<string, { bg: string; nameDark?: boolean }> = {
  beauty:  { bg: "linear-gradient(135deg,#F5C2C7,#E8889A 50%,#C5475F)", nameDark: true },
  food:    { bg: "linear-gradient(135deg,#fcecc8,#d4a574 50%,#6a4628)" },
  fashion: { bg: "linear-gradient(135deg,#D6DCD0,#A8B8A4 50%,#6a8068)", nameDark: true },
  health:  { bg: "linear-gradient(135deg,#d4e8d0,#7B8E3F)", nameDark: true },
  living:  { bg: "linear-gradient(135deg,#ece0c4,#a88a6c 50%,#5a3e28)", nameDark: true },
  kids:    { bg: "linear-gradient(135deg,#FFE0A0,#FFB347 50%,#C56849)", nameDark: true },
  tech:    { bg: "linear-gradient(135deg,#d0d8e0,#6a7888)", nameDark: true },
  edu:     { bg: "linear-gradient(135deg,#e0c8d8,#B07B98)", nameDark: true },
};

const projects = [
  { cat: "beauty",  badge: "Beauty",  conv: "+412%", name: "바르는 순간, 3초 흡수", nameEm: "3초 흡수",  channel: "스마트스토어", title: "L'AURA 하이드라 세럼 — 4주 임상 ", titleEm: "93% 개선",    stats: ["+412%/전환","5d/납품","15/섹션"] },
  { cat: "food",    badge: "Food",    conv: "+285%", name: "10분 만에, 셰프의 한 그릇", nameEm: "셰프의 한 그릇", channel: "자사몰", title: "SHELF9 밀키트 — ", titleEm: "12,000명", stats: ["+285%/전환","4d/납품","12/섹션"] },
  { cat: "fashion", badge: "Fashion", conv: "+218%", name: "가벼운 한 벌, 여름의 정의", nameEm: "여름의 정의", channel: "자사몰", title: "QUIET 6 리넨 셔츠 — ", titleEm: "룩북", stats: ["+218%/전환","3d/납품","10/섹션"] },
  { cat: "health",  badge: "Health",  conv: "+340%", name: "하루 1정, 30일의 변화", nameEm: "30일의 변화", channel: "스마트스토어", title: "VITA 30 — 임상 데이터 기반 ", titleEm: "영양제", stats: ["+340%/전환","5d/납품","14/섹션"] },
  { cat: "living",  badge: "Living",  conv: "+195%", name: "조용한 거실, 오크 협탁", nameEm: "오크 협탁",  channel: "자사몰", title: "ROOM 03 사이드 테이블 — ", titleEm: "공간 무드", stats: ["+195%/전환","5d/납품","11/섹션"] },
  { cat: "kids",    badge: "Kids",    conv: "+267%", name: "놀면서 배우는, 원목 블록", nameEm: "원목 블록", channel: "스마트스토어", title: "THE WOOD 50 블록 세트 — ", titleEm: "발달 단계", stats: ["+267%/전환","4d/납품","12/섹션"] },
  { cat: "beauty",  badge: "Beauty",  conv: "+356%", name: "3초 발색, 온종일 지속", nameEm: "온종일 지속", channel: "쿠팡", title: "VEILA 립글로우 — 색상별 ", titleEm: "비포·애프터", stats: ["+356%/전환","4d/납품","13/섹션"] },
  { cat: "tech",    badge: "Tech",    conv: "+178%", name: "손에 쥐는, 홈오피스", nameEm: "홈오피스",   channel: "자사몰", title: "NUE Mini PC — 스펙 시각화·", titleEm: "비교 차트", stats: ["+178%/전환","6d/납품","14/섹션"] },
  { cat: "food",    badge: "Food",    conv: "+412%", name: "새벽에 출고, 당일 도착", nameEm: "당일 도착", channel: "스마트스토어", title: "SHIN&CO 프리미엄 한우 — ", titleEm: "등급별", stats: ["+412%/전환","5d/납품","15/섹션"] },
  { cat: "health",  badge: "Health",  conv: "+225%", name: "집에서 시작하는, 10분 운동", nameEm: "10분 운동", channel: "자사몰", title: "FITLAB 미니 풀업바 — 운동법 ", titleEm: "GIF 9컷", stats: ["+225%/전환","5d/납품","12/섹션"] },
  { cat: "edu",     badge: "Edu",     conv: "+165%", name: "8주 완성, 실전 데이터", nameEm: "실전 데이터", channel: "자사몰", title: "DATA SCHOOL — ", titleEm: "강사 신뢰", stats: ["+165%/전환","7d/납품","17/섹션"] },
  { cat: "fashion", badge: "Fashion", conv: "+295%", name: "하루 종일, 가벼운 가방", nameEm: "가벼운 가방", channel: "스마트스토어", title: "MUTE 13 토트백 — ", titleEm: "사이즈·색상", stats: ["+295%/전환","3d/납품","9/섹션"] },
];

export function LifestylePortfolio({ locale }: Props) {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? projects : projects.filter((p) => p.cat === active);

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "80px 24px 32px", maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: 11.5, color: "var(--tone-life-rose)", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 22, display: "inline-flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 28, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
          Portfolio · 89 pages
          <span style={{ width: 28, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
        </div>
        <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(40px,6vw,88px)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.0, color: "var(--tone-life-ink)", marginBottom: 22 }}>
          실제 매출이 일어난<br />
          <em style={{ fontStyle: "italic", color: "var(--tone-life-rose)" }}>89개</em>의 페이지
        </h1>
        <p style={{ fontFamily: "var(--font-pretendard)", fontSize: 16.5, lineHeight: 1.6, color: "var(--tone-life-ink-2)", maxWidth: 620, margin: "0 auto 36px" }}>
          데모가 아닙니다 <strong style={{ color: "var(--tone-life-ink)" }}>매출이 발생한 상세페이지</strong>만 모았습니다.
          업종별 필터로 비슷한 사례를 찾아보세요.
        </p>

        <div style={{ display: "inline-flex", gap: 6, flexWrap: "wrap", padding: 6, background: "var(--tone-life-cream-2)", border: "1px solid var(--tone-life-line)", borderRadius: 100, justifyContent: "center" }}>
          {cats.map((c) => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{ padding: "9px 16px", borderRadius: 100, border: "1px solid transparent", background: active === c.id ? "var(--tone-life-rose)" : "transparent", color: active === c.id ? "white" : "var(--tone-life-ink-2)", fontFamily: "var(--font-jakarta)", fontSize: 12.5, cursor: "pointer", fontWeight: active === c.id ? 600 : 500, transition: "all 0.2s" }}>
              {c.label} <span style={{ opacity: 0.55, fontSize: 10, fontFamily: "var(--font-jetbrains)" }}>{c.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "24px 24px 80px", maxWidth: 1480, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {filtered.map((p, i) => {
            const g = gradients[p.cat] ?? gradients.beauty;
            const [s0, s1, s2] = p.stats.map((s) => s.split("/"));
            return (
              <article key={i} style={{ background: "var(--tone-life-cream-2)", border: "1px solid var(--tone-life-line)", borderRadius: 14, overflow: "hidden", textAlign: "left" }}>
                {/* Visual */}
                <div style={{ aspectRatio: "4/3", background: g.bg, position: "relative", overflow: "hidden" }}>
                  <span style={{ position: "absolute", top: 14, left: 14, padding: "4px 11px", background: "rgba(0,0,0,0.5)", borderRadius: 100, fontFamily: "var(--font-jetbrains)", fontSize: 10, color: "rgba(255,255,255,0.92)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                    {p.badge}
                  </span>
                  <span style={{ position: "absolute", top: 14, right: 14, padding: "4px 11px", background: "var(--tone-life-rose)", color: "white", borderRadius: 100, fontFamily: "var(--font-jetbrains)", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.04em" }}>
                    {p.conv}
                  </span>
                  <div style={{ position: "absolute", bottom: 18, left: 18, right: 18, fontFamily: "var(--font-fraunces)", fontSize: 22, fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.018em", fontStyle: "italic", color: g.nameDark ? "#2a1a08" : "rgba(255,255,255,0.92)" }}>
                    {p.name}
                  </div>
                </div>
                {/* Body */}
                <div style={{ padding: "18px 22px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: 10.5, color: "var(--tone-life-rose)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>{p.cat}</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--tone-life-ink-faint)", display: "block" }} />
                    <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: 10.5, color: "var(--tone-life-ink-2)", letterSpacing: "0.04em" }}>{p.channel}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-fraunces)", fontSize: 17, fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.012em", marginBottom: 14, color: "var(--tone-life-ink)" }}>
                    {p.title}<em style={{ fontStyle: "italic", color: "var(--tone-life-rose)", fontWeight: 500 }}>{p.titleEm}</em>
                  </div>
                  <div style={{ display: "flex", gap: 18, paddingTop: 14, borderTop: "1px solid var(--tone-life-line)" }}>
                    {[s0, s1, s2].map(([v, l], j) => (
                      <div key={j}>
                        <div style={{ fontFamily: "var(--font-fraunces)", fontSize: 20, fontWeight: 600, color: "var(--tone-life-rose)", letterSpacing: "-0.02em", lineHeight: 1, fontStyle: "italic" }}>{v}</div>
                        <div style={{ fontFamily: "var(--font-jetbrains)", fontSize: 9.5, color: "var(--tone-life-ink-3)", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "70px 24px 56px", maxWidth: 1180, margin: "0 auto", textAlign: "center", borderTop: "1px solid var(--tone-life-line)" }}>
        <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(32px,4.6vw,64px)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 0.96, marginBottom: 20, color: "var(--tone-life-ink)" }}>
          <span style={{ color: "var(--tone-life-ink-3)" }}>launch</span><br />
          <em style={{ fontStyle: "italic", color: "var(--tone-life-rose)" }}>your_page</em>
        </h2>
        <p style={{ fontFamily: "var(--font-pretendard)", fontSize: 15, color: "var(--tone-life-ink-2)", marginBottom: 28 }}>1시간 답변 · 24시간 견적 · 5일 결과물</p>
        <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href={`/${locale}/quote`} style={{ padding: "14px 26px", background: "var(--tone-life-rose)", color: "white", border: "1px solid var(--tone-life-rose)", fontFamily: "var(--font-jakarta)", fontSize: 13, fontWeight: 600, borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>견적 시작 →</Link>
          <Link href={`/${locale}/services/detail-page`} style={{ padding: "14px 26px", background: "transparent", color: "var(--tone-life-ink)", border: "1px solid var(--tone-life-ink)", fontFamily: "var(--font-jakarta)", fontSize: 13, fontWeight: 600, borderRadius: 100, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>← services</Link>
        </div>
      </section>
    </>
  );
}
