"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const upcoming = [
  { num: "01", name: "촬영", nameEn: "filming", desc: "현장·제품·인터뷰" },
  { num: "02", name: "편집", nameEn: "editing", desc: "유튜브·SNS 숏폼·광고" },
  { num: "03", name: "모션", nameEn: "motion", desc: "로고 모션·인포그래픽" },
];

const LAUNCH_DATE = new Date("2026-07-01T00:00:00+09:00");

function Countdown() {
  const [diff, setDiff] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      let ms = LAUNCH_DATE.getTime() - now.getTime();
      if (ms < 0) ms = 0;
      const d = Math.floor(ms / 86400000);
      const h = Math.floor((ms % 86400000) / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      setDiff({ d, h, m, s });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  const Cell = ({ n, l }: { n: number; l: string }) => (
    <div className="flex flex-col items-center">
      <span style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 500, color: "var(--tone-life-rose)", lineHeight: 1, letterSpacing: "-0.02em" }}>{String(n).padStart(2, "0")}</span>
      <span style={{ fontFamily: "var(--font-jakarta)", fontSize: 10, color: "var(--tone-life-ink-3)", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 6 }}>{l}</span>
    </div>
  );
  return (
    <div className="inline-flex items-baseline gap-4 md:gap-7" style={{ padding: "16px 24px", border: "1px solid var(--tone-life-line)", borderRadius: 16, background: "var(--tone-life-cream-2)" }}>
      <Cell n={diff.d} l="Days" /><Cell n={diff.h} l="Hours" /><Cell n={diff.m} l="Min" /><Cell n={diff.s} l="Sec" />
    </div>
  );
}

export default function VideoPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };
  return (
    <main style={{ background: "var(--tone-life-cream)", color: "var(--tone-life-ink)", minHeight: "100vh" }}>
      <section className="max-w-[1100px] mx-auto text-center" style={{ padding: "var(--space-section) var(--space-edge)" }}>
        <div className="mb-6 md:mb-8 inline-flex items-center gap-3 flex-wrap justify-center" style={{ fontFamily: "var(--font-jakarta)", fontSize: 11, color: "var(--tone-life-ink-3)", letterSpacing: "0.28em", textTransform: "uppercase" }}>
          <span style={{ width: 24, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
          Video · Coming Soon
          <span style={{ width: 24, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
        </div>
        <h1 className="font-normal mb-7 md:mb-9 mx-auto max-w-[900px]" style={{ fontFamily: "var(--font-fraunces)", fontSize: "var(--text-display)", lineHeight: "var(--leading-display)", letterSpacing: "-0.014em", color: "var(--tone-life-ink)", fontWeight: 400 }}>
          장면을{" "}
          <em style={{ fontStyle: "italic", color: "var(--tone-life-rose)", fontWeight: 500 }}>담는</em>{" "}
          분야
        </h1>
        <p className="mb-8 mx-auto max-w-[48ch]" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-lead)", lineHeight: 1.8, color: "var(--tone-life-ink-2)" }}>
          <strong style={{ color: "var(--tone-life-ink)", fontWeight: 600 }}>2026년 7월 출시 예정</strong>
          <br />출시 전 알림 받으시면 30% 얼리버드 혜택을 드려요
        </p>
        <div className="mb-10 md:mb-12 flex justify-center"><Countdown /></div>

        <form onSubmit={submit} className="inline-flex flex-col sm:flex-row gap-2 max-w-[420px] mx-auto w-full">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="알림 받을 이메일" disabled={sent} className="flex-1 px-4 py-3.5" style={{ background: "var(--tone-life-cream-2)", border: "1px solid var(--tone-life-line-2)", color: "var(--tone-life-ink)", fontFamily: "var(--font-pretendard)", fontSize: 14, borderRadius: 999, outline: "none" }} />
          <button type="submit" disabled={sent} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 transition-all hover:-translate-y-0.5" style={{ background: sent ? "var(--tone-life-olive)" : "var(--tone-life-rose)", color: "var(--tone-life-cream)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 600, borderRadius: 999, opacity: sent ? 0.85 : 1, cursor: sent ? "default" : "pointer", border: 0 }}>
            {sent ? "✓ 알림 신청됨" : "출시 알림 받기 →"}
          </button>
        </form>
      </section>

      <section className="max-w-[1100px] mx-auto text-center" style={{ padding: "0 var(--space-edge) var(--space-section)" }}>
        <div className="mb-10 md:mb-14 inline-flex items-center gap-3" style={{ fontFamily: "var(--font-jakarta)", fontSize: 11, color: "var(--tone-life-ink-3)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
          <span style={{ width: 24, height: 1, background: "var(--tone-life-rose)", display: "inline-block" }} />
          Upcoming · 03 Sub-services
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {upcoming.map((s) => (
            <div key={s.num} className="text-center flex flex-col items-center" style={{ padding: "clamp(28px, 3.2vw, 44px) clamp(20px, 2.5vw, 32px)", background: "var(--tone-life-cream-2)", border: "1px dashed var(--tone-life-line-2)", borderRadius: 16 }}>
              <span className="mb-2" style={{ fontFamily: "var(--font-jakarta)", fontSize: 12, color: "var(--tone-life-ink-3)", letterSpacing: "0.18em", textTransform: "uppercase" }}>{s.num}</span>
              <div className="mb-3 inline-flex items-baseline gap-3 flex-wrap justify-center" style={{ fontFamily: "var(--font-fraunces)", fontSize: "var(--text-h2)", lineHeight: 1.1, color: "var(--tone-life-ink)", fontWeight: 400, letterSpacing: "-0.012em" }}>
                {s.name}
                <em style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontSize: "0.5em", color: "var(--tone-life-ink-3)", fontWeight: 400 }}>{s.nameEn}</em>
              </div>
              <p style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-body)", lineHeight: 1.7, color: "var(--tone-life-ink-2)" }}>{s.desc}</p>
              <div className="mt-5 pt-5 w-full" style={{ borderTop: "1px dashed var(--tone-life-line-2)", fontFamily: "var(--font-jakarta)", fontSize: 11, color: "var(--tone-life-ink-faint)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Coming Soon</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto text-center" style={{ padding: "var(--space-section) var(--space-edge)", borderTop: "1px solid var(--tone-life-line)" }}>
        <p className="mb-6" style={{ fontFamily: "var(--font-pretendard)", fontSize: "var(--text-lead)", color: "var(--tone-life-ink-2)" }}>
          영상 분야는 준비 중입니다. 다른 분야 먼저 둘러보세요
        </p>
        <Link href="/ko/#toc" className="inline-flex items-center gap-2 px-8 py-4 transition-all hover:-translate-y-0.5" style={{ background: "transparent", color: "var(--tone-life-ink)", border: "1px solid var(--tone-life-line-2)", fontFamily: "var(--font-pretendard)", fontSize: 14, fontWeight: 500, borderRadius: 999 }}>
          다른 분야 보기 →
        </Link>
      </section>
    </main>
  );
}
