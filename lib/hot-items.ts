import type { LocalizedString, ServiceCategory } from "@/lib/services-data";

export interface HotItem {
  id: ServiceCategory;
  type: ServiceCategory;
  title: LocalizedString;
  description: LocalizedString;
  price: LocalizedString;
  duration: LocalizedString;
  proof: LocalizedString;
  image: string;
  href: string;
}

export const hotItems: HotItem[] = [
  {
    id: "website",
    type: "website",
    title: { ko: "웹사이트", en: "Website" },
    description: { ko: "서비스 소개, 신뢰 요소, 문의 전환 흐름을 한 화면에서 확인할 수 있게 제작합니다.", en: "Show service value, trust cues, and inquiry flow in one clear website." },
    price: { ko: "5만원~", en: "from ₩50,000" },
    duration: { ko: "1-5일", en: "1-5 days" },
    proof: { ko: "실제 웹사이트 결과 화면", en: "Real website result screen" },
    image: "/portfolio/aio-design-agency/preview.png",
    href: "/quote?category=website",
  },
  {
    id: "shopping-mall",
    type: "shopping-mall",
    title: { ko: "쇼핑몰", en: "Shopping Mall" },
    description: { ko: "첫 화면에서 상품성, 배송 혜택, 카테고리 탐색이 보이도록 정리합니다.", en: "Make products, benefits, and categories easy to scan from the first screen." },
    price: { ko: "15만원~", en: "from ₩150,000" },
    duration: { ko: "2-5일", en: "2-5 days" },
    proof: { ko: "카페24 쇼핑몰 실제 시안", en: "Cafe24 storefront design sample" },
    image: "/portfolio/cafe24-design-pack/d01-wide.png",
    href: "/quote?category=shopping-mall",
  },
  {
    id: "logo-business-card",
    type: "logo-business-card",
    title: { ko: "로고 및 명함", en: "Logo & Business Card" },
    description: { ko: "로고와 명함을 온라인 프로필과 인쇄 사용까지 바로 쓸 수 있게 정리합니다.", en: "Prepare logo and card assets for online profiles and print use." },
    price: { ko: "1만원~", en: "from ₩10,000" },
    duration: { ko: "1일", en: "1 day" },
    proof: { ko: "로고·명함 결과물 예시", en: "Logo/card result sample" },
    image: "/portfolio/aio-brand-kit/business-card-front.png",
    href: "/quote?category=logo-business-card",
  },
  {
    id: "detail-page",
    type: "detail-page",
    title: { ko: "상세페이지", en: "Detail Page" },
    description: { ko: "상품 장점, 사용 장면, 구매 이유가 자연스럽게 읽히는 상세 이미지입니다.", en: "A vertical sales image that explains benefits, use cases, and buying reasons." },
    price: { ko: "3만원~", en: "from ₩30,000" },
    duration: { ko: "1일", en: "1 day" },
    proof: { ko: "상세페이지 이미지 예시", en: "Detail page image sample" },
    image: "/portfolio/detail-page-skincare/cover.png",
    href: "/quote?category=detail-page",
  },
  {
    id: "ppt-design",
    type: "ppt-design",
    title: { ko: "PPT 디자인", en: "PPT Design" },
    description: { ko: "회사소개, 제안, 발표 흐름이 바로 전달되는 편집 가능한 원본 파일입니다.", en: "Editable decks that clearly communicate company, proposal, and pitch stories." },
    price: { ko: "5만원~", en: "from ₩50,000" },
    duration: { ko: "1-2일", en: "1-2 days" },
    proof: { ko: "PPT 표지 및 원본 구성", en: "Deck cover and editable source" },
    image: "/portfolio/ppt-design/brand-proposal/cover-slide.png",
    href: "/quote?category=ppt-design",
  },
  {
    id: "automation-app",
    type: "automation-app",
    title: { ko: "자동화 및 앱", en: "Automation & App" },
    description: { ko: "반복 업무, 상담 관리, 데이터 처리 흐름을 운영 화면으로 확인할 수 있게 만듭니다.", en: "Turn repeat work, consultation, and data workflows into reviewable screens." },
    price: { ko: "10만원~", en: "from ₩100,000" },
    duration: { ko: "1-5일", en: "1-5 days" },
    proof: { ko: "관리자·자동화 운영 화면", en: "Admin and automation proof screen" },
    image: "/portfolio/v-aio-admin/dashboard.png",
    href: "/quote?category=automation-app",
  },
  {
    id: "video-content",
    type: "video-content",
    title: { ko: "영상 콘텐츠", en: "Video Content" },
    description: { ko: "브랜드 첫인상, 핵심 메시지, CTA가 짧은 영상 안에서 보이도록 구성합니다.", en: "Build short videos that show brand impression, message, and CTA clearly." },
    price: { ko: "10만원~", en: "from ₩100,000" },
    duration: { ko: "1-3일", en: "1-3 days" },
    proof: { ko: "브랜드 영상 미리보기", en: "Brand video preview" },
    image: "/portfolio/video-content-samples/brand-shorts.png",
    href: "/quote?category=video-content",
  },
];
