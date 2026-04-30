export type PortfolioType = "web" | "app" | "design" | "video" | "automation";
export type MediaPolicy = "external-link" | "rich-gallery";
export type Visibility = "public" | "private-result";
export type ProofType = "live-link" | "screenshots" | "video" | "kpi" | "architecture";
export type LocalizedString = { ko: string; en: string };
export type PortfolioGroup =
  | "website"
  | "shopping-mall"
  | "logo-business-card"
  | "detail-page"
  | "ppt-design"
  | "automation-app"
  | "video-content";

export type PortfolioSubtype =
  | "landing"
  | "homepage-basic"
  | "homepage-detail"
  | "shopping-mall"
  | "mvp-basic"
  | "mvp-standard"
  | "mvp-pro"
  | "logo"
  | "business-card"
  | "detail-page"
  | "ppt"
  | "card-news"
  | "infographic"
  | "marketing-video"
  | "shorts-set"
  | "tutorial"
  | "remotion-asset"
  | "motion-graphics"
  | "automation-simple"
  | "automation-standard"
  | "automation-advanced"
  | "data-crawling"
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
  visibility: Visibility;
  proofType: ProofType;
  mediaPolicy: MediaPolicy;
  title: LocalizedString;
  summary: LocalizedString;
  problem: LocalizedString;
  solution: LocalizedString;
  impact: LocalizedString;
  resultSummary?: LocalizedString;
  deliverables?: LocalizedString[];
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
  downloads?: {
    planning?: string;
    deck?: string;
  };
  marketplaceStatus?: "planned";
  responsivePreview?: {
    desktop: string;
    mobile: string;
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

export const portfolioGroups: {
  label: LocalizedString;
  value: PortfolioGroup | "all";
  icon: string;
}[] = [
  { value: "all", label: { ko: "전체", en: "All" }, icon: "" },
  { value: "website", label: { ko: "웹사이트", en: "Website" }, icon: "🌐" },
  { value: "shopping-mall", label: { ko: "쇼핑몰", en: "Store" }, icon: "🛒" },
  { value: "logo-business-card", label: { ko: "로고 및 명함", en: "Logo & Business Card" }, icon: "🎨" },
  { value: "detail-page", label: { ko: "상세페이지", en: "Detail Page" }, icon: "📄" },
  { value: "ppt-design", label: { ko: "PPT 디자인", en: "PPT Design" }, icon: "📊" },
  { value: "automation-app", label: { ko: "자동화 및 앱", en: "Automation & App" }, icon: "⚙️" },
  { value: "video-content", label: { ko: "영상 콘텐츠", en: "Video Content" }, icon: "🎬" },
];

interface LogoConceptSpec {
  slug: string;
  brand: string;
  industry: LocalizedString;
  summary: LocalizedString;
  problem: LocalizedString;
  solution: LocalizedString;
  impact: LocalizedString;
  resultSummary: LocalizedString;
  deliverables: LocalizedString[];
  stack: string[];
  role: string[];
  duration: string;
  size: "sm" | "md" | "lg";
}

const logoConceptSpecs: LogoConceptSpec[] = [
  {
    slug: "moru-coffee",
    brand: "MORU Coffee",
    industry: { ko: "F&B 카페", en: "F&B Cafe" },
    summary: {
      ko: "작은 로스터리 카페를 위한 조용하고 밀도 있는 워드마크·심볼 시스템.",
      en: "A quiet, dense wordmark and symbol system for a small specialty roastery.",
    },
    problem: {
      ko: "프랜차이즈형 카페와 달리 깊이 있는 원두 큐레이션을 한눈에 전달할 로고가 필요했습니다.",
      en: "The concept needed to signal curated coffee depth instead of looking like a generic cafe chain.",
    },
    solution: {
      ko: "원두의 둥근 실루엣과 잔의 수면이 하나의 절제된 원형 심볼로 보여 작은 간판과 컵 스탬프에서도 쉽게 읽힙니다.",
      en: "The bean silhouette and cup surface were reduced into one restrained circular mark that stays legible on signs and cup stamps.",
    },
    impact: {
      ko: "로스터리의 전문성과 동네 카페의 온기를 동시에 보여주는 컨셉 브랜드 샘플입니다.",
      en: "The concept balances roastery expertise with the warmth of a neighborhood cafe.",
    },
    resultSummary: {
      ko: "심볼, 가로형 워드마크, 단색 스탬프, 컵 슬리브 적용 예시를 한 세트로 확인할 수 있습니다.",
      en: "The set includes a symbol, horizontal wordmark, one-color stamp, and cup sleeve application.",
    },
    deliverables: [
      { ko: "메인 로고 및 심볼", en: "Primary logo and symbol" },
      { ko: "컵·스탬프 적용 보드", en: "Cup and stamp application board" },
      { ko: "브랜드 브리프 및 컬러 방향", en: "Brand brief and color direction" },
    ],
    stack: ["Brand Brief", "Logo System", "Cafe Identity"],
    role: ["브랜드 기획", "로고 디자인", "적용 목업"],
    duration: "2일",
    size: "md",
  },
  {
    slug: "salty-yuzu",
    brand: "Salty Yuzu",
    industry: { ko: "F&B 디저트", en: "F&B Dessert" },
    summary: {
      ko: "상큼한 유자와 소금 디저트의 대비를 강조한 밝은 식음료 로고.",
      en: "A bright food logo emphasizing the contrast of yuzu citrus and salted desserts.",
    },
    problem: {
      ko: "귀엽기만 한 디저트 로고를 넘어, 팝업 스토어와 패키지에서 즉시 기억되는 개성이 필요했습니다.",
      en: "The dessert concept needed more than cuteness: it needed fast recall across pop-ups and packaging.",
    },
    solution: {
      ko: "유자 단면, 소금 결정, 미소 곡선이 결합되어 산뜻하지만 지나치게 유아적이지 않은 심볼로 보입니다.",
      en: "A yuzu slice, salt crystal, and smile curve were combined into a fresh mark that avoids feeling childish.",
    },
    impact: {
      ko: "소형 패키지, 스티커, SNS 썸네일에서 색과 형태만으로도 브랜드를 기억시키는 방향입니다.",
      en: "The identity is designed to be recognizable by color and shape on packaging, stickers, and social thumbnails.",
    },
    resultSummary: {
      ko: "컬러 로고, 단색 로고, 테이크아웃 패키지 적용 컷까지 한 번에 보여주는 컨셉입니다.",
      en: "The concept shows the color logo, monochrome logo, and takeaway packaging application together.",
    },
    deliverables: [
      { ko: "유자 심볼 및 워드마크", en: "Yuzu symbol and wordmark" },
      { ko: "패키지 스티커 적용", en: "Packaging sticker application" },
      { ko: "밝은 F&B 컬러 팔레트", en: "Bright F&B color palette" },
    ],
    stack: ["Brand Brief", "Package-ready Logo", "F&B Color"],
    role: ["콘셉트", "로고 디자인", "패키지 적용"],
    duration: "2일",
    size: "md",
  },
  {
    slug: "danchae-table",
    brand: "Danchae Table",
    industry: { ko: "F&B 한식 다이닝", en: "F&B Korean Dining" },
    summary: {
      ko: "한식 다이닝의 정갈한 상차림을 현대적인 격자 심볼로 풀어낸 로고.",
      en: "A modern grid-based logo inspired by composed Korean dining tables.",
    },
    problem: {
      ko: "전통적인 한식 이미지는 살리되, 젊은 고객에게 무겁거나 오래되어 보이지 않는 균형이 필요했습니다.",
      en: "The brand needed Korean dining cues without feeling heavy or dated for younger guests.",
    },
    solution: {
      ko: "반상 그리드와 나뭇결 곡선을 조합해 정갈함, 손맛, 현대적 편집감을 함께 담았습니다.",
      en: "A table grid and wood-grain curve combine order, craft, and an editorial modern feel.",
    },
    impact: {
      ko: "메뉴판, 간판, 예약 페이지까지 확장 가능한 차분한 한식 브랜드 방향을 제안합니다.",
      en: "The identity can extend calmly across menus, signage, and reservation pages.",
    },
    resultSummary: {
      ko: "정사각 심볼과 세로형 로고를 함께 제작해 오프라인 매장 적용성을 높였습니다.",
      en: "A square symbol and vertical logo variant improve usability for offline dining touchpoints.",
    },
    deliverables: [
      { ko: "한식 다이닝 심볼", en: "Korean dining symbol" },
      { ko: "메뉴·사인 적용 보드", en: "Menu and signage board" },
      { ko: "차분한 브랜드 톤 문장", en: "Calm brand tone notes" },
    ],
    stack: ["Brand Brief", "Dining Identity", "Signage System"],
    role: ["브랜드 방향", "심볼 디자인", "사인 적용"],
    duration: "2일",
    size: "lg",
  },
  {
    slug: "onda-hair",
    brand: "Onda Hair",
    industry: { ko: "뷰티 헤어살롱", en: "Beauty Hair Salon" },
    summary: {
      ko: "물결과 머릿결을 하나의 유려한 선으로 연결한 프리미엄 헤어살롱 로고.",
      en: "A premium hair salon logo connecting waves and hair texture through one fluid line.",
    },
    problem: {
      ko: "지역 살롱처럼 보이지 않으면서도 과하게 럭셔리하지 않은 세련된 첫인상이 필요했습니다.",
      en: "The salon needed a refined first impression without feeling either local-generic or overly luxurious.",
    },
    solution: {
      ko: "부드러운 웨이브 라인을 O 이니셜 안에 넣어 시술 결과의 자연스러움과 브랜드명을 동시에 기억시키도록 했습니다.",
      en: "A soft wave inside the O initial makes the name and natural styling outcome memorable together.",
    },
    impact: {
      ko: "예약 프로필, 윈도 사인, 케어 제품 라벨까지 넓게 쓰기 좋은 미니멀 뷰티 로고입니다.",
      en: "The minimal beauty mark works across booking profiles, window signage, and care product labels.",
    },
    resultSummary: {
      ko: "심볼 단독 사용과 워드마크 조합을 모두 준비해 SNS와 매장 적용을 동시에 고려했습니다.",
      en: "Both symbol-only and wordmark lockups were prepared for social and in-store use.",
    },
    deliverables: [
      { ko: "웨이브 심볼 및 워드마크", en: "Wave symbol and wordmark" },
      { ko: "살롱 사인 적용", en: "Salon signage application" },
      { ko: "뷰티 톤앤매너 가이드", en: "Beauty tone guide" },
    ],
    stack: ["Brand Brief", "Beauty Logo", "Salon Signage"],
    role: ["기획", "로고 디자인", "뷰티 적용"],
    duration: "2일",
    size: "md",
  },
  {
    slug: "vela-skin",
    brand: "Vela Skin",
    industry: { ko: "뷰티 스킨케어", en: "Beauty Skincare" },
    summary: {
      ko: "빛, 피부결, 과학적 신뢰를 얇은 V 심볼로 정리한 스킨케어 로고.",
      en: "A skincare logo distilling light, skin texture, and scientific trust into a slim V mark.",
    },
    problem: {
      ko: "클린뷰티의 부드러움과 피부과 수준의 신뢰감을 동시에 담는 시각 언어가 필요했습니다.",
      en: "The concept needed to combine clean beauty softness with clinic-level credibility.",
    },
    solution: {
      ko: "얇은 V 라인과 빛의 점, 넓은 여백이 고기능 제품군에 어울리는 정제된 인상을 만듭니다.",
      en: "A thin V line and light point use generous spacing to create a refined identity for functional skincare.",
    },
    impact: {
      ko: "용기 라벨, 상세페이지, 클리닉 협업 자료에 모두 대응 가능한 스킨케어 로고 방향입니다.",
      en: "The identity can support bottle labels, product pages, and clinic collaboration materials.",
    },
    resultSummary: {
      ko: "프리미엄 제품 라벨에 적합한 얇은 선, 저채도 컬러, 단색 변형을 함께 확인할 수 있습니다.",
      en: "Thin lines, low-saturation colors, and monochrome variants make the logo suitable for premium labels.",
    },
    deliverables: [
      { ko: "V 심볼 및 라벨형 워드마크", en: "V symbol and label-style wordmark" },
      { ko: "스킨케어 패키지 적용", en: "Skincare packaging application" },
      { ko: "프리미엄 컬러 시스템", en: "Premium color system" },
    ],
    stack: ["Brand Brief", "Skincare Identity", "Package Logo"],
    role: ["브랜드 방향", "로고 디자인", "라벨 적용"],
    duration: "2일",
    size: "lg",
  },
  {
    slug: "nudekind",
    brand: "Nudekind",
    industry: { ko: "뷰티 클린 코스메틱", en: "Beauty Clean Cosmetics" },
    summary: {
      ko: "민감 피부와 비건 무드를 담은 부드럽고 담백한 클린 코스메틱 로고.",
      en: "A soft, plainspoken clean cosmetics logo for sensitive-skin and vegan positioning.",
    },
    problem: {
      ko: "친환경 브랜드처럼 보이면서도 흔한 잎사귀 로고에 머물지 않는 차별점이 필요했습니다.",
      en: "The concept needed eco-friendly cues without relying on a generic leaf mark.",
    },
    solution: {
      ko: "소문자 n의 획을 피부 보호막처럼 감싸는 형태로 설계해 친절함과 순함을 시각화했습니다.",
      en: "The lowercase n is wrapped like a skin barrier, visualizing kindness and gentleness.",
    },
    impact: {
      ko: "패키지 전면, 성분 카드, SNS 썸네일에서 작은 크기로도 부드러운 인상이 유지됩니다.",
      en: "The gentle impression holds at small sizes across packaging, ingredient cards, and social thumbnails.",
    },
    resultSummary: {
      ko: "클린 코스메틱에 맞춘 소프트 워드마크, 심볼, 패키지 라벨 보드를 확인할 수 있습니다.",
      en: "A soft wordmark, symbol, and package label board were created for clean cosmetics use.",
    },
    deliverables: [
      { ko: "소프트 심볼 및 워드마크", en: "Soft symbol and wordmark" },
      { ko: "성분 카드 적용", en: "Ingredient card application" },
      { ko: "클린뷰티 브리프", en: "Clean beauty brief" },
    ],
    stack: ["Brand Brief", "Clean Beauty", "Package System"],
    role: ["콘셉트", "로고 디자인", "브랜드 적용"],
    duration: "2일",
    size: "md",
  },
  {
    slug: "breath-pilates",
    brand: "Breath Pilates",
    industry: { ko: "웰니스 필라테스", en: "Wellness Pilates" },
    summary: {
      ko: "호흡과 자세 정렬을 잔잔한 선형 심볼로 표현한 필라테스 스튜디오 로고.",
      en: "A pilates studio logo expressing breath and body alignment through calm linear forms.",
    },
    problem: {
      ko: "운동 강도보다 몸의 균형과 회복을 강조하는 스튜디오 포지션이 필요했습니다.",
      en: "The studio needed a position centered on balance and recovery rather than workout intensity.",
    },
    solution: {
      ko: "들숨과 날숨의 리듬을 두 개의 곡선으로, 중심축을 얇은 수직선으로 보여 정렬감이 분명합니다.",
      en: "Two curves express inhale and exhale while a thin center line creates a sense of alignment.",
    },
    impact: {
      ko: "간판, 예약 앱 아이콘, 수업 카드에서 차분한 전문성을 전달하는 웰니스 로고입니다.",
      en: "The wellness logo communicates calm expertise on signage, booking app icons, and class cards.",
    },
    resultSummary: {
      ko: "선 중심의 심볼과 여백이 큰 워드마크로 고급 스튜디오에 어울리는 인상을 확인할 수 있습니다.",
      en: "A line-led symbol and spacious wordmark create a premium studio impression.",
    },
    deliverables: [
      { ko: "호흡 심볼 및 워드마크", en: "Breath symbol and wordmark" },
      { ko: "클래스 카드 적용", en: "Class card application" },
      { ko: "웰니스 톤 가이드", en: "Wellness tone guide" },
    ],
    stack: ["Brand Brief", "Wellness Identity", "Studio Logo"],
    role: ["브랜드 기획", "로고 디자인", "스튜디오 적용"],
    duration: "2일",
    size: "md",
  },
  {
    slug: "harufit",
    brand: "HaruFit",
    industry: { ko: "웰니스 피트니스", en: "Wellness Fitness" },
    summary: {
      ko: "하루 루틴과 운동 기록을 밝은 에너지로 묶은 피트니스 로고.",
      en: "A fitness logo connecting daily routine and workout tracking with bright energy.",
    },
    problem: {
      ko: "전문 헬스장보다 일상 루틴형 운동 서비스를 친근하게 보여줄 브랜드 장치가 필요했습니다.",
      en: "The fitness concept needed a friendly device for daily routines rather than a hardcore gym image.",
    },
    solution: {
      ko: "체크 표시, 상승 그래프, H 이니셜을 결합해 매일 쌓이는 작은 성취를 심볼화했습니다.",
      en: "A check mark, rising graph, and H initial combine into a symbol of small daily wins.",
    },
    impact: {
      ko: "앱 아이콘, 운동 챌린지 배너, 굿즈에 쓰기 좋은 활동적인 로고 방향입니다.",
      en: "The active logo direction works well for app icons, challenge banners, and merchandise.",
    },
    resultSummary: {
      ko: "루틴 체크 기반의 심볼과 굵은 워드마크로 디지털 서비스와 오프라인 굿즈를 함께 고려했습니다.",
      en: "A routine-check symbol and bold wordmark support both digital service and offline merchandise use.",
    },
    deliverables: [
      { ko: "루틴 심볼 및 워드마크", en: "Routine symbol and wordmark" },
      { ko: "앱 아이콘 적용", en: "App icon application" },
      { ko: "챌린지 배너 톤", en: "Challenge banner tone" },
    ],
    stack: ["Brand Brief", "Fitness Logo", "App-ready Symbol"],
    role: ["콘셉트", "로고 디자인", "디지털 적용"],
    duration: "2일",
    size: "md",
  },
  {
    slug: "mediroot",
    brand: "MediRoot",
    industry: { ko: "웰니스 클리닉", en: "Wellness Clinic" },
    summary: {
      ko: "의료 신뢰와 근본 회복의 이미지를 결합한 클리닉 브랜드 로고.",
      en: "A clinic logo combining medical trust with the idea of root-cause recovery.",
    },
    problem: {
      ko: "차가운 병원 이미지와 과한 자연주의 이미지 사이에서 신뢰와 편안함의 균형이 필요했습니다.",
      en: "The brand needed balance between cold medical imagery and overly natural wellness cues.",
    },
    solution: {
      ko: "십자 구조와 뿌리 형태를 하나의 안정적인 M 심볼 안에 담아 전문성과 회복감을 함께 표현했습니다.",
      en: "A cross structure and root form are held inside a stable M symbol to express expertise and recovery.",
    },
    impact: {
      ko: "클리닉 간판, 진료 안내서, 상담 카드에 적용 가능한 신뢰 중심 로고 샘플입니다.",
      en: "The trust-led logo can apply to clinic signage, care guides, and consultation cards.",
    },
    resultSummary: {
      ko: "블루·그린 계열의 안정된 팔레트와 단색 의료 사인 변형까지 함께 확인할 수 있습니다.",
      en: "The set includes a stable blue-green palette and monochrome medical signage variants.",
    },
    deliverables: [
      { ko: "M 심볼 및 클리닉 워드마크", en: "M symbol and clinic wordmark" },
      { ko: "진료 카드 적용", en: "Care card application" },
      { ko: "의료 신뢰 컬러 시스템", en: "Medical trust color system" },
    ],
    stack: ["Brand Brief", "Clinic Identity", "Trust Mark"],
    role: ["브랜드 방향", "로고 디자인", "의료 적용"],
    duration: "2일",
    size: "lg",
  },
  {
    slug: "nova-node",
    brand: "Nova Node",
    industry: { ko: "테크 SaaS", en: "Tech SaaS" },
    summary: {
      ko: "새로운 연결과 데이터 확장을 별 형태 노드로 표현한 SaaS 로고.",
      en: "A SaaS logo expressing new connections and data expansion through a star-like node.",
    },
    problem: {
      ko: "추상적인 AI·데이터 서비스를 빠르게 이해시키면서도 흔한 회로 아이콘과 구분되어야 했습니다.",
      en: "The AI/data service needed quick clarity while avoiding generic circuit iconography.",
    },
    solution: {
      ko: "중앙 노드에서 네 방향으로 확장되는 빛의 구조를 만들고, 굵은 워드마크로 안정감을 보강했습니다.",
      en: "A central node expands in four light directions, grounded by a bold wordmark.",
    },
    impact: {
      ko: "서비스 화면, 투자자료, 앱 아이콘에 모두 쓰기 좋은 기술 브랜드 로고입니다.",
      en: "The tech identity works across dashboards, investor decks, and app icons.",
    },
    resultSummary: {
      ko: "심볼 단독 사용성이 좋아 작은 파비콘과 다크 화면에서도 선명하게 보입니다.",
      en: "Symbol-only use was prioritized so the mark stays clear in favicons and dark interfaces.",
    },
    deliverables: [
      { ko: "노드 심볼 및 워드마크", en: "Node symbol and wordmark" },
      { ko: "다크 UI 적용", en: "Dark UI application" },
      { ko: "SaaS 브랜드 브리프", en: "SaaS brand brief" },
    ],
    stack: ["Brand Brief", "SaaS Logo", "App Icon"],
    role: ["콘셉트", "로고 디자인", "UI 적용"],
    duration: "2일",
    size: "md",
  },
  {
    slug: "flowstack",
    brand: "Flowstack",
    industry: { ko: "테크 워크플로", en: "Tech Workflow" },
    summary: {
      ko: "업무 흐름과 모듈형 시스템을 계단식 스택 심볼로 표현한 테크 로고.",
      en: "A tech logo turning workflow and modular systems into a stepped stack symbol.",
    },
    problem: {
      ko: "자동화 솔루션의 복잡함을 줄이고, 정리된 업무 흐름이라는 핵심 가치를 보여줘야 했습니다.",
      en: "The automation concept needed to reduce perceived complexity and show organized workflow value.",
    },
    solution: {
      ko: "겹친 레이어와 화살표 흐름을 하나의 F 심볼로 압축해 모듈, 순서, 확장성을 표현했습니다.",
      en: "Layered blocks and arrow flow were compressed into one F symbol for modules, order, and scalability.",
    },
    impact: {
      ko: "B2B 제안서와 제품 화면에 어울리는 단단하고 실무적인 로고 방향입니다.",
      en: "The sturdy, practical logo direction fits B2B proposals and product dashboards.",
    },
    resultSummary: {
      ko: "기하학적 심볼과 고대비 컬러가 복잡한 자동화 서비스를 명료하게 보이도록 돕습니다.",
      en: "A geometric symbol and high-contrast palette make a complex automation service feel clear.",
    },
    deliverables: [
      { ko: "스택 심볼 및 워드마크", en: "Stack symbol and wordmark" },
      { ko: "제품 화면 헤더 적용", en: "Dashboard header application" },
      { ko: "B2B 톤앤매너", en: "B2B tone direction" },
    ],
    stack: ["Brand Brief", "Workflow Identity", "B2B SaaS"],
    role: ["브랜드 기획", "로고 디자인", "제품 적용"],
    duration: "2일",
    size: "lg",
  },
  {
    slug: "promptly-ai",
    brand: "Promptly AI",
    industry: { ko: "테크 AI 도구", en: "Tech AI Tool" },
    summary: {
      ko: "대화형 AI의 즉각성과 정돈된 답변 경험을 말풍선·커서 심볼로 만든 로고.",
      en: "An AI tool logo combining conversational immediacy with an organized answer experience.",
    },
    problem: {
      ko: "AI 서비스가 많아진 시장에서 친근함과 생산성 이미지를 동시에 전달해야 했습니다.",
      en: "In a crowded AI market, the identity needed to communicate both approachability and productivity.",
    },
    solution: {
      ko: "말풍선 안에 커서와 반짝임을 넣어 프롬프트 입력, 답변 생성, 빠른 실행을 하나의 장면으로 압축했습니다.",
      en: "A cursor and spark inside a speech bubble compress prompting, generation, and quick action into one scene.",
    },
    impact: {
      ko: "브라우저 확장, 웹앱, 소개 페이지에 바로 적용 가능한 밝은 AI 브랜드 샘플입니다.",
      en: "The bright AI identity is ready for browser extensions, web apps, and landing pages.",
    },
    resultSummary: {
      ko: "앱 아이콘과 가로형 워드마크를 함께 설계해 제품 UI와 마케팅 화면을 모두 고려했습니다.",
      en: "An app icon and horizontal wordmark were designed together for both product UI and marketing screens.",
    },
    deliverables: [
      { ko: "AI 말풍선 심볼", en: "AI speech-bubble symbol" },
      { ko: "확장 프로그램 아이콘 적용", en: "Extension icon application" },
      { ko: "테크 브랜드 메시지", en: "Tech brand messaging" },
    ],
    stack: ["Brand Brief", "AI Logo", "Product Icon"],
    role: ["콘셉트", "로고 디자인", "앱 적용"],
    duration: "2일",
    size: "md",
  },
];

const logoConceptProjects: PortfolioProject[] = logoConceptSpecs.map((project) => ({
  id: project.slug,
  slug: project.slug,
  type: "design",
  subtype: "logo",
  visibility: "private-result",
  proofType: "screenshots",
  mediaPolicy: "rich-gallery",
  title: { ko: `${project.brand} 로고 시스템`, en: `${project.brand} Logo System` },
  summary: project.summary,
  problem: project.problem,
  solution: project.solution,
  impact: project.impact,
  resultSummary: project.resultSummary,
  deliverables: project.deliverables,
  stack: project.stack,
  role: project.role,
  duration: project.duration,
  client: `${project.industry.ko} 컨셉 브랜드`,
  links: { live: null, github: null, case: `/portfolio/${project.slug}` },
  cover: `/portfolio/logo-showcase/${project.slug}/logo-board.svg`,
  gallery: [
    `/portfolio/logo-showcase/${project.slug}/logo-board.svg`,
    `/portfolio/logo-showcase/${project.slug}/mono-board.svg`,
    `/portfolio/logo-showcase/${project.slug}/guide-board.svg`,
  ],
  size: project.size,
  featured: false,
  publishedAt: "2026-04-29",
}));

interface StorefrontConceptSpec {
  id: string;
  title: LocalizedString;
  summary: LocalizedString;
  problem: LocalizedString;
  solution: LocalizedString;
  impact: LocalizedString;
  resultSummary: LocalizedString;
  deliverables: LocalizedString[];
  stack: string[];
  role: string[];
  duration: string;
  client: string;
  cover: string;
  gallery: string[];
  size: "sm" | "md" | "lg";
  featured?: boolean;
}

const cafe24StorefrontSpecs: StorefrontConceptSpec[] = [
  {
    id: "cafe24-farm-fresh",
    title: { ko: "산지직송 식품몰 메인 디자인", en: "Farm Fresh Storefront Design" },
    summary: {
      ko: "신선식품의 산지 신뢰와 오늘 출고 메시지를 전면에 둔 카페24 쇼핑몰 시안.",
      en: "A Cafe24 storefront concept centered on farm trust and same-day fresh delivery.",
    },
    problem: {
      ko: "식품몰은 상품 수가 많아 첫 화면에서 신뢰, 배송, 카테고리 탐색이 동시에 보여야 했습니다.",
      en: "Food stores need trust, delivery promise, and category browsing to be visible immediately.",
    },
    solution: {
      ko: "상단 신뢰 배지, 산지형 히어로, 빠른 카테고리 칩을 묶어 구매 전환에 필요한 정보를 먼저 배치했습니다.",
      en: "Trust badges, a farm-led hero, and category chips place conversion-critical information first.",
    },
    impact: {
      ko: "방문자가 산지 신뢰, 배송 혜택, 카테고리를 빠르게 이해해 신선식품 구매를 더 쉽게 결정할 수 있습니다.",
      en: "Visitors can quickly understand origin trust, delivery benefits, and categories, making fresh-food purchases easier to decide.",
    },
    resultSummary: {
      ko: "메인 비주얼, 혜택 띠배너, 카테고리 탐색, 인증 배지를 한 화면에서 확인할 수 있습니다.",
      en: "The layout combines a main visual, benefit strip, category browsing, and certification badges.",
    },
    deliverables: [
      { ko: "카페24 메인 화면 시안", en: "Cafe24 main screen concept" },
      { ko: "식품몰 신뢰 배지 구조", en: "Food commerce trust badge structure" },
      { ko: "배너·카테고리 교체 가이드", en: "Banner and category replacement guide" },
    ],
    stack: ["Cafe24 Smart Design", "Food Commerce", "Trust UI", "HTML/CSS"],
    role: ["시장 리서치", "디자인", "카페24 시안"],
    duration: "1종 완료",
    client: "식품몰 컨셉",
    cover: "/portfolio/cafe24-design-pack/d01-wide.png",
    gallery: ["/portfolio/cafe24-design-pack/d01-wide.png", "/portfolio/cafe24-design-pack/d01-guide.svg"],
    size: "lg",
    featured: true,
  },
  {
    id: "cafe24-beauty-minimal",
    title: { ko: "클린뷰티 쇼핑몰 메인 디자인", en: "Clean Beauty Storefront Design" },
    summary: {
      ko: "저자극·성분 중심 뷰티 브랜드를 위한 여백형 카페24 메인 시안.",
      en: "A spacious Cafe24 homepage concept for ingredient-led clean beauty brands.",
    },
    problem: {
      ko: "뷰티몰은 제품 효능과 브랜드 무드가 함께 보여야 하지만, 과한 이미지 사용은 신뢰를 떨어뜨릴 수 있었습니다.",
      en: "Beauty stores need efficacy and mood together, but excessive imagery can weaken trust.",
    },
    solution: {
      ko: "큰 여백, 성분 키워드, 제품 라벨형 카드가 전문성과 부드러운 구매 경험을 동시에 보여줍니다.",
      en: "Generous spacing, ingredient keywords, and label-like product cards balance credibility and softness.",
    },
    impact: {
      ko: "방문자가 성분과 제품 라인업을 차분하게 비교하며 브랜드 신뢰와 구매 확신을 함께 얻을 수 있습니다.",
      en: "Visitors can calmly compare ingredients and product lines while building trust and purchase confidence.",
    },
    resultSummary: {
      ko: "제품 라인업과 성분 메시지가 먼저 읽히는 히어로와 상품 그리드를 확인할 수 있습니다.",
      en: "The hero and product grid prioritize product lineups and ingredient messaging.",
    },
    deliverables: [
      { ko: "클린뷰티 메인 시안", en: "Clean beauty main concept" },
      { ko: "제품 카드 UI", en: "Product card UI" },
      { ko: "성분 메시지 배치 가이드", en: "Ingredient message placement guide" },
    ],
    stack: ["Cafe24 Smart Design", "Beauty UX", "Product Grid", "HTML/CSS"],
    role: ["기획", "디자인", "상품 UI"],
    duration: "1종 완료",
    client: "뷰티몰 컨셉",
    cover: "/portfolio/cafe24-design-pack/d02-wide.png",
    gallery: ["/portfolio/cafe24-design-pack/d02-wide.png", "/portfolio/cafe24-design-pack/d02-guide.svg"],
    size: "md",
  },
  {
    id: "cafe24-mealkit",
    title: { ko: "밀키트 쇼핑몰 메인 디자인", en: "Meal Kit Storefront Design" },
    summary: {
      ko: "조리 편의성과 맛의 기대감을 빠르게 전달하는 밀키트 쇼핑몰 시안.",
      en: "A meal-kit storefront concept that quickly communicates convenience and appetite appeal.",
    },
    problem: {
      ko: "밀키트 구매자는 맛, 조리 시간, 구성품을 짧은 시간 안에 비교하려고 합니다.",
      en: "Meal-kit buyers compare taste, prep time, and components in a very short window.",
    },
    solution: {
      ko: "조리 시간 배지, 인기 메뉴 카드, 후기형 추천 영역을 상단에 배치해 선택 피로를 줄였습니다.",
      en: "Prep-time badges, popular menu cards, and review-led recommendations reduce choice fatigue.",
    },
    impact: {
      ko: "조리 시간, 인기 메뉴, 후기 흐름이 먼저 보여 방문자가 메뉴 선택을 빠르게 끝내고 구매로 이동할 수 있습니다.",
      en: "Prep time, popular menus, and review cues appear first so visitors can choose quickly and move toward purchase.",
    },
    resultSummary: {
      ko: "메뉴 선택 기준이 카드로 보여 첫 화면에서 구매 판단을 돕습니다.",
      en: "Menu decision factors are carded so the first screen supports purchase decisions.",
    },
    deliverables: [
      { ko: "밀키트 메인 시안", en: "Meal kit main concept" },
      { ko: "조리 시간·후기 카드", en: "Prep time and review cards" },
      { ko: "메뉴 그리드 가이드", en: "Menu grid guide" },
    ],
    stack: ["Cafe24 Smart Design", "F&B UX", "Conversion Layout", "HTML/CSS"],
    role: ["기획", "디자인", "커머스 UX"],
    duration: "1종 완료",
    client: "밀키트몰 컨셉",
    cover: "/portfolio/cafe24-design-pack/d03-wide.png",
    gallery: ["/portfolio/cafe24-design-pack/d03-wide.png", "/portfolio/cafe24-design-pack/d03-guide.svg"],
    size: "md",
  },
  {
    id: "cafe24-live-commerce",
    title: { ko: "라이브커머스 쇼핑몰 메인 디자인", en: "Live Commerce Storefront Design" },
    summary: {
      ko: "라이브 예고, 한정 혜택, 빠른 구매 CTA를 강조한 카페24 쇼핑몰 시안.",
      en: "A Cafe24 concept emphasizing live schedules, limited offers, and fast purchase CTAs.",
    },
    problem: {
      ko: "라이브커머스형 쇼핑몰은 방송 전환과 일반 상품 탐색을 한 화면에서 함께 처리해야 했습니다.",
      en: "Live-commerce stores must handle broadcast conversion and normal product browsing together.",
    },
    solution: {
      ko: "방송 카드, 남은 시간, 라이브 특가 영역이 분리되어 지금 봐야 할 이유가 분명하게 보입니다.",
      en: "Broadcast cards, countdowns, and live deal zones create a clear reason to act now.",
    },
    impact: {
      ko: "방송 시간과 한정 혜택이 명확해 방문자가 지금 봐야 할 이유를 느끼고 라이브 구매로 진입할 수 있습니다.",
      en: "Clear broadcast timing and limited offers help visitors feel urgency and enter the live purchase flow.",
    },
    resultSummary: {
      ko: "방송 중심 히어로와 상품형 CTA가 결합되어 라이브 특가 흐름을 명확히 확인할 수 있습니다.",
      en: "A broadcast-led hero and product CTA make the live deal flow easy to understand.",
    },
    deliverables: [
      { ko: "라이브커머스 메인 시안", en: "Live commerce main concept" },
      { ko: "방송 예고·카운트다운 UI", en: "Live schedule and countdown UI" },
      { ko: "특가 CTA 구조", en: "Deal CTA structure" },
    ],
    stack: ["Cafe24 Smart Design", "Live Commerce", "Promotion UI", "HTML/CSS"],
    role: ["시장 리서치", "디자인", "프로모션 UI"],
    duration: "1종 완료",
    client: "라이브커머스 컨셉",
    cover: "/portfolio/cafe24-design-pack/d04-wide.png",
    gallery: ["/portfolio/cafe24-design-pack/d04-wide.png", "/portfolio/cafe24-design-pack/d04-guide.svg"],
    size: "lg",
  },
  {
    id: "cafe24-pet-care",
    title: { ko: "반려동물 용품몰 메인 디자인", en: "Pet Care Storefront Design" },
    summary: {
      ko: "반려동물 용품의 귀여움과 성분·안전 신뢰를 함께 담은 쇼핑몰 시안.",
      en: "A pet-care storefront balancing warmth with ingredient and safety trust.",
    },
    problem: {
      ko: "반려동물몰은 감성 이미지가 중요하지만 사료·간식·케어 제품은 안전 정보도 함께 보여야 합니다.",
      en: "Pet stores need emotional appeal, but food, treats, and care products also require safety cues.",
    },
    solution: {
      ko: "귀여운 톤의 히어로와 안전 배지, 나이·종별 카테고리를 결합해 탐색 동선을 단순화했습니다.",
      en: "A warm hero, safety badges, and age/breed categories simplify browsing.",
    },
    impact: {
      ko: "보호자가 감성 이미지와 안전 정보를 함께 확인해 반려동물 제품을 안심하고 고를 수 있습니다.",
      en: "Pet owners can review emotional appeal and safety cues together, helping them choose products with confidence.",
    },
    resultSummary: {
      ko: "감성 배너와 기능형 카테고리를 동시에 보여줘 브랜드 호감과 구매 편의를 함께 잡았습니다.",
      en: "Emotional banners and functional categories support both affinity and purchase ease.",
    },
    deliverables: [
      { ko: "반려동물몰 메인 시안", en: "Pet store main concept" },
      { ko: "안전 배지·카테고리 UI", en: "Safety badge and category UI" },
      { ko: "상품 추천 영역", en: "Product recommendation section" },
    ],
    stack: ["Cafe24 Smart Design", "Pet Commerce", "Category UX", "HTML/CSS"],
    role: ["기획", "디자인", "카테고리 설계"],
    duration: "1종 완료",
    client: "반려동물몰 컨셉",
    cover: "/portfolio/cafe24-design-pack/d05-wide.png",
    gallery: ["/portfolio/cafe24-design-pack/d05-wide.png", "/portfolio/cafe24-design-pack/d05-guide.svg"],
    size: "md",
  },
  {
    id: "cafe24-digital-goods",
    title: { ko: "미니멀 라이프스타일몰 메인 디자인", en: "Minimal Lifestyle Storefront Design" },
    summary: {
      ko: "덜어낸 화면 구성과 큰 배너로 브랜드 취향을 차분하게 보여주는 미니멀 쇼핑몰 시안.",
      en: "A minimal storefront that presents brand taste with restrained layout and a strong hero.",
    },
    problem: {
      ko: "미니멀 브랜드는 과하게 꾸미면 오히려 제품 감도가 흐려져 첫 화면의 여백과 메시지가 중요했습니다.",
      en: "Minimal brands need careful spacing and message hierarchy so the product mood does not get diluted.",
    },
    solution: {
      ko: "큰 히어로 이미지, 정돈된 카테고리, 저널형 정보 흐름으로 브랜드 톤을 먼저 느낄 수 있습니다.",
      en: "A large hero, clean categories, and journal-like flow make the brand tone immediately clear.",
    },
    impact: {
      ko: "방문자가 상품을 보기 전 브랜드의 분위기와 취향을 먼저 이해해 더 자연스럽게 탐색을 시작할 수 있습니다.",
      en: "Visitors understand the brand mood before browsing products, making exploration feel more natural.",
    },
    resultSummary: {
      ko: "과한 장식 없이 브랜드의 첫인상과 상품 탐색을 연결한 미니멀형 레이아웃입니다.",
      en: "A minimal layout that connects first impression and product discovery without excess decoration.",
    },
    deliverables: [
      { ko: "미니멀 라이프스타일몰 메인 시안", en: "Minimal lifestyle main concept" },
      { ko: "브랜드 히어로 영역", en: "Brand hero section" },
      { ko: "저널형 탐색 구조", en: "Journal-style browsing flow" },
    ],
    stack: ["Cafe24 Smart Design", "Minimal UX", "Lifestyle Commerce", "HTML/CSS"],
    role: ["기획", "디자인", "상품 구조"],
    duration: "1종 완료",
    client: "미니멀 라이프스타일몰 컨셉",
    cover: "/portfolio/cafe24-design-pack/d06-wide.png",
    gallery: ["/portfolio/cafe24-design-pack/d06-wide.png", "/portfolio/cafe24-design-pack/d06-guide.svg"],
    size: "md",
  },
  {
    id: "cafe24-health-supplement",
    title: { ko: "건강기능식품몰 메인 디자인", en: "Supplement Storefront Design" },
    summary: {
      ko: "성분 신뢰, 연령별 고민, 정기구독 흐름을 담은 건강식품 쇼핑몰 시안.",
      en: "A supplement storefront built around ingredient trust, age needs, and subscriptions.",
    },
    problem: {
      ko: "건강식품몰은 효능 과장 없이 성분, 인증, 섭취 루틴을 설득력 있게 전달해야 했습니다.",
      en: "Supplement stores must communicate ingredients, certifications, and routines without overclaiming.",
    },
    solution: {
      ko: "고민별 카테고리, 성분 카드, 정기구독 CTA를 분리해 정보 탐색과 구매 전환을 안정적으로 연결했습니다.",
      en: "Need-state categories, ingredient cards, and subscription CTAs connect browsing to conversion.",
    },
    impact: {
      ko: "성분, 인증, 섭취 루틴이 분명하게 보여 방문자가 건강식품을 더 신뢰하고 비교할 수 있습니다.",
      en: "Ingredients, certifications, and routines are clear, helping visitors trust and compare supplement products.",
    },
    resultSummary: {
      ko: "인증 정보와 루틴 제안을 명확히 보여주는 신뢰 중심 쇼핑몰 화면입니다.",
      en: "A trust-led storefront that clarifies certifications and routine suggestions.",
    },
    deliverables: [
      { ko: "건강식품몰 메인 시안", en: "Supplement main concept" },
      { ko: "성분·인증 카드 UI", en: "Ingredient and certification cards" },
      { ko: "정기구독 CTA 구조", en: "Subscription CTA structure" },
    ],
    stack: ["Cafe24 Smart Design", "Health Commerce", "Trust UI", "HTML/CSS"],
    role: ["기획", "디자인", "신뢰 UI"],
    duration: "1종 완료",
    client: "건강식품몰 컨셉",
    cover: "/portfolio/cafe24-design-pack/d07-wide.png",
    gallery: ["/portfolio/cafe24-design-pack/d07-wide.png", "/portfolio/cafe24-design-pack/d07-guide.svg"],
    size: "lg",
  },
  {
    id: "cafe24-stationery",
    title: { ko: "볼드 모던 브랜드몰 메인 디자인", en: "Bold Modern Brand Storefront Design" },
    summary: {
      ko: "강한 대비와 굵은 타이포로 1인 브랜드의 존재감을 크게 보여주는 쇼핑몰 시안.",
      en: "A bold storefront that uses strong contrast and typography to make a solo brand memorable.",
    },
    problem: {
      ko: "소품몰은 상품 단가가 낮아 브랜드 감도와 묶음 구매 제안이 첫 화면에서 중요했습니다.",
      en: "Small-goods stores need brand taste and bundle suggestions because item prices are low.",
    },
    solution: {
      ko: "룩북형 배너, 컬렉션 카드, 묶음 제안 영역을 배치해 탐색 자체가 구매 욕구를 만들도록 했습니다.",
      en: "Lookbook banners, collection cards, and bundle sections make browsing create purchase intent.",
    },
    impact: {
      ko: "컬렉션 무드와 묶음 제안이 먼저 보여 방문자가 브랜드 취향을 느끼고 여러 상품을 함께 탐색하게 됩니다.",
      en: "Collection mood and bundle suggestions appear first, encouraging visitors to feel the brand taste and browse multiple products.",
    },
    resultSummary: {
      ko: "상품보다 컬렉션 무드를 먼저 보여줘 브랜드 취향을 빠르게 전달합니다.",
      en: "Collection mood comes before individual products to communicate taste quickly.",
    },
    deliverables: [
      { ko: "문구몰 메인 시안", en: "Stationery store main concept" },
      { ko: "룩북형 컬렉션 카드", en: "Lookbook collection cards" },
      { ko: "묶음 구매 영역", en: "Bundle purchase section" },
    ],
    stack: ["Cafe24 Smart Design", "Lifestyle UX", "Editorial Layout", "HTML/CSS"],
    role: ["브랜드 방향", "디자인", "컬렉션 UI"],
    duration: "1종 완료",
    client: "라이프스타일몰 컨셉",
    cover: "/portfolio/cafe24-design-pack/d08-wide.png",
    gallery: ["/portfolio/cafe24-design-pack/d08-wide.png", "/portfolio/cafe24-design-pack/d08-guide.svg"],
    size: "md",
  },
  {
    id: "cafe24-fashion-basic",
    title: { ko: "트렌디 팝 라이브커머스몰 메인 디자인", en: "Trendy Pop Live Commerce Design" },
    summary: {
      ko: "강한 컬러와 혜택 배너로 라이브 특가와 즉시 구매 흐름을 강조한 쇼핑몰 시안.",
      en: "A vivid live commerce storefront that emphasizes deals and fast purchase movement.",
    },
    problem: {
      ko: "패션몰은 이미지가 많아질수록 구매 기준이 흐려져 핏과 컬러 탐색을 명확히 해야 했습니다.",
      en: "Fashion stores can blur decision criteria when imagery gets heavy, so fit and color browsing must be clear.",
    },
    solution: {
      ko: "시즌 히어로, 핏별 카테고리, 컬러 스와치를 상단에 배치해 첫 클릭을 빠르게 유도했습니다.",
      en: "A seasonal hero, fit categories, and color swatches drive fast first clicks.",
    },
    impact: {
      ko: "핏, 컬러, 시즌 정보를 빠르게 비교할 수 있어 방문자가 원하는 상품군으로 바로 이동할 수 있습니다.",
      en: "Fit, color, and season cues are easy to compare, helping visitors move directly to the products they want.",
    },
    resultSummary: {
      ko: "상품 상세로 가기 전 필요한 핏·컬러·시즌 정보를 메인에서 압축해 확인할 수 있습니다.",
      en: "Fit, color, and season cues are compressed on the main page before product detail entry.",
    },
    deliverables: [
      { ko: "패션몰 메인 시안", en: "Fashion store main concept" },
      { ko: "핏별 카테고리 UI", en: "Fit category UI" },
      { ko: "컬러 스와치 구조", en: "Color swatch structure" },
    ],
    stack: ["Cafe24 Smart Design", "Fashion UX", "Product Discovery", "HTML/CSS"],
    role: ["시장 리서치", "디자인", "탐색 UI"],
    duration: "1종 완료",
    client: "패션몰 컨셉",
    cover: "/portfolio/cafe24-design-pack/d09-wide.png",
    gallery: ["/portfolio/cafe24-design-pack/d09-wide.png", "/portfolio/cafe24-design-pack/d09-guide.svg"],
    size: "md",
  },
  {
    id: "cafe24-one-person-brand",
    title: { ko: "스튜디오 브라이트 라이브커머스몰 메인 디자인", en: "Studio Bright Live Commerce Design" },
    summary: {
      ko: "스튜디오 조명처럼 밝은 컬러와 방송형 CTA로 라이브 판매 흐름을 보여주는 시안.",
      en: "A bright studio-style live commerce concept with broadcast-oriented CTAs.",
    },
    problem: {
      ko: "1인 브랜드는 상품 수가 적어 빈약해 보이지 않도록 브랜드 스토리와 구매 이유를 함께 보여야 했습니다.",
      en: "Solo brands often have few products, so story and purchase reasons must prevent the store from feeling thin.",
    },
    solution: {
      ko: "브랜드 스토리 히어로, 대표 상품, 제작자 메시지, 후기 영역을 한 흐름으로 연결했습니다.",
      en: "Brand story, hero product, maker message, and reviews are connected into one flow.",
    },
    impact: {
      ko: "상품 수가 적어도 브랜드의 이유와 신뢰 요소가 함께 보여 방문자가 작은 브랜드를 더 쉽게 이해합니다.",
      en: "Even with a small catalog, visitors can understand the brand reason and trust cues more easily.",
    },
    resultSummary: {
      ko: "상품 수가 적어도 브랜드의 이유와 신뢰가 보이도록 첫 화면의 정보 밀도를 조절했습니다.",
      en: "The first screen balances information density so story and trust show even with a small catalog.",
    },
    deliverables: [
      { ko: "1인 브랜드 메인 시안", en: "Solo brand main concept" },
      { ko: "브랜드 스토리 영역", en: "Brand story section" },
      { ko: "대표 상품·후기 구조", en: "Hero product and review structure" },
    ],
    stack: ["Cafe24 Smart Design", "Founder Brand", "Story Commerce", "HTML/CSS"],
    role: ["기획", "디자인", "브랜드 구성"],
    duration: "1종 완료",
    client: "1인 브랜드 컨셉",
    cover: "/portfolio/cafe24-design-pack/d10-wide.png",
    gallery: ["/portfolio/cafe24-design-pack/d10-wide.png", "/portfolio/cafe24-design-pack/d10-guide.svg"],
    size: "lg",
  },
  {
    id: "cafe24-kids-goods",
    title: { ko: "프리미엄 펫 메종 쇼핑몰 메인 디자인", en: "Premium Pet Maison Storefront Design" },
    summary: {
      ko: "고급스러운 다크 톤으로 펫 브랜드의 재료 신뢰와 선물 가치를 보여주는 쇼핑몰 시안.",
      en: "A premium pet storefront using a dark editorial tone to show ingredient trust and gifting value.",
    },
    problem: {
      ko: "키즈용품은 귀여운 무드뿐 아니라 연령, 소재, 안전 인증 정보가 빠르게 보여야 했습니다.",
      en: "Kids goods need cute mood plus age, material, and safety information at a glance.",
    },
    solution: {
      ko: "연령별 카테고리, 소재 배지, 선물 추천 카드를 상단에 배치해 부모의 탐색 시간을 줄였습니다.",
      en: "Age categories, material badges, and gift recommendation cards reduce browsing time for parents.",
    },
    impact: {
      ko: "연령, 소재, 안전 정보를 먼저 확인할 수 있어 부모 고객이 구매 기준을 빠르게 세울 수 있습니다.",
      en: "Parents can check age, material, and safety information first, helping them form purchase criteria quickly.",
    },
    resultSummary: {
      ko: "감성보다 구매 기준을 먼저 보여주는 부모 타깃형 레이아웃입니다.",
      en: "A parent-targeted layout that puts purchase criteria before mood alone.",
    },
    deliverables: [
      { ko: "키즈용품몰 메인 시안", en: "Kids goods main concept" },
      { ko: "연령별 탐색 UI", en: "Age-based browsing UI" },
      { ko: "안전 정보 카드", en: "Safety information cards" },
    ],
    stack: ["Cafe24 Smart Design", "Kids Commerce", "Safety UI", "HTML/CSS"],
    role: ["기획", "디자인", "카테고리 설계"],
    duration: "1종 완료",
    client: "키즈용품몰 컨셉",
    cover: "/portfolio/cafe24-design-pack/d11-wide.png",
    gallery: ["/portfolio/cafe24-design-pack/d11-wide.png", "/portfolio/cafe24-design-pack/d11-guide.svg"],
    size: "md",
  },
  {
    id: "cafe24-premium-tea",
    title: { ko: "액티브 아웃도어 펫몰 메인 디자인", en: "Active Outdoor Pet Storefront Design" },
    summary: {
      ko: "산책, 하네스, GPS 트래커 등 야외 활동형 펫 제품을 힘 있게 보여주는 쇼핑몰 시안.",
      en: "An active outdoor pet storefront for harnesses, trackers, and walking gear.",
    },
    problem: {
      ko: "아웃도어 펫 제품은 튼튼함, 안전성, 활동 장면이 첫 화면에서 바로 전달되어야 했습니다.",
      en: "Outdoor pet gear needs durability, safety, and use scenes to be clear immediately.",
    },
    solution: {
      ko: "강한 히어로 이미지, 산책 인증 메시지, 카테고리별 장비 탐색을 전면에 배치했습니다.",
      en: "A strong hero, walking-proof messaging, and gear categories are placed up front.",
    },
    impact: {
      ko: "방문자가 제품의 사용 장면과 안전 포인트를 빠르게 이해해 야외 활동용 펫 제품을 더 쉽게 비교할 수 있습니다.",
      en: "Visitors can quickly understand use cases and safety points, making outdoor pet products easier to compare.",
    },
    resultSummary: {
      ko: "활동 장면, 혜택, 장비 카테고리가 한 번에 보이는 아웃도어 펫몰 레이아웃입니다.",
      en: "An outdoor pet layout where activity scenes, benefits, and gear categories are visible at once.",
    },
    deliverables: [
      { ko: "아웃도어 펫몰 메인 시안", en: "Outdoor pet main concept" },
      { ko: "장비 카테고리 UI", en: "Gear category UI" },
      { ko: "산책 혜택 CTA", en: "Walking benefit CTA" },
    ],
    stack: ["Cafe24 Smart Design", "Pet Commerce", "Outdoor UX", "HTML/CSS"],
    role: ["브랜드 방향", "디자인", "커머스 구성"],
    duration: "1종 완료",
    client: "아웃도어 펫몰 컨셉",
    cover: "/portfolio/cafe24-design-pack/d12-wide.png",
    gallery: ["/portfolio/cafe24-design-pack/d12-wide.png", "/portfolio/cafe24-design-pack/d12-guide.svg"],
    size: "md",
  },
];

const cafe24StorefrontProjects: PortfolioProject[] = cafe24StorefrontSpecs.map((project) => ({
  id: project.id,
  slug: project.id,
  type: "design",
  subtype: "shopping-mall",
  visibility: "private-result",
  proofType: "screenshots",
  mediaPolicy: "rich-gallery",
  title: project.title,
  summary: project.summary,
  problem: project.problem,
  solution: project.solution,
  impact: project.impact,
  resultSummary: project.resultSummary,
  deliverables: project.deliverables,
  stack: project.stack,
  role: project.role,
  duration: project.duration,
  client: project.client,
  links: { live: null, github: null, case: `/portfolio/${project.id}` },
  marketplaceStatus: "planned",
  responsivePreview: {
    desktop: project.cover,
    mobile: project.cover.replace("-wide.png", "-mobile-photo.png"),
  },
  cover: project.cover,
  gallery: [project.cover, project.cover.replace("-wide.png", "-mobile-photo.png"), ...project.gallery.slice(1)],
  size: project.size,
  featured: project.featured ?? false,
  publishedAt: "2026-04-28",
}));

const pptPortfolioProjects: PortfolioProject[] = [
  {
    id: "ppt-government-grant",
    slug: "ppt-government-grant",
    type: "design",
    subtype: "ppt",
    visibility: "private-result",
    proofType: "video",
    mediaPolicy: "rich-gallery",
    title: { ko: "정부지원사업 발표 PPT 패키지", en: "Government Grant Presentation Decks" },
    summary: {
      ko: "예비창업패키지, TIPS, 청창사, 글로벌 진출, R&D 과제처럼 평가 기준이 중요한 발표자료를 구조화한 PPT 포트폴리오입니다.",
      en: "Grant and public-funding presentation decks structured around evaluation criteria, milestones, budgets, and proof.",
    },
    problem: {
      ko: "지원사업 발표자료는 예쁜 디자인보다 평가 항목, 정량 근거, 추진 일정, 예산 계획이 명확해야 심사자가 빠르게 판단할 수 있습니다.",
      en: "Grant decks must help reviewers quickly judge fit, evidence, timeline, budget, and execution readiness.",
    },
    solution: {
      ko: "사업별 평가표에 맞춘 목차, 핵심 메시지, 데이터 근거가 한 장씩 읽히는 발표 흐름이 필요합니다.",
      en: "We rebuilt the flow around each program's scoring criteria so every slide has one clear message and evidence point.",
    },
    impact: {
      ko: "발표자는 제한된 시간 안에 사업성, 실행 가능성, 팀 신뢰도를 빠르게 설명할 수 있고, 심사자는 필요한 판단 근거를 놓치지 않고 확인할 수 있습니다.",
      en: "The presenter can explain viability, execution, and team trust within a short pitch while reviewers can find the proof they need.",
    },
    resultSummary: {
      ko: "기획서 1개와 PPT 원본 1개를 한 세트로 확인할 수 있으며, 예비창업패키지·TIPS·청창사·글로벌 진출·정부 R&D 유형별 구성을 비교할 수 있습니다.",
      en: "Each portfolio item is composed of one planning document and one editable PPT deck, covering grant, TIPS, youth startup, global expansion, and R&D formats.",
    },
    deliverables: [
      { ko: "기획서 1개 + PPT 원본 1개 구성", en: "One planning document plus one editable PPT deck" },
      { ko: "사업별 발표 목차 및 평가 기준 반영", en: "Program-specific story structure and scoring criteria" },
      { ko: "정량 데이터·예산·일정 중심 슬라이드", en: "Slides for data, budget, timeline, and milestones" },
    ],
    kpis: [
      { value: "5", unit: "종", label: { ko: "지원사업 유형", en: "Grant formats" } },
      { value: "25-30", unit: "P", label: { ko: "권장 분량", en: "Recommended length" } },
      { value: "1+1", label: { ko: "기획서 + PPT", en: "Plan + PPT" } },
    ],
    stack: ["Grant Deck", "Business Plan", "Data Story", "Editable PPTX"],
    role: ["기획", "자료 구조화", "카피 정리", "PPT 디자인"],
    duration: "2-4일",
    client: "PPT 포트폴리오 샘플",
    links: { live: null, github: null, case: "/portfolio/ppt-government-grant" },
    downloads: {
      planning: "/portfolio/ppt-design/government-grant/planning.md",
      deck: "/portfolio/ppt-design/government-grant/deck.pptx",
    },
    cover: "/portfolio/ppt-design/government-grant/cover-slide.png",
    gallery: [
      "/portfolio/ppt-design/government-grant/cover-slide.png",
      "/portfolio/ppt-design/government-grant/sample-2.png",
      "/portfolio/ppt-design/government-grant/sample-3.png",
      "/portfolio/ppt-design/government-grant/sample-4.png",
      "/portfolio/ppt-design/government-grant/sample-5.png",
    ],
    size: "md",
    featured: false,
    publishedAt: "2026-04-29",
  },
  {
    id: "ppt-ir-investment",
    slug: "ppt-ir-investment",
    type: "design",
    subtype: "ppt",
    visibility: "private-result",
    proofType: "screenshots",
    mediaPolicy: "rich-gallery",
    title: { ko: "IR·투자유치 피치덱 패키지", en: "IR & Investment Pitch Decks" },
    summary: {
      ko: "Seed, Pre-A, Series A/B, 데모데이 발표처럼 투자자와 파트너가 빠르게 이해해야 하는 피치덱 포트폴리오입니다.",
      en: "Pitch deck portfolio for seed, Pre-A, Series A/B, and demo-day presentations.",
    },
    problem: {
      ko: "투자자용 자료는 기능 설명만 많으면 설득력이 약해지고, 시장성·트랙션·수익모델·확장성이 한 흐름으로 보여야 합니다.",
      en: "Investor decks need a clear flow from market and traction to business model and scale, not just feature descriptions.",
    },
    solution: {
      ko: "문제, 시장, 해결책, 트랙션, BM, 팀, 투자 요청 금액이 자연스럽게 이어지는 발표 순서가 필요합니다.",
      en: "We organized the pitch around problem, market, solution, traction, business model, team, and funding ask.",
    },
    impact: {
      ko: "발표자는 핵심 투자 포인트를 짧게 전달할 수 있고, 투자자는 현재 단계와 다음 성장 가능성을 빠르게 비교할 수 있습니다.",
      en: "Founders can present the investment thesis clearly while investors can compare stage, traction, and growth potential.",
    },
    resultSummary: {
      ko: "기획서 1개와 PPT 원본 1개를 한 세트로 확인할 수 있으며, Seed·Pre-A·Series A/B·데모데이 발표 유형별 구성을 비교할 수 있습니다.",
      en: "Each portfolio item is composed of one planning document and one editable PPT deck across seed, Pre-A, Series A/B, and demo-day formats.",
    },
    deliverables: [
      { ko: "기획서 1개 + PPT 원본 1개 구성", en: "One planning document plus one editable PPT deck" },
      { ko: "투자 단계별 스토리라인", en: "Stage-specific investor storyline" },
      { ko: "시장·트랙션·BM 슬라이드 구성", en: "Market, traction, and business model slides" },
    ],
    kpis: [
      { value: "5", unit: "종", label: { ko: "투자 단계", en: "Investment stages" } },
      { value: "10-20", unit: "P", label: { ko: "권장 분량", en: "Recommended length" } },
      { value: "1+1", label: { ko: "기획서 + PPT", en: "Plan + PPT" } },
    ],
    stack: ["IR Deck", "Pitch Story", "Traction", "Editable PPTX"],
    role: ["스토리 설계", "카피 정리", "지표 구성", "PPT 디자인"],
    duration: "2-4일",
    client: "PPT 포트폴리오 샘플",
    links: { live: null, github: null, case: "/portfolio/ppt-ir-investment" },
    downloads: {
      planning: "/portfolio/ppt-design/ir-investment/planning.md",
      deck: "/portfolio/ppt-design/ir-investment/deck.pptx",
    },
    cover: "/portfolio/ppt-design/ir-investment/cover-slide.png",
    gallery: [
      "/portfolio/ppt-design/ir-investment/cover-slide.png",
      "/portfolio/ppt-design/ir-investment/sample-2.png",
      "/portfolio/ppt-design/ir-investment/sample-3.png",
      "/portfolio/ppt-design/ir-investment/sample-4.png",
      "/portfolio/ppt-design/ir-investment/sample-5.png",
    ],
    size: "md",
    featured: false,
    publishedAt: "2026-04-29",
  },
  {
    id: "ppt-brand-proposal",
    slug: "ppt-brand-proposal",
    type: "design",
    subtype: "ppt",
    visibility: "private-result",
    proofType: "screenshots",
    mediaPolicy: "rich-gallery",
    title: { ko: "회사소개서·브랜드 제안서 PPT", en: "Company Profile & Proposal Decks" },
    summary: {
      ko: "회사소개서, 스튜디오 소개서, B2B 제안서, 마케팅 제안서, 상품 제안서까지 상담 전 검토용으로 확인할 수 있는 PPT 포트폴리오입니다.",
      en: "Sales-ready company profile and proposal deck portfolio for brands, studios, B2B offers, and campaigns.",
    },
    problem: {
      ko: "영업 제안서는 고객이 서비스 범위, 강점, 가격, 진행 방식을 빠르게 이해하고 내부 공유까지 할 수 있어야 합니다.",
      en: "Sales decks must make scope, strengths, pricing, and process easy to understand and share internally.",
    },
    solution: {
      ko: "첫인상, 서비스 구조, 사례, 견적 근거, 다음 액션이 순서대로 보이는 브랜드형 제안서 흐름이 필요합니다.",
      en: "We built a proposal flow that moves from first impression to services, proof, pricing logic, and next steps.",
    },
    impact: {
      ko: "고객은 우리 서비스가 어떤 결과물을 주는지 빠르게 비교할 수 있고, 담당자는 상담 전에 제안 범위와 예산감을 명확히 전달할 수 있습니다.",
      en: "Prospects can compare the service value quickly, and sales teams can clarify scope and budget before a call.",
    },
    resultSummary: {
      ko: "기획서 1개와 PPT 원본 1개를 한 세트로 확인할 수 있으며, 회사소개서·브랜드 소개서·B2B·마케팅·상품 제안서 유형별 구성을 비교할 수 있습니다.",
      en: "Each portfolio item is composed of one planning document and one editable PPT deck across company, brand, B2B, marketing, and product proposal formats.",
    },
    deliverables: [
      { ko: "기획서 1개 + PPT 원본 1개 구성", en: "One planning document plus one editable PPT deck" },
      { ko: "브랜드 첫인상용 표지·소개 구조", en: "Cover and company introduction structure" },
      { ko: "서비스·가격·프로세스 제안 슬라이드", en: "Service, pricing, and process proposal slides" },
    ],
    kpis: [
      { value: "5", unit: "종", label: { ko: "제안서 유형", en: "Proposal types" } },
      { value: "14-20", unit: "P", label: { ko: "권장 분량", en: "Recommended length" } },
      { value: "1+1", label: { ko: "기획서 + PPT", en: "Plan + PPT" } },
    ],
    stack: ["Company Deck", "Proposal", "Sales Copy", "Editable PPTX"],
    role: ["브랜드 구조화", "제안 카피", "시각 디자인", "PPT 편집"],
    duration: "1-3일",
    client: "PPT 포트폴리오 샘플",
    links: { live: null, github: null, case: "/portfolio/ppt-brand-proposal" },
    downloads: {
      planning: "/portfolio/ppt-design/brand-proposal/planning.md",
      deck: "/portfolio/ppt-design/brand-proposal/deck.pptx",
    },
    cover: "/portfolio/ppt-design/brand-proposal/cover-slide.png",
    gallery: [
      "/portfolio/ppt-design/brand-proposal/cover-slide.png",
      "/portfolio/ppt-design/brand-proposal/sample-2.png",
      "/portfolio/ppt-design/brand-proposal/sample-3.png",
      "/portfolio/ppt-design/brand-proposal/sample-4.png",
      "/portfolio/ppt-design/brand-proposal/sample-5.png",
    ],
    size: "md",
    featured: true,
    publishedAt: "2026-04-29",
  },
  {
    id: "ppt-seminar-lecture",
    slug: "ppt-seminar-lecture",
    type: "design",
    subtype: "ppt",
    visibility: "private-result",
    proofType: "screenshots",
    mediaPolicy: "rich-gallery",
    title: { ko: "세미나·강연 발표자료 PPT", en: "Seminar & Lecture Presentation Decks" },
    summary: {
      ko: "AI 자동화, 솔로프리너, 마케팅, 데이터 입문, ESG 강연처럼 청중 이해와 발표 흐름이 중요한 강연용 PPT 포트폴리오입니다.",
      en: "Lecture and seminar deck portfolio designed for audience understanding, pacing, and speaker flow.",
    },
    problem: {
      ko: "강연 자료는 읽는 문서가 아니라 듣는 사람이 따라올 수 있는 흐름, 예시, 강조 장면이 중요합니다.",
      en: "Lecture decks need a rhythm that audiences can follow, with examples and emphasis points, not dense reading pages.",
    },
    solution: {
      ko: "섹션 전환, 핵심 문장, 설명용 다이어그램, 요약 슬라이드가 나뉘어 발표자가 자연스럽게 말할 수 있는 구조가 필요합니다.",
      en: "We structured section breaks, key statements, explainers, and summaries so speakers can deliver naturally.",
    },
    impact: {
      ko: "청중은 핵심 개념을 단계적으로 이해하고, 발표자는 시간 안배와 메시지 강조를 안정적으로 가져갈 수 있습니다.",
      en: "Audiences can follow the content step by step, while speakers can control timing and emphasis.",
    },
    resultSummary: {
      ko: "기획서 1개와 PPT 원본 1개를 한 세트로 확인할 수 있으며, 세미나·키노트·교육 강의·CEO 토크 유형별 구성을 비교할 수 있습니다.",
      en: "Each portfolio item is composed of one planning document and one editable PPT deck across seminar, keynote, education, and executive talk formats.",
    },
    deliverables: [
      { ko: "기획서 1개 + PPT 원본 1개 구성", en: "One planning document plus one editable PPT deck" },
      { ko: "강연 흐름 설계와 섹션 구조", en: "Lecture flow and section structure" },
      { ko: "개념 설명·예시·요약 슬라이드", en: "Concept, example, and recap slides" },
    ],
    kpis: [
      { value: "5", unit: "종", label: { ko: "강연 유형", en: "Lecture formats" } },
      { value: "18-30", unit: "P", label: { ko: "권장 분량", en: "Recommended length" } },
      { value: "1+1", label: { ko: "기획서 + PPT", en: "Plan + PPT" } },
    ],
    stack: ["Seminar Deck", "Keynote", "Education", "Editable PPTX"],
    role: ["강연 구성", "교육 흐름", "슬라이드 디자인", "카피 정리"],
    duration: "2-4일",
    client: "PPT 포트폴리오 샘플",
    links: { live: null, github: null, case: "/portfolio/ppt-seminar-lecture" },
    downloads: {
      planning: "/portfolio/ppt-design/seminar-lecture/planning.md",
      deck: "/portfolio/ppt-design/seminar-lecture/deck.pptx",
    },
    cover: "/portfolio/ppt-design/seminar-lecture/cover-slide.png",
    gallery: [
      "/portfolio/ppt-design/seminar-lecture/cover-slide.png",
      "/portfolio/ppt-design/seminar-lecture/sample-2.png",
      "/portfolio/ppt-design/seminar-lecture/sample-3.png",
      "/portfolio/ppt-design/seminar-lecture/sample-4.png",
      "/portfolio/ppt-design/seminar-lecture/sample-5.png",
    ],
    size: "md",
    featured: false,
    publishedAt: "2026-04-29",
  },
  {
    id: "ppt-school-assignment",
    slug: "ppt-school-assignment",
    type: "design",
    subtype: "ppt",
    visibility: "private-result",
    proofType: "screenshots",
    mediaPolicy: "rich-gallery",
    title: { ko: "학교과제·팀프로젝트 발표 PPT", en: "Academic & Team Project Decks" },
    summary: {
      ko: "캡스톤, 논문 발표, 팀프로젝트, 인턴십 보고, 취업 자기소개처럼 과제 제출과 발표를 함께 고려한 PPT 포트폴리오입니다.",
      en: "Academic presentation portfolio for capstone, paper review, team projects, internship reports, and career self-intros.",
    },
    problem: {
      ko: "과제 발표는 내용 정리와 발표 가독성이 동시에 필요하고, 팀원별 역할과 결과가 명확히 보여야 평가자가 이해하기 쉽습니다.",
      en: "Academic decks need both clear content structure and presentation readability, with roles and outcomes easy to evaluate.",
    },
    solution: {
      ko: "주제, 문제 정의, 조사 내용, 결과, 느낀 점 또는 제안까지 발표 순서에 맞춰 정돈된 흐름이 필요합니다.",
      en: "We organized topic, problem, research, results, and takeaways into a polished presentation flow.",
    },
    impact: {
      ko: "발표자는 자료를 보며 안정적으로 설명할 수 있고, 평가자는 핵심 내용과 팀 기여도를 빠르게 확인할 수 있습니다.",
      en: "Presenters can speak confidently from the deck, while evaluators can quickly understand the content and team contribution.",
    },
    resultSummary: {
      ko: "기획서 1개와 PPT 원본 1개를 한 세트로 확인할 수 있으며, 캡스톤·논문·팀프로젝트·인턴십 보고·자기소개 발표 유형별 구성을 비교할 수 있습니다.",
      en: "Each portfolio item is composed of one planning document and one editable PPT deck across capstone, paper, team project, internship, and self-introduction formats.",
    },
    deliverables: [
      { ko: "기획서 1개 + PPT 원본 1개 구성", en: "One planning document plus one editable PPT deck" },
      { ko: "과제 주제별 발표 흐름 정리", en: "Topic-specific presentation structure" },
      { ko: "팀 역할·조사·결과 시각화", en: "Role, research, and result visualization" },
    ],
    kpis: [
      { value: "5", unit: "종", label: { ko: "과제 유형", en: "Academic formats" } },
      { value: "10-20", unit: "P", label: { ko: "권장 분량", en: "Recommended length" } },
      { value: "1+1", label: { ko: "기획서 + PPT", en: "Plan + PPT" } },
    ],
    stack: ["Academic Deck", "Team Project", "Report", "Editable PPTX"],
    role: ["자료 정리", "발표 구성", "시각 디자인", "PPT 편집"],
    duration: "1-3일",
    client: "PPT 포트폴리오 샘플",
    links: { live: null, github: null, case: "/portfolio/ppt-school-assignment" },
    downloads: {
      planning: "/portfolio/ppt-design/school-assignment/planning.md",
      deck: "/portfolio/ppt-design/school-assignment/deck.pptx",
    },
    cover: "/portfolio/ppt-design/school-assignment/cover-slide.png",
    gallery: [
      "/portfolio/ppt-design/school-assignment/cover-slide.png",
      "/portfolio/ppt-design/school-assignment/sample-2.png",
      "/portfolio/ppt-design/school-assignment/sample-3.png",
      "/portfolio/ppt-design/school-assignment/sample-4.png",
      "/portfolio/ppt-design/school-assignment/sample-5.png",
    ],
    size: "md",
    featured: false,
    publishedAt: "2026-04-29",
  },
];

export const portfolioProjects: PortfolioProject[] = [
  ...logoConceptProjects,
  ...pptPortfolioProjects,
  {
    id: "data-crawling-demo",
    slug: "data-crawling-demo",
    type: "automation",
    subtype: "data-crawling",
    visibility: "private-result",
    proofType: "screenshots",
    mediaPolicy: "rich-gallery",
    title: { ko: "공개 데이터 크롤링 데모", en: "Public Data Crawling Demo" },
    summary: {
      ko: "공개 데이터를 수집·정리·엑셀화하는 1일 자동화 데모.",
      en: "A one-day automation demo that collects, cleans, and exports public data.",
    },
    problem: {
      ko: "반복 검색과 복사 작업으로 시간이 낭비되고 데이터 누락이 발생했습니다.",
      en: "Manual searching and copying wasted time and caused missing records.",
    },
    solution: {
      ko: "수집 대상, 정리 기준, 엑셀/CSV 납품 형식이 정해져 있어 반복 요청에도 같은 품질로 데이터를 받을 수 있습니다.",
      en: "Built a repeatable data pipeline with fixed collection, cleaning, and export rules.",
    },
    impact: {
      ko: "고객은 반복 검색 시간을 줄이고, 정리된 표를 바로 검토하거나 보고서·영업 리스트로 활용할 수 있습니다.",
      en: "Converted the workflow into a service that scales from one-off collection to recurring reports.",
    },
    deliverables: [
      { ko: "정리된 데이터 표", en: "Cleaned data table" },
      { ko: "엑셀/CSV 내보내기", en: "Excel/CSV export" },
      { ko: "반복 실행용 운영 가이드", en: "Runbook for repeated execution" },
    ],
    kpis: [
      { value: "1", unit: "일", label: { ko: "초기 납기", en: "Initial delivery" } },
      { value: "1,000+", unit: "건", label: { ko: "데모 처리량", en: "Demo records" } },
    ],
    stack: ["Python", "Data Pipeline", "Excel Export"],
    role: ["요구사항 정리", "수집 설계", "자동화"],
    duration: "1일",
    client: "데모 프로젝트",
    links: { live: null, github: null, case: "/portfolio/data-crawling-demo" },
    cover: "/portfolio/data-crawling-demo/cover.svg",
    gallery: ["/portfolio/data-crawling-demo/cover.svg"],
    size: "md",
    featured: false,
    publishedAt: "2026-04-29",
  },
  {
    id: "detail-page-skincare",
    slug: "detail-page-skincare",
    type: "design",
    subtype: "detail-page",
    visibility: "private-result",
    proofType: "screenshots",
    mediaPolicy: "rich-gallery",
    title: { ko: "저자극 스킨케어 상세페이지", en: "Sensitive Skincare Detail Page" },
    summary: {
      ko: "성분 신뢰, 사용감, 리뷰, 구매 CTA를 한 흐름으로 정리한 세로형 판매 상세페이지 시안.",
      en: "A vertical sales detail page concept organizing ingredient trust, usage feel, reviews, and CTA.",
    },
    problem: {
      ko: "상세페이지는 이미지가 길어질수록 고객이 구매 이유를 놓치기 쉬워 핵심 설득 순서가 필요했습니다.",
      en: "Long detail pages can lose the purchase reason, so the persuasion order needed to be clear.",
    },
    solution: {
      ko: "첫 화면에서 핵심 성분을 확인하고, 사용 장면·리뷰·구매 버튼으로 자연스럽게 이어지는 세로 흐름이 필요합니다.",
      en: "The page starts with key ingredients, then moves through usage scenes, reviews, and purchase CTA.",
    },
    impact: {
      ko: "방문자가 성분과 사용 이유를 빠르게 이해해 상세페이지를 끝까지 읽고 구매 버튼까지 이동하기 쉬워집니다.",
      en: "Visitors can quickly understand ingredients and reasons to buy, making it easier to continue to the CTA.",
    },
    resultSummary: {
      ko: "숨고·크몽·쇼핑몰 등록에 바로 활용할 수 있는 이미지 중심 상세페이지 구성입니다.",
      en: "An image-led detail page structure ready for marketplaces and shopping mall listings.",
    },
    deliverables: [
      { ko: "세로형 상세페이지 시안", en: "Vertical detail page concept" },
      { ko: "성분·사용감·리뷰 흐름", en: "Ingredient, usage, and review flow" },
      { ko: "구매 CTA 배치", en: "Purchase CTA placement" },
    ],
    stack: ["Detail Page", "Sales Copy", "Commerce UX", "Image Layout"],
    role: ["기획", "카피", "디자인"],
    duration: "1-2일",
    client: "뷰티 상세페이지 컨셉",
    links: { live: null, github: null, case: "/portfolio/detail-page-skincare" },
    cover: "/portfolio/detail-page-skincare/cover.png",
    gallery: ["/portfolio/detail-page-skincare/cover.png", "/portfolio/detail-page-skincare/detail.png"],
    size: "md",
    featured: false,
    publishedAt: "2026-04-29",
  },
  {
    id: "aio-motion-intro",
    slug: "aio-motion-intro",
    type: "video",
    subtype: "motion-graphics",
    visibility: "private-result",
    proofType: "video",
    mediaPolicy: "rich-gallery",
    title: { ko: "AIO 브랜드 숏폼 영상 패키지", en: "AIO Brand Shorts Package" },
    summary: {
      ko: "브랜드 인트로, 자막, CTA를 쇼츠·릴스용 9:16 포맷으로 구성한 영상 콘텐츠 샘플.",
      en: "A short-form video content sample with brand intro, subtitles, and CTA in 9:16 format.",
    },
    problem: {
      ko: "영상 의뢰 전에는 실제 움직임, 자막 밀도, CTA 노출 방식이 어느 정도인지 확인하기 어렵습니다.",
      en: "Video leads needed a moving sample rather than static design proof.",
    },
    solution: {
      ko: "브랜드 메시지, 썸네일, 자막, CTA가 30초 내외 숏폼에서 어떻게 보이는지 한 번에 확인할 수 있어야 합니다.",
      en: "Reframed the brand message into a 30-second short-form package with thumbnail, captions, and CTA.",
    },
    impact: {
      ko: "고객은 짧은 영상 안에서 로고 모션, 메시지, CTA가 어떻게 보이는지 미리 확인하고 홍보용 영상 의뢰 범위를 정할 수 있습니다.",
      en: "Works as a flagship proof sample for the video content category.",
    },
    deliverables: [
      { ko: "9:16 숏폼 영상 구성", en: "9:16 short-form video structure" },
      { ko: "자막·썸네일·CTA 변형", en: "Caption, thumbnail, and CTA variations" },
    ],
    stack: ["Motion Graphics", "Remotion", "Subtitle Ready"],
    role: ["콘셉트", "모션 설계", "영상 출력"],
    duration: "1-3일",
    client: "자체 브랜드",
    links: { live: null, github: null, case: "/portfolio/aio-motion-intro", video: null },
    cover: "/portfolio/video-content-samples/brand-shorts.png",
    gallery: ["/portfolio/video-content-samples/brand-shorts.png", "/portfolio/aio-motion-intro/cover.svg"],
    size: "md",
    featured: false,
    publishedAt: "2026-04-29",
  },
  ...cafe24StorefrontProjects,
  {
    id: "chueok-korea",
    slug: "chueok-korea",
    type: "web",
    subtype: "homepage-basic",
    visibility: "public",
    proofType: "live-link",
    mediaPolicy: "external-link",
    title: { ko: "추억코리아 여행 랜딩페이지", en: "Chueok Korea Travel Landing" },
    summary: {
      ko: "여행 서비스의 첫인상, 상품 신뢰도, 문의 전환 흐름을 한 화면에서 확인할 수 있는 반응형 랜딩페이지입니다.",
      en: "A responsive landing page that shows the travel brand impression, offer trust, and inquiry flow at a glance.",
    },
    problem: {
      ko: "여행 상품은 사진 분위기와 일정 신뢰가 함께 보여야 문의로 이어지기 쉽습니다.",
      en: "Travel offers need both visual mood and schedule credibility before visitors are ready to inquire.",
    },
    solution: {
      ko: "첫 화면에서 여행 감성, 핵심 상품, 예약 CTA, 모바일 화면 흐름을 바로 확인할 수 있어야 합니다.",
      en: "The first screen combines destination mood, core offer, booking CTA, and mobile-ready flow so visitors understand quickly.",
    },
    impact: {
      ko: "방문자가 여행 분위기와 예약 흐름을 동시에 이해해 상품 신뢰를 느끼고 문의로 이동하기 쉬워집니다.",
      en: "Visitors can understand the travel mood and booking flow together, making it easier to trust the offer and inquire.",
    },
    deliverables: [
      { ko: "PC·모바일 반응형 랜딩페이지", en: "Desktop and mobile responsive landing page" },
      { ko: "예약·문의 CTA 구성", en: "Booking and inquiry CTA structure" },
      { ko: "라이브 사이트 배포", en: "Live site deployment" },
    ],
    stack: ["Next.js", "Tailwind", "Vercel"],
    role: ["기획", "디자인", "개발", "배포"],
    duration: "2일",
    client: "chueok-korea",
    links: {
      live: "https://chueok-korea.vercel.app",
      github: "https://github.com/johnjung88/chueok-korea",
      case: "/portfolio/chueok-korea",
    },
    responsivePreview: {
      desktop: "/portfolio/chueok-korea/live.png",
      mobile: "/portfolio/chueok-korea/mobile-preview.png",
    },
    cover: "/portfolio/chueok-korea/live.png",
    gallery: ["/portfolio/chueok-korea/live.png", "/portfolio/chueok-korea/mobile-preview.png"],
    size: "md",
    featured: true,
    publishedAt: "2026-02-21",
  },
  {
    id: "aio-design-agency",
    slug: "aio-design-agency",
    type: "web",
    subtype: "homepage-detail",
    visibility: "public",
    proofType: "live-link",
    mediaPolicy: "external-link",
    title: { ko: "AIO 포트폴리오 사이트", en: "AIO Portfolio Site" },
    summary: {
      ko: "서비스, 포트폴리오, 가격, 견적 문의까지 한 번에 확인할 수 있도록 만든 AIO의 영업용 포트폴리오 사이트입니다.",
      en: "AIO's sales portfolio site where visitors can review services, proof, pricing, and quote flow in one place.",
    },
    problem: {
      ko: "고객이 의뢰 전 확인해야 하는 작업 범위, 실제 사례, 가격 기준이 흩어져 있으면 상담 전환이 느려집니다.",
      en: "When scope, proof, and pricing are scattered, potential clients take longer to move into consultation.",
    },
    solution: {
      ko: "7개 서비스 카테고리, 실제 결과물, 가격표, 견적 문의 흐름이 이어져 방문자가 필요한 정보를 빠르게 확인할 수 있어야 합니다.",
      en: "Seven service categories, real project proof, pricing, and a structured quote form are connected for fast client review.",
    },
    impact: {
      ko: "방문자가 서비스 종류, 실제 사례, 가격, 문의 방법을 한 번에 확인해 상담 전 의사결정 시간을 줄일 수 있습니다.",
      en: "Visitors can review services, proof, pricing, and inquiry options in one place, reducing decision time before consultation.",
    },
    deliverables: [
      { ko: "한·영 라우팅", en: "Korean/English routing" },
      { ko: "PC·모바일 포트폴리오 상세", en: "Desktop and mobile portfolio details" },
      { ko: "서비스·가격·견적 문의 구조", en: "Services, pricing, and quote inquiry structure" },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    role: ["기획", "디자인", "개발", "배포"],
    duration: "3일",
    client: "자체 프로젝트",
    links: {
      live: "https://ai-design-agency.vercel.app",
      github: "https://github.com/johnjung88/ai-design-agency",
      case: "/portfolio/aio-design-agency",
    },
    responsivePreview: {
      desktop: "/portfolio/aio-design-agency/preview.png",
      mobile: "/portfolio/aio-design-agency/mobile-preview.png",
    },
    cover: "/portfolio/aio-design-agency/preview.png",
    gallery: ["/portfolio/aio-design-agency/preview.png", "/portfolio/aio-design-agency/mobile-preview.png"],
    size: "lg",
    featured: true,
    publishedAt: "2026-04-29",
  },
  {
    id: "v-aio-website",
    slug: "v-aio-website",
    type: "web",
    subtype: "homepage-detail",
    visibility: "private-result",
    proofType: "screenshots",
    mediaPolicy: "rich-gallery",
    title: { ko: "V-AIO 비자 서비스 웹사이트", en: "V-AIO Visa Service Website" },
    summary: {
      ko: "E-7/E-9 비자 상담 고객이 서비스 흐름을 이해하고 문의까지 이동할 수 있도록 정리한 웹사이트 결과 화면입니다.",
      en: "A private website result screen designed to help E-7/E-9 visa clients understand the service and move into inquiry.",
    },
    problem: {
      ko: "비자 서비스는 절차가 복잡해 고객이 처음 방문했을 때 대상, 진행 순서, 상담 방법을 빠르게 이해해야 합니다.",
      en: "Visa services are complex, so first-time visitors need to quickly understand eligibility, process, and consultation options.",
    },
    solution: {
      ko: "서비스 소개, E-7/E-9 상담 CTA, 진행 프로세스, 운영 화면 연결 흐름을 한 웹 경험 안에서 확인할 수 있어야 합니다.",
      en: "Service explanation, E-7/E-9 inquiry CTA, process guide, and admin handoff are organized into one web experience.",
    },
    impact: {
      ko: "방문자가 복잡한 비자 절차를 한눈에 이해하고, 상담이 필요한 지점을 빠르게 찾아 문의할 수 있습니다.",
      en: "Visitors can understand the complex visa process at a glance and quickly find where to request consultation.",
    },
    deliverables: [
      { ko: "PC·모바일 서비스 화면", en: "Desktop and mobile service screens" },
      { ko: "E-7/E-9 상담 전환 동선", en: "E-7/E-9 consultation conversion flow" },
      { ko: "상담 운영 화면 연결 구조", en: "Consultation operations handoff structure" },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    role: ["기획", "웹 UI", "개발", "운영 구조"],
    duration: "5일+",
    client: "비공개 결과물",
    links: { live: null, github: null, case: "/portfolio/v-aio-website" },
    responsivePreview: {
      desktop: "/portfolio/v-aio-website/live.png",
      mobile: "/portfolio/v-aio-website/mobile-preview.png",
    },
    cover: "/portfolio/v-aio-website/live.png",
    gallery: [
      "/portfolio/v-aio-website/live.png",
      "/portfolio/v-aio-website/mobile-preview.png",
      "/portfolio/v-aio-admin/dashboard.png",
      "/portfolio/v-aio-admin/chatbot.png",
    ],
    size: "lg",
    featured: true,
    publishedAt: "2026-04-28",
  },
  {
    id: "t-aio",
    slug: "t-aio",
    type: "automation",
    subtype: "automation-standard",
    visibility: "public",
    proofType: "live-link",
    mediaPolicy: "rich-gallery",
    title: { ko: "T-AIO Threads 마케팅 자동화", en: "T-AIO Threads Marketing Automation" },
    summary: {
      ko: "콘텐츠 생성, 예약 발행, 분석 흐름을 하나로 묶은 공개 자동화 사례.",
      en: "A public automation case combining content creation, scheduling, and analytics.",
    },
    problem: { ko: "SNS 운영은 작성, 예약, 성과 확인이 반복되어 매일 많은 시간이 들어갑니다.", en: "Daily SNS operations required repetitive manual time." },
    solution: { ko: "작성, 예약, 성과 확인 흐름이 한 화면에서 이어져 반복 운영을 줄일 수 있어야 합니다.", en: "Built an operations pipeline connecting writing, scheduling, and analytics." },
    impact: { ko: "운영자는 매일 반복하던 콘텐츠 관리 시간을 줄이고, 예약 발행과 성과 확인을 더 안정적으로 처리할 수 있습니다.", en: "A public automation proof that significantly reduces daily ops time." },
    deliverables: [
      { ko: "운영 현황 화면", en: "Dashboard screen" },
      { ko: "예약 발행 흐름", en: "Scheduling flow" },
      { ko: "분석 리포트 구조", en: "Analytics report structure" },
    ],
    kpis: [{ value: "80", unit: "%", label: { ko: "운영 시간 절감", en: "Ops time saved" } }],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    role: ["기획", "개발", "배포", "운영"],
    duration: "5일",
    client: "자체 프로젝트",
    links: {
      live: "https://t-aio.vercel.app",
      github: "https://github.com/johnjung88/t-aio",
      case: "/portfolio/t-aio",
    },
    cover: "/portfolio/t-aio/live.png",
    gallery: ["/portfolio/t-aio/live.png", "/portfolio/t-aio/cover.svg"],
    size: "md",
    featured: true,
    publishedAt: "2026-03-10",
  },
  {
    id: "blogautopilot-multinational",
    slug: "blogautopilot-multinational",
    type: "automation",
    subtype: "automation-advanced",
    visibility: "private-result",
    proofType: "video",
    mediaPolicy: "rich-gallery",
    title: {
      ko: "BlogAutoPilot 8개국 콘텐츠 자동화",
      en: "BlogAutoPilot 8-Country Content Automation",
    },
    summary: {
      ko: "8개국·18계정·55스케줄을 운영하는 콘텐츠 자동화 결과 화면 중심 사례.",
      en: "A result-focused case for a private system operating 8 countries, 18 accounts, and 55 schedules.",
    },
    problem: {
      ko: "여러 국가와 계정의 콘텐츠 운영을 수동으로 관리하기 어려웠습니다.",
      en: "Managing content across multiple countries and accounts manually was not scalable.",
    },
    solution: {
      ko: "수집, 작성, 발행, 스케줄, 모니터링 흐름이 분리되어 운영자가 상태를 쉽게 확인할 수 있어야 합니다.",
      en: "Separated collection, writing, publishing, scheduling, and monitoring into an operable system.",
    },
    impact: {
      ko: "고객은 민감한 계정 정보 없이도 운영 규모, 발행 흐름, 처리 지표를 확인해 자동화 수준을 판단할 수 있습니다.",
      en: "Only sanitized result screens and KPIs are shown, so sensitive operating details stay private.",
    },
    resultSummary: {
      ko: "계정명과 민감 데이터는 제거하고, 실제 운영 흐름을 이해할 수 있는 결과 화면과 지표만 공개합니다.",
      en: "Because this is private, account names and sensitive data are masked in demo screens.",
    },
    deliverables: [
      { ko: "운영 현황 화면", en: "Operations dashboard" },
      { ko: "스케줄러 및 발행 로그", en: "Scheduler and publishing logs" },
      { ko: "운영 가이드", en: "Operations guide" },
    ],
    kpis: [
      { value: "8", unit: "개국", label: { ko: "글로벌 커버", en: "Countries" } },
      { value: "18", unit: "계정", label: { ko: "통합 운영", en: "Accounts" } },
      { value: "55", unit: "개", label: { ko: "동시 스케줄", en: "Schedules" } },
      { value: "68/68", unit: "", label: { ko: "테스트 통과", en: "Tests passing" } },
    ],
    stack: ["Python", "Scheduler", "Database", "Content Ops"],
    role: ["기획", "아키텍처", "개발", "운영"],
    duration: "5일+",
    client: "비공개 결과물",
    links: {
      live: null,
      github: null,
      case: "/portfolio/blogautopilot-multinational",
      video: "/portfolio/blogautopilot-multinational/blogautopilot-proof.mp4",
      architecture: "/portfolio/blogautopilot-multinational/cover.svg",
    },
    cover: "/portfolio/blogautopilot-multinational/published-post-ko.png",
    gallery: [
      "/portfolio/blogautopilot-multinational/published-post-ko.png",
      "/portfolio/blogautopilot-multinational/published-post-us.png",
      "/portfolio/blogautopilot-multinational/live-run-affiliate.jpg",
      "/portfolio/blogautopilot-multinational/live-run-proof.svg",
    ],
    size: "lg",
    featured: true,
    publishedAt: "2026-04-01",
  },
  {
    id: "youtube-autopilot",
    slug: "youtube-autopilot",
    type: "automation",
    subtype: "automation-standard",
    visibility: "private-result",
    proofType: "screenshots",
    mediaPolicy: "rich-gallery",
    title: { ko: "YouTube AutoPilot 영상 자동화 운영 시스템", en: "YouTube AutoPilot Video Automation Pipeline" },
    summary: {
      ko: "대본, 음성, 렌더, 업로드 흐름을 묶은 영상 자동화 및 앱 결과물.",
      en: "A private automation/app workflow covering script, voice, render, and upload steps.",
    },
    problem: {
      ko: "영상 제작과 업로드 과정이 여러 화면에 흩어져 반복 비용이 컸습니다.",
      en: "Video production and upload steps were scattered and repetitive.",
    },
    solution: {
      ko: "대본 작성부터 영상 생성, 업로드 준비까지의 단계를 한 운영 흐름에서 확인할 수 있어야 합니다.",
      en: "Connected dashboard, pipeline, rendering, and upload screens into one workflow.",
    },
    impact: {
      ko: "고객은 민감한 내부 정보 없이도 영상 제작 단계와 운영 화면을 확인해 자동화 범위를 판단할 수 있습니다.",
      en: "Code remains private; result screens and workflow are used as automation/app proof.",
    },
    deliverables: [
      { ko: "영상 제작 흐름 화면", en: "Pipeline dashboard" },
      { ko: "영상 렌더 화면", en: "Video render screen" },
      { ko: "운영 설정 화면", en: "Operations settings screen" },
    ],
    stack: ["Next.js", "Remotion", "Supabase", "Video Pipeline"],
    role: ["기획", "개발", "영상 워크플로"],
    duration: "진행 중",
    client: "비공개 결과물",
    links: { live: null, github: null, case: "/portfolio/youtube-autopilot" },
    cover: "/portfolio/youtube-autopilot/cover.svg",
    gallery: ["/portfolio/youtube-autopilot/cover.svg"],
    size: "md",
    featured: false,
    publishedAt: "2026-04-28",
  },
  {
    id: "koready",
    slug: "koready",
    type: "app",
    subtype: "mvp-basic",
    visibility: "private-result",
    proofType: "screenshots",
    mediaPolicy: "rich-gallery",
    title: { ko: "KoReady 국어 교육 앱 MVP", en: "KoReady Korean Education App MVP" },
    summary: {
      ko: "학습 진도, 퀴즈, 어휘 카드 흐름을 갖춘 앱 MVP 결과물.",
      en: "A mobile MVP with progress, quiz, and vocabulary card flows.",
    },
    problem: { ko: "앱 아이디어를 검토하려면 가입, 학습, 퀴즈 흐름이 실제 화면처럼 보여야 합니다.", en: "A quick mobile app was needed for idea validation." },
    solution: { ko: "온보딩, 홈, 학습 진도, 퀴즈 화면을 중심으로 사용 흐름을 빠르게 확인할 수 있어야 합니다.", en: "Built an MVP around core screens and packaged it as app proof." },
    impact: { ko: "고객은 앱 출시 전에도 핵심 화면과 사용 동선을 검토해 MVP 제작 범위를 결정할 수 있습니다.", en: "Can be used as app portfolio proof even before store submission." },
    deliverables: [
      { ko: "온보딩·홈·퀴즈 화면", en: "Onboarding, home, and quiz screens" },
      { ko: "학습 진도 구조", en: "Learning progress structure" },
    ],
    stack: ["React Native", "TypeScript", "Supabase"],
    role: ["기획", "디자인", "개발"],
    duration: "5일",
    client: "비공개 결과물",
    links: { live: null, github: null, case: "/portfolio/koready", storeIos: null, storeAndroid: null },
    cover: "/portfolio/koready/cover.svg",
    gallery: ["/portfolio/koready/cover.svg"],
    size: "md",
    featured: false,
    publishedAt: "2026-02-27",
  },
  {
    id: "v-aio-chatbot",
    slug: "v-aio-chatbot",
    type: "automation",
    subtype: "chatbot",
    visibility: "private-result",
    proofType: "screenshots",
    mediaPolicy: "rich-gallery",
    title: { ko: "V-AIO 관리자·챗봇 운영 시스템", en: "V-AIO Admin & Chatbot Operations System" },
    summary: {
      ko: "E-7/E-9 비자 상담, 관리자 대시보드, VisaBot 챗봇, API/DB 운영 흐름을 영상으로 정리한 자동화 사례.",
      en: "A video proof case connecting E-7/E-9 consultations, admin dashboards, VisaBot, APIs, and DB operations.",
    },
    problem: {
      ko: "상담 문의, 비자 타입, 기업/근로자 상태, 서류 확인이 흩어져 있어 운영자가 한 화면에서 관리하기 어려웠습니다.",
      en: "Consultations, visa types, company/worker status, and documents were scattered across the workflow.",
    },
    solution: {
      ko: "상담 접수, 기업 진단, 서류 상태, 챗봇 응답, API와 DB 상태가 한 운영 화면 안에서 이어져야 합니다.",
      en: "Built admin dashboards and consultation management screens, then connected a VisaBot chat flow aware of E-7/E-9 context.",
    },
    impact: {
      ko: "운영자는 상담 현황과 챗봇 응답, 비자 진행 단계, DB 상태를 함께 확인해 반복 안내와 관리 누락을 줄일 수 있습니다.",
      en: "Sensitive operating details are removed, while admin screens, chatbot screens, and feature structure remain reviewable.",
    },
    kpis: [
      { value: "E-7/E-9", unit: "", label: { ko: "비자 타입 대응", en: "Visa type coverage" } },
      { value: "9", unit: "개", label: { ko: "관리 메뉴 구조", en: "Admin menu modules" } },
      { value: "3", unit: "개", label: { ko: "API/DB 연동 축", en: "API/DB layers" } },
    ],
    deliverables: [
      { ko: "운영 현황 화면", en: "Operations dashboard" },
      { ko: "상담 문의 관리", en: "Consultation management" },
      { ko: "VisaBot 챗봇 화면", en: "VisaBot chatbot screen" },
      { ko: "API·DB·업무 로직 구조도", en: "API, DB, and workflow logic map" },
      { ko: "기업 진단·비자 신청·서류 관리 흐름", en: "Company check, application, and document flow" },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI API", "n8n", "Chat Workflow"],
    role: ["기획", "관리자 UI", "챗봇 흐름", "운영 설계"],
    duration: "5일+",
    client: "비공개 결과물",
    links: {
      live: null,
      github: null,
      case: "/portfolio/v-aio-chatbot",
      video: "/portfolio/v-aio-admin/v-aio-admin-proof.mp4",
    },
    cover: "/portfolio/v-aio-admin/dashboard.png",
    gallery: [
      "/portfolio/v-aio-admin/dashboard.png",
      "/portfolio/v-aio-admin/chatbot.png",
      "/portfolio/v-aio-admin/admin-module-map.svg",
      "/portfolio/v-aio-admin/logic-api-db.svg",
      "/portfolio/v-aio-admin/masked-db-table.svg",
      "/portfolio/v-aio-chatbot/cover.svg",
    ],
    size: "lg",
    featured: true,
    publishedAt: "2026-04-28",
  },
];

export function getPortfolioProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): PortfolioProject[] {
  const featured = portfolioProjects.filter((p) => p.featured);
  const featuredIds = new Set(featured.map((p) => p.id));
  const supplemental = portfolioProjects.filter(
    (p) =>
      !featuredIds.has(p.id) &&
      p.cover &&
      p.cover !== "/portfolio/placeholder.svg" &&
      !p.cover.endsWith(".svg")
  );

  return [...featured, ...supplemental].slice(0, 9);
}

export function getProjectsByType(type: PortfolioType): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.type === type);
}

export function getPortfolioGroup(project: PortfolioProject): PortfolioGroup {
  if (project.subtype === "shopping-mall") {
    return "shopping-mall";
  }
  if (project.subtype === "ppt") {
    return "ppt-design";
  }
  if (project.subtype === "detail-page") {
    return "detail-page";
  }
  if (["logo", "business-card", "card-news", "infographic"].includes(project.subtype ?? "")) {
    return "logo-business-card";
  }
  if (project.type === "video") {
    return "video-content";
  }
  if (project.type === "app" || project.type === "automation") {
    return "automation-app";
  }
  return "website";
}

export function getProjectsByPortfolioGroup(group: PortfolioGroup): PortfolioProject[] {
  return portfolioProjects.filter((project) => getPortfolioGroup(project) === group);
}

export function formatProjectDuration(duration: string, locale: "ko" | "en"): string {
  if (locale === "ko") return duration;

  if (duration === "진행 중") return "In progress";
  if (duration === "12종 완료") return "12 done";

  return duration
    .replaceAll("일", "d")
    .replaceAll("종", " designs")
    .replaceAll("완료", "done")
    .replaceAll("개국", " countries")
    .replaceAll("계정", " accounts")
    .replaceAll("개", "");
}
