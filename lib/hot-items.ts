import type { LocalizedString, ServiceCategory } from "@/lib/services-data";

export interface HotItem {
  id: ServiceCategory;
  type: ServiceCategory;
  title: LocalizedString;
  description: LocalizedString;
  price: LocalizedString;
  duration: LocalizedString;
  proof: LocalizedString;
  href: string;
}

export const hotItems: HotItem[] = [
  {
    id: "website",
    type: "website",
    title: { ko: "웹사이트", en: "Website" },
    description: { ko: "랜딩·회사 홈페이지·포트폴리오를 전환 중심으로.", en: "Landing, company, and portfolio sites built for conversion." },
    price: { ko: "5만원~", en: "from ₩50,000" },
    duration: { ko: "1-5일", en: "1-5 days" },
    proof: { ko: "라이브 사이트 사례", en: "Live site cases" },
    href: "/quote?category=website",
  },
  {
    id: "shopping-mall",
    type: "shopping-mall",
    title: { ko: "쇼핑몰", en: "Shopping Mall" },
    description: { ko: "카페24·커머스 메인과 상품 진열 디자인.", en: "Cafe24 and commerce storefront design." },
    price: { ko: "15만원~", en: "from ₩150,000" },
    duration: { ko: "2-5일", en: "2-5 days" },
    proof: { ko: "카페24 12종 디자인", en: "Cafe24 12-design pack" },
    href: "/quote?category=shopping-mall",
  },
  {
    id: "logo-business-card",
    type: "logo-business-card",
    title: { ko: "로고 및 명함", en: "Logo & Business Card" },
    description: { ko: "로고, 심볼, 명함, 프로필 키트까지 한 번에.", en: "Logo, symbol, business card, and profile kit." },
    price: { ko: "1만원~", en: "from ₩10,000" },
    duration: { ko: "1일", en: "1 day" },
    proof: { ko: "AIO 로고·명함 샘플", en: "AIO logo/card sample" },
    href: "/quote?category=logo-business-card",
  },
  {
    id: "detail-page",
    type: "detail-page",
    title: { ko: "상세페이지", en: "Detail Page" },
    description: { ko: "상품·서비스 판매용 세로형 상세 이미지.", en: "Vertical sales detail images for products and services." },
    price: { ko: "3만원~", en: "from ₩30,000" },
    duration: { ko: "1일", en: "1 day" },
    proof: { ko: "쇼핑몰 상세 구성", en: "Store detail layout" },
    href: "/quote?category=detail-page",
  },
  {
    id: "ppt-design",
    type: "ppt-design",
    title: { ko: "PPT 디자인", en: "PPT Design" },
    description: { ko: "회사소개서·제안서·피치덱을 편집 가능한 원본으로.", en: "Company decks, proposals, and pitches as editable files." },
    price: { ko: "3만원~", en: "from ₩30,000" },
    duration: { ko: "1-2일", en: "1-2 days" },
    proof: { ko: "PPT 5종 포트폴리오", en: "5 deck portfolio types" },
    href: "/quote?category=ppt-design",
  },
  {
    id: "automation-app",
    type: "automation-app",
    title: { ko: "자동화 및 앱", en: "Automation & App" },
    description: { ko: "데이터 크롤링, 업무 자동화, MVP 앱 구축.", en: "Data crawling, workflow automation, and MVP apps." },
    price: { ko: "5만원~", en: "from ₩50,000" },
    duration: { ko: "1-5일", en: "1-5 days" },
    proof: { ko: "BlogAutoPilot 운영 화면", en: "BlogAutoPilot operation proof" },
    href: "/quote?category=automation-app",
  },
  {
    id: "video-content",
    type: "video-content",
    title: { ko: "영상 컨텐츠", en: "Video Content" },
    description: { ko: "브랜드 인트로, 홍보 영상, 쇼츠·릴스 제작.", en: "Brand intros, promo videos, shorts, and reels." },
    price: { ko: "5만원~", en: "from ₩50,000" },
    duration: { ko: "1-3일", en: "1-3 days" },
    proof: { ko: "AIO 모션 인트로", en: "AIO motion intro" },
    href: "/quote?category=video-content",
  },
];
