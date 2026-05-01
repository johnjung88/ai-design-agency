export type ServiceCategory =
  | "website"
  | "shopping-mall"
  | "logo-business-card"
  | "detail-page"
  | "ppt-design"
  | "automation-app"
  | "video-content";

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
    title: { ko: "상담 및 범위 확정", en: "Consultation & scope" },
    description: { ko: "목표, 예산, 일정, 참고 레퍼런스를 빠르게 정리합니다.", en: "Clarify goals, budget, timeline, and references." },
  },
  {
    step: "02",
    title: { ko: "견적 제안", en: "Quote proposal" },
    description: { ko: "납품 범위, 수정 횟수, 일정, 비용을 문서로 안내합니다.", en: "Confirm deliverables, revisions, timeline, and cost." },
  },
  {
    step: "03",
    title: { ko: "작업 및 중간 공유", en: "Production & check-in" },
    description: { ko: "초안 또는 중간 결과물을 공유하고 피드백을 반영합니다.", en: "Share drafts or working results and apply feedback." },
  },
  {
    step: "04",
    title: { ko: "납품 및 유지보수", en: "Delivery & support" },
    description: { ko: "최종 파일, 운영 가이드, 14일 기본 A/S를 제공합니다.", en: "Deliver final files, guide, and 14-day support." },
  },
];

export const servicesData: ServiceDetail[] = [
  {
    id: "website",
    title: { ko: "웹사이트", en: "Website" },
    subtitle: "Website",
    description: {
      ko: "랜딩페이지, 회사 홈페이지, 포트폴리오 사이트를 전환 중심으로 제작합니다.",
      en: "Conversion-focused landing pages, company sites, and portfolio websites.",
    },
    items: [
      { icon: "◈", name: { ko: "랜딩페이지", en: "Landing page" }, detail: { ko: "문의 전환을 목표로 한 1페이지 구성", en: "Single-page structure built for inquiries" } },
      { icon: "◈", name: { ko: "회사 홈페이지", en: "Company website" }, detail: { ko: "서비스, 소개, 포트폴리오, 문의까지 구성", en: "Services, about, portfolio, and quote flow" } },
      { icon: "◈", name: { ko: "반응형 UI", en: "Responsive UI" }, detail: { ko: "모바일과 데스크톱 모두 최적화", en: "Optimized for mobile and desktop" } },
      { icon: "◈", name: { ko: "SEO 기본 세팅", en: "SEO basics" }, detail: { ko: "메타, 사이트맵, 공유 이미지 정리", en: "Meta, sitemap, and social preview setup" } },
    ],
    process: sharedProcess,
    pricing: [
      {
        name: { ko: "랜딩 1P", en: "Landing 1P" },
        eventPrice: "₩50,000~",
        regularPrice: "₩250,000~",
        duration: "1일",
        includes: [
          { ko: "1페이지 반응형 구성", en: "1 responsive page" },
          { ko: "기본 CTA 및 문의 동선", en: "Basic CTA and inquiry flow" },
          { ko: "수정 1회", en: "1 revision" },
        ],
      },
      {
        name: { ko: "홈페이지 기본 5P", en: "Basic website 5P" },
        eventPrice: "₩300,000~",
        regularPrice: "₩800,000~",
        duration: "3일",
        recommended: true,
        includes: [
          { ko: "5페이지 반응형 사이트", en: "5-page responsive site" },
          { ko: "SEO 기본 세팅", en: "Basic SEO setup" },
          { ko: "배포 및 운영 가이드", en: "Deployment and guide" },
        ],
      },
      {
        name: { ko: "홈페이지 상세 10P", en: "Detailed website 10P" },
        eventPrice: "₩800,000~",
        regularPrice: "₩2,000,000~",
        duration: "5일",
        includes: [
          { ko: "10페이지 풀 사이트", en: "10-page full site" },
          { ko: "다국어 또는 CMS 옵션 협의", en: "Optional multilingual or CMS setup" },
          { ko: "수정 3회", en: "3 revisions" },
        ],
      },
    ],
    addons: [
      { name: { ko: "페이지 추가", en: "Extra page" }, price: "+₩30,000~" },
      { name: { ko: "다국어 1언어", en: "Extra language" }, price: "+₩20,000~" },
      { name: { ko: "긴급 당일 작업", en: "Same-day rush" }, price: "+30~70%" },
    ],
    relatedPortfolio: ["chueok-korea", "aio-design-agency", "v-aio-website"],
    cta: { ko: "웹사이트 견적 문의", en: "Request website quote" },
  },
  {
    id: "shopping-mall",
    title: { ko: "쇼핑몰", en: "Shopping Mall" },
    subtitle: "Commerce",
    description: {
      ko: "카페24, 커머스 메인, 상품 진열, 배너 디자인을 실제 판매 화면 중심으로 정리합니다.",
      en: "Cafe24 and commerce storefront design focused on real selling screens.",
    },
    items: [
      { icon: "◈", name: { ko: "카페24 메인", en: "Cafe24 main" }, detail: { ko: "업종별 쇼핑몰 첫 화면 디자인", en: "Industry-specific storefront home design" } },
      { icon: "◈", name: { ko: "상품 진열", en: "Product display" }, detail: { ko: "카테고리, 배너, 베스트 상품 구성", en: "Category, banner, and best-item layout" } },
      { icon: "◈", name: { ko: "모바일 최적화", en: "Mobile optimization" }, detail: { ko: "모바일 쇼핑 흐름 우선 설계", en: "Mobile-first shopping flow" } },
      { icon: "◈", name: { ko: "운영 가이드", en: "Ops guide" }, detail: { ko: "이미지 교체와 상품 관리 기준 제공", en: "Guide for image and product updates" } },
    ],
    process: sharedProcess,
    pricing: [
      {
        name: { ko: "쇼핑몰 메인", en: "Storefront main" },
        eventPrice: "₩150,000~",
        regularPrice: "₩500,000~",
        duration: "2일",
        includes: [
          { ko: "메인 1안 + 모바일 기준", en: "1 main concept + mobile standard" },
          { ko: "배너/상품 영역 구성", en: "Banner and product sections" },
          { ko: "수정 1회", en: "1 revision" },
        ],
      },
      {
        name: { ko: "쇼핑몰 풀세팅", en: "Storefront full setup" },
        eventPrice: "₩300,000~",
        regularPrice: "₩1,000,000~",
        duration: "3-5일",
        recommended: true,
        includes: [
          { ko: "메인 + 카테고리 + 배너 세트", en: "Home, category, and banner set" },
          { ko: "12종 레퍼런스 기반 방향 제안", en: "Direction based on 12 reference designs" },
          { ko: "운영 가이드", en: "Operation guide" },
        ],
      },
      {
        name: { ko: "쇼핑몰 풀커스텀", en: "Storefront full custom" },
        eventPrice: "₩1,000,000~",
        regularPrice: "₩3,000,000~",
        duration: "7-10일",
        includes: [
          { ko: "브랜드몰 맞춤 디자인", en: "Custom brand storefront design" },
          { ko: "주요 화면 흐름 및 운영 가이드", en: "Core screen flow and operation guide" },
          { ko: "수정 3회", en: "3 revisions" },
        ],
      },
    ],
    addons: [{ name: { ko: "배너 추가", en: "Extra banner" }, price: "+₩20,000~" }],
    relatedPortfolio: ["cafe24-farm-fresh", "cafe24-live-commerce", "cafe24-premium-tea"],
    cta: { ko: "쇼핑몰 견적 문의", en: "Request store quote" },
  },
  {
    id: "logo-business-card",
    title: { ko: "로고 및 명함", en: "Logo & Business Card" },
    subtitle: "Brand Kit",
    description: {
      ko: "5월 입점 이벤트 한정가로 로고부터 명함까지 빠르게 제작합니다. 합리적인 가격 안에서도 실제 브랜드에 바로 사용할 수 있는 결과물 중심으로 정리합니다.",
      en: "Limited May launch pricing for fast logo and business card production, focused on practical assets ready for real brand use.",
    },
    items: [
      { icon: "◈", name: { ko: "합리적인 이벤트가", en: "Launch event pricing" }, detail: { ko: "상위 판매자보다 부담은 낮추고, 저가 상품보다 완성도 있게 구성합니다.", en: "Lower entry cost than top sellers, with stronger finish than low-end listings." } },
      { icon: "◈", name: { ko: "빠른 시안", en: "Fast draft" }, detail: { ko: "로고 시안과 명함 구성을 빠르게 공유해 오픈 준비 시간을 줄입니다.", en: "Quick logo drafts and card layouts to speed up launch preparation." } },
      { icon: "◈", name: { ko: "실사용 결과물", en: "Ready-to-use assets" }, detail: { ko: "온라인 프로필, 인쇄, 실사 목업까지 바로 확인 가능한 파일로 납품합니다.", en: "Deliver files for online profiles, print, and realistic mockup checks." } },
    ],
    process: sharedProcess,
    pricing: [
      {
        name: { ko: "입문형 로고·명함", en: "Starter Logo & Card" },
        eventPrice: "₩29,000",
        regularPrice: "추후 인상 예정",
        duration: "1일",
        includes: [
          { ko: "로고 1안", en: "1 logo concept" },
          { ko: "명함 1안", en: "1 business card concept" },
          { ko: "수정 1회", en: "1 revision" },
          { ko: "PNG/JPG/PDF 납품", en: "PNG/JPG/PDF delivery" },
        ],
      },
      {
        name: { ko: "실속형 로고 3안·명함", en: "Value Logo 3 Concepts & Card" },
        eventPrice: "₩49,000",
        regularPrice: "추후 인상 예정",
        duration: "1-2일",
        recommended: true,
        includes: [
          { ko: "로고 3안", en: "3 logo concepts" },
          { ko: "최종 1안 선택", en: "Choose 1 final concept" },
          { ko: "명함 1안", en: "1 business card concept" },
          { ko: "수정 2회", en: "2 revisions" },
          { ko: "PNG/JPG/PDF 납품", en: "PNG/JPG/PDF delivery" },
        ],
      },
      {
        name: { ko: "창업형 브랜드 키트", en: "Startup Brand Kit" },
        eventPrice: "₩99,000",
        regularPrice: "추후 인상 예정",
        duration: "2-3일",
        includes: [
          { ko: "로고 3안 + 명함 1안", en: "3 logo concepts + 1 card concept" },
          { ko: "SNS 프로필", en: "SNS profile asset" },
          { ko: "실사 목업 3컷", en: "3 realistic mockups" },
          { ko: "미니 가이드", en: "Mini brand guide" },
          { ko: "PNG/JPG/PDF/SVG 납품", en: "PNG/JPG/PDF/SVG delivery" },
        ],
      },
    ],
    addons: [
      { name: { ko: "AI(일러스트레이터) 원본 파일 추가", en: "Add Adobe Illustrator source file" }, price: "+₩20,000" },
      { name: { ko: "명함 인원 추가 1명", en: "Add 1 business card person" }, price: "+₩10,000" },
      { name: { ko: "수정 1회 추가", en: "Add 1 revision" }, price: "+₩10,000" },
      { name: { ko: "실사 목업 3컷 추가", en: "Add 3 realistic mockups" }, price: "+₩20,000" },
      { name: { ko: "급행 24시간 납품", en: "24-hour rush delivery" }, price: "+₩20,000" },
    ],
    relatedPortfolio: ["aio-brand-kit"],
    cta: { ko: "로고·명함 견적 문의", en: "Request brand quote" },
  },
  {
    id: "detail-page",
    title: { ko: "상세페이지", en: "Detail Page" },
    subtitle: "Sales Detail",
    description: {
      ko: "상품, 서비스, 플랫폼 판매 페이지를 이미지 중심의 세로형 상세페이지로 제작합니다.",
      en: "Vertical sales detail pages for products, services, and marketplace listings.",
    },
    items: [
      { icon: "◈", name: { ko: "상품 상세", en: "Product detail" }, detail: { ko: "판매 포인트와 이미지 흐름 정리", en: "Sales points and image flow" } },
      { icon: "◈", name: { ko: "서비스 상세", en: "Service detail" }, detail: { ko: "문제, 해결, 결과, 가격 흐름 정리", en: "Problem, solution, result, and pricing" } },
      { icon: "◈", name: { ko: "플랫폼용 이미지", en: "Marketplace assets" }, detail: { ko: "숨고, 크몽, 쇼핑몰 등록용", en: "For Soomgo, Kmong, and stores" } },
    ],
    process: sharedProcess,
    pricing: [
      {
        name: { ko: "상세 1장", en: "Detail page 1" },
        eventPrice: "₩30,000~",
        regularPrice: "₩100,000~",
        duration: "1일",
        recommended: true,
        includes: [
          { ko: "1,000~2,000px 세로형", en: "1,000-2,000px vertical design" },
          { ko: "모바일 최적화", en: "Mobile optimized" },
          { ko: "PNG/JPG 납품", en: "PNG/JPG delivery" },
        ],
      },
      {
        name: { ko: "상세 5장 세트", en: "Detail page 5-set" },
        eventPrice: "₩120,000~",
        regularPrice: "₩300,000~",
        duration: "2-3일",
        includes: [
          { ko: "5장 또는 5섹션 세트", en: "5-page or 5-section set" },
          { ko: "카피 정리", en: "Copy cleanup" },
          { ko: "수정 2회", en: "2 revisions" },
        ],
      },
      {
        name: { ko: "상세 풀스택", en: "Full-stack detail page" },
        eventPrice: "₩250,000~",
        regularPrice: "₩600,000~",
        duration: "3-5일",
        includes: [
          { ko: "기획 + 카피 + 디자인", en: "Planning, copy, and design" },
          { ko: "판매 흐름 구성", en: "Sales flow structure" },
          { ko: "수정 2회", en: "2 revisions" },
        ],
      },
    ],
    addons: [{ name: { ko: "길이 +1,000px", en: "+1,000px length" }, price: "+₩10,000" }],
    relatedPortfolio: ["detail-page-ampoule-anti-aging", "detail-page-premium-mealkit", "detail-page-linen-onepiece"],
    cta: { ko: "상세페이지 견적 문의", en: "Request detail page quote" },
  },
  {
    id: "ppt-design",
    title: { ko: "PPT 디자인", en: "PPT Design" },
    subtitle: "Presentation",
    description: {
      ko: "회사소개서, 제안서, 피치덱을 바로 발표 가능한 원본 파일로 제작합니다.",
      en: "Company decks, proposals, and pitch decks delivered as editable files.",
    },
    items: [
      { icon: "◈", name: { ko: "회사소개서", en: "Company deck" }, detail: { ko: "서비스와 강점을 명확히 보여주는 구성", en: "Clear structure for service and strengths" } },
      { icon: "◈", name: { ko: "제안서", en: "Proposal" }, detail: { ko: "가격, 프로세스, 범위 설득 구조", en: "Pricing, process, and scope persuasion" } },
      { icon: "◈", name: { ko: "피치덱", en: "Pitch deck" }, detail: { ko: "투자자/파트너용 핵심 슬라이드", en: "Core slides for investors or partners" } },
    ],
    process: sharedProcess,
    pricing: [
      {
        name: { ko: "PPT 10P", en: "PPT 10P" },
        eventPrice: "₩50,000~",
        regularPrice: "₩100,000~",
        duration: "1-2일",
        recommended: true,
        includes: [
          { ko: "10슬라이드 디자인", en: "10-slide design" },
          { ko: "PPTX + PDF 납품", en: "PPTX + PDF delivery" },
          { ko: "수정 1회", en: "1 revision" },
        ],
      },
      {
        name: { ko: "PPT 20P", en: "PPT 20P" },
        eventPrice: "₩100,000~",
        regularPrice: "₩250,000~",
        duration: "2일",
        includes: [
          { ko: "20슬라이드 디자인", en: "20-slide design" },
          { ko: "도식화 및 레이아웃 정리", en: "Diagram and layout cleanup" },
          { ko: "수정 2회", en: "2 revisions" },
        ],
      },
      {
        name: { ko: "PPT 30P+", en: "PPT 30P+" },
        eventPrice: "₩250,000~",
        regularPrice: "₩500,000~",
        duration: "3-5일",
        includes: [
          { ko: "30슬라이드 이상 디자인", en: "30+ slide design" },
          { ko: "기획 흐름 및 도식화", en: "Structure and diagramming" },
          { ko: "수정 2회", en: "2 revisions" },
        ],
      },
    ],
    addons: [{ name: { ko: "슬라이드 추가", en: "Extra slide" }, price: "+₩5,000~" }],
    relatedPortfolio: ["ppt-brand-proposal", "ppt-government-grant", "ppt-ir-investment"],
    cta: { ko: "PPT 견적 문의", en: "Request deck quote" },
  },
  {
    id: "automation-app",
    title: { ko: "자동화 및 앱", en: "Automation & App" },
    subtitle: "Automation & App",
    description: {
      ko: "반복 업무 자동화, 데이터 수집, MVP 앱, 운영 대시보드를 빠르게 구축합니다.",
      en: "Workflow automation, data collection, MVP apps, and operation dashboards.",
    },
    items: [
      { icon: "◈", name: { ko: "데이터 크롤링", en: "Data crawling" }, detail: { ko: "공개 데이터 수집, 정리, 엑셀/CSV 납품", en: "Public data collection and Excel/CSV delivery" } },
      { icon: "◈", name: { ko: "업무 자동화", en: "Workflow automation" }, detail: { ko: "반복 업무를 스케줄과 알림으로 자동화", en: "Automate repeat tasks with schedules and alerts" } },
      { icon: "◈", name: { ko: "MVP 앱", en: "MVP app" }, detail: { ko: "검증용 웹/모바일 앱 빠른 제작", en: "Fast web/mobile MVP for validation" } },
      { icon: "◈", name: { ko: "운영 대시보드", en: "Ops dashboard" }, detail: { ko: "로그, 상태, 결과물을 한 화면에서 관리", en: "Manage logs, status, and results in one screen" } },
    ],
    process: sharedProcess,
    pricing: [
      {
        name: { ko: "자동화 단순", en: "Simple automation" },
        eventPrice: "₩100,000~",
        regularPrice: "₩300,000~",
        duration: "1일",
        includes: [
          { ko: "단일 업무 자동화/크롤링", en: "Single workflow or crawling task" },
          { ko: "엑셀/CSV 납품", en: "Excel/CSV delivery" },
          { ko: "처리 흐름 설명", en: "Workflow explanation" },
        ],
      },
      {
        name: { ko: "자동화 일반", en: "Standard automation" },
        eventPrice: "₩800,000~",
        regularPrice: "₩2,500,000~",
        duration: "5일",
        recommended: true,
        includes: [
          { ko: "복합 워크플로", en: "Multi-step workflow" },
          { ko: "DB/외부 API 연동", en: "DB/API integration" },
          { ko: "운영 가이드", en: "Operation guide" },
        ],
      },
      {
        name: { ko: "고급 자동화/앱 MVP", en: "Advanced automation / MVP app" },
        eventPrice: "₩1,500,000~",
        regularPrice: "₩5,000,000~",
        duration: "5-7일",
        includes: [
          { ko: "핵심 화면 2~3개", en: "2-3 core screens" },
          { ko: "기본 DB/인증", en: "Basic DB/auth" },
          { ko: "배포 또는 빌드 가이드", en: "Deployment or build guide" },
        ],
      },
    ],
    addons: [{ name: { ko: "운영 유지보수", en: "Ops maintenance" }, price: "월 ₩300,000~" }],
    relatedPortfolio: [
      "blogautopilot-multinational",
      "v-aio-chatbot",
      "youtube-autopilot",
      "t-aio",
      "data-crawling-demo",
      "koready",
    ],
    cta: { ko: "자동화·앱 견적 문의", en: "Request automation quote" },
  },
  {
    id: "video-content",
    title: { ko: "영상 콘텐츠", en: "Video Content" },
    subtitle: "Video",
    description: {
      ko: "브랜드 인트로, 홍보 영상, 쇼츠·릴스, 튜토리얼 영상을 제작합니다.",
      en: "Brand intros, promotional videos, shorts/reels, and tutorial videos.",
    },
    items: [
      { icon: "◈", name: { ko: "브랜드 인트로", en: "Brand intro" }, detail: { ko: "로고와 메시지를 담은 짧은 모션", en: "Short motion with logo and message" } },
      { icon: "◈", name: { ko: "쇼츠·릴스", en: "Shorts/Reels" }, detail: { ko: "세로형 SNS 영상 구성", en: "Vertical social video format" } },
      { icon: "◈", name: { ko: "홍보 영상", en: "Promo video" }, detail: { ko: "서비스 소개와 CTA 중심 편집", en: "Service intro and CTA-focused edit" } },
      { icon: "◈", name: { ko: "튜토리얼", en: "Tutorial" }, detail: { ko: "화면 녹화, 자막, 챕터 구성", en: "Screen recording, captions, and chapters" } },
    ],
    process: sharedProcess,
    pricing: [
      {
        name: { ko: "30초 숏폼 1개", en: "30s short-form video" },
        eventPrice: "₩100,000~",
        regularPrice: "₩150,000~",
        duration: "1-3일",
        recommended: true,
        includes: [
          { ko: "30초 숏폼 1개", en: "One 30s short-form video" },
          { ko: "BGM 및 자막", en: "BGM and captions" },
          { ko: "수정 1회", en: "1 revision" },
        ],
      },
      {
        name: { ko: "60초 또는 숏폼 3개", en: "60s video or 3 shorts" },
        eventPrice: "₩250,000~",
        regularPrice: "₩350,000~",
        duration: "2-3일",
        includes: [
          { ko: "60초 홍보 영상 또는 숏폼 3개", en: "60s promo video or 3 short-form videos" },
          { ko: "썸네일/캡션 포함", en: "Thumbnail and caption included" },
          { ko: "플랫폼별 내보내기", en: "Platform-ready exports" },
        ],
      },
      {
        name: { ko: "브랜드 영상 세트", en: "Brand video set" },
        eventPrice: "₩600,000~",
        regularPrice: "₩900,000~",
        duration: "3-7일",
        includes: [
          { ko: "브랜드 영상 세트", en: "Brand video set" },
          { ko: "구성안 포함", en: "Storyboard included" },
          { ko: "수정 2회", en: "2 revisions" },
        ],
      },
    ],
    addons: [{ name: { ko: "비율 추가", en: "Extra aspect ratio" }, price: "+₩20,000/비율" }],
    relatedPortfolio: ["aio-motion-intro"],
    cta: { ko: "영상 견적 문의", en: "Request video quote" },
  },
];

export function getServiceById(id: ServiceCategory): ServiceDetail | undefined {
  return servicesData.find((service) => service.id === id);
}

export const serviceCategories: { label: LocalizedString; value: ServiceCategory; icon: string }[] = [
  { label: { ko: "웹사이트", en: "Website" }, value: "website", icon: "Globe" },
  { label: { ko: "쇼핑몰", en: "Shopping Mall" }, value: "shopping-mall", icon: "ShoppingBag" },
  { label: { ko: "로고 및 명함", en: "Logo & Business Card" }, value: "logo-business-card", icon: "BadgeCheck" },
  { label: { ko: "상세페이지", en: "Detail Page" }, value: "detail-page", icon: "FileImage" },
  { label: { ko: "PPT 디자인", en: "PPT Design" }, value: "ppt-design", icon: "Presentation" },
  { label: { ko: "자동화 및 앱", en: "Automation & App" }, value: "automation-app", icon: "Bot" },
  { label: { ko: "영상 콘텐츠", en: "Video Content" }, value: "video-content", icon: "Video" },
];
