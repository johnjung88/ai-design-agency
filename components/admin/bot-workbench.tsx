"use client";

import { useMemo, useState } from "react";
import { Check, Clipboard, Loader2, Save, Wand2 } from "lucide-react";

type PlatformSource = "soomgo" | "kmong" | "wishket" | "elancer" | "notefolio" | "upwork" | "contra";

type Draft = {
  source: PlatformSource;
  category: string;
  confidence: number;
  priceTier: "standard" | "deluxe" | "premium" | "custom";
  eventPrice: number;
  regularPrice: number;
  deliveryDays: string;
  summary: string;
  responseText: string;
  usedFallback: boolean;
};

const SOURCES: Array<{ value: PlatformSource; label: string }> = [
  { value: "soomgo", label: "숨고" },
  { value: "kmong", label: "크몽" },
  { value: "wishket", label: "위시켓" },
  { value: "elancer", label: "이랜서" },
  { value: "notefolio", label: "노트폴리오" },
  { value: "upwork", label: "Upwork" },
  { value: "contra", label: "Contra" },
];

export function BotWorkbench() {
  const [source, setSource] = useState<PlatformSource>("soomgo");
  const [rawText, setRawText] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [editedText, setEditedText] = useState("");
  const [status, setStatus] = useState<"idle" | "generating" | "saving" | "copied" | "saved" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const canGenerate = useMemo(() => rawText.trim().length >= 10 && status !== "generating", [rawText, status]);

  async function generateDraft() {
    setStatus("generating");
    setMessage(null);
    try {
      const res = await fetch("/api/admin/bot/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, rawText }),
      });
      const json = (await res.json()) as { success?: boolean; data?: Draft; error?: string };
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error ?? "응답 생성 실패");
      }
      setDraft(json.data);
      setEditedText(json.data.responseText);
      setStatus("idle");
      setMessage(json.data.usedFallback ? "Claude 키가 없어 로컬 V6 템플릿으로 생성했습니다." : "Claude 응답으로 초안을 생성했습니다.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "응답 생성 실패");
    }
  }

  async function copyText() {
    await navigator.clipboard.writeText(editedText);
    setStatus("copied");
    setMessage("응답 초안을 복사했습니다. 외부 플랫폼에 직접 붙여넣어 발송하세요.");
  }

  async function saveDraft(markSent: boolean) {
    if (!draft) return;
    setStatus("saving");
    setMessage(null);
    try {
      const res = await fetch("/api/admin/bot/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          source,
          rawText,
          responseText: editedText,
          markSent,
        }),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "저장 실패");
      }
      setStatus("saved");
      setMessage(markSent ? "인박스에 저장하고 발송 완료로 표시했습니다." : "인박스에 초안으로 저장했습니다.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "저장 실패");
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg border border-white/10 bg-card p-5">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">요청 글 입력</h2>
          <p className="mt-1 text-sm text-muted-foreground">외부 플랫폼의 견적 요청 원문을 붙여넣습니다.</p>
        </div>

        <label className="mb-2 block text-xs font-medium text-muted-foreground">채널</label>
        <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2">
          {SOURCES.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setSource(item.value)}
              className={`h-9 rounded-lg border px-3 text-sm transition ${
                source === item.value ? "border-primary bg-primary text-primary-foreground" : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <label className="mb-2 block text-xs font-medium text-muted-foreground">클라이언트 요청 원문</label>
        <textarea
          value={rawText}
          onChange={(event) => setRawText(event.target.value)}
          rows={14}
          className="w-full resize-none rounded-lg border border-white/10 bg-white/5 p-4 text-sm outline-none transition placeholder:text-muted-foreground/50 focus:border-primary/60"
          placeholder="예: 회사 소개 PPT 30장, 다음주 월요일까지 필요합니다..."
        />

        <button
          type="button"
          disabled={!canGenerate}
          onClick={generateDraft}
          className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-85 disabled:opacity-40"
        >
          {status === "generating" ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
          V6 응답 생성
        </button>
      </section>

      <section className="rounded-lg border border-white/10 bg-card p-5">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">응답 초안</h2>
            <p className="mt-1 text-sm text-muted-foreground">필요한 문구를 수정한 뒤 복사하거나 인박스에 저장합니다.</p>
          </div>
          {draft && (
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-white/10 px-2 py-1">{draft.category}</span>
              <span className="rounded-full border border-white/10 px-2 py-1">{Math.round(draft.confidence * 100)}%</span>
              <span className="rounded-full border border-white/10 px-2 py-1">₩{draft.eventPrice.toLocaleString("ko-KR")}</span>
            </div>
          )}
        </div>

        <textarea
          value={editedText}
          onChange={(event) => setEditedText(event.target.value)}
          rows={20}
          className="w-full resize-none rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-6 outline-none transition placeholder:text-muted-foreground/50 focus:border-primary/60"
          placeholder="생성된 응답이 여기에 표시됩니다."
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={!editedText}
            onClick={copyText}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm transition hover:bg-white/5 disabled:opacity-40"
          >
            {status === "copied" ? <Check className="size-4" /> : <Clipboard className="size-4" />}
            복사
          </button>
          <button
            type="button"
            disabled={!draft || status === "saving"}
            onClick={() => saveDraft(false)}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm transition hover:bg-white/5 disabled:opacity-40"
          >
            <Save className="size-4" />
            초안 저장
          </button>
          <button
            type="button"
            disabled={!draft || status === "saving"}
            onClick={() => saveDraft(true)}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground transition hover:opacity-85 disabled:opacity-40"
          >
            <Check className="size-4" />
            발송 완료 저장
          </button>
        </div>

        {message && (
          <p className={`mt-4 rounded-lg px-4 py-3 text-sm ${status === "error" ? "bg-red-500/10 text-red-300" : "bg-white/5 text-muted-foreground"}`}>
            {message}
          </p>
        )}
      </section>
    </div>
  );
}
