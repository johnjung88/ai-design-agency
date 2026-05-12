# 메인페이지 — 디자인 가이드

> 톤: **Magazine** (data-tone="magazine")
> URL: `/` (i18n: `/ko`, `/en`)

---

## 핵심 메시지

"결과를 보고 맡기는 외주" — 각 분야 전문가가 직접 제작하는 AI 외주 스튜디오.
의뢰인이 결과물·가격을 먼저 보고 결정할 수 있게 한다.

---

## 섹션 구성 (스크롤 순서)

1. **Cover** (Hero) — 매거진 표지처럼. 메타 라인 + 디스플레이 H1 + Lede + Vital Sign 카드 + Vital Stats Bar
2. **Editor's Note · 04 Pillars** — Speed / Output / Quality / Care (2x2 그리드)
3. **Index · 05 Disciplines** — 새 5카테고리 TOC (개발 / 디자인 / 비즈 / 영상 / 마케팅)
4. **Voices from the Field** — 의뢰인 후기 슬라이드
5. **Editorial · Founder's Note** — CTA 클로징

---

## 5카테고리 TOC (Phase 1 변경 사항)

기존 7분야 → 새 5카테고리. 각 카테고리는 sub-services 표시.

| # | 카테고리 | URL | 서브 서비스 | 가격 시작가 | 상태 |
|---|---|---|---|---|---|
| 01 | 개발 (Development) | `/services/development` | 웹·앱·자동화·프로그램 | 9.9만~ | 의뢰 가능 |
| 02 | 디자인 (Design) | `/services/design` | 브랜드브리프·상세페이지 | 4.0만~ | 의뢰 가능 |
| 03 | 비즈 (Business) | `/services/business` | 사업계획서·PPT·정부지원금 | 4.0만~ | 의뢰 가능 |
| 04 | 영상 (Video) | `/services/video` | — | — | 커밍순 |
| 05 | 마케팅 (Marketing) | `/services/marketing` | — | — | 커밍순 |

각 row는 mobile에서 카테고리명 + 인라인 화살표 + 서브 서비스 한 줄, desktop에서 가로 5컬럼 그리드.

---

## 타이포 (MASTER.md 토큰 사용)

- H1 (Cover 헤드라인): `var(--text-display)` — Marcellus, 잉크 색
- H2 (섹션 헤드): `var(--text-h1)` — Marcellus + Cormorant 이탤릭 혼용
- Eyebrow: `var(--text-eyebrow)` — JetBrains Mono, 잉크-2, letter-spacing 0.28em
- Lede: `var(--text-lead)` — Pretendard, line-height 1.8
- 본문: `var(--text-body)` — Pretendard, line-height 1.75
- 본문 폭: `max-w-[42ch]` ~ `max-w-[60ch]` (글자수 기준)

---

## 간격 (MASTER.md 토큰 사용)

- 섹션 상하: `var(--space-section)`
- 섹션 좌우: `var(--space-edge)`
- 블록 간: `var(--space-block)`
- 요소 간: `var(--space-element)`

인라인 `clamp()` 금지. 토큰만 사용.

---

## 줄바뀜 의도 (강제 br 위치)

| 위치 | mobile br | tablet+ br |
|---|---|---|
| Cover H1 "결과를 보고 / 맡기는 외주" | 사이 br | 사이 br |
| Cover Lede "AIO는 ~ 책임집니다" | 자연 wrap | 자연 wrap |
| TOC Lede "지금 의뢰 가능한 3분야와 / 곧 합류할 2분야" | 사이 br | 사이 br |
| Voices 후기 본문 | 자연 wrap | 자연 wrap |

`<br className="md:hidden" />` 패턴으로 mobile 전용 br 명시.

---

## 컴포넌트 리팩토링 체크리스트

| 컴포넌트 | 토큰화 대상 | 5카테고리 영향 |
|---|---|---|
| `magazine-cover.tsx` | H1 디스플레이, Lede, 섹션 padding, Vital Stats Bar 폰트 | — |
| `magazine-vital-sign.tsx` | 카드 padding, 숫자 디스플레이 사이즈, 라벨 | — |
| `magazine-editors-note.tsx` | H2, body, metric 폰트, 그리드 gap | — |
| `magazine-toc.tsx` | H2, row 폰트, **5카테고리 데이터 교체** | ✅ |
| `magazine-voices.tsx` | H2, blockquote, 후기자 정보 | — |
| `magazine-editorial.tsx` | H2, body, CTA | — |

---

## 검증 (Phase 1 종료 기준)

- [ ] 4단계 브레이크포인트 (375/768/1024/1440) 모두 자연스러움
- [ ] 인라인 `clamp()` 0건 (`grep -r "clamp(" components/magazine` 통과)
- [ ] 한글 줄바뀜 어색한 곳 없음
- [ ] TOC 5카테고리로 교체 + 링크 정확
- [ ] 모바일 섹션 총 높이 이전 대비 변화 측정 (스크롤 길이)
- [ ] Lighthouse Mobile 점수 90+ (Performance/Accessibility)
