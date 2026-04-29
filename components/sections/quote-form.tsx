"use client";

import { useState } from "react";
import { serviceCategories, type ServiceCategory } from "@/lib/services-data";

const SUBTYPES: Record<ServiceCategory, { value: string; ko: string; en: string }[]> = {
  website: [
    { value: "landing", ko: "랜딩페이지", en: "Landing page" },
    { value: "homepage", ko: "회사 홈페이지", en: "Company website" },
    { value: "portfolio", ko: "포트폴리오 사이트", en: "Portfolio website" },
  ],
  "shopping-mall": [
    { value: "shopping-mall", ko: "쇼핑몰", en: "Storefront" },
    { value: "cafe24", ko: "카페24 디자인", en: "Cafe24 design" },
    { value: "commerce-banner", ko: "배너/상품 진열", en: "Banner/product layout" },
  ],
  "logo-business-card": [
    { value: "logo", ko: "로고", en: "Logo" },
    { value: "business-card", ko: "명함", en: "Business card" },
    { value: "brand-kit", ko: "로고+명함 세트", en: "Logo+card kit" },
  ],
  "detail-page": [
    { value: "product-detail", ko: "상품 상세페이지", en: "Product detail page" },
    { value: "service-detail", ko: "서비스 상세페이지", en: "Service detail page" },
    { value: "platform-detail", ko: "플랫폼 판매 이미지", en: "Marketplace sales image" },
  ],
  "ppt-design": [
    { value: "ppt", ko: "PPT", en: "Deck" },
    { value: "proposal", ko: "제안서", en: "Proposal" },
    { value: "pitch-deck", ko: "피치덱", en: "Pitch deck" },
  ],
  "automation-app": [
    { value: "data-crawling", ko: "데이터 크롤링", en: "Data crawling" },
    { value: "workflow-automation", ko: "업무 자동화", en: "Workflow automation" },
    { value: "mvp-app", ko: "MVP 앱", en: "MVP app" },
    { value: "dashboard", ko: "운영 대시보드", en: "Ops dashboard" },
  ],
  "video-content": [
    { value: "brand-intro", ko: "브랜드 인트로", en: "Brand intro" },
    { value: "marketing-video", ko: "홍보 영상", en: "Promo video" },
    { value: "shorts-set", ko: "쇼츠·릴스", en: "Shorts/Reels" },
    { value: "tutorial", ko: "튜토리얼", en: "Tutorial" },
  ],
};

const BUDGET_OPTIONS = [
  { value: "", ko: "-", en: "-" },
  { value: "under-100k", ko: "10만원 이하", en: "Under ₩100,000" },
  { value: "100k-500k", ko: "10만~50만원", en: "₩100,000-₩500,000" },
  { value: "500k-1m", ko: "50만~100만원", en: "₩500,000-₩1,000,000" },
  { value: "1m-plus", ko: "100만원 이상", en: "₩1,000,000+" },
];

const TIMELINE_OPTIONS = [
  { value: "", ko: "-", en: "-" },
  { value: "1-day", ko: "1일", en: "1 day" },
  { value: "3-days", ko: "3일", en: "3 days" },
  { value: "5-days", ko: "5일", en: "5 days" },
  { value: "1-week-plus", ko: "1주 이상", en: "1 week+" },
];

interface QuoteFormProps {
  locale: "ko" | "en";
  initialCategory?: string;
  initialSubtype?: string;
  initialSource?: string;
}

export function QuoteForm({ locale, initialCategory, initialSubtype, initialSource }: QuoteFormProps) {
  const safeCategory = serviceCategories.some((service) => service.value === initialCategory)
    ? (initialCategory as ServiceCategory)
    : "website";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: safeCategory,
    subtype: initialSubtype ?? SUBTYPES[safeCategory][0].value,
    budget_range: "",
    timeline: "",
    rush: false,
    source: ["soomgo", "kmong", "email"].includes(initialSource ?? "") ? initialSource : "email",
    contact_method: "email",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === "category") {
        const category = value as ServiceCategory;
        next.subtype = SUBTYPES[category][0].value;
      }
      return next;
    });
  };

  const copy = {
    ko: {
      name: "이름",
      email: "이메일",
      phone: "연락처",
      category: "서비스",
      subtype: "세부 작업",
      budget: "예산",
      timeline: "희망 일정",
      source: "유입 채널",
      contact: "선호 연락",
      description: "요구사항",
      rush: "긴급 1일 상담 희망",
      submit: "구조화 견적 문의 보내기",
      sending: "발송 중...",
      success: "견적 문의가 접수됐습니다. 빠르게 확인하겠습니다.",
      error: "전송 중 오류가 발생했습니다. 이메일로 직접 문의해주세요.",
      placeholder: "업종, 원하는 결과물, 참고 링크, 마감일을 적어주세요.",
    },
    en: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      category: "Service",
      subtype: "Task type",
      budget: "Budget",
      timeline: "Timeline",
      source: "Source",
      contact: "Preferred contact",
      description: "Requirements",
      rush: "I need a 1-day rush consultation",
      submit: "Send structured quote request",
      sending: "Sending...",
      success: "Quote request received. I will review it shortly.",
      error: "Something went wrong. Please email directly.",
      placeholder: "Tell me your business, desired result, references, and deadline.",
    },
  }[locale];

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30";
  const labelClass = "mb-1.5 block text-xs font-medium text-muted-foreground";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) {
        setForm((current) => ({ ...current, name: "", email: "", phone: "", description: "" }));
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-lg border border-white/8 bg-card p-6 lg:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{copy.name} *</label>
          <input className={inputClass} required value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>{copy.email} *</label>
          <input className={inputClass} required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{copy.phone}</label>
          <input className={inputClass} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>{copy.source}</label>
          <select className={inputClass} value={form.source} onChange={(e) => set("source", e.target.value)}>
            <option value="soomgo">Soomgo</option>
            <option value="kmong">Kmong</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{copy.category} *</label>
          <select className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value)}>
            {serviceCategories.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label[locale]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{copy.subtype}</label>
          <select className={inputClass} value={form.subtype} onChange={(e) => set("subtype", e.target.value)}>
            {SUBTYPES[form.category].map((item) => (
              <option key={item.value} value={item.value}>
                {item[locale]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={labelClass}>{copy.budget}</label>
          <select className={inputClass} value={form.budget_range} onChange={(e) => set("budget_range", e.target.value)}>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option[locale]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{copy.timeline}</label>
          <select className={inputClass} value={form.timeline} onChange={(e) => set("timeline", e.target.value)}>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option[locale]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{copy.contact}</label>
          <select className={inputClass} value={form.contact_method} onChange={(e) => set("contact_method", e.target.value)}>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/5 px-4 py-3 text-sm text-foreground">
        <input
          type="checkbox"
          checked={form.rush}
          onChange={(e) => set("rush", e.target.checked)}
          className="size-4 accent-primary"
        />
        {copy.rush}
      </label>

      <div>
        <label className={labelClass}>{copy.description} *</label>
        <textarea
          required
          rows={6}
          className={`${inputClass} resize-none`}
          placeholder={copy.placeholder}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>

      {status === "success" && <p className="rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{copy.success}</p>}
      {status === "error" && <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{copy.error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {status === "loading" ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
