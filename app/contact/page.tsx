"use client";

import { FormEvent, useState } from "react";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  service_type: "branding" | "web-design" | "motion-graphics" | "full-package";
  budget_range: "under-1000" | "1000-3000" | "3000-5000" | "5000-plus";
  message: string;
  locale: "ko" | "en";
};

const initialState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  service_type: "branding",
  budget_range: "under-1000",
  message: "",
  locale: "ko",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result: ApiResponse<{ inquiryId: string }> = await response.json();

      if (!response.ok || !result.success) {
        setFeedback({
          type: "error",
          text: result.error ?? "문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요.",
        });

        return;
      }

      setFeedback({
        type: "success",
        text: "문의가 정상 접수되었습니다. 빠르게 연락드리겠습니다.",
      });
      setForm(initialState);
    } catch {
      setFeedback({
        type: "error",
        text: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold">프로젝트 문의</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        아래 정보를 남겨주시면 영업일 기준 24시간 내 회신드립니다.
      </p>

      <form onSubmit={onSubmit} className="mt-10 space-y-6 rounded-2xl border border-border/80 bg-card/70 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span>이름</span>
            <input
              required
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full rounded-md border border-input bg-background/50 px-3 py-2 transition-colors focus-visible:border-ring focus-visible:outline-none"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span>이메일</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="w-full rounded-md border border-input bg-background/50 px-3 py-2 transition-colors focus-visible:border-ring focus-visible:outline-none"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span>전화번호</span>
            <input
              required
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="w-full rounded-md border border-input bg-background/50 px-3 py-2 transition-colors focus-visible:border-ring focus-visible:outline-none"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span>언어</span>
            <select
              value={form.locale}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  locale: event.target.value as ContactFormState["locale"],
                }))
              }
              className="w-full rounded-md border border-input bg-background/70 px-3 py-2 transition-colors focus-visible:border-ring focus-visible:outline-none"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>

        <fieldset className="space-y-3 text-sm">
          <legend className="mb-2">서비스 유형</legend>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              { label: "브랜딩", value: "branding" },
              { label: "웹 디자인", value: "web-design" },
              { label: "모션 그래픽", value: "motion-graphics" },
              { label: "풀 패키지", value: "full-package" },
            ].map((item) => (
              <label
                key={item.value}
                className="flex items-center gap-2 rounded-md border border-border/80 bg-background/35 px-3 py-2 text-sm transition-colors hover:bg-muted/45"
              >
                <input
                  type="radio"
                  name="service_type"
                  checked={form.service_type === item.value}
                  onChange={() =>
                    setForm((prev) => ({
                      ...prev,
                      service_type: item.value as ContactFormState["service_type"],
                    }))
                  }
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block space-y-2 text-sm">
          <span>예산 범위</span>
          <select
            value={form.budget_range}
            onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  budget_range: event.target.value as ContactFormState["budget_range"],
                }))
            }
            className="w-full rounded-md border border-input bg-background/70 px-3 py-2 transition-colors focus-visible:border-ring focus-visible:outline-none"
          >
            <option value="under-1000">$1,000 미만</option>
            <option value="1000-3000">$1,000 - $3,000</option>
            <option value="3000-5000">$3,000 - $5,000</option>
            <option value="5000-plus">$5,000 이상</option>
          </select>
        </label>

        <label className="block space-y-2 text-sm">
          <span>문의 내용</span>
          <textarea
            required
            rows={6}
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            className="w-full rounded-md border border-input bg-background/50 px-3 py-2 transition-colors focus-visible:border-ring focus-visible:outline-none"
          />
        </label>

        {feedback ? (
          <p className={feedback.type === "success" ? "text-sm text-primary" : "text-sm text-destructive"}>
            {feedback.text}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-primary px-5 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "전송 중..." : "문의 보내기"}
        </button>
      </form>
    </main>
  );
}
