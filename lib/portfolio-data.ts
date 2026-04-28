export type PortfolioType = "web" | "app" | "design" | "video" | "automation";
export type MediaPolicy = "external-link" | "rich-gallery";
export type LocalizedString = { ko: string; en: string };
export type PortfolioSubtype =
  // web
  | "landing"
  | "homepage-basic"
  | "homepage-detail"
  // app
  | "mvp-basic"
  | "mvp-standard"
  | "mvp-pro"
  // design
  | "logo"
  | "business-card"
  | "detail-page"
  | "ppt"
  | "card-news"
  | "infographic"
  // video
  | "marketing-video"
  | "shorts-set"
  | "tutorial"
  | "remotion-asset"
  // automation
  | "automation-simple"
  | "automation-standard"
  | "automation-advanced"
  | "chatbot";

export interface KpiCard {
  value: string;
  unit?: string;
  label: LocalizedString;
}

export interface BeforeAfter {
  before: string;
  after: string;
  beforeLabel: LocalizedString;
  afterLabel: LocalizedString;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  type: PortfolioType;
  subtype?: PortfolioSubtype;
  mediaPolicy: MediaPolicy;
  title: LocalizedString;
  summary: LocalizedString;
  problem: LocalizedString;
  solution: LocalizedString;
  impact: LocalizedString;
  kpis?: KpiCard[];
  stack: string[];
  role: string[];
  duration: string;
  client: string;
  links: {
    live: string | null;
    github: string | null;
    case: string;
    storeIos?: string | null;
    storeAndroid?: string | null;
    video?: string | null;
    architecture?: string | null;
  };
  cover: string;
  thumbnail?: string;
  gallery: string[];
  beforeAfter?: BeforeAfter;
  size: "sm" | "md" | "lg";
  featured: boolean;
  publishedAt: string;
}

export const portfolioTypeColors: Record<PortfolioType, string> = {
  web: "#7c3aed",
  app: "#f59e0b",
  design: "#f43f5e",
  video: "#06b6d4",
  automation: "#10b981",
};

export const portfolioTypes: {
  label: LocalizedString;
  value: PortfolioType | "all";
}[] = [
  { value: "all", label: { ko: "전체", en: "All" } },
  { value: "web", label: { ko: "웹", en: "Web" } },
  { value: "app", label: { ko: "앱", en: "App" } },
  { value: "design", label: { ko: "디자인", en: "Design" } },
  { value: "video", label: { ko: "영상", en: "Video" } },
  { value: "automation", label: { ko: "자동화", en: "Automation" } },
];

export const portfolioProjects: PortfolioProject[] = [
  // ── 🌐 WEB ─────────────────────────────────────────
  {
    id: "chueok-korea",
    slug: "chueok-korea",
    type: "web",
    subtype: "homepage-basic",
    mediaPolicy: "external-link",
    title: { ko: "추억코리아 — 여행 랜딩페이지", en: "Chueok Korea — Travel Landing" },
    summary: {
      ko: "한국 여행 감성을 담은 풀스크린 랜딩페이지. Next.js 15 + Tailwind로 2일 내 완성.",
      en: "Full-screen travel landing page for Korea tourism. Next.js 15 + Tailwind, delivered in 2 days.",
    },
    problem: { ko: "한국 여행 콘텐츠를 빠르게 온라인에 론칭해야 했습니다.", en: "Needed to launch Korean travel content online quickly." },
    solution: { ko: "Next.js 15 App Router와 Tailwind 4로 반응형 랜딩을 2일 내 완성했습니다.", en: "Built a responsive landing page with Next.js 15 App Router in 2 days." },
    impact: { ko: "론칭 직후 모바일·데스크톱 모두 Lighthouse 95+ 달성.", en: "Lighthouse 95+ on both mobile and desktop right after launch." },
    stack: ["Next.js 15", "Tailwind 4", "Vercel"],
    role: ["기획", "디자인", "개발", "배포"],
    duration: "2일",
    client: "chueok-korea",
    links: {
      live: "https://chueok-korea.vercel.app",
      github: "https://github.com/johnjung88/chueok-korea",
      case: "/portfolio/chueok-korea",
    },
    cover: "/portfolio/chueok-korea/cover.webp",
    gallery: [],
    size: "md",
    featured: true,
    publishedAt: "2026-02-21",
  },
  {
    id: "aio-design-agency",
    slug: "aio-design-agency",
    type: "web",
    subtype: "homepage-detail",
    mediaPolicy: "external-link",
    title: { ko: "AIO에이전시 포트폴리오 사이트", en: "AIO Agency Portfolio Site" },
    summary: {
      ko: "이 사이트 자체. Next.js 15 + next-intl 한·영 i18n + 5 카테고리 포트폴리오 허브.",
      en: "This site itself. Next.js 15 + next-intl bilingual + 5-category portfolio hub.",
    },
    problem: { ko: "숨고/크몽 견적 응대 시 신뢰도를 즉시 입증할 단일 링크가 필요했습니다.", en: "Needed a single link to instantly prove credibility for client quotes." },
    solution: { ko: "5 카테고리 × 한·영 포트폴리오 허브를 3일 내 V1 라이브로 완성했습니다.", en: "Built a 5-category bilingual portfolio hub in 3 days to V1 live." },
    impact: { ko: "숨고·크몽 프로필에 즉시 연동 → 견적 응대 신뢰도 대폭 향상.", en: "Instantly linked to Soomgo/Kmong profiles → dramatically improved quote trust." },
    stack: ["Next.js 15", "next-intl", "Tailwind 4", "shadcn/ui", "Supabase", "Resend", "Vercel"],
    role: ["기획", "디자인", "개발", "배포"],
    duration: "3일",
    client: "자체 프로젝트",
    links: {
      live: "https://ai-design-agency.vercel.app",
      github: "https://github.com/johnjung88/ai-design-agency",
      case: "/portfolio/aio-design-agency",
    },
    cover: "/portfolio/aio-design-agency/cover.webp",
    gallery: [],
    size: "lg",
    featured: true,
    publishedAt: "2026-04-29",
  },
  {
    id: "v-aio-visa",
    slug: "v-aio-visa",
    type: "web",
    subtype: "homepage-basic",
    mediaPolicy: "external-link",
    title: { ko: "비자 서비스 웹사이트", en: "Visa Service Website" },
    summary: {
      ko: "비자 신청 대행 서비스를 위한 전환 중심 웹사이트. NDA 프로젝트.",
      en: "Conversion-focused website for a visa application service. NDA project.",
    },
    problem: { ko: "비자 서비스의 복잡한 절차를 직관적으로 안내하는 온라인 채널이 필요했습니다.", en: "Needed an online channel to clearly guide users through complex visa procedures." },
    solution: { ko: "단계별 안내 UI와 명확한 CTA 구조로 전환율을 높이는 사이트를 제작했습니다.", en: "Built a step-by-step guidance UI with clear CTA structure to maximize conversion." },
    impact: { ko: "문의 폼 전환율 향상. 서비스 상담 건수 증가.", en: "Improved inquiry form conversion rate and increased consultation requests." },
    stack: ["Next.js", "Tailwind", "Vercel"],
    role: ["개발", "배포"],
    duration: "5일",
    client: "비공개 (NDA)",
    links: {
      live: "https://visa-service-omega.vercel.app",
      github: null,
      case: "/portfolio/v-aio-visa",
    },
    cover: "/portfolio/v-aio-visa/cover.webp",
    gallery: [],
    size: "sm",
    featured: false,
    publishedAt: "2026-02-04",
  },
  {
    id: "mission-control",
    slug: "mission-control",
    type: "web",
    subtype: "homepage-basic",
    mediaPolicy: "external-link",
    title: { ko: "Mission Control — 태스크 관리 앱", en: "Mission Control — Task Manager" },
    summary: {
      ko: "팀 프로젝트 추적을 위한 대시보드형 태스크 관리 웹앱. NDA 프로젝트.",
      en: "Dashboard-style task management web app for team project tracking. NDA project.",
    },
    problem: { ko: "팀의 프로젝트 진행 상황을 한눈에 파악할 수 있는 도구가 필요했습니다.", en: "Needed a tool to track team project progress at a glance." },
    solution: { ko: "드래그 앤 드롭 칸반 보드와 실시간 상태 업데이트를 갖춘 웹앱을 제작했습니다.", en: "Built a web app with drag-and-drop Kanban board and real-time status updates." },
    impact: { ko: "프로젝트 상태 파악 시간 단축. 팀 커뮤니케이션 효율화.", en: "Reduced time to understand project status. Streamlined team communication." },
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    role: ["개발", "배포"],
    duration: "5일",
    client: "비공개 (NDA)",
    links: {
      live: "https://mission-control-eta-neon.vercel.app",
      github: null,
      case: "/portfolio/mission-control",
    },
    cover: "/portfolio/mission-control/cover.webp",
    gallery: [],
    size: "sm",
    featured: false,
    publishedAt: "2026-02-19",
  },

  // ── 📱 APP ─────────────────────────────────────────
  {
    id: "koready",
    slug: "koready",
    type: "app",
    subtype: "mvp-basic",
    mediaPolicy: "rich-gallery",
    title: { ko: "KoReady — 국어 교육 모바일 앱", en: "KoReady — Korean Education App" },
    summary: {
      ko: "외국인을 위한 국어 교육 MVP 앱. 학습 진도 추적 + 퀴즈 + 어휘 카드 기능.",
      en: "Korean education MVP app for foreigners. Progress tracking + quiz + vocabulary cards.",
    },
    problem: { ko: "기존 국어 교육 앱들이 외국인 초보자에게 직관적이지 않았습니다.", en: "Existing Korean education apps were not intuitive for foreign beginners." },
    solution: { ko: "레벨별 퀴즈, 어휘 카드, 학습 진도 트래커를 5일 내 MVP로 완성했습니다.", en: "Built level-based quizzes, vocabulary cards, and progress tracker as MVP in 5 days." },
    impact: { ko: "아이디어 검증용 MVP 완성. 스토어 등록 준비 완료.", en: "MVP complete for idea validation. Ready for store submission." },
    stack: ["React Native", "TypeScript", "Supabase"],
    role: ["기획", "디자인", "개발"],
    duration: "5일",
    client: "자체 프로젝트",
    links: {
      live: null,
      github: "https://github.com/johnjung88/koready",
      case: "/portfolio/koready",
      storeIos: null,
      storeAndroid: null,
      video: null,
    },
    cover: "/portfolio/koready/cover.webp",
    gallery: [
      "/portfolio/koready/01-onboarding.webp",
      "/portfolio/koready/02-home.webp",
      "/portfolio/koready/03-quiz.webp",
      "/portfolio/koready/04-vocab.webp",
      "/portfolio/koready/05-progress.webp",
    ],
    size: "md",
    featured: true,
    publishedAt: "2026-02-27",
  },

  // ── ⚙️ AUTOMATION ────────────────────────────────
  {
    id: "t-aio",
    slug: "t-aio",
    type: "automation",
    subtype: "automation-standard",
    mediaPolicy: "rich-gallery",
    title: { ko: "T-AIO — Threads 마케팅 자동화", en: "T-AIO — Threads Marketing Automation" },
    summary: {
      ko: "Threads 계정 마케팅을 자동화하는 풀스택 도구. 콘텐츠 생성·예약 발행·분석.",
      en: "Full-stack tool automating Threads account marketing. Content gen, scheduling, analytics.",
    },
    problem: { ko: "Threads 마케팅에 매일 2~3시간을 쏟아도 결과가 불안정했습니다.", en: "Spending 2–3 hours daily on Threads marketing with inconsistent results." },
    solution: { ko: "콘텐츠 자동 생성 → 예약 발행 → 분석 리포트의 풀 파이프라인을 구축했습니다.", en: "Built a full pipeline: auto content generation → scheduled publishing → analytics report." },
    impact: { ko: "일일 운영 시간 80% 절감. 라이브로 운영 중.", en: "80% reduction in daily ops time. Running live." },
    stack: ["Next.js 15", "TypeScript", "Supabase", "Vercel"],
    role: ["기획", "개발", "배포", "운영"],
    duration: "5일",
    client: "자체 프로젝트",
    links: {
      live: "https://t-aio.vercel.app",
      github: "https://github.com/johnjung88/t-aio",
      case: "/portfolio/t-aio",
      video: null,
    },
    cover: "/portfolio/t-aio/cover.webp",
    gallery: [
      "/portfolio/t-aio/01-dashboard.webp",
      "/portfolio/t-aio/02-scheduler.webp",
      "/portfolio/t-aio/03-analytics.webp",
    ],
    size: "md",
    featured: true,
    publishedAt: "2026-03-10",
  },
  {
    id: "blogautopilot-multinational",
    slug: "blogautopilot-multinational",
    type: "automation",
    subtype: "automation-advanced",
    mediaPolicy: "rich-gallery",
    title: {
      ko: "BlogAutoPilot — 8개국 18계정 콘텐츠 자동화",
      en: "BlogAutoPilot — 8-Country 18-Account Content Automation",
    },
    summary: {
      ko: "8개국·18계정·55스케줄을 동시 운영하는 대규모 콘텐츠 자동화 시스템. Python 189파일, 테스트 68/68 통과.",
      en: "Large-scale content automation running 8 countries, 18 accounts, 55 schedules. 189 Python files, 68/68 tests passing.",
    },
    problem: {
      ko: "다국어 블로그 18개를 수동으로 운영하면 하루 8시간이 필요했습니다.",
      en: "Manually running 18 multilingual blogs required 8 hours daily.",
    },
    solution: {
      ko: "콘텐츠 수집→생성→번역→발행→모니터링의 풀 파이프라인을 자동화했습니다.",
      en: "Automated the full pipeline: content collection → generation → translation → publishing → monitoring.",
    },
    impact: {
      ko: "하루 8시간 → 5분으로 단축. 8개국 18계정 55스케줄 동시 운영 중.",
      en: "8 hours per day → 5 minutes. 8 countries, 18 accounts, 55 schedules running simultaneously.",
    },
    kpis: [
      { value: "8", unit: "개국", label: { ko: "글로벌 커버", en: "Countries" } },
      { value: "18", unit: "계정", label: { ko: "통합 운영", en: "Accounts" } },
      { value: "55", unit: "개", label: { ko: "동시 스케줄", en: "Schedules" } },
      { value: "189", unit: "파일", label: { ko: "Python 코드", en: "Python files" } },
      { value: "68/68", unit: "", label: { ko: "테스트 통과", en: "Tests passing" } },
    ],
    stack: ["Python", "n8n", "Supabase", "네이버 API", "콘텐츠 자동화"],
    role: ["기획", "아키텍처", "개발", "운영"],
    duration: "5일 (지속 운영)",
    client: "자체 프로젝트",
    links: {
      live: null,
      github: null,
      case: "/portfolio/blogautopilot-multinational",
      video: null,
      architecture: "/portfolio/blogautopilot-multinational/architecture.svg",
    },
    cover: "/portfolio/blogautopilot-multinational/cover.webp",
    gallery: [
      "/portfolio/blogautopilot-multinational/01-architecture.webp",
      "/portfolio/blogautopilot-multinational/02-dashboard.webp",
      "/portfolio/blogautopilot-multinational/03-schedule.webp",
      "/portfolio/blogautopilot-multinational/04-publish-log.webp",
    ],
    size: "lg",
    featured: true,
    publishedAt: "2026-04-01",
  },
  {
    id: "blogautopilot-career",
    slug: "blogautopilot-career",
    type: "automation",
    subtype: "automation-advanced",
    mediaPolicy: "rich-gallery",
    title: { ko: "BlogAutoPilot Career — 취업·커리어 콘텐츠 자동화", en: "BlogAutoPilot Career — Job & Career Content Automation" },
    summary: { ko: "취업·커리어 특화 블로그 자동 발행 시스템.", en: "Automated blog publishing system specialized in career content." },
    problem: { ko: "커리어 콘텐츠를 일관되게 발행하려면 매일 2시간이 필요했습니다.", en: "Consistently publishing career content required 2 hours daily." },
    solution: { ko: "수집→생성→최적화→발행 파이프라인 자동화.", en: "Automated collect → generate → optimize → publish pipeline." },
    impact: { ko: "일일 커리어 콘텐츠 자동 발행 달성.", en: "Daily career content auto-publishing achieved." },
    stack: ["Python", "콘텐츠 자동화"],
    role: ["개발", "운영"],
    duration: "3일",
    client: "자체 프로젝트",
    links: { live: null, github: null, case: "/portfolio/blogautopilot-career" },
    cover: "/portfolio/blogautopilot-career/cover.webp",
    gallery: [],
    size: "sm",
    featured: false,
    publishedAt: "2026-03-01",
  },
  {
    id: "blogautopilot-finance",
    slug: "blogautopilot-finance",
    type: "automation",
    subtype: "automation-advanced",
    mediaPolicy: "rich-gallery",
    title: { ko: "BlogAutoPilot Finance — 금융·재테크 콘텐츠 자동화", en: "BlogAutoPilot Finance — Finance Content Automation" },
    summary: { ko: "금융·재테크 특화 블로그 자동 발행 시스템.", en: "Automated blog publishing for finance content." },
    problem: { ko: "금융 정보 최신화 및 발행 반복 작업이 많았습니다.", en: "Financial content required constant updating and repetitive publishing tasks." },
    solution: { ko: "실시간 데이터 수집 → 콘텐츠 생성 → 자동 발행.", en: "Real-time data collection → content generation → auto publishing." },
    impact: { ko: "일일 금융 콘텐츠 자동 발행.", en: "Daily finance content auto-publishing." },
    stack: ["Python", "콘텐츠 자동화"],
    role: ["개발", "운영"],
    duration: "3일",
    client: "자체 프로젝트",
    links: { live: null, github: null, case: "/portfolio/blogautopilot-finance" },
    cover: "/portfolio/blogautopilot-finance/cover.webp",
    gallery: [],
    size: "sm",
    featured: false,
    publishedAt: "2026-03-01",
  },
  {
    id: "blogautopilot-health",
    slug: "blogautopilot-health",
    type: "automation",
    subtype: "automation-advanced",
    mediaPolicy: "rich-gallery",
    title: { ko: "BlogAutoPilot Health — 건강·라이프스타일 자동화", en: "BlogAutoPilot Health — Health Content Automation" },
    summary: { ko: "건강·라이프스타일 특화 블로그 자동 발행 시스템.", en: "Automated blog publishing for health content." },
    problem: { ko: "건강 정보 콘텐츠를 꾸준히 발행하기 어려웠습니다.", en: "Consistent health content publishing was difficult to maintain." },
    solution: { ko: "건강 정보 자동 수집 → 생성 → 발행 파이프라인.", en: "Health info auto collection → generation → publishing pipeline." },
    impact: { ko: "일일 건강 콘텐츠 자동 발행.", en: "Daily health content auto-publishing." },
    stack: ["Python", "콘텐츠 자동화"],
    role: ["개발", "운영"],
    duration: "3일",
    client: "자체 프로젝트",
    links: { live: null, github: null, case: "/portfolio/blogautopilot-health" },
    cover: "/portfolio/blogautopilot-health/cover.webp",
    gallery: [],
    size: "sm",
    featured: false,
    publishedAt: "2026-03-01",
  },
  {
    id: "blogautopilot-home",
    slug: "blogautopilot-home",
    type: "automation",
    subtype: "automation-advanced",
    mediaPolicy: "rich-gallery",
    title: { ko: "BlogAutoPilot Home — 인테리어·생활 콘텐츠 자동화", en: "BlogAutoPilot Home — Home & Interior Content Automation" },
    summary: { ko: "인테리어·생활 특화 블로그 자동 발행 시스템.", en: "Automated blog publishing for home & interior content." },
    problem: { ko: "인테리어 콘텐츠 발행을 매일 수동으로 해야 했습니다.", en: "Home/interior content required daily manual publishing." },
    solution: { ko: "트렌드 수집 → 콘텐츠 생성 → 자동 발행.", en: "Trend collection → content generation → auto publishing." },
    impact: { ko: "일일 인테리어 콘텐츠 자동 발행.", en: "Daily home/interior content auto-publishing." },
    stack: ["Python", "콘텐츠 자동화"],
    role: ["개발", "운영"],
    duration: "3일",
    client: "자체 프로젝트",
    links: { live: null, github: null, case: "/portfolio/blogautopilot-home" },
    cover: "/portfolio/blogautopilot-home/cover.webp",
    gallery: [],
    size: "sm",
    featured: false,
    publishedAt: "2026-03-01",
  },
  {
    id: "blogautopilot-pet",
    slug: "blogautopilot-pet",
    type: "automation",
    subtype: "automation-advanced",
    mediaPolicy: "rich-gallery",
    title: { ko: "BlogAutoPilot Pet — 반려동물 콘텐츠 자동화", en: "BlogAutoPilot Pet — Pet Content Automation" },
    summary: { ko: "반려동물 특화 블로그 자동 발행 시스템.", en: "Automated blog publishing for pet content." },
    problem: { ko: "반려동물 콘텐츠를 일관되게 생산하기 어려웠습니다.", en: "Consistent pet content production was challenging." },
    solution: { ko: "반려동물 관련 정보 자동 수집 → 생성 → 발행.", en: "Pet info auto collection → generation → publishing." },
    impact: { ko: "일일 반려동물 콘텐츠 자동 발행.", en: "Daily pet content auto-publishing." },
    stack: ["Python", "콘텐츠 자동화"],
    role: ["개발", "운영"],
    duration: "3일",
    client: "자체 프로젝트",
    links: { live: null, github: null, case: "/portfolio/blogautopilot-pet" },
    cover: "/portfolio/blogautopilot-pet/cover.webp",
    gallery: [],
    size: "sm",
    featured: false,
    publishedAt: "2026-03-01",
  },
  {
    id: "blogautopilot-tech",
    slug: "blogautopilot-tech",
    type: "automation",
    subtype: "automation-advanced",
    mediaPolicy: "rich-gallery",
    title: { ko: "BlogAutoPilot Tech — IT·기술 콘텐츠 자동화", en: "BlogAutoPilot Tech — Tech Content Automation" },
    summary: { ko: "IT·기술 특화 블로그 자동 발행 시스템.", en: "Automated blog publishing for tech content." },
    problem: { ko: "기술 트렌드 콘텐츠를 빠르게 발행하기 어려웠습니다.", en: "Publishing tech trend content quickly was difficult." },
    solution: { ko: "기술 뉴스 자동 수집 → 요약 생성 → 발행.", en: "Tech news auto collection → summary generation → publishing." },
    impact: { ko: "일일 IT 콘텐츠 자동 발행.", en: "Daily tech content auto-publishing." },
    stack: ["Python", "콘텐츠 자동화"],
    role: ["개발", "운영"],
    duration: "3일",
    client: "자체 프로젝트",
    links: { live: null, github: null, case: "/portfolio/blogautopilot-tech" },
    cover: "/portfolio/blogautopilot-tech/cover.webp",
    gallery: [],
    size: "sm",
    featured: false,
    publishedAt: "2026-03-01",
  },
  {
    id: "blogautopilot-travel",
    slug: "blogautopilot-travel",
    type: "automation",
    subtype: "automation-advanced",
    mediaPolicy: "rich-gallery",
    title: { ko: "BlogAutoPilot Travel — 여행 콘텐츠 자동화", en: "BlogAutoPilot Travel — Travel Content Automation" },
    summary: { ko: "여행 특화 블로그 자동 발행 시스템.", en: "Automated blog publishing for travel content." },
    problem: { ko: "여행 정보를 다국어로 꾸준히 발행하기 어려웠습니다.", en: "Consistently publishing travel content in multiple languages was challenging." },
    solution: { ko: "여행 정보 자동 수집 → 다국어 콘텐츠 생성 → 발행.", en: "Travel info auto collection → multilingual content generation → publishing." },
    impact: { ko: "일일 여행 콘텐츠 자동 발행 (다국어).", en: "Daily travel content auto-publishing (multilingual)." },
    stack: ["Python", "콘텐츠 자동화"],
    role: ["개발", "운영"],
    duration: "3일",
    client: "자체 프로젝트",
    links: { live: null, github: null, case: "/portfolio/blogautopilot-travel" },
    cover: "/portfolio/blogautopilot-travel/cover.webp",
    gallery: [],
    size: "sm",
    featured: false,
    publishedAt: "2026-03-01",
  },
  {
    id: "w-aio",
    slug: "w-aio",
    type: "automation",
    subtype: "automation-advanced",
    mediaPolicy: "rich-gallery",
    title: { ko: "W-AIO — 블로그 자동화 서비스", en: "W-AIO — Blog Automation Service" },
    summary: {
      ko: "블로그 콘텐츠 자동 생성·발행 서비스. Next.js 15 + 콘텐츠 자동화.",
      en: "Blog content auto-generation and publishing service. Next.js 15 + content automation.",
    },
    problem: { ko: "블로그 콘텐츠를 지속적으로 생성·발행하는 인프라가 필요했습니다.", en: "Needed infrastructure to continuously generate and publish blog content." },
    solution: { ko: "콘텐츠 생성·편집·발행을 통합한 자동화 서비스를 구축했습니다.", en: "Built an automation service integrating content generation, editing, and publishing." },
    impact: { ko: "블로그 콘텐츠 제작 시간 90% 절감.", en: "90% reduction in blog content production time." },
    stack: ["Next.js 15", "TypeScript", "콘텐츠 자동화"],
    role: ["기획", "개발"],
    duration: "5일",
    client: "자체 프로젝트",
    links: {
      live: null,
      github: "https://github.com/johnjung88/w-aio",
      case: "/portfolio/w-aio",
    },
    cover: "/portfolio/w-aio/cover.webp",
    gallery: [],
    size: "md",
    featured: false,
    publishedAt: "2026-03-19",
  },
  {
    id: "youtube-autopilot",
    slug: "youtube-autopilot",
    type: "automation",
    subtype: "automation-advanced",
    mediaPolicy: "rich-gallery",
    title: { ko: "YouTube AutoPilot — 영상 콘텐츠 자동화 파이프라인", en: "YouTube AutoPilot — Video Content Automation Pipeline" },
    summary: {
      ko: "YouTube 콘텐츠 자동화 파이프라인. Next.js 16 + Remotion + Supabase.",
      en: "YouTube content automation pipeline. Next.js 16 + Remotion + Supabase.",
    },
    problem: { ko: "YouTube 콘텐츠를 지속적으로 제작·발행하는 것이 매우 시간 집약적이었습니다.", en: "Continuously producing and publishing YouTube content was extremely time-intensive." },
    solution: { ko: "Remotion으로 코드 기반 영상 자동 생성 + Supabase 스케줄 관리 + 자동 발행.", en: "Code-based video auto-generation with Remotion + Supabase scheduling + auto publishing." },
    impact: { ko: "YouTube 콘텐츠 제작 자동화. 진행 중.", en: "YouTube content production automated. In progress." },
    stack: ["Next.js 16", "TypeScript", "Remotion", "Supabase", "Vercel"],
    role: ["기획", "개발"],
    duration: "진행 중",
    client: "자체 프로젝트",
    links: {
      live: null,
      github: "https://github.com/johnjung88/youtube-autopilot",
      case: "/portfolio/youtube-autopilot",
    },
    cover: "/portfolio/youtube-autopilot/cover.webp",
    gallery: [],
    size: "md",
    featured: true,
    publishedAt: "2026-04-28",
  },
  {
    id: "v-aio-chatbot",
    slug: "v-aio-chatbot",
    type: "automation",
    subtype: "chatbot",
    mediaPolicy: "rich-gallery",
    title: { ko: "V-AIO — 고도화 대화형 어시스턴트", en: "V-AIO — Advanced Conversational Assistant" },
    summary: {
      ko: "복잡한 비즈니스 로직을 처리하는 고도화 대화형 어시스턴트. 멀티채널 지원.",
      en: "Advanced conversational assistant handling complex business logic. Multi-channel support.",
    },
    problem: { ko: "고객 응대·내부 업무 자동화를 위한 맞춤형 대화형 시스템이 필요했습니다.", en: "Needed a custom conversational system for customer support and internal ops automation." },
    solution: { ko: "Intent 분류 → 멀티 액션 실행 → 채널 통합의 고도화 파이프라인을 구축했습니다.", en: "Built an advanced pipeline: intent classification → multi-action execution → channel integration." },
    impact: { ko: "고객 응대 자동화율 향상. 운영 효율 대폭 개선.", en: "Improved customer support automation rate. Significant ops efficiency gains." },
    kpis: [
      { value: "24/7", unit: "", label: { ko: "무중단 운영", en: "Always on" } },
      { value: "< 1", unit: "초", label: { ko: "평균 응답시간", en: "Avg response time" } },
    ],
    stack: ["Python", "Next.js", "Supabase", "대화형 어시스턴트"],
    role: ["기획", "아키텍처", "개발"],
    duration: "5일 (지속 개선)",
    client: "비공개",
    links: {
      live: null,
      github: null,
      case: "/portfolio/v-aio-chatbot",
      video: null,
    },
    cover: "/portfolio/v-aio-chatbot/cover.webp",
    gallery: [],
    size: "lg",
    featured: true,
    publishedAt: "2026-04-28",
  },
];

export function getPortfolioProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.featured);
}

export function getProjectsByType(type: PortfolioType): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.type === type);
}
