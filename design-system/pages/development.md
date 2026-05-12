# 개발 서비스 페이지 — 디자인 가이드

> 톤: **IDE** (data-tone="ide")
> URL: `/{locale}/services/development`
> 카테고리: Development — 만드는 분야

---

## 핵심 메시지

**"코드로 만드는 모든 것."**

웹·앱·자동화·프로그램 — 4개 sub-services를 한 손에서. AIO는 분야 전문가가 직접 작업하는 외주 스튜디오.

---

## Sub-services 4개

| # | 이름 | 영문 | 디폴트 시작가 | 디폴트 납기 | 도구 / 스택 |
|---|---|---|---|---|---|
| 01 | 웹 | Website | 9만 9천원~ | 1-5일 | Next.js · 카페24 · WordPress |
| 02 | 앱 | App | 99만원~ | 7-30일 | React Native · Flutter · 네이티브 |
| 03 | 자동화 | Automation | 19만원~ | 3-7일 | n8n · Make · Python |
| 04 | 프로그램 | Program | 29만원~ | 5-14일 | Electron · Python CLI · 매크로 |

---

## 섹션 구성 (스크롤 순서)

1. **Hero** — Eyebrow + Display H1 + Lede + Live indicators (현재 운영 중 작업 수 등)
2. **Sub-services 4개 카드 (Bento Grid)** — 각 카드: 이름·영문 italic·짧은 설명·가격·납기·대표 도구
3. **포트폴리오** — 카테고리 통합 작업물 (sub-service 필터링)
4. **가격 비교 표** — 4개 sub-service 시작가 + 납기 + 포함 내역
5. **프로세스 5단계** — 의뢰 → 견적 → 작업 → 납품 → 유지보수
6. **FAQ** — 자주 묻는 질문
7. **CTA** — 견적 문의 / 분야 페이지 보기

---

## IDE 톤 디자인 디테일

- 배경: `var(--tone-ide-bg)` (다크 #0D1117)
- 폰트: 디스플레이 **JetBrains Mono** (한글에는 Pretendard 폴백) / 본문 **Pretendard**
- 액센트: 민트 (`--tone-ide-mint`) — 의뢰 가능 / 앰버 (`--tone-ide-amber`) — 진행 중
- 코드 신택스 색상 — 디스플레이 헤드라인에 살짝 syntax-blue / syntax-purple 액센트
- 카드 보더: `var(--tone-ide-line)` 1px

### 코드 에디터 무드 요소

- 상단 작은 라인: `// 04 sub-services · live`
- 사이드 줄 번호 (line numbers) 매거진 활자처럼 작은 카운터
- 모노스페이스 폰트의 메타 정보 (file path, status indicator 등)

---

## 타이포 토큰

- Display H1: `var(--text-display)` · JetBrains Mono · `var(--leading-display)`
- H2: `var(--text-h1)` · JetBrains Mono
- H3: `var(--text-h3)` · JetBrains Mono
- Lede: `var(--text-lead)` · Pretendard · 1.8
- Body: `var(--text-body)` · Pretendard · 1.75
- Eyebrow: `var(--text-eyebrow)` · JetBrains Mono · 0.22em letter-spacing

---

## 간격 토큰 (전 페이지 동일)

- 섹션 상하: `var(--space-section)`
- 좌우: `var(--space-edge)`
- 블록 간: `var(--space-block)`

---

## 카피 검수 체크리스트

- [ ] 모든 sub-service 카피 동사형 통일
- [ ] "분야" 용어 통일 (카테고리 X)
- [ ] "결과물 / 납기 / 유지보수" 카피 사전 적용
- [ ] 한글+영문 혼용 시 `word-break: keep-all`
- [ ] 줄바꿈 의도 명시 (`<br className="md:hidden" />`)

---

## 4단계 검증

375 / 768 / 1024 / 1440 모두 자연스러움 + 안티패턴 체크리스트 통과.
