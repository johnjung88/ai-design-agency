"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChannelBadges } from "@/components/sections/channel-badges";

const SERVICE_CATEGORIES = ["web", "app", "design", "video", "automation"] as const;
const SOURCES = ["soomgo", "kmong", "search", "referral", "direct"] as const;
const BUDGETS = ["under-100k", "100k-500k", "500k-1m", "1m-plus"] as const;

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service_category: "",
    source: "",
    budget_range: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (field: string, val: string) => setForm((f) => ({ ...f, [field]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service_category: "", source: "", budget_range: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const labelClass = "block text-xs font-medium text-muted-foreground mb-1.5";
  const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors";
  const selectClass = `${inputClass} appearance-none`;

  return (
    <main className="pb-24 pt-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">

        {/* 헤더 */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {t("sectionTitle")}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t("sectionTitle")}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">{t("responsePromise")}</p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
          {/* 채널 */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-foreground">바로 연락하기</h2>
              <ChannelBadges />
            </div>
            <div className="rounded-2xl border border-white/8 bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">응답 약속</p>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li>✅ 1시간 내 임시 답변</li>
                <li>✅ 24시간 내 견적 제안서</li>
                <li>✅ 5일 결과물 보장</li>
                <li>✅ 5일 못 지키면 10% 자발적 환불</li>
              </ul>
            </div>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>{t("namePlaceholder")} *</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder={t("namePlaceholder")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>{t("emailPlaceholder")} *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t("phonePlaceholder")}</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder={t("phonePlaceholder")}
                className={inputClass}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>{t("servicePlaceholder")} *</label>
                <select
                  required
                  value={form.service_category}
                  onChange={(e) => set("service_category", e.target.value)}
                  className={selectClass}
                >
                  <option value="">{t("servicePlaceholder")}</option>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "web" ? "🌐 웹사이트 제작" : cat === "app" ? "📱 앱 개발" : cat === "design" ? "🎨 디자인" : cat === "video" ? "🎬 영상 제작" : "⚙️ 자동화"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{t("sourcePlaceholder")}</label>
                <select
                  value={form.source}
                  onChange={(e) => set("source", e.target.value)}
                  className={selectClass}
                >
                  <option value="">{t("sourcePlaceholder")}</option>
                  {SOURCES.map((src) => (
                    <option key={src} value={src}>
                      {src === "soomgo" ? "숨고" : src === "kmong" ? "크몽" : src === "search" ? "검색" : src === "referral" ? "지인 추천" : "직접 방문"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>{t("budgetPlaceholder")}</label>
              <select
                value={form.budget_range}
                onChange={(e) => set("budget_range", e.target.value)}
                className={selectClass}
              >
                <option value="">{t("budgetPlaceholder")}</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>
                    {b === "under-100k" ? "10만원 이하" : b === "100k-500k" ? "10만~50만원" : b === "500k-1m" ? "50만~100만원" : "100만원 이상"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>{t("messagePlaceholder")} *</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder={t("messagePlaceholder")}
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === "success" && (
              <p className="rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">{t("success")}</p>
            )}
            {status === "error" && (
              <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">{t("error")}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              {status === "loading" ? "전송 중..." : t("submit")}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
