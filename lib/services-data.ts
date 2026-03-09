export type ServiceCategory = "brand-design" | "brand-book" | "website";

export interface ServiceProcess {
  step: string;
  title: string;
  description: string;
}

export interface ServiceDetail {
  id: ServiceCategory;
  title: string;
  subtitle: string;
  description: string;
  items: { icon: string; name: string; detail: string }[];
  process: ServiceProcess[];
  relatedPortfolio: string[]; // portfolio slug
  cta: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: "brand-design",
    title: "브랜드 디자인",
    subtitle: "Brand Design",
    description:
      "브랜드의 시각적 정체성 전체를 설계합니다. 로고부터 가이드라인까지, 일관된 브랜드 경험을 만드는 모든 요소를 한 번에.",
    items: [
      {
        icon: "◈",
        name: "로고 디자인",
        detail: "브랜드 방향성에 맞는 독창적 로고 및 심볼 마크 설계",
      },
      {
        icon: "◈",
        name: "명함 / 봉투 / 서식류",
        detail: "일관된 브랜드 아이덴티티가 적용된 비즈니스 문서 디자인",
      },
      {
        icon: "◈",
        name: "브랜드 가이드라인",
        detail: "컬러, 폰트, 사용 규칙을 담은 완결성 있는 브랜드 북",
      },
      {
        icon: "◈",
        name: "SNS 프로필 / 썸네일",
        detail: "플랫폼별 최적화 비주얼 자산 패키지",
      },
    ],
    process: [
      { step: "01", title: "브리핑", description: "브랜드 방향성, 타깃, 레퍼런스 수집 및 분석" },
      { step: "02", title: "콘셉트 도출", description: "3가지 방향의 무드보드와 초기 시안 제시" },
      { step: "03", title: "디자인 개발", description: "선정된 방향 기반 세부 시스템 완성" },
      { step: "04", title: "가이드 납품", description: "최종 파일 패키지 + 브랜드 가이드라인 전달" },
    ],
    relatedPortfolio: ["neo-cosmetics", "bloom-health"],
    cta: "브랜드 디자인 문의하기",
  },
  {
    id: "brand-book",
    title: "브랜드 소개서",
    subtitle: "Brand Book",
    description:
      "회사와 서비스의 가치를 설득력 있는 비주얼로 전달합니다. 투자자, 고객, 파트너에게 브랜드를 제대로 소개하세요.",
    items: [
      {
        icon: "◈",
        name: "회사 소개서",
        detail: "기업 비전, 서비스, 실적을 하나의 스토리로 정리",
      },
      {
        icon: "◈",
        name: "제품 / 서비스 소개서",
        detail: "핵심 가치와 차별점을 시각화한 제품 덱",
      },
      {
        icon: "◈",
        name: "제안서 / IR 덱",
        detail: "투자자 및 파트너를 설득하는 전략적 피치 덱",
      },
      {
        icon: "◈",
        name: "인포그래픽",
        detail: "복잡한 데이터를 한 눈에 읽히는 시각 자료로 변환",
      },
    ],
    process: [
      { step: "01", title: "콘텐츠 수집", description: "회사/제품 자료 및 핵심 메시지 정리" },
      { step: "02", title: "구조 설계", description: "독자 관점의 스토리라인 및 목차 구성" },
      { step: "03", title: "비주얼 제작", description: "브랜드 톤에 맞는 디자인 시스템 적용" },
      { step: "04", title: "최종 납품", description: "PDF + 편집 가능 원본 파일 전달" },
    ],
    relatedPortfolio: ["pulse-apparel", "orbit-ev"],
    cta: "소개서 제작 문의하기",
  },
  {
    id: "website",
    title: "웹사이트 제작",
    subtitle: "Website",
    description:
      "브랜드 가치를 담은 반응형 웹사이트를 빠르고 정교하게 구현합니다. 설계부터 배포까지, 전환을 이끄는 웹 경험.",
    items: [
      {
        icon: "◈",
        name: "상세 페이지",
        detail: "제품/서비스의 가치를 전달하는 전환 최적화 랜딩 페이지",
      },
      {
        icon: "◈",
        name: "브랜드 사이트",
        detail: "기업 아이덴티티를 반영한 완결된 브랜드 웹사이트",
      },
      {
        icon: "◈",
        name: "포트폴리오 사이트",
        detail: "작업물을 돋보이게 하는 에디토리얼 포트폴리오",
      },
      {
        icon: "◈",
        name: "반응형 최적화",
        detail: "모바일·태블릿·데스크톱 완벽 대응 레이아웃",
      },
    ],
    process: [
      { step: "01", title: "기획 & 설계", description: "사이트맵, 와이어프레임, 전환 목표 설정" },
      { step: "02", title: "UI 디자인", description: "브랜드 가이드 기반 페이지 디자인" },
      { step: "03", title: "개발 구현", description: "Next.js 기반 반응형 웹 개발 및 CMS 연동" },
      { step: "04", title: "배포 & 인도", description: "도메인 연결, SEO 설정, 유지보수 가이드 전달" },
    ],
    relatedPortfolio: ["atlas-fintech", "zen-space"],
    cta: "웹사이트 제작 문의하기",
  },
];

export function getServiceById(id: ServiceCategory): ServiceDetail | undefined {
  return servicesData.find((s) => s.id === id);
}

export const serviceCategories: { label: string; value: ServiceCategory }[] = [
  { label: "브랜드 디자인", value: "brand-design" },
  { label: "브랜드 소개서", value: "brand-book" },
  { label: "웹사이트 제작", value: "website" },
];
