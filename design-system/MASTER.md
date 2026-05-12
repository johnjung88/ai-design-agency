# AIO 디자인 시스템 — MASTER

> 모든 페이지·컴포넌트가 따르는 단일 진실 원천 (Single Source of Truth).
> 이 문서가 정의한 토큰만 사용하세요. 인라인 `clamp()` / 매직 넘버 금지.
>
> **⚠️ 작업 시작 전 반드시 `WORKFLOW.md` 의 3-SET 워크플로우(디자인 스킬 + 카피라이터 + 디자이너)를 적용한다.**

---

## 1. 프로젝트 정체성

- **업종 분류** (ui-ux-pro-max 기준): Portfolio & Creative Agency
- **무드**: Editorial Magazine — 흑백 + 레드 액센트, 활자 중심
- **톤 4종**: Magazine / IDE / Lifestyle / Consultant (page-level 활성화)
- **타깃**: 한국어 사용자 (한글 본문 + 영문 디스플레이)

---

## 2. 브레이크포인트 (4단계)

| 이름 | min-width | 기준 디바이스 |
|---|---|---|
| `mobile` | 0~767px | iPhone (375), Galaxy (390) |
| `tablet` | 768px~ | iPad mini/Air |
| `desktop` | 1024px~ | 노트북 (13~14인치) |
| `wide` | 1440px~ | 데스크탑 모니터 |

Tailwind 매핑: `md:` = tablet, `lg:` = desktop, `xl:` = wide.

**검증 의무**: 페이지 완성 후 `375 / 768 / 1024 / 1440` 4단계 모두 확인.

---

## 3. 타이포그래피 스케일

CSS 변수로 정의 (`globals.css`). 컴포넌트는 `var(--text-h1)` 만 참조.

| 토큰 | mobile | tablet | desktop | wide | 용도 |
|---|---|---|---|---|---|
| `--text-display` | 44px | 72px | 96px | 128px | Hero H1 |
| `--text-h1` | 32px | 48px | 64px | 80px | 섹션 메인 |
| `--text-h2` | 26px | 36px | 44px | 52px | 서브 헤드 |
| `--text-h3` | 20px | 24px | 28px | 32px | 카드 타이틀 |
| `--text-lead` | 16px | 17px | 18px | 19px | Lede 본문 |
| `--text-body` | 15px | 15px | 16px | 16px | 일반 본문 |
| `--text-small` | 13px | 13px | 14px | 14px | 캡션 |
| `--text-eyebrow` | 11px | 11px | 12px | 12px | Eyebrow / Meta |

라인 높이:
- 디스플레이/헤드: `1.0` (단단함)
- 본문: `1.7~1.8` (한글 가독성)
- 캡션: `1.5`

---

## 4. 간격 스케일

| 토큰 | mobile | tablet | desktop | wide | 용도 |
|---|---|---|---|---|---|
| `--space-section` | 64px | 96px | 120px | 140px | 섹션 상하 padding |
| `--space-block` | 32px | 48px | 56px | 64px | 블록 간 간격 |
| `--space-element` | 16px | 20px | 24px | 24px | 요소 간 간격 |
| `--space-inline` | 8px | 10px | 12px | 12px | 인라인 gap |
| `--space-edge` | 20px | 28px | 40px | 48px | 좌우 가장자리 |

---

## 5. 컨테이너 폭

| 토큰 | 값 | 용도 |
|---|---|---|
| `--container-narrow` | 720px | 본문 중심 (글) |
| `--container-default` | 1200px | 일반 페이지 |
| `--container-wide` | 1440px | Hero / 풀-블리드 |

본문 행 길이는 글자수 기준 권장: `max-w-[42ch]` ~ `max-w-[60ch]`.

---

## 6. 컬러 — 톤별 매핑 (기존 정의 유지)

| 톤 | data-tone | 핵심 컬러 | 폰트 페어링 |
|---|---|---|---|
| Magazine | `magazine` | 베이지 페이퍼 + 잉크 + 레드 | Marcellus / Cormorant / Pretendard |
| IDE | `ide` | 다크 + 민트/앰버 | JetBrains / Inter / Pretendard |
| Lifestyle | `lifestyle` | 크림 + 로즈 + 올리브 | Fraunces / Jakarta / Pretendard |
| Consultant | `consultant` | 네이비 + 골드 + 화이트 | Inter / Cormorant / Pretendard |

페이지 루트에 `data-tone="..."` 한 줄로 활성화 (`globals.css`에 정의됨).

---

## 7. 한글 타이포 필수 규칙

```css
body { word-break: keep-all; overflow-wrap: break-word; }
```

- **한글 + 영문/숫자 혼용 줄바뀜**은 `word-break: keep-all` + 명시적 `<br className="md:hidden" />` 조합
- 영문 단어 안에서 끊기는 건 `overflow-wrap: break-word` 가 백업
- 디스플레이 헤드는 `letter-spacing: -0.014em ~ -0.018em` (한글에서 살짝 타이트하게)

---

## 8. 인터랙션

- 호버 전환: **150~300ms**, `cubic-bezier(0.16, 1, 0.3, 1)` (자연스러운 ease-out)
- 페이지 전환: **200~400ms**
- 스켈레톤 UI > 스피너 (가능한 경우)
- `prefers-reduced-motion: reduce` 미디어 쿼리로 애니메이션 약화

---

## 9. 접근성 의무

- 텍스트 대비 **4.5:1 이상** (WCAG AA)
- 모든 클릭 요소에 `cursor-pointer` (globals.css base 레이어에 이미 적용됨)
- 포커스 상태 시각화 (outline 또는 ring)
- 모든 페이지 안티패턴 체크리스트 통과 (아래)

---

## 10. 안티패턴 체크리스트 (페이지 완성 시 검증)

```
[ ] 375/768/1024/1440 4단계에서 정상 표시
[ ] 텍스트 대비 4.5:1 이상
[ ] 한글 줄바뀜 자연스러움 (word-break + br)
[ ] 폰트 2~3종 이내, 토큰만 사용
[ ] 호버 전환 150~300ms 통일
[ ] CTA 버튼 충분히 도드라짐 (대비 + 크기)
[ ] 로딩/빈 상태 처리됨
[ ] prefers-reduced-motion 대응
[ ] SVG 아이콘 (이모지 X)
[ ] 인라인 clamp()/매직 넘버 없음 (토큰만)
```

---

## 11. 페이지별 가이드

각 페이지는 `pages/{슬러그}.md` 에서 오버라이드와 디자인 의도를 명시:

- `pages/home.md` — 메인 (Magazine 톤)
- `pages/development.md` — 개발 서비스 허브 (IDE 톤)
- `pages/design.md` — 디자인 서비스 허브 (Lifestyle 톤)
- `pages/business.md` — 비즈 서비스 허브 (Consultant 톤)
- `pages/video.md` — 영상 (커밍순)
- `pages/marketing.md` — 마케팅 (커밍순)
- `pages/about.md` — 회사 소개 (Magazine 톤)
- `pages/quote.md` — 견적 문의 (Magazine 톤)

---

## 12. 변경 이력

- 2026-05-12: 초기 작성 (Phase 0)
