import type { Metadata } from "next";
import { QuoteForm } from "@/components/sections/quote-form";

export const metadata: Metadata = {
  title: "견적 문의",
};

export default async function QuotePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; subtype?: string; source?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  const l = locale as "ko" | "en";

  return (
    <main className="pb-24 pt-28">
      <div className="mx-auto w-full max-w-[1100px] px-6 lg:px-12">
        <div className="mb-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Quote
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {l === "ko" ? "구조화 견적 문의" : "Structured Quote Request"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            {l === "ko"
              ? "작업 종류, 예산, 일정이 정리되어 들어오면 1시간 내 임시 답변과 24시간 내 견적 제안서를 더 정확하게 드릴 수 있습니다."
              : "A structured request lets me send a quick first reply within 1 hour and a clearer quote within 24 hours."}
          </p>
        </div>

        <QuoteForm
          locale={l}
          initialCategory={query.category}
          initialSubtype={query.subtype}
          initialSource={query.source}
        />
      </div>
    </main>
  );
}
