export type PortfolioCategory = "all" | "brand-design" | "brand-book" | "website";

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: Exclude<PortfolioCategory, "all">;
  summary: string;
  tags: string[];
  gradient: string;
  size: "sm" | "md" | "lg";
  challenge: string;
  solution: string;
  impact: string;
  beforeLabel: string;
  afterLabel: string;
}

export const portfolioCategories: { label: string; value: PortfolioCategory }[] = [
  { label: "전체", value: "all" },
  { label: "브랜드 디자인", value: "brand-design" },
  { label: "브랜드 소개서", value: "brand-book" },
  { label: "웹사이트", value: "website" },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "neo-cosmetics",
    slug: "neo-cosmetics",
    title: "NEO Cosmetics 브랜드 아이덴티티 구축",
    category: "brand-design",
    summary: "런칭 브랜드의 로고, 컬러 시스템, 가이드라인을 7일 내 완성했습니다.",
    tags: ["Brand Identity", "Logo", "Guideline"],
    gradient: "from-violet/40 via-accent/25 to-primary/25",
    size: "md",
    challenge: "초기 브랜드 인지도가 낮아 런칭 초반 메시지 집중도가 떨어졌습니다.",
    solution: "타깃별 톤앤매너와 시각 자산을 하나의 일관된 브랜드 키트로 통합했습니다.",
    impact: "브랜드 가이드 배포 후 3주 내 캠페인 제작 리드타임을 62% 단축했습니다.",
    beforeLabel: "단발성 시안 중심의 산발적 제작",
    afterLabel: "일관된 브랜드 키트 기반의 고속 제작",
  },
  {
    id: "atlas-fintech",
    slug: "atlas-fintech",
    title: "Atlas Fintech 서비스 소개 웹사이트",
    category: "website",
    summary: "핵심 기능을 직관적으로 전달하는 전환 중심 웹사이트를 구축했습니다.",
    tags: ["Next.js", "반응형", "CTA 최적화"],
    gradient: "from-accent/35 via-violet/20 to-background",
    size: "lg",
    challenge: "동일한 페이지로 다양한 금융 사용자군을 설득하기 어려웠습니다.",
    solution: "세그먼트별 카피와 비주얼을 명확히 구분하는 페이지 구조를 설계했습니다.",
    impact: "런칭 6주 후 MQL 전환율이 기존 대비 2.3배 상승했습니다.",
    beforeLabel: "단일 랜딩 구조로 인한 메시지 불일치",
    afterLabel: "사용자군별 맞춤 섹션 구성",
  },
  {
    id: "pulse-apparel",
    slug: "pulse-apparel",
    title: "Pulse Apparel 시즌 캠페인 소개서",
    category: "brand-book",
    summary: "시즌 컬렉션 론칭을 위한 바이어 대상 브랜드 소개서를 제작했습니다.",
    tags: ["브랜드 소개서", "캠페인 덱"],
    gradient: "from-primary/35 via-accent/20 to-background",
    size: "sm",
    challenge: "시즌 캠페인마다 신규 소개서 자료를 재제작해 비용이 누적됐습니다.",
    solution: "재사용 가능한 슬라이드 컴포넌트 시스템을 구축해 시즌별 업데이트만 진행했습니다.",
    impact: "소개서 제작 단가를 48% 절감하고 납기를 3일로 단축했습니다.",
    beforeLabel: "캠페인별 소개서 전면 재제작",
    afterLabel: "템플릿 기반 빠른 업데이트",
  },
  {
    id: "zen-space",
    slug: "zen-space",
    title: "ZEN Space 제품 론칭 마이크로사이트",
    category: "website",
    summary: "제품 기능과 스토리를 담은 인터랙티브 마이크로사이트를 제작했습니다.",
    tags: ["마이크로사이트", "인터랙션"],
    gradient: "from-violet/40 via-background to-accent/25",
    size: "md",
    challenge: "복잡한 제품 기능을 짧은 체류 시간 안에 전달해야 했습니다.",
    solution: "핵심 가치 제안을 스토리텔링 흐름으로 재배치하고 시각 인터랙션을 강화했습니다.",
    impact: "론칭 이벤트 기간 평균 체류 시간이 3배 증가했습니다.",
    beforeLabel: "텍스트 중심의 기능 소개 페이지",
    afterLabel: "스토리 기반 인터랙티브 사이트",
  },
  {
    id: "bloom-health",
    slug: "bloom-health",
    title: "Bloom Health 브랜드 아이덴티티",
    category: "brand-design",
    summary: "헬스케어 브랜드의 신뢰감과 친밀감을 담은 통합 비주얼 시스템을 완성했습니다.",
    tags: ["Visual System", "Guideline", "헬스케어"],
    gradient: "from-accent/30 via-primary/25 to-background",
    size: "sm",
    challenge: "팀별로 상이한 비주얼 표현으로 브랜드 신뢰도가 흔들렸습니다.",
    solution: "의학적 신뢰감과 친밀감을 함께 담는 스타일 기준을 라이브러리로 문서화했습니다.",
    impact: "브랜드 자산 품질 편차를 70% 이상 축소했습니다.",
    beforeLabel: "팀별 개별 스타일 사용",
    afterLabel: "통합 가이드 기반 비주얼 운영",
  },
  {
    id: "orbit-ev",
    slug: "orbit-ev",
    title: "Orbit EV 투자자 IR 덱",
    category: "brand-book",
    summary: "EV 스타트업의 시리즈 A 투자 유치를 위한 IR 덱을 제작했습니다.",
    tags: ["IR 덱", "투자자 대상", "인포그래픽"],
    gradient: "from-primary/35 via-violet/25 to-background",
    size: "lg",
    challenge: "복잡한 기술 스펙과 시장 데이터를 투자자에게 간결하게 전달해야 했습니다.",
    solution: "데이터 시각화와 스토리라인 구조를 결합해 흐름 있는 IR 덱을 완성했습니다.",
    impact: "첫 투자 미팅 이후 3곳의 팔로업 미팅을 확보했습니다.",
    beforeLabel: "텍스트 위주의 복잡한 문서",
    afterLabel: "비주얼 중심의 설득력 있는 IR 덱",
  },
];

export function getPortfolioProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}
