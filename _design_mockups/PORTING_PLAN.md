# Design Mockups → Next.js 이식 계획서

> **목적**: `_design_mockups/` 의 HTML 시안 7개를 실제 Next.js 라우트/컴포넌트로 이식.
> **읽는 사람**: VS Code의 Claude Code (또는 직접 작업하는 의장).
> **현재 상태**: 시안 디자인은 완성, 실제 사이트(`app/[locale]/...`)는 아직 v1 디자인 상태.

---

## 0. 한눈에 보는 매핑

| # | 시안 파일 (HTML) | 실제 사이트 라우트 | 타깃 컴포넌트 |
|---|---|---|---|
| ① | `00b_main_v2_kpi_stacked.html` | `/[locale]` | `app/[locale]/page.tsx` + 신규 매거진 톤 섹션들 |
| ② | `01_web_dev_v2.html` | `/[locale]/services/website` (또는 `[category]/page.tsx` 의 web 케이스) | `app/[locale]/services/[category]/page.tsx` — `category === "website"` 분기 |
| ③ | `01_web_dev_portfolio.html` | `/[locale]/portfolio/category/website` | `app/[locale]/portfolio/category/[category]/page.tsx` — IDE 톤 분기 |
| ④ | `01_web_dev_resources.html` | `/[locale]/services/website/resources` (신규) | 신규 라우트 + 신규 컴포넌트 |
| ⑤ | `02_detail_page_v2.html` | `/[locale]/services/detail-page` | 동일 분기 (라이프스타일 톤) |
| ⑥ | `02_detail_page_portfolio.html` | `/[locale]/portfolio/category/detail-page` | 라이프스타일 톤 분기 |
| ⑦ | `02_detail_page_resources.html` | `/[locale]/services/detail-page/resources` | 신규 라우트 |
| ⑧ | `03_ppt_v2.html` | `/[locale]/services/ppt` | 컨설턴트 톤 분기 |
| ⑨ | `03_ppt_portfolio.html` | `/[locale]/portfolio/category/ppt` | 컨설턴트 톤 분기 |
| ⑩ | `03_ppt_resources.html` | `/[locale]/services/ppt/resources` | 신규 라우트 |

> **실제 `category` ID 확인**: `lib/services-data.ts` 의 `servicesData` 배열에서 `id` 값 확인 (`website`, `automation-app`, `logo-business-card`, `video-content`, `detail-page`, `ppt`, … 식). 시안과 1:1 매핑되는지 먼저 점검.

---

## 1. 카테고리별 디자인 시스템 (반드시 유지)

각 카테고리는 **고유 톤**을 갖는다. 메인 → 01 → 02 → 03 페이지 톤이 다르다는 점이 핵심 컨셉.

### 메인 페이지 (`00b_main_v2_kpi_stacked.html`) — 매거진 톤
- **컬러**: `--paper #F5F0E8` / `--ink #1A1614` / `--vintage-red #C8472D` / `--mustard #D4A53B`
- **폰트**: Marcellus (display) + Cormorant Garamond (serif italic) + Pretendard (body)
- **컨셉**: Vol 2026 · No 5 · May 마스트헤드, 매거진 표지, Editor's Note 2x2 그리드, 히어로 누적 작업 곡선 그래프, Manifesto 섹션

### 01 웹 개발 (`01_web_dev_v2.html`) — IDE 톤
- **컬러**: `--bg #0D1117` / `--fg #F0F6FC` / `--mint #4DD4AC` / `--amber #FFB347`
- **폰트**: JetBrains Mono (mono/display) + Pretendard (body)
- **컨셉**: VS Code 윈도우 크롬 (3개 traffic dots), 탭바 `.tsx` 파일들, `$ aio ...` 터미널 프롬프트, git log 스타일 프로세스 타임라인

### 02 상세페이지 (`02_detail_page_v2.html`) — 라이프스타일 매거진 톤
- **컬러**: `--cream #FAF5EE` / `--ink #2A2418` / `--rose #D9526E`
- **폰트**: Fraunces italic (display) + Plus Jakarta Sans (sans) + Pretendard (body)
- **컨셉**: 3 product strips (뷰티/푸드/패션), 5조건 공식, 8 커머스 vertical 그리드, 잡지 표지 카드 (Vol. 01, 02…)

### 03 PPT (`03_ppt_v2.html`) — 컨설턴트/도시에 톤
- **컬러**: `--paper #FFFFFF` / `--ink #0E1A2B` / `--navy #1B3B5F` / `--gold #C9A961`
- **폰트**: Inter (sans/bold) + Cormorant Garamond italic (serif) + IBM Plex Mono
- **컨셉**: 슬라이드 reel (10장), Audit Before/After 화살표 그리드, Industries 2x4, 골드 스탬프 (S/I/V/D), 검정 솔리드 CTA 버튼

> **금기**: 4가지 톤을 섞지 말 것. 카테고리마다 디자인이 완전히 달라야 "각 분야 전문가"라는 컨셉이 산다.

---

## 2. 작업 순서 (권장)

너무 큰 작업이라 한 번에 끝내려 하지 말 것. 페이지 단위로 1~2일씩, MVP-first.

### Phase 1 — 디자인 시스템 토큰 정리 (반나절)
1. `app/globals.css` 에 카테고리별 CSS 변수 4세트 정의 (메인/IDE/라이프/컨설턴트)
2. Google Fonts 로딩: `app/[locale]/layout.tsx` 의 `<link>` 에 Marcellus / JetBrains Mono / Fraunces / Inter / Cormorant / IBM Plex Mono 추가
3. 카테고리별 wrapper 클래스 만들기 (예: `.tone-magazine`, `.tone-ide`, `.tone-lifestyle`, `.tone-consultant`) — 페이지 단위로 토큰 스코프

### Phase 2 — 메인 페이지 이식 (1일)
시안 `00b_main_v2_kpi_stacked.html` → `app/[locale]/page.tsx`

기존 컴포넌트를 매거진 톤 신규 컴포넌트로 갈아끼움:
- `HeroSection` → 신규 `MagazineHero` (Vol 2026 마스트헤드 + 누적 작업 곡선 그래프 + Editor's Note 2x2)
- `WhyMeStrip` → 신규 `EditorsPick` 2x2 카드
- `FeaturedMasonry` 는 매거진 톤으로 재스타일
- `TestimonialsSection`, `FaqSection` 도 매거진 톤으로 재스타일

> 시안 HTML 의 인라인 `<style>` 블록을 그대로 컴포넌트의 module CSS / Tailwind className 으로 옮기는 작업.

### Phase 3 — 01 웹 개발 (서비스/포트폴리오/꿀팁받기) — 1.5일
- 시안 ②③④ 동시 작업
- `app/[locale]/services/[category]/page.tsx` 에서 `category === "website"` 일 때 IDE 톤 layout/sections 사용
- 또는 별도 라우트 `app/[locale]/services/website/page.tsx` 만들어 독립 처리

### Phase 4 — 02 상세페이지 (1.5일)
- 시안 ⑤⑥⑦ 동시 작업
- 라이프스타일 톤 + Fraunces italic

### Phase 5 — 03 PPT (1.5일)
- 시안 ⑧⑨⑩ 동시 작업
- 컨설턴트 톤 + 골드 스탬프

> **총 예상**: 5~6일 분량. Phase 별로 GitHub commit + Vercel 배포 확인하면서 진행.

---

## 3. 페이지 탭 구조 (3-탭) 처리

시안에서 각 카테고리 페이지에 `01 services / 02 portfolio / 03 꿀팁받기` 3-탭 도입.

실제 Next.js에서는 **별도 라우트**로 분리:
- `/services/website` ← services 탭 (메인)
- `/portfolio/category/website` ← portfolio 탭
- `/services/website/resources` ← 꿀팁받기 탭 (신규)

탭 자체는 공통 컴포넌트 `<CategoryTabs category="website" active="services|portfolio|resources" />` 로 추상화. 각 탭 클릭 시 해당 라우트로 이동.

---

## 4. 꿀팁받기 (Resources) 신규 라우트

지금 사이트엔 없음 → 신규로 만들어야 함.

### 4-1. 라우트 구조
```
app/[locale]/services/[category]/resources/page.tsx
```
또는 카테고리별 명시 라우트:
```
app/[locale]/services/website/resources/page.tsx
app/[locale]/services/detail-page/resources/page.tsx
app/[locale]/services/ppt/resources/page.tsx
```

### 4-2. 자료 데이터 구조
`lib/resources-data.ts` 신규 작성. 시안의 카드 데이터를 옮긴다.

```ts
export type ResourceCategory = "checklist" | "guide" | "comparison" | "workflow" | "conversion" | "vertical" | "copy" | "basics" | "story" | "ir" | "visual" | "delivery";

export type Resource = {
  id: string;
  serviceCategory: "website" | "detail-page" | "ppt";
  category: ResourceCategory;
  title: { ko: string; en: string };
  description: { ko: string; en: string };
  pages: number;
  format: "PDF" | "PPTX" | "DOCX";
  sizeMB: number;
  fileUrl: string; // 실제 PDF/PPTX 파일 경로 (public/resources/...)
  updatedAt: string;
  rating?: number;
  featured?: boolean;
};

export const resources: Resource[] = [
  // 01 웹 14편 + 02 상세 12편 + 03 PPT 13편 = 총 39편
];
```

### 4-3. 실제 다운로드 파일
`public/resources/{category}/{filename}.pdf` 에 실제 PDF/PPTX 업로드.
처음엔 "준비 중" placeholder로 시작 가능. 다운로드 클릭 시 신청 폼 → 이메일 발송 흐름도 가능.

### 4-4. 뉴스레터 구독
시안 하단에 있는 구독 폼은 별도 시스템 필요:
- Supabase `newsletter_subscribers` 테이블 신규 (`009_newsletter.sql` 마이그레이션)
- `app/api/newsletter/subscribe/route.ts` 신규 API
- (선택) Resend로 환영 메일 발송

---

## 5. Claude Code 한테 줄 첫 프롬프트 (복사·붙여넣기)

VS Code 에서 Claude Code 열고 첫 메시지로 아래를 그대로 던지면 됩니다:

```
@_design_mockups/PORTING_PLAN.md 읽고 Phase 1 (디자인 시스템 토큰 정리) 부터
시작하자. 작업 시작 전 다음을 먼저 알려줘:

1. 현재 app/globals.css 에 정의된 토큰 vs 새로 추가할 토큰 차이
2. layout.tsx 의 폰트 로딩 방식 확인 (next/font 쓰는지, <link> 직접인지)
3. Tailwind config 에 카테고리 톤별 색상 추가 vs CSS 변수만 쓰기 — 어느 쪽이 나을지

내가 OK 하면 작업 시작.
```

Phase 마다 같은 방식으로 진행:
- Phase 1 끝나면 → Phase 2 진행 요청
- 각 Phase 끝나면 `git add . && git commit -m "feat(design): Phase X — 메인 매거진 톤 이식"` + push

---

## 6. 주의 사항

### 6-1. 시안 HTML의 인라인 GSAP 애니메이션
시안에는 GSAP CDN + ScrollTrigger 가 들어가 있다. Next.js로 옮길 때는:
- 옵션 A: GSAP를 npm 패키지로 설치 (`npm i gsap`) → React `useEffect` 안에서 ScrollTrigger 등록
- 옵션 B: Framer Motion 으로 대체 (Next.js 와 더 친함, 학습 곡선 있음)
- 옵션 C: CSS-only 애니메이션으로 단순화 (가장 빠른 MVP)

권장: 처음엔 **옵션 C (CSS-only)** 로 빠르게 끝낸 다음, 나중에 옵션 A/B 로 강화.

### 6-2. SEO + metadata
이식 시 `generateMetadata()` 에서 카테고리별 OG 이미지·title·description 갱신 잊지 말 것. 현재 `services/[category]/page.tsx` 에 패턴 있음.

### 6-3. 다국어 (i18n)
시안은 한국어 only. 영어 카피는 `next-intl` 의 messages JSON 에 추가. 처음엔 한국어로만 작업하고, 끝나면 영어 추가하는 게 효율적.

### 6-4. Mobile-first 검증
시안 4개 모두 모바일 반응형 확인 완료 상태. Next.js 이식 후에도 dev tools 로 320px / 375px / 768px / 1024px 각각 점검.

### 6-5. 푸시 후 Vercel 자동 배포
master 브랜치에 push 하면 Vercel이 자동 빌드. 빌드 실패 시 메일 알림 옴. 빌드 로그는 Vercel dashboard 에서 확인.

---

## 7. 작업 완료 체크리스트

각 Phase 끝날 때 아래 확인:

- [ ] 시안 HTML 과 실제 라우트 시각 비교 (BAD/GOOD 스크린샷)
- [ ] 모바일 반응형 (320 / 375 / 768 / 1024) 점검
- [ ] Lighthouse 점수 (Performance / Accessibility / SEO ≥ 90)
- [ ] `npm run build` 로컬 통과
- [ ] master 브랜치 push → Vercel 빌드 READY 확인
- [ ] 실제 사이트(aio-make.com)에서 화면 변경 확인

---

## 8. 만약 막히면

VS Code Claude Code 에게 다음 식으로 도움 요청:

```
@_design_mockups/01_web_dev_v2.html 의 hero 섹션을
@components/sections/hero-section.tsx 로 옮기려는데,
JetBrains Mono 폰트 적용이 안 돼. layout.tsx 어떻게 고쳐야 해?
```

`@filepath` 로 참조하면 Claude Code 가 해당 파일을 자동으로 읽음.

---

**작성**: 2026-05-11
**마지막 갱신**: 시안 마지막 commit `ef024f8` 기준
