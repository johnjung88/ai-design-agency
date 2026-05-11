"use client";
import { useState } from "react";
import Link from "next/link";

interface Props { locale: string }

const cats = [
  { id: "all",      label: "전체",    count: 156 },
  { id: "ir",       label: "IR 덱",   count: 38 },
  { id: "proposal", label: "사업 제안", count: 29 },
  { id: "corp",     label: "회사 소개", count: 22 },
  { id: "cons",     label: "컨설팅",  count: 18 },
  { id: "rfp",      label: "정부 RFP", count: 14 },
  { id: "conf",     label: "학회",    count: 12 },
  { id: "edu",      label: "교육",    count: 15 },
  { id: "brand",    label: "브랜딩",  count: 8 },
];

type DeckStyle = "ir" | "corp" | "cons" | "pitch" | "edu" | "rfp" | "brand" | "conf";

const deckStyles: Record<DeckStyle, { bg: string; markColor: string; eyebrowColor: string; headColor: string; emColor: string; metaColor: string }> = {
  ir:    { bg: "linear-gradient(135deg,#1B3B5F,#0E1A2B 60%,#050A14)", markColor: "white",    eyebrowColor: "#C9A961", headColor: "white",    emColor: "#C9A961",  metaColor: "rgba(255,255,255,0.45)" },
  corp:  { bg: "linear-gradient(135deg,#F8F4ED,#ECE0C4)",              markColor: "#1A1408",  eyebrowColor: "#6A5238", headColor: "#1A1408",  emColor: "#8A6A3A",  metaColor: "rgba(42,36,24,0.5)" },
  cons:  { bg: "white",                                                 markColor: "#0E1A2B",  eyebrowColor: "#1B3B5F", headColor: "#0E1A2B",  emColor: "#1B3B5F",  metaColor: "rgba(14,26,43,0.4)" },
  pitch: { bg: "linear-gradient(135deg,#050A14,#1B3B5F 50%,#050A14)",  markColor: "white",    eyebrowColor: "#C9A961", headColor: "white",    emColor: "#C9A961",  metaColor: "rgba(255,255,255,0.45)" },
  edu:   { bg: "linear-gradient(135deg,#1B3B5F,#0E2240)",              markColor: "white",    eyebrowColor: "#A8C8E0", headColor: "white",    emColor: "#A8C8E0",  metaColor: "rgba(255,255,255,0.45)" },
  rfp:   { bg: "linear-gradient(135deg,#F8F6F0,#ECE5D2)",              markColor: "#1A1408",  eyebrowColor: "#5A4A28", headColor: "#1A1408",  emColor: "#B8862A",  metaColor: "rgba(42,36,24,0.5)" },
  brand: { bg: "linear-gradient(135deg,#2A1A0A,#1A0E04)",              markColor: "white",    eyebrowColor: "#FFB37C", headColor: "#FCECC8",  emColor: "#FFB37C",  metaColor: "rgba(252,236,200,0.45)" },
  conf:  { bg: "linear-gradient(135deg,#1A2018,#0A100A)",              markColor: "white",    eyebrowColor: "#A8C8A4", headColor: "#ECEDE4",  emColor: "#A8C8A4",  metaColor: "rgba(255,255,255,0.45)" },
};

const decks = [
  { cat: "ir",       style: "ir" as DeckStyle,    mark: "■ ARC AI",          page: "001 / 028",  eyebrow: "Series A · 2026.Q2",        head: "한 줄로 정의한 새로운 ", headEm: "AI 인프라",   botL: "Pitch · Confidential", botR: "arc-ai.io",  catLabel: "IR 덱",    ch: "시리즈 A",   title: "ARC AI — Series A 28페이지 풀 덱 ", titleEm: "$2M 시드 통과",  stats: ["28p/슬라이드","5d/납품","유치/결과"] },
  { cat: "corp",     style: "corp" as DeckStyle,  mark: "NORTH CO.",         page: "2026 · 01",  eyebrow: "CORPORATE OVERVIEW",        head: "신뢰가 쌓이는 ", headEm: "시간의 산업",   botL: "EST · 1998 — 2026", botR: "Brand Book", catLabel: "회사 소개", ch: "제조업",    title: "NORTH CO. — ", titleEm: "28년 헤리티지 brochure",         stats: ["40p/슬라이드","7d/납품","한·영/언어"] },
  { cat: "cons",     style: "cons" as DeckStyle,  mark: "FRAMEWORK & P",     page: "2026 · MAR", eyebrow: "STRATEGIC REVIEW",          head: "시장 진입 ", headEm: "3가지 시나리오", botL: "Confidential · Internal", botR: "F&P · 03", catLabel: "컨설팅",  ch: "전략 보고서", title: "FRAMEWORK & PARTNERS — ", titleEm: "진입 전략 리뷰", stats: ["52p/슬라이드","7d/납품","MECE/구조"] },
  { cat: "ir",       style: "pitch" as DeckStyle, mark: "",                  page: "",           eyebrow: "",                          head: "73%", headEm: "",                      botL: "", botR: "",                           catLabel: "IR 덱",    ch: "1분 피치",   title: "VEILA — Demo Day ", titleEm: "1분 피치 덱 (우승)",              stats: ["10p/슬라이드","2d/납품","우승/결과"] },
  { cat: "proposal", style: "rfp" as DeckStyle,   mark: "SaaS Co.",          page: "2026 · Q2",  eyebrow: "B2B SOLUTION PROPOSAL",     head: "엔터프라이즈에 ", headEm: "3배 생산성", botL: "Confidential", botR: "25 / 25",        catLabel: "사업 제안", ch: "B2B SaaS",   title: "SaaS Co — ", titleEm: "대기업 영업 제안서 (계약)",        stats: ["25p/슬라이드","4d/납품","계약/결과"] },
  { cat: "conf",     style: "conf" as DeckStyle,  mark: "DataCon 2026",      page: "KEYNOTE",    eyebrow: "CONFERENCE KEYNOTE",        head: "데이터 시대, ", headEm: "새로운 윤리",    botL: "Seoul · 2026", botR: "35 slides",      catLabel: "학회",    ch: "키노트",     title: "DataCon 2026 — ", titleEm: "메인 키노트 영문 덱",              stats: ["35p/슬라이드","6d/납품","영문/언어"] },
  { cat: "rfp",      style: "rfp" as DeckStyle,   mark: "N-AI Project",      page: "RFP · 60p",  eyebrow: "Government R&D · 2026",     head: "국가 AI 인프라 ", headEm: "3년 로드맵",    botL: "정부 R&D 입찰", botR: "선정",           catLabel: "정부 RFP", ch: "R&D 과제",  title: "N-AI 프로젝트 — ", titleEm: "정부 R&D 입찰 제안 (선정)",       stats: ["60p/슬라이드","10d/납품","선정/결과"] },
  { cat: "edu",      style: "edu" as DeckStyle,   mark: "DATA SCHOOL",       page: "WEEK 01",    eyebrow: "Online Course · Week 1",    head: "데이터 분석, ", headEm: "8주 완성",       botL: "8주 커리큘럼", botR: "160p",           catLabel: "교육",    ch: "온라인 강의", title: "DATA SCHOOL — 8주차 강의 슬라이드 ", titleEm: "풀",               stats: ["160p/슬라이드","14d/납품","PDF/동시"] },
  { cat: "brand",    style: "brand" as DeckStyle, mark: "QUIET 6",           page: "2026 · 01",  eyebrow: "BRAND BOOK 2026",           head: "한 사람의 ", headEm: "목소리로",          botL: "Brand Guide", botR: "48 / 48",        catLabel: "브랜딩",  ch: "브랜드 가이드", title: "QUIET 6 — ", titleEm: "브랜드 시스템 가이드북",          stats: ["48p/슬라이드","7d/납품","한·영/언어"] },
  { cat: "ir",       style: "ir" as DeckStyle,    mark: "■ NUE",             page: "001 / 032",  eyebrow: "Series B · 2027",           head: "$ 30M ARR ", headEm: "3년의 그림",         botL: "Pitch · Confidential", botR: "nue.io",     catLabel: "IR 덱",    ch: "시리즈 B",   title: "NUE — ", titleEm: "시리즈 B 메인 덱 (영문)",          stats: ["32p/슬라이드","6d/납품","영문/언어"] },
  { cat: "cons",     style: "cons" as DeckStyle,  mark: "F & P",             page: "M&A · DD",   eyebrow: "M&A DUE DILIGENCE",         head: "인수 후 ", headEm: "3가지 결론",          botL: "Confidential · Internal", botR: "75 / 75",  catLabel: "컨설팅",  ch: "M&A 보고서", title: "F&P — ", titleEm: "실사 보고서 풀 패키지",             stats: ["75p/슬라이드","10d/납품","기밀/유형"] },
  { cat: "proposal", style: "corp" as DeckStyle,  mark: "NORTH × KAIST",     page: "MOU · 22p",  eyebrow: "STRATEGIC PARTNERSHIP",     head: "함께 만드는 ", headEm: "다음 10년",          botL: "산학 MOU", botR: "체결",            catLabel: "사업 제안", ch: "파트너십",  title: "NORTH × KAIST — ", titleEm: "산학 MOU 제안서 (체결)",           stats: ["22p/슬라이드","4d/납품","체결/결과"] },
];

export function ConsultPortfolio({ locale }: Props) {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? decks : decks.filter((d) => d.cat === active);

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "80px 24px 32px", maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 11.5, color: "var(--tone-consult-navy)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 14, fontWeight: 500 }}>
          <span style={{ width: 28, height: 1, background: "var(--tone-consult-gold)", display: "inline-block" }} />
          Portfolio · 156 decks
        </div>
        <h1 style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(40px,6.4vw,96px)", fontWeight: 700, letterSpacing: "-0.032em", lineHeight: 0.98, color: "var(--tone-consult-ink)", marginBottom: 22 }}>
          실제 발표가 일어난<br />
          <em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "var(--tone-consult-navy)", fontWeight: 500 }}>156개</em>의 덱
        </h1>
        <p style={{ fontFamily: "var(--font-pretendard)", fontSize: 16, lineHeight: 1.6, color: "var(--tone-consult-ink-2)", maxWidth: 640, margin: "0 auto 36px" }}>
          투자 라운드 · 이사회 · 학회 · 강의에서 사용된 슬라이드만 모았습니다.
          발표 종류별 필터로 비슷한 사례를 찾아보세요.
        </p>

        {/* Square filter bar */}
        <div style={{ display: "inline-flex", gap: 0, flexWrap: "wrap", border: "1px solid var(--tone-consult-ink)", justifyContent: "center" }}>
          {cats.map((c, i) => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{ padding: "10px 18px", border: 0, borderRight: i < cats.length - 1 ? "1px solid var(--tone-consult-line-2)" : "0", background: active === c.id ? "var(--tone-consult-ink)" : "transparent", color: active === c.id ? "white" : "var(--tone-consult-ink-2)", fontFamily: "var(--font-inter)", fontSize: 12.5, cursor: "pointer", fontWeight: active === c.id ? 600 : 500, transition: "all 0.2s" }}>
              {c.label} <span style={{ opacity: 0.55, fontSize: 10, fontFamily: "var(--font-ibm-plex-mono)", color: active === c.id ? "#C9A961" : undefined }}>{c.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3-col grid */}
      <section style={{ padding: "24px 24px 80px", maxWidth: 1480, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          {filtered.map((d, i) => {
            const s = deckStyles[d.style];
            const [s0, s1, s2] = d.stats.map((x) => x.split("/"));
            const isPitch = d.style === "pitch";
            return (
              <article key={i} style={{ background: "var(--tone-consult-paper)", border: "1px solid var(--tone-consult-line-2)", overflow: "hidden" }}>
                {/* Slide visual */}
                <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden", padding: isPitch ? 0 : "22px 24px", display: "flex", flexDirection: isPitch ? "column" : undefined, alignItems: isPitch ? "center" : undefined, justifyContent: isPitch ? "center" : "space-between", background: s.bg }}>
                  {isPitch ? (
                    <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
                      <div style={{ fontFamily: "var(--font-inter)", fontSize: 56, fontWeight: 800, color: "var(--tone-consult-gold)", letterSpacing: "-0.035em", lineHeight: 1 }}>73%</div>
                      <div style={{ fontFamily: "var(--font-pretendard)", fontSize: 11, color: "rgba(255,255,255,0.85)", lineHeight: 1.45, maxWidth: 240, margin: "8px auto 0" }}>발표 직후 핵심 메시지를 잊는 의사결정자의 비율</div>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 700, letterSpacing: "-0.005em", color: s.markColor }}>{d.mark}</span>
                        <span style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 9.5, letterSpacing: "0.18em", color: s.metaColor }}>{d.page}</span>
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: s.eyebrowColor, marginBottom: 10, paddingLeft: 18, position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, top: "50%", width: 12, height: 1, background: s.eyebrowColor, display: "block" }} />
                          {d.eyebrow}
                        </div>
                        <div style={{ fontFamily: "var(--font-inter)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.022em", lineHeight: 1.08, color: s.headColor }}>
                          {d.head}<em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 500, color: s.emColor }}>{d.headEm}</em>
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                        <span style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: s.metaColor }}>{d.botL}</span>
                        <span style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: s.metaColor }}>{d.botR}</span>
                      </div>
                    </>
                  )}
                </div>
                {/* Body */}
                <div style={{ padding: "18px 22px 22px", borderTop: "1px solid var(--tone-consult-line)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontFamily: "var(--font-ibm-plex-mono)", fontSize: 10.5 }}>
                    <span style={{ color: "var(--tone-consult-navy)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>{d.catLabel}</span>
                    <span style={{ color: "var(--tone-consult-ink-faint)" }}>·</span>
                    <span style={{ color: "var(--tone-consult-ink-2)" }}>{d.ch}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 15, fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.012em", marginBottom: 14, color: "var(--tone-consult-ink)" }}>
                    {d.title}<em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "var(--tone-consult-navy)", fontWeight: 500 }}>{d.titleEm}</em>
                  </div>
                  <div style={{ display: "flex", gap: 22, paddingTop: 12, borderTop: "1px solid var(--tone-consult-line)" }}>
                    {[s0, s1, s2].map(([v, l], j) => (
                      <div key={j}>
                        <div style={{ fontFamily: "var(--font-inter)", fontSize: 18, fontWeight: 700, color: "var(--tone-consult-navy)", letterSpacing: "-0.025em", lineHeight: 1 }}>{v}</div>
                        <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 9, color: "var(--tone-consult-ink-3)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>{l}</div>
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
      <section style={{ padding: "80px 24px 64px", maxWidth: 1180, margin: "0 auto", textAlign: "center", borderTop: "1px solid var(--tone-consult-ink)" }}>
        <h2 style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(32px,4.8vw,72px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 0.98, marginBottom: 20, color: "var(--tone-consult-ink)" }}>
          <span style={{ color: "var(--tone-consult-ink-3)" }}>deliver</span><br />
          <em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: "var(--tone-consult-navy)", fontWeight: 500 }}>your_deck</em>
        </h2>
        <p style={{ fontFamily: "var(--font-pretendard)", fontSize: 15, color: "var(--tone-consult-ink-2)", marginBottom: 30 }}>1시간 답변 · 24시간 견적 · 5일 결과물</p>
        <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href={`/${locale}/quote`} style={{ padding: "14px 28px", background: "var(--tone-consult-ink)", color: "white", border: "1px solid var(--tone-consult-ink)", fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, letterSpacing: "-0.005em" }}>견적 시작 →</Link>
          <Link href={`/${locale}/services/ppt-design`} style={{ padding: "14px 28px", background: "transparent", color: "var(--tone-consult-ink)", border: "1px solid var(--tone-consult-ink)", fontFamily: "var(--font-inter)", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, letterSpacing: "-0.005em" }}>← services</Link>
        </div>
      </section>
    </>
  );
}
