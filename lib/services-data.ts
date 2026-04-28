export type ServiceCategory = "web" | "app" | "design" | "video" | "automation";

export interface LocalizedString {
  ko: string;
  en: string;
}

export interface PricingTier {
  name: LocalizedString;
  eventPrice: string;
  regularPrice: string;
  duration: string;
  includes: LocalizedString[];
  recommended?: boolean;
}

export interface AddonItem {
  name: LocalizedString;
  price: string;
}

export interface ServiceDetail {
  id: ServiceCategory;
  title: LocalizedString;
  subtitle: string;
  description: LocalizedString;
  items: { icon: string; name: LocalizedString; detail: LocalizedString }[];
  process: { step: string; title: LocalizedString; description: LocalizedString }[];
  pricing: PricingTier[];
  addons?: AddonItem[];
  relatedPortfolio: string[];
  cta: LocalizedString;
}

const sharedProcess = [
  {
    step: "01",
    title: { ko: "상담 (무료)", en: "Free consultation" },
    description: { ko: "30분~1시간 채팅·영상 상담", en: "30–60 min chat or video call" },
  },
  {
    step: "02",
    title: { ko: "견적 제안서", en: "Quote proposal" },
    description: { ko: "범위·결과물·일정 명시", en: "Scope, deliverables & timeline" },
  },
  {
    step: "03",
    title: { ko: "작업 + 중간 공유", en: "Build + check-ins" },
    description: { ko: "단계별 산출물 공유", en: "Stage-by-stage updates" },
  },
  {
    step: "04",
    title: { ko: "인수인계", en: "Handoff" },
    description: { ko: "운영 가이드 + A/S 14일", en: "Ops guide + 14-day support" },
  },
];

export const servicesData: ServiceDetail[] = [
  {
    id: "web",
    title: { ko: "웹사이트 제작", en: "Web Development" },
    subtitle: "Web",
    description: {
      ko: "랜딩페이지부터 상세 홈페이지까지, 5일 안에 라이브로.",
      en: "From landing pages to full sites — live in 5 days.",
    },
    items: [
      {
        icon: "◈",
        name: { ko: "랜딩페이지", en: "Landing Page" },
        detail: { ko: "전환 최적화 1페이지 사이트", en: "Conversion-optimized single-page site" },
      },
      {
        icon: "◈",
        name: { ko: "기업 홈페이지", en: "Corporate Site" },
        detail: { ko: "5~10페이지 반응형 웹사이트", en: "5–10 page responsive website" },
      },
      {
        icon: "◈",
        name: { ko: "포트폴리오 사이트", en: "Portfolio Site" },
        detail: { ko: "에디토리얼 스타일 포트폴리오", en: "Editorial-style portfolio" },
      },
      {
        icon: "◈",
        name: { ko: "다국어 지원", en: "i18n Support" },
        detail: { ko: "한국어·영어 bilingual 배선", en: "Korean & English bilingual wiring" },
      },
      {
        icon: "◈",
        name: { ko: "SEO 최적화", en: "SEO Optimization" },
        detail: { ko: "메타태그·sitemap·robots 설정", en: "Meta tags, sitemap & robots" },
      },
      {
        icon: "◈",
        name: { ko: "CMS 연동", en: "CMS Integration" },
        detail: { ko: "Supabase·Notion 기반 콘텐츠 관리", en: "Supabase or Notion CMS" },
      },
    ],
    process: sharedProcess,
    pricing: [
      {
        name: { ko: "랜딩 1P", en: "Landing 1P" },
        eventPrice: "₩50,000~",
        regularPrice: "₩300,000~",
        duration: "1일",
        includes: [
          { ko: "1페이지 (1,500px)", en: "1 page (1,500px)" },
          { ko: "모바일 반응형", en: "Mobile responsive" },
          { ko: "기본 SEO 메타", en: "Basic SEO meta" },
          { ko: "수정 1회", en: "1 revision" },
        ],
      },
      {
        name: { ko: "홈페이지 기본 5P", en: "Site Basic (5 pages)" },
        eventPrice: "₩300,000~",
        regularPrice: "₩800,000~",
        duration: "3일",
        recommended: true,
        includes: [
          { ko: "5페이지 반응형 웹사이트", en: "5-page responsive site" },
          { ko: "모바일·태블릿 완벽 대응", en: "Mobile & tablet optimized" },
          { ko: "SEO + sitemap + robots.txt", en: "SEO + sitemap + robots.txt" },
          { ko: "Vercel 배포 포함", en: "Vercel deployment included" },
          { ko: "수정 2회", en: "2 revisions" },
        ],
      },
      {
        name: { ko: "홈페이지 상세 10P", en: "Site Detail (10 pages)" },
        eventPrice: "₩800,000~",
        regularPrice: "₩2,000,000~",
        duration: "5일",
        includes: [
          { ko: "10페이지 풀 사이트", en: "10-page full site" },
          { ko: "다국어 (한·영) 지원", en: "Bilingual (KR/EN)" },
          { ko: "CMS 연동 (콘텐츠 직접 관리)", en: "CMS integration" },
          { ko: "Google Analytics 연동", en: "Google Analytics" },
          { ko: "수정 3회", en: "3 revisions" },
        ],
      },
    ],
    addons: [
      {
        name: { ko: "페이지 추가", en: "Extra page" },
        price: "+₩30,000/p (기본형) / +₩50,000/p (상세형)",
      },
      { name: { ko: "다국어 1언어", en: "Extra language" }, price: "+₩20,000~" },
      { name: { ko: "긴급 당일", en: "Same-day rush" }, price: "+50%" },
    ],
    relatedPortfolio: ["chueok-korea", "ai-design-agency", "v-aio-visa", "mission-control"],
    cta: { ko: "웹 견적 문의하기", en: "Request Web Quote" },
  },

  {
    id: "app",
    title: { ko: "모바일 앱 개발", en: "Mobile App" },
    subtitle: "App",
    description: {
      ko: "MVP 5일 안에. 아이디어 검증부터 정식 런칭 직전까지.",
      en: "MVP in 5 days. From validation to pre-launch.",
    },
    items: [
      {
        icon: "◈",
        name: { ko: "React Native / Expo", en: "React Native / Expo" },
        detail: { ko: "iOS + Android 동시 빌드", en: "iOS & Android from one codebase" },
      },
      {
        icon: "◈",
        name: { ko: "인증·회원가입", en: "Auth & Sign-up" },
        detail: { ko: "이메일·소셜 로그인 (OAuth)", en: "Email & social OAuth login" },
      },
      {
        icon: "◈",
        name: { ko: "Supabase 백엔드", en: "Supabase Backend" },
        detail: { ko: "DB·인증·Storage 원스탑", en: "DB, auth & storage in one" },
      },
      {
        icon: "◈",
        name: { ko: "앱스토어 제출 대행", en: "Store Submission" },
        detail: { ko: "iOS App Store / Google Play", en: "iOS App Store / Google Play" },
      },
      {
        icon: "◈",
        name: { ko: "결제 연동", en: "Payment Integration" },
        detail: { ko: "Stripe / 토스페이먼츠", en: "Stripe / Toss Payments" },
      },
    ],
    process: sharedProcess,
    pricing: [
      {
        name: { ko: "기본 (2-3화면)", en: "Basic (2-3 screens)" },
        eventPrice: "₩500,000~",
        regularPrice: "₩1,500,000~",
        duration: "5일",
        includes: [
          { ko: "2~3 핵심 화면", en: "2–3 core screens" },
          { ko: "기본 인증 (이메일)", en: "Basic auth (email)" },
          { ko: "Supabase DB 연동", en: "Supabase DB integration" },
          { ko: "iOS + Android 빌드", en: "iOS & Android build" },
        ],
      },
      {
        name: { ko: "일반 (3-5화면)", en: "Standard (3-5 screens)" },
        eventPrice: "₩1,000,000~",
        regularPrice: "₩3,000,000~",
        duration: "5일",
        recommended: true,
        includes: [
          { ko: "3~5 화면 완성", en: "3–5 full screens" },
          { ko: "소셜 로그인 포함", en: "Social login included" },
          { ko: "푸시 알림", en: "Push notifications" },
          { ko: "앱스토어 제출 가이드", en: "Store submission guide" },
          { ko: "수정 2회", en: "2 revisions" },
        ],
      },
      {
        name: { ko: "고급 (5-10화면)", en: "Pro (5-10 screens)" },
        eventPrice: "₩1,500,000~",
        regularPrice: "₩5,000,000~",
        duration: "5-7일",
        includes: [
          { ko: "5~10화면 + 관리자 웹뷰", en: "5–10 screens + admin webview" },
          { ko: "결제 연동", en: "Payment integration" },
          { ko: "앱스토어 제출 대행", en: "Store submission" },
          { ko: "운영 가이드 + A/S 30일", en: "Ops guide + 30-day support" },
        ],
      },
    ],
    addons: [
      { name: { ko: "화면 추가", en: "Extra screen" }, price: "+₩50,000/개" },
      { name: { ko: "결제 연동", en: "Payment integration" }, price: "+₩300,000" },
      {
        name: { ko: "앱 스토어 등록 대행", en: "Store submission" },
        price: "iOS +₩200,000 / Android +₩100,000",
      },
    ],
    relatedPortfolio: ["koready"],
    cta: { ko: "앱 개발 견적", en: "Request App Quote" },
  },

  {
    id: "design",
    title: { ko: "디자인", en: "Design" },
    subtitle: "Design",
    description: {
      ko: "로고·명함·상세페이지·PPT·카드뉴스·인포그래픽까지 정적 시각물 한 곳에서.",
      en: "Logo · Card · Detail page · Decks · Card news · Infographic — one stop.",
    },
    items: [
      {
        icon: "◈",
        name: { ko: "로고 디자인", en: "Logo" },
        detail: { ko: "가로·세로·심볼 3종 납품", en: "Horizontal / vertical / symbol" },
      },
      {
        icon: "◈",
        name: { ko: "명함 디자인", en: "Business Card" },
        detail: { ko: "인쇄용 PDF + CMYK 변환", en: "Print-ready PDF + CMYK" },
      },
      {
        icon: "◈",
        name: { ko: "상세페이지", en: "Detail Page" },
        detail: { ko: "쇼핑몰·크몽용 세로형 상세", en: "Vertical detail page for stores" },
      },
      {
        icon: "◈",
        name: { ko: "PPT / 제안서", en: "PPT / Deck" },
        detail: { ko: "투자자·파트너 피치 덱", en: "Investor & partner pitch decks" },
      },
      {
        icon: "◈",
        name: { ko: "카드뉴스", en: "Card News" },
        detail: { ko: "인스타그램·카카오채널용 5장 세트", en: "5-card set for SNS" },
      },
      {
        icon: "◈",
        name: { ko: "인포그래픽", en: "Infographic" },
        detail: { ko: "데이터를 시각화한 1장 요약", en: "Data visualized in 1 graphic" },
      },
    ],
    process: [
      {
        step: "01",
        title: { ko: "브리핑", en: "Brief" },
        description: { ko: "브랜드 방향성·레퍼런스 수집", en: "Brand direction & references" },
      },
      {
        step: "02",
        title: { ko: "초안 제시", en: "Draft" },
        description: { ko: "1~3개 방향 초안 공유", en: "1–3 concept directions" },
      },
      {
        step: "03",
        title: { ko: "수정 & 마무리", en: "Revise & polish" },
        description: { ko: "선정 방향 세부 완성", en: "Refine the chosen direction" },
      },
      {
        step: "04",
        title: { ko: "파일 납품", en: "File delivery" },
        description: { ko: "원본 + 인쇄용 패키지", en: "Source + print-ready package" },
      },
    ],
    pricing: [
      {
        name: { ko: "로고 디자인", en: "Logo" },
        eventPrice: "₩10,000~",
        regularPrice: "₩50,000~",
        duration: "1일",
        includes: [
          { ko: "메인 로고 + 변형 (가로/세로/심볼)", en: "Main + variants (h/v/symbol)" },
          { ko: "AI/SVG/PNG 원본 전달", en: "AI/SVG/PNG sources" },
          { ko: "수정 1회", en: "1 revision" },
        ],
      },
      {
        name: { ko: "명함 디자인", en: "Business Card" },
        eventPrice: "₩10,000~",
        regularPrice: "₩50,000~",
        duration: "1일",
        includes: [
          { ko: "양면 1세트 (앞/뒤)", en: "Double-sided (1 set)" },
          { ko: "인쇄용 PDF + CMYK 변환", en: "Print-ready PDF + CMYK" },
          { ko: "재단선·도련 포함", en: "Crop & bleed marks" },
          { ko: "로고와 번들 시 -20%", en: "-20% bundled with logo" },
        ],
      },
      {
        name: { ko: "상세페이지 1장", en: "Detail Page" },
        eventPrice: "₩30,000~",
        regularPrice: "₩100,000~",
        duration: "1일",
        includes: [
          { ko: "1,000~2,000px 길이", en: "1,000–2,000px length" },
          { ko: "이미지 5장 무료 (스톡)", en: "5 free stock images" },
          { ko: "모바일 최적화", en: "Mobile optimized" },
        ],
      },
      {
        name: { ko: "PPT 10페이지", en: "PPT 10 slides" },
        eventPrice: "₩30,000~",
        regularPrice: "₩100,000~",
        duration: "1-2일",
        recommended: true,
        includes: [
          { ko: "10슬라이드 풀 디자인", en: "10 slides full design" },
          { ko: "PPTX + PDF 납품", en: "PPTX + PDF delivery" },
          { ko: "편집 가능 원본", en: "Editable source file" },
          { ko: "수정 1회", en: "1 revision" },
        ],
      },
      {
        name: { ko: "카드뉴스 5장", en: "Card news ×5" },
        eventPrice: "₩20,000~",
        regularPrice: "₩100,000~",
        duration: "1일",
        includes: [
          { ko: "인스타그램 1:1 또는 4:5", en: "Instagram 1:1 or 4:5" },
          { ko: "PNG + JPG 납품", en: "PNG + JPG delivery" },
          { ko: "텍스트 수정 1회", en: "1 text revision" },
        ],
      },
      {
        name: { ko: "인포그래픽 1개", en: "Infographic" },
        eventPrice: "₩20,000~",
        regularPrice: "₩80,000~",
        duration: "1일",
        includes: [
          { ko: "데이터 시각화 1장", en: "1 data visualization" },
          { ko: "PNG + SVG 납품", en: "PNG + SVG delivery" },
        ],
      },
    ],
    addons: [
      {
        name: { ko: "상세 길이 +1,000px", en: "Detail +1,000px" },
        price: "+₩10,000",
      },
      {
        name: { ko: "이미지 추가 (6번째부터)", en: "Extra image (6+)" },
        price: "+₩5,000/장",
      },
      {
        name: { ko: "명함 추가 컬러 변형", en: "Card extra color variant" },
        price: "+₩5,000/안",
      },
      { name: { ko: "다국어 +1언어", en: "Extra language" }, price: "+₩20,000" },
      { name: { ko: "긴급 당일", en: "Same-day rush" }, price: "+50%" },
    ],
    relatedPortfolio: [],
    cta: { ko: "디자인 견적 문의", en: "Request Design Quote" },
  },

  {
    id: "video",
    title: { ko: "영상 제작", en: "Video Production" },
    subtitle: "Video",
    description: {
      ko: "마케팅 영상·쇼츠·릴스·튜토리얼·Remotion 자산 — 빠르게 임팩트 있게.",
      en: "Marketing videos, shorts, reels, tutorials, Remotion assets — fast and impactful.",
    },
    items: [
      {
        icon: "◈",
        name: { ko: "마케팅 영상", en: "Marketing Video" },
        detail: { ko: "30~60초 임팩트 영상", en: "30–60s impact video" },
      },
      {
        icon: "◈",
        name: { ko: "쇼츠 · 릴스", en: "Shorts / Reels" },
        detail: { ko: "긴 영상 → 9개 자동 추출", en: "Auto-cut 9 shorts from 1 long" },
      },
      {
        icon: "◈",
        name: { ko: "튜토리얼 · 하우투", en: "Tutorial / How-to" },
        detail: { ko: "화면 녹화 + 챕터 + 자막", en: "Screen rec + chapters + subs" },
      },
      {
        icon: "◈",
        name: { ko: "Remotion 코드 영상", en: "Remotion Asset" },
        detail: { ko: "데이터 → 자동 렌더링 템플릿", en: "Data-driven auto-render template" },
      },
    ],
    process: [
      {
        step: "01",
        title: { ko: "콘셉트·대본", en: "Concept & script" },
        description: { ko: "톤·메시지·길이 확정", en: "Tone, message & length" },
      },
      {
        step: "02",
        title: { ko: "초안 (러프컷)", en: "Rough cut" },
        description: { ko: "구성·타이밍 검토", en: "Pacing & structure review" },
      },
      {
        step: "03",
        title: { ko: "마감 (컬러·BGM·자막)", en: "Polish (color/BGM/subs)" },
        description: { ko: "최종 디테일", en: "Final details" },
      },
      {
        step: "04",
        title: { ko: "납품 (mp4/mov + 원본)", en: "Delivery (mp4/mov + source)" },
        description: { ko: "다중 포맷 출력", en: "Multi-format export" },
      },
    ],
    pricing: [
      {
        name: { ko: "마케팅 영상 30초", en: "Marketing Video 30s" },
        eventPrice: "₩50,000~",
        regularPrice: "₩200,000~",
        duration: "1-3일",
        recommended: true,
        includes: [
          { ko: "16:9 또는 9:16 1개 비율", en: "16:9 or 9:16 (1 ratio)" },
          { ko: "BGM 무료 (라이선스 안전)", en: "Royalty-free BGM" },
          { ko: "한글 자막 자동 생성", en: "Auto KR subtitles" },
          { ko: "수정 2회", en: "2 revisions" },
        ],
      },
      {
        name: { ko: "쇼츠·릴스 9개 세트", en: "Shorts ×9" },
        eventPrice: "₩100,000~",
        regularPrice: "₩400,000~",
        duration: "2-3일",
        includes: [
          { ko: "긴 영상 1개에서 9개 자동 추출", en: "Auto-cut 9 from 1 long video" },
          { ko: "9:16 세로 최적화", en: "9:16 vertical optimized" },
          { ko: "썸네일·캡션 포함", en: "Thumbnail + caption" },
        ],
      },
      {
        name: { ko: "튜토리얼·하우투", en: "Tutorial / How-to" },
        eventPrice: "₩100,000~",
        regularPrice: "₩300,000~",
        duration: "2-5일",
        includes: [
          { ko: "최대 5분 분량", en: "Up to 5 min" },
          { ko: "챕터 마커 + 화면 녹화", en: "Chapter markers + screen rec" },
          { ko: "자막 + 인트로/아웃트로", en: "Subtitles + intro/outro" },
        ],
      },
      {
        name: { ko: "Remotion 자산 (코드 영상)", en: "Remotion Asset" },
        eventPrice: "₩200,000~",
        regularPrice: "₩500,000~",
        duration: "3-5일",
        includes: [
          { ko: "데이터 → 영상 자동 렌더링 템플릿", en: "Data → video auto-render template" },
          { ko: "동일 템플릿 다중 변형 (예: 인사 영상 N인)", en: "1 template, N variants" },
          { ko: "운영 가이드 영상 포함", en: "Ops guide video included" },
        ],
      },
    ],
    addons: [
      {
        name: { ko: "다국어 자막 +1언어", en: "Extra subtitle language" },
        price: "+₩20,000",
      },
      {
        name: { ko: "비율 변형 추가 (9:16/1:1/16:9)", en: "Extra aspect ratio" },
        price: "+₩20,000/비율",
      },
      { name: { ko: "더빙·내레이션", en: "Voiceover" }, price: "별도 견적" },
      { name: { ko: "긴급 1일", en: "1-day rush" }, price: "+50%" },
    ],
    relatedPortfolio: [],
    cta: { ko: "영상 견적 문의", en: "Request Video Quote" },
  },

  {
    id: "automation",
    title: { ko: "자동화 솔루션", en: "Automation" },
    subtitle: "Automation",
    description: {
      ko: "콘텐츠·SNS·업무 프로세스 자동화. 운영 중인 시스템이 증거.",
      en: "Content, SNS, ops automation. A live system as proof.",
    },
    items: [
      {
        icon: "◈",
        name: { ko: "블로그 자동화", en: "Blog Automation" },
        detail: { ko: "키워드 → 발행 전체 파이프라인", en: "Keyword → publish pipeline" },
      },
      {
        icon: "◈",
        name: { ko: "SNS 자동 발행", en: "SNS Auto-post" },
        detail: { ko: "Threads·인스타·유튜브 스케줄", en: "Threads / Instagram / YouTube schedule" },
      },
      {
        icon: "◈",
        name: { ko: "챗봇 · 어시스턴트", en: "Chatbot / Assistant" },
        detail: { ko: "대화형 업무 자동화 에이전트", en: "Conversational workflow agent" },
      },
      {
        icon: "◈",
        name: { ko: "n8n / Python 워크플로", en: "n8n / Python workflow" },
        detail: { ko: "외부 API 연동 자동화", en: "Multi-API integration automation" },
      },
      {
        icon: "◈",
        name: { ko: "스케줄러 + 로깅", en: "Scheduler + Logging" },
        detail: { ko: "24시간 무인 운영 시스템", en: "24/7 unattended operation" },
      },
    ],
    process: [
      {
        step: "01",
        title: { ko: "요구사항 분석", en: "Requirements" },
        description: { ko: "현재 프로세스 파악 + 자동화 범위 확정", en: "Map current process & define scope" },
      },
      {
        step: "02",
        title: { ko: "설계 + 프로토타입", en: "Design & prototype" },
        description: { ko: "아키텍처 다이어그램 + 1단계 POC", en: "Architecture diagram + POC" },
      },
      {
        step: "03",
        title: { ko: "개발 + 테스트", en: "Build & test" },
        description: { ko: "워크플로 구현 + 68/68 테스트 통과", en: "Workflow build + all tests pass" },
      },
      {
        step: "04",
        title: { ko: "배포 + 인수인계", en: "Deploy & handoff" },
        description: { ko: "운영 가이드 영상 + A/S 30일", en: "Ops guide video + 30-day support" },
      },
    ],
    pricing: [
      {
        name: { ko: "간단", en: "Simple" },
        eventPrice: "₩300,000~",
        regularPrice: "₩1,000,000~",
        duration: "3일",
        includes: [
          { ko: "단일 워크플로 (n8n/Python)", en: "Single workflow (n8n/Python)" },
          { ko: "1개 외부 API 연동", en: "1 API integration" },
          { ko: "운영 가이드 영상", en: "Ops guide video" },
        ],
      },
      {
        name: { ko: "일반", en: "Standard" },
        eventPrice: "₩800,000~",
        regularPrice: "₩2,500,000~",
        duration: "5일",
        recommended: true,
        includes: [
          { ko: "복합 워크플로 + 스케줄러", en: "Multi-step + scheduler" },
          { ko: "3개 이상 외부 API", en: "3+ APIs" },
          { ko: "DB 연동 (Supabase)", en: "DB integration (Supabase)" },
          { ko: "로깅·알림", en: "Logging & alerts" },
        ],
      },
    ],
    addons: [
      { name: { ko: "긴급 1일 작업", en: "1-day rush" }, price: "+50%" },
      {
        name: { ko: "운영 유지보수", en: "Ops maintenance" },
        price: "월 ₩300,000~",
      },
    ],
    relatedPortfolio: ["t-aio", "blogautopilot-multinational", "w-aio", "youtube-autopilot"],
    cta: { ko: "자동화 견적 문의", en: "Request Automation Quote" },
  },
];

export function getServiceById(id: ServiceCategory): ServiceDetail | undefined {
  return servicesData.find((s) => s.id === id);
}

export const serviceCategories: { label: LocalizedString; value: ServiceCategory; icon: string }[] = [
  { label: { ko: "웹사이트", en: "Web" }, value: "web", icon: "Globe" },
  { label: { ko: "모바일 앱", en: "App" }, value: "app", icon: "Smartphone" },
  { label: { ko: "디자인", en: "Design" }, value: "design", icon: "Palette" },
  { label: { ko: "영상", en: "Video" }, value: "video", icon: "Video" },
  { label: { ko: "자동화", en: "Automation" }, value: "automation", icon: "Bot" },
];
