import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

const STACK = [
  "Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4",
  "Supabase", "Vercel", "Python 3.12", "n8n",
  "React Native / Expo", "Remotion", "Resend", "shadcn/ui",
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <main className="pb-24 pt-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">

        {/* 헤더 */}
        <div className="mb-16 flex items-center gap-3">
          <span className="h-px w-10 bg-primary" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {t("title")}
          </span>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          {/* 소개 */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {t("name")}
              </h1>
              <p className="mt-2 text-sm text-primary font-semibold">{t("role")}</p>
            </div>
            <p className="text-sm leading-8 text-muted-foreground">{t("bio")}</p>

            {/* KPI 카드 */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { value: "18+", label: "완성 프로젝트" },
                { value: "5일", label: "기본 납기" },
                { value: "8개국", label: "자동화 운영" },
                { value: "189", label: "Python 파일" },
                { value: "68/68", label: "테스트 통과" },
                { value: "2h", label: "견적 응답" },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="flex flex-col gap-1 rounded-xl border border-white/8 bg-card p-4"
                >
                  <span className="font-mono text-2xl font-bold text-primary">{kpi.value}</span>
                  <span className="text-xs text-muted-foreground">{kpi.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 기술 스택 + 사업자 정보 */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-foreground">{t("stackTitle")}</h2>
              <div className="flex flex-wrap gap-2">
                {STACK.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-card p-6">
              <h2 className="mb-4 text-sm font-semibold text-foreground">{t("businessTitle")}</h2>
              <dl className="flex flex-col gap-2.5 text-xs text-muted-foreground">
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 text-muted-foreground/60">상호명</dt>
                  <dd>에이아이오 (AIO)</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 text-muted-foreground/60">사업자번호</dt>
                  <dd>682-01-02748</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 text-muted-foreground/60">대표자</dt>
                  <dd>정재홍</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 text-muted-foreground/60">주소</dt>
                  <dd>경기도 김포시 대곶면 흥신로67</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 text-muted-foreground/60">이메일</dt>
                  <dd>koreabencb@gmail.com</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
