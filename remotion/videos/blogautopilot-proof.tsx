import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const proof = (name: string) => staticFile(`portfolio/blogautopilot-multinational/${name}`);
const demo = (name: string) => proof(`real-demo/${name}`);

const bg = "linear-gradient(135deg, #07111f 0%, #10213a 48%, #101522 100%)";

function fade(frame: number, duration: number) {
  return interpolate(frame, [0, 8, duration - 8, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function Stage({
  image,
  kicker,
  title,
  body,
  duration,
  imageSide = "left",
  crop = "cover",
}: {
  image: string;
  kicker: string;
  title: string;
  body: string;
  duration: number;
  imageSide?: "left" | "right";
  crop?: "cover" | "contain";
}) {
  const frame = useCurrentFrame();
  const opacity = fade(frame, duration);
  const imageBox = {
    position: "absolute" as const,
    top: 44,
    left: imageSide === "left" ? 42 : 530,
    width: 708,
    height: 632,
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid rgba(220,235,255,0.18)",
    boxShadow: "0 30px 90px rgba(0,0,0,0.38)",
    background: "#111827",
  };
  const textBox = {
    position: "absolute" as const,
    top: 70,
    left: imageSide === "left" ? 790 : 58,
    width: 410,
    height: 580,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
  };

  return (
    <AbsoluteFill style={{ background: bg, color: "#eef5ff", fontFamily: "Segoe UI, Malgun Gothic, Arial, sans-serif", opacity }}>
      <div style={imageBox}>
        <Img src={image.startsWith("portfolio/") ? staticFile(image) : demo(image)} style={{ width: "100%", height: "100%", objectFit: crop }} />
      </div>
      <div style={textBox}>
        <div style={{ color: "#55d6be", fontSize: 22, fontWeight: 900, marginBottom: 18 }}>{kicker}</div>
        <div style={{ fontSize: 48, lineHeight: 1.12, fontWeight: 930, wordBreak: "keep-all" }}>{title}</div>
        <div style={{ color: "#c9d7eb", fontSize: 24, lineHeight: 1.45, marginTop: 24, wordBreak: "keep-all" }}>{body}</div>
      </div>
    </AbsoluteFill>
  );
}

function Intro() {
  const frame = useCurrentFrame();
  const opacity = fade(frame, 90);
  return (
    <AbsoluteFill style={{ background: bg, color: "#eef5ff", fontFamily: "Segoe UI, Malgun Gothic, Arial, sans-serif", opacity }}>
      <Img src={proof("travel-category-map.svg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.42 }} />
      <div style={{ position: "absolute", left: 72, top: 94, width: 880 }}>
        <div style={{ color: "#55d6be", fontSize: 24, fontWeight: 900, marginBottom: 24 }}>여행 전문 블로그 자동화</div>
        <div style={{ fontSize: 74, lineHeight: 1.02, fontWeight: 950, wordBreak: "keep-all" }}>
          콘텐츠 확보부터 발행까지
          <br />
          한 번에 운영
        </div>
        <div style={{ marginTop: 32, color: "#d6e3f4", fontSize: 30, lineHeight: 1.34, width: 760 }}>
          API, CSV, 스케줄, 국가별 제휴 링크, SEO 프롬프트, 브라우저 자동작성까지 연결한 여행 블로그 운영 시스템입니다.
        </div>
      </div>
    </AbsoluteFill>
  );
}

function Matrix() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: bg, opacity: fade(frame, 110) }}>
      <Img src={proof("travel-category-map.svg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
  );
}

function BrowserWrite() {
  const frame = useCurrentFrame();
  const opacity = fade(frame, 190);
  return (
    <AbsoluteFill style={{ background: bg, color: "#eef5ff", fontFamily: "Segoe UI, Malgun Gothic, Arial, sans-serif", opacity }}>
      <div style={{ position: "absolute", left: 38, top: 42, width: 780, height: 636, borderRadius: 18, overflow: "hidden", background: "#fff", border: "1px solid rgba(220,235,255,0.2)" }}>
        <OffthreadVideo src={demo("browser-write-demo.webm")} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", right: 58, top: 92, width: 365 }}>
        <div style={{ color: "#55d6be", fontSize: 22, fontWeight: 900, marginBottom: 18 }}>네이버 자동작성</div>
        <div style={{ fontSize: 47, lineHeight: 1.08, fontWeight: 950, wordBreak: "keep-all" }}>브라우저를 열고 글을 입력</div>
        <div style={{ color: "#c9d7eb", fontSize: 23, lineHeight: 1.45, marginTop: 24, wordBreak: "keep-all" }}>
          실제 발행기는 네이버 에디터에 제목, 본문, 이미지, 해시태그를 순서대로 입력합니다. 최종 발행 클릭은 촬영 안전을 위해 제외했습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
}

function Closing() {
  const frame = useCurrentFrame();
  const opacity = fade(frame, 100);
  const items = [
    "여행 아이템: 쿠팡·Amazon·Shopee·Lazada 국가별 매칭",
    "축제/이벤트: 투어와 숙박 상품 연결",
    "여행 종합: 투어·숙박·유심·보험·교통까지 확장",
    "계정별 프롬프트로 동일 주제도 다른 글 생성",
  ];
  return (
    <AbsoluteFill style={{ background: bg, color: "#eef5ff", fontFamily: "Segoe UI, Malgun Gothic, Arial, sans-serif", opacity }}>
      <div style={{ position: "absolute", left: 80, top: 72 }}>
        <div style={{ color: "#55d6be", fontSize: 24, fontWeight: 900, marginBottom: 20 }}>핵심 어필 포인트</div>
        <div style={{ fontSize: 58, lineHeight: 1.12, fontWeight: 950, wordBreak: "keep-all", width: 810 }}>
          여행 블로그 수익화 운영을 자동화
        </div>
      </div>
      <div style={{ position: "absolute", left: 82, top: 250, display: "grid", gap: 14, width: 780 }}>
        {items.map((item) => (
          <div key={item} style={{ padding: "17px 20px", borderRadius: 12, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.13)", fontSize: 25, color: "#d9e6f7", wordBreak: "keep-all" }}>
            {item}
          </div>
        ))}
      </div>
      <Img src={demo("app-dashboard.png")} style={{ position: "absolute", right: 64, top: 128, width: 326, height: 464, objectFit: "cover", borderRadius: 16, border: "1px solid rgba(220,235,255,0.18)", boxShadow: "0 30px 90px rgba(0,0,0,0.42)" }} />
    </AbsoluteFill>
  );
}

export function BlogAutoPilotProof() {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <Intro />
      </Sequence>
      <Sequence from={82} durationInFrames={100}>
        <Stage
          image="app-content-api.png"
          kicker="콘텐츠 확보"
          title="API와 CSV로 여행 소재 수집"
          body="축제, 이벤트, 투어, 도시 정보를 API와 엑셀 CSV 업로드로 확보하고 월별 콘텐츠 캘린더로 관리합니다."
          duration={100}
        />
      </Sequence>
      <Sequence from={174} durationInFrames={96}>
        <Stage
          image="app-content-source.png"
          kicker="스케줄 운영"
          title="국가별 소스를 자동 배분"
          body="한국, 일본, 대만, 태국, 베트남, 인도네시아, 미국, 영국 계정에 발행 소스를 균등하게 배분합니다."
          duration={96}
          imageSide="right"
        />
      </Sequence>
      <Sequence from={262} durationInFrames={110}>
        <Matrix />
      </Sequence>
      <Sequence from={364} durationInFrames={100}>
        <Stage
          image="app-affiliate.png"
          kicker="여행 제휴 수익화"
          title="컨텐츠별 상품 링크 자동 매칭"
          body="여행 아이템은 쇼핑 제휴, 축제는 투어와 숙박, 여행 종합은 투어·숙박·교통·유심·보험까지 연결합니다."
          duration={100}
        />
      </Sequence>
      <Sequence from={456} durationInFrames={96}>
        <Stage
          image="app-project.png"
          kicker="중복 컨텐츠 방지"
          title="계정별 프롬프트 분리"
          body="동일한 주제라도 계정별 페르소나, 국가 프롬프트, 매체 프롬프트를 다르게 적용해 반복 글을 줄입니다."
          duration={96}
          imageSide="right"
        />
      </Sequence>
      <Sequence from={544} durationInFrames={96}>
        <Stage
          image="app-settings.png"
          kicker="검색 노출 로직"
          title="여행 전문 SEO 세팅"
          body="글 생성 모델, 이미지 소스, 축제 API, 검색 노출용 구조화 섹션을 운영 설정으로 관리합니다."
          duration={96}
        />
      </Sequence>
      <Sequence from={632} durationInFrames={190}>
        <BrowserWrite />
      </Sequence>
      <Sequence from={812} durationInFrames={108}>
        <Stage
          image="portfolio/blogautopilot-multinational/published-post-ko.png"
          kicker="발행 결과"
          title="실제 게시 화면으로 증명"
          body="자동 생성된 글은 플랫폼별 발행기로 전송되고, 발행 내역과 링크가 대시보드에 누적됩니다."
          duration={108}
          imageSide="right"
          crop="cover"
        />
      </Sequence>
      <Sequence from={912} durationInFrames={168}>
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
}
