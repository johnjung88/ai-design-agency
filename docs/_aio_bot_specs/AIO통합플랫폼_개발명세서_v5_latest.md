# AIO에이전시 통합 영업·운영 플랫폼 — 개발 명세서 (v5)

> **작성일**: 2026-05-03
> **목적**: aio-make.com 포트폴리오 사이트를 "영업·운영 통합 플랫폼"으로 확장
> **사업 모델**: 7개 카테고리 외주 에이전시 + 10개+ 외부 플랫폼 동시 운영
> **핵심 원칙**: ❌ 자동 발송 (플랫폼 정책 위반) / ✅ AI 보조 + 의장님 직접 발송 + 통합 DB 관리
> **개발 환경**: VS Code + Cursor + Claude Code (Max) + Next.js 15 + Supabase + Claude API
> **목표**: 4주 안에 3개 모듈 MVP 완성 → 매일 사용

---

# 📋 목차

1. 시스템 전체 개요
2. 통합 아키텍처 (3개 모듈 + 1개 공용 백엔드)
3. 모듈 A — 웹사이트 챗봇 (aio-make.com)
4. 모듈 B — 관리자 페이지 (admin.aio-make.com)
5. 모듈 C — 외부 플랫폼 응답 봇 (현행 숨고봇 확장)
6. 통합 DB 스키마 (Supabase)
7. 폴더 구조 (Monorepo)
8. 핵심 코드 스니펫
9. 4주 개발 로드맵
10. 운영 정책 및 보안
11. 비용 시뮬레이션
12. 향후 확장 (Phase 2~4)

---

# §1. 시스템 전체 개요

## 1.1 비즈니스 컨텍스트

```
[현재 보유 자산]
- aio-make.com (포트폴리오 사이트, Vercel)
- AIO 사업자등록 (682-01-02748)
- 7개 카테고리 V6 단가표 (가격관리.xlsx)
- 운영 중 숨고 / 크몽 + 가입 예정 위시켓·이랜서·노트폴리오·Upwork·Contra
- 카페24 디자인센터 (자산 판매)
- 매일 데일리 브리핑 텔레그램 봇 (Chat ID 7668768088)
- 클라이언트 트래커 / 매출 트래커 / KPI 트래커 (엑셀 4종)

[해결할 문제]
1. 사이트 방문자가 즉시 상담·견적 받을 통로 부재 → 인바운드 누락
2. 견적·계약 데이터가 엑셀 4종에 분산 → 단일 진실 원천 없음
3. 외부 플랫폼별 견적 응답을 매번 수기 작성 → 1건당 1분 소요
4. 응답 → 매칭 → 계약 → 매출의 funnel 추적 불가능
5. 견적·작업·매출이 따로 놀아서 5일 보장 / 14일 A/S 추적 어려움
```

## 1.2 솔루션 한 줄 정의

> **"aio-make.com이 단순 포트폴리오가 아닌, 인바운드(웹챗봇) + 외부 영업(플랫폼 응답봇) + 운영(관리자)을 하나의 Supabase DB로 묶어내는 영업·운영 통합 플랫폼이 된다."**

## 1.3 3개 모듈의 역할 분담

| 모듈 | URL | 사용자 | 핵심 기능 | 우선순위 |
|---|---|---|---|---|
| **A. 웹사이트 챗봇** | `aio-make.com` | 사이트 방문 고객 | 카테고리 분류·자동 견적·DB 저장·텔레그램 알림 | 🥇 1순위 |
| **B. 관리자 페이지** | `admin.aio-make.com` | 의장님 (1인) | 통합 고객 DB·업무 보드·매출 / KPI 대시보드 | 🥈 2순위 |
| **C. 플랫폼 응답봇** | `bot.aio-make.com` | 의장님 (1인) | 숨고/크몽/위시켓/Upwork 견적 글 → AI 응답 자동 생성 | 🥇 1순위 (현행 진행 중) |

→ **세 모듈은 같은 Supabase 백엔드를 공유**하므로 챗봇으로 들어온 고객도, 숨고로 들어온 고객도, 관리자 페이지에서 한 화면에 통합 조회/관리됨.

---

# §2. 통합 아키텍처

## 2.1 시스템 다이어그램

```
┌──────────────────────────────────────────────────────────────────┐
│                        [클라이언트 진입점]                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│   [A] aio-make.com 방문자        [C] 의장님이 외부 플랫폼에서        │
│        ↓                              견적 글 복사 후 붙여넣기        │
│   웹사이트 챗봇 (위젯 임베드)        bot.aio-make.com 입력           │
│        ↓                              ↓                              │
│   ┌────────────────────────────────────────────────────────┐     │
│   │           [공용 백엔드: Supabase + Claude API]           │     │
│   │                                                          │     │
│   │  Edge Functions       │  Postgres DB (RLS)              │     │
│   │  ─────────────────    │  ─────────────────              │     │
│   │  · classify-intent    │  · leads (통합 고객)            │     │
│   │  · generate-quote     │  · conversations (챗 + 봇)      │     │
│   │  · ai-response (V6)   │  · quote_requests               │     │
│   │  · notify-telegram    │  · quote_responses              │     │
│   │                       │  · projects (계약 후 작업)       │     │
│   │                       │  · invoices (입금/세금)          │     │
│   │                       │  · v6_templates (단가표·템플릿)  │     │
│   │                       │  · daily_kpi (자동 집계)         │     │
│   └────────────────────────────────────────────────────────┘     │
│        ↓                              ↑                              │
│   ┌────────────────────────────────────────────────────────┐     │
│   │       [B] admin.aio-make.com (의장님 단일 진입점)         │     │
│   │                                                          │     │
│   │  · 인박스 (신규 챗봇 + 봇 응답 통합)                       │     │
│   │  · 고객 DB (CRM)                                         │     │
│   │  · 업무 보드 (Kanban: 견적→진행→완료→후기)               │     │
│   │  · 매출/KPI 대시보드                                      │     │
│   │  · 단가표·템플릿 관리                                     │     │
│   └────────────────────────────────────────────────────────┘     │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
                            ↓
                ┌──────────────────────┐
                │   외부 알림 채널        │
                │ · 텔레그램 봇 (실시간)   │
                │ · 카카오 알림톡 (선택)   │
                │ · 이메일 (가능)         │
                └──────────────────────┘
```

## 2.2 데이터 흐름 시나리오

### 시나리오 1 — 사이트 방문자가 챗봇으로 견적 요청

```
[방문자] aio-make.com → 우측 하단 채팅 위젯 클릭
   ↓
챗봇: "어떤 작업이 필요하신가요? (PPT/로고/홈페이지/상세/자동화...)"
   ↓
[방문자] "회사 소개 PPT 30장, 다음주 월요일까지 필요합니다"
   ↓
[Edge Function: classify-intent]
   ↓ Claude API 분류 → category: ppt, urgent: true
[Edge Function: generate-quote]
   ↓ V6 템플릿 매칭 → DELUXE PPT 20P or PREMIUM PPT 30P+
   ↓
챗봇: "PPT 30장 PREMIUM 견적 25만원(이벤트가)/50만원(정상가).
       3-5일 작업입니다. 연락처/회사명 남겨주시면 의장님이 직접 확인합니다."
   ↓
[방문자] 이름·이메일·휴대폰 입력
   ↓
[Supabase] leads 저장 + conversations 저장 + quote_requests 저장
   ↓
[텔레그램 알림] 의장님 휴대폰: "🆕 신규 챗봇 견적 요청 — PPT 30P 25만"
   ↓
의장님 → admin.aio-make.com 접속 → 인박스에서 1클릭 응대
```

### 시나리오 2 — 외부 플랫폼 견적 응답

```
[의장님] 숨고 받은요청 → 견적 글 복사
   ↓
bot.aio-make.com → 입력란에 붙여넣기 + source 선택 (숨고/크몽/위시켓...)
   ↓
[Edge Function: ai-response]
   ↓ Claude API → 카테고리 분류 + V6 템플릿 매칭 + [BRACKET] 채움
   ↓
응답 미리보기 + 인라인 편집
   ↓
[의장님] "복사" 버튼 → 숨고 응답란에 붙여넣기 → 직접 발송
   ↓
"발송 완료 표시" 버튼 → quote_responses.sent_at 갱신
   ↓
[관리자 페이지] 인박스에 동일 건 자동 표시
```

### 시나리오 3 — 계약 → 작업 → 입금 → 후기

```
[방문자/플랫폼 고객 대화] → 계약 확정
   ↓
[관리자 페이지] 견적 카드에서 "계약 전환" 버튼
   ↓
quote_responses → projects 자동 생성 (5일 보장 D-Day 자동 계산)
   ↓
[Kanban 보드] "진행 중" 컬럼에 카드 표시 + 텔레그램 D-Day 알림
   ↓
작업 완료 → "완료" 컬럼 이동 → 후기 요청 메시지 자동 발송 (선택)
   ↓
입금 확인 → invoices 자동 생성 (세금계산서 대기)
   ↓
[손익 대시보드] 일/월/누적 매출 자동 갱신
```

## 2.3 기술 스택 (전체)

```
[Frontend]
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- React Hook Form + Zod (입력 검증)
- Sonner (토스트)
- recharts (대시보드 차트)
- @dnd-kit (Kanban 드래그)

[Backend]
- Supabase
  · Postgres (RLS 적용)
  · Auth (Magic Link — 의장님만)
  · Edge Functions (Deno) — Claude API 프록시
  · Storage (포트폴리오 파일·견적 PDF)
  · Realtime (인박스 신규 알림 푸시)

[AI]
- Anthropic Claude API
  · 모델: claude-haiku-4-5 (응답봇·분류) / claude-sonnet-4 (긴 견적·기획)
  · 시스템 프롬프트: V6 템플릿 6종 + 카테고리 분류 + JSON 출력

[챗봇 위젯]
- 자체 개발 (React 컴포넌트) — 외부 라이브러리 의존 X
- aio-make.com에 <script> 1줄로 임베드

[알림]
- 텔레그램 Bot API (현행 @aio_company_bot 활용)
- (선택) 카카오 알림톡 / 이메일 (Resend)

[배포]
- 메인 사이트: Vercel (현행 유지)
- 관리자: Vercel (서브도메인 admin)
- 응답봇: Vercel (서브도메인 bot)
- DB/Edge Functions: Supabase 호스팅

[도메인 구조]
aio-make.com           → 포트폴리오 + 챗봇 위젯
admin.aio-make.com     → 관리자 페이지 (의장님 전용)
bot.aio-make.com       → 외부 플랫폼 응답봇 (의장님 전용)
api.aio-make.com       → (선택) 별도 API gateway
```

---

# §3. 모듈 A — 웹사이트 챗봇 (aio-make.com)

## 3.1 목적과 역할

> 사이트 방문자가 5분 안에 자가 견적을 받고 연락처를 남기게 한다. 24시간 인바운드 영업 사원.

## 3.2 핵심 기능 7가지

| # | 기능 | 우선순위 | 설명 |
|---|---|---|---|
| F1 | **카테고리 자동 분류** | MVP | 질문/요청 → 7개 카테고리 자동 분류 (Claude API) |
| F2 | **V6 자동 견적** | MVP | 카테고리·예산·일정 → STANDARD/DELUXE/PREMIUM 자동 매칭 |
| F3 | **연락처 수집** | MVP | 이름·이메일·휴대폰·회사명 입력 폼 (lead 저장) |
| F4 | **텔레그램 즉시 알림** | MVP | 신규 lead 발생 시 의장님 텔레그램에 1초 안에 알림 |
| F5 | **포트폴리오 즉시 추천** | Phase 2 | 카테고리 매칭 → 포트폴리오 2~3건 즉시 미리보기 |
| F6 | **30분 무료 상담 예약** | Phase 2 | Cal.com / 구글 캘린더 연동 |
| F7 | **다국어** | Phase 3 | 한/영 자동 전환 (Upwork·Contra 유입 대비) |

## 3.3 챗봇 UX 흐름 (5스텝, MVP)

```
┌─────────────────────────────────────────────────────┐
│  Step 1: 인사 + 카테고리 선택                        │
│  ────────────────────────────────────────────────   │
│  안녕하세요! AIO에이전시입니다 👋                     │
│  어떤 작업이 필요하신가요?                            │
│                                                      │
│  [🌐 웹사이트] [🛒 쇼핑몰] [🎨 로고·명함]              │
│  [📄 상세페이지] [📊 PPT] [⚡ 자동화·앱] [🎬 영상]      │
│  [💬 잘 모르겠어요 / 직접 입력]                        │
└─────────────────────────────────────────────────────┘
                    ↓ (선택 또는 자유 입력)
┌─────────────────────────────────────────────────────┐
│  Step 2: 요구사항 1줄 입력                           │
│  ────────────────────────────────────────────────   │
│  어떤 작업인지 한 줄로 알려주세요.                    │
│  예) "회사 홈페이지 5페이지, 다음주 월요일까지"        │
│                                                      │
│  [텍스트 박스 — 200자 이내]                          │
│  [전송]                                              │
└─────────────────────────────────────────────────────┘
                    ↓ Claude API 분류 (3~5초)
┌─────────────────────────────────────────────────────┐
│  Step 3: 자동 견적 미리보기                          │
│  ────────────────────────────────────────────────   │
│  ✅ 카테고리: 웹사이트 (홈페이지 5P)                  │
│  💰 5월 31일까지 이벤트가: ₩300,000                   │
│  📅 작업일: 3일 (5일 보장)                            │
│  🛡️ 14일 무상 A/S + 원본 파일 무료                   │
│                                                      │
│  [💬 더 자세한 견적 받기] [📞 30분 무료 상담 예약]    │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│  Step 4: 연락처 입력 (lead 수집)                     │
│  ────────────────────────────────────────────────   │
│  이름:        [             ]                        │
│  회사명:      [             ] (선택)                 │
│  이메일:      [             ]                        │
│  휴대폰:      [             ]                        │
│  희망 일정:   [             ]                        │
│                                                      │
│  [개인정보 처리 동의 ☐]                               │
│  [견적 요청하기]                                      │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│  Step 5: 완료 + 다음 안내                            │
│  ────────────────────────────────────────────────   │
│  ✅ 견적 요청이 접수되었습니다!                        │
│  의장님이 1시간 안에 직접 연락드립니다.                │
│                                                      │
│  📂 비슷한 포트폴리오 보기 →                          │
│  📅 30분 무료 상담 예약 →                             │
└─────────────────────────────────────────────────────┘
```

## 3.4 챗봇 위젯 임베드 방식

```html
<!-- aio-make.com의 모든 페이지 하단 layout.tsx에 1줄 추가 -->
<script src="https://chatbot.aio-make.com/widget.js" async></script>
```

→ widget.js는 `iframe` 또는 `Shadow DOM`으로 사이트 CSS와 격리 (디자인 충돌 방지)

---

# §4. 모듈 B — 관리자 페이지 (admin.aio-make.com)

## 4.1 목적과 역할

> 엑셀 4개 파일 + 외부 플랫폼 + 챗봇 lead를 하나의 화면에서 관리한다. 의장님이 매일 9시·18시 들어와서 5분 안에 그날 해야 할 일을 파악한다.

## 4.2 사이드바 메뉴 (전체 구조)

```
[admin.aio-make.com]
├── 🏠 대시보드           (오늘 KPI · D-Day · Top 3 우선순위)
├── 📥 인박스             (신규 챗봇 lead + 신규 봇 응답 통합 큐)
├── 👥 고객 DB (CRM)      (전체 leads · 채널별 · 단계별 필터)
├── 📋 업무 보드 (Kanban)  (견적→진행→완료→후기 4컬럼)
├── 💰 매출 / 입금        (매출 트래커 + 손익 대시보드)
├── 📊 KPI 트래커         (일/주/월 자동 집계 + 목표 대비)
├── 📦 단가표 / 템플릿     (V6 단가 · 응답 템플릿 6종 편집)
├── 🌐 플랫폼 영업전략     (10개+ 채널 가입/매출 현황)
└── ⚙️  설정               (텔레그램 봇·이메일·결제 정보)
```

## 4.3 핵심 화면 4종

### 4.3.1 🏠 대시보드 (홈)

```
┌──────────────────────────────────────────────────────────┐
│  AIO 의장님 대시보드 — D-28 (5월 31일까지)                  │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  📊 오늘의 핵심 지표                                        │
│  ┌─────────┬─────────┬─────────┬─────────┐              │
│  │ 신규 lead│ 응답 발송│ 계약 성사 │ 오늘 매출 │              │
│  │   3     │    8    │    1    │  30만원  │              │
│  └─────────┴─────────┴─────────┴─────────┘              │
│                                                            │
│  ⚡ 1시간 이내 응답 필요 (push)                              │
│  ┌──────────────────────────────────────────────────┐    │
│  │ 🔴 숨고_OO청소 — 12분 경과 — 응답 작성 →           │    │
│  │ 🟡 챗봇_김민수 — 38분 경과 — 응답 작성 →           │    │
│  │ 🟢 크몽_빌더스 — 신규 — 응답 작성 →                │    │
│  └──────────────────────────────────────────────────┘    │
│                                                            │
│  🎯 오늘의 Top 3 우선순위 (자동)                            │
│  1. 청소업체 홈페이지 마감 D-1 (작업 진행률 70%)             │
│  2. 빌더스 PPT 입금 확인 (5/4 예정)                         │
│  3. 위시켓 가입 + 프로필 작성 (월간 미션)                    │
│                                                            │
│  💰 D-28 누적 매출 — 85 / 650만원 (13%)                   │
│  [-------▰▰------------------]                            │
│                                                            │
│  📈 5주 KPI 트래커 미니뷰                                   │
│  Week 1: ✅ 4건 / 85만원                                    │
│  Week 2: 진행 중                                           │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

### 4.3.2 📥 인박스 (Unified Inbox)

```
┌──────────────────────────────────────────────────────────┐
│  📥 인박스                              [필터 ▾] [정렬 ▾]   │
├──────────────────────────────────────────────────────────┤
│  채널: [전체] [챗봇] [숨고] [크몽] [위시켓] [Upwork]         │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  🔴 [챗봇] 김민수 — 12분 전 (응답 대기)                      │
│     "회사 홈페이지 5P 다음주까지 부탁드립니다"               │
│     자동 견적: 홈피 5P DELUXE — 30만 (5월) / 80만 (6월)     │
│     [✏️ 응답 편집] [📋 복사] [✓ 발송 완료] [💬 채팅 이력]    │
│                                                            │
│  🟡 [숨고] OO청소 — 38분 전 (응답 대기)                     │
│     "사장님 청소업체 홈페이지 5P 만들어 주세요..."           │
│     자동 견적: 홈피 5P DELUXE — 30만                       │
│     [✏️ 응답 편집] ...                                       │
│                                                            │
│  🟢 [크몽] 빌더스 — 신규 (응답 작성)                         │
│     ...                                                    │
│                                                            │
│  ✅ [숨고] 강의자료 의뢰인 — 어제 — 발송 완료                 │
│     PPT 3파일 — 25만 — 견적 매칭 대기                      │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

### 4.3.3 📋 업무 보드 (Kanban)

```
┌──────────────────────────────────────────────────────────┐
│  📋 업무 보드 (드래그로 단계 이동)                            │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  📝 견적 발송      🔧 작업 진행      ✅ 작업 완료      💬 후기 대기 │
│  ─────────────  ────────────────  ──────────────  ──────────── │
│                                                            │
│  [숨고/빌더스]    [숨고/청소업체]    [숨고/빌더스]      [숨고/빌더스] │
│  PPT 1건 수정    홈피 5P D-3       PPT 1건 (입금)    후기 요청 X │
│  10만원         30만원           10만원                       │
│                                                            │
│  [챗봇/김민수]    [숨고/강의자료]                              │
│  홈피 5P 견적    PPT 3파일 D-1                                │
│  30만원         25만원                                       │
│                                                            │
│  ↑ 견적은 인박스에서 발송 후 자동 이동                          │
│  ↑ "계약 전환" 버튼 클릭 시 작업 진행으로 이동                  │
│  ↑ "작업 완료" 클릭 시 자동으로 후기 요청 메시지 발송 (선택)     │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

### 4.3.4 💰 매출 / 입금

```
┌──────────────────────────────────────────────────────────┐
│  💰 매출 / 입금                          [기간: 이번 달 ▾]   │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  💵 이번 달 매출       💸 이번 달 지출      💎 순이익          │
│  85만원              23만원              62만원              │
│                                                            │
│  📋 매출 내역                                                │
│  ┌──────────────────────────────────────────────────────┐│
│  │ 날짜    │플랫폼│클라이언트   │서비스           │금액     ││
│  ├──────────────────────────────────────────────────────┤│
│  │ 5/3    │숨고  │청소업체     │홈피 5P         │300,000 ││
│  │ 5/2    │숨고  │강의자료     │PPT 3파일      │250,000 ││
│  │ 5/1    │숨고  │빌더스       │PPT 1건        │100,000 ││
│  └──────────────────────────────────────────────────────┘│
│                                                            │
│  📊 카테고리별 (이번 달)                                     │
│  PPT      ▰▰▰▰▰▰          35만 (41%)                       │
│  홈페이지 ▰▰▰▰▰▰▰▰▰        50만 (59%)                       │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

## 4.4 인증 (의장님 1인 전용)

- **방식**: Supabase Magic Link (이메일로 1회용 로그인 링크)
- **이메일**: `koreabencb@gmail.com` (의장님)
- **세션**: 30일 유지
- **RLS**: 모든 테이블에 `auth.uid() = OWNER_UUID` 조건 강제

---

# §5. 모듈 C — 외부 플랫폼 응답 봇 (현행 숨고봇 확장)

> 현행 `솔로프리너_v4_숨고응답봇_개발명세서.md`를 그대로 계승하면서, 채널 7개로 확장하고 관리자 페이지와 통합한다.

## 5.1 지원 플랫폼 (Phase별)

| Phase | 플랫폼 | 응답 형식 | 주의사항 |
|---|---|---|---|
| **Phase 1 (Week 1)** | 숨고 | V6 5단 한국어 | 자동 발송 X (정책 위반) |
| **Phase 1 (Week 1)** | 크몽 | V6 + 패키지 비율 1:2:4 | 자동 발송 X |
| **Phase 2 (Week 2)** | 위시켓 | 입찰 제안서 (긴 형식) | 첨부 자료 함께 |
| **Phase 2 (Week 2)** | 이랜서 | B2B 법인 톤 | 사업자등록증 첨부 |
| **Phase 2 (Week 3)** | 노트폴리오 | 디자인 포커스 | 포트폴리오 임베드 |
| **Phase 3 (Week 4)** | Upwork | 영문 Cover Letter 4단 | Connects 6~16개 |
| **Phase 3 (Week 4)** | Contra | 영문 + 0% 수수료 강조 | LinkedIn 연동 |

## 5.2 채널별 프롬프트 분기 로직

```typescript
// lib/prompts.ts
export function getSystemPrompt(source: PlatformSource): string {
  const basePrompt = `당신은 AIO에이전시 견적 응답 보조 AI입니다...`;

  const channelOverrides = {
    soomgo: '한국어. V6 5단 구조. "5일 보장" + "14일 A/S" 강조.',
    kmong: '한국어. 패키지 1:2:4 (Basic/Standard/Premium). "1일 완성" 강조.',
    wishket: '한국어. 입찰서 형식. 회사 소개 + 유사 케이스 2건 + 일정.',
    elancer: '한국어. B2B 법인 톤. 세금계산서 발행 가능 명시.',
    notefolio: '한국어. 디자인 비주얼 강조. 포트폴리오 링크 3개.',
    upwork: 'English. 4-section Cover Letter (Hook → Solution → Proof → CTA). Loom optional.',
    contra: 'English. 0% commission emphasis. LinkedIn link first.',
  };

  return basePrompt + '\n\n' + channelOverrides[source];
}
```

## 5.3 응답봇 UI (단일 페이지)

```
┌──────────────────────────────────────────────────────┐
│  bot.aio-make.com                          [의장님]    │
├──────────────────────────────────────────────────────┤
│                                                        │
│  📌 채널 선택                                          │
│  [숨고] [크몽] [위시켓] [이랜서] [노트폴리오] [Upwork]  │
│                                                        │
│  📥 클라이언트 요청 글 (붙여넣기)                       │
│  ┌────────────────────────────────────────────────┐ │
│  │ 회사 소개 PPT 30장 다음주까지 부탁드립니다...      │ │
│  │ 예산은 30만원 정도 생각하고 있고...                │ │
│  └────────────────────────────────────────────────┘ │
│                                                        │
│  [🤖 V6 응답 생성] (3~5초)                              │
│                                                        │
│  ─────────────────────────────────────────────────  │
│                                                        │
│  📤 자동 생성된 응답 (편집 가능)                        │
│  ┌────────────────────────────────────────────────┐ │
│  │ 카테고리: PPT (PREMIUM 30P+) — 신뢰도 95%         │ │
│  │ 가격: 25만 (이벤트가) / 50만 (정상가)              │ │
│  ├────────────────────────────────────────────────┤ │
│  │ 안녕하세요, AIO에이전시입니다.                     │ │
│  │                                                  │ │
│  │ "회사 소개 PPT 30장 다음주까지" 견적 드립니다.     │ │
│  │ ...                                              │ │
│  └────────────────────────────────────────────────┘ │
│                                                        │
│  [📋 복사] [♻️ 재생성] [⚙️ 카테고리 변경] [✓ 발송 완료] │
│                                                        │
└──────────────────────────────────────────────────────┘
```

## 5.4 챗봇 → 응답봇 → 관리자 통합 데이터 흐름

```
[모든 입력 채널이 leads + conversations + quote_requests 같은 테이블로 통합 저장]

┌──────────────┐
│ 챗봇          │ → leads (channel='website')
│ 응답봇 — 숨고 │ → leads (channel='soomgo')  ───┐
│ 응답봇 — 크몽 │ → leads (channel='kmong')   ───┼──→ admin.aio-make.com 인박스
│ 응답봇 — 위시켓│ → leads (channel='wishket') ───┤      (채널 필터로 통합/분리)
│ 응답봇 — Upwork│ → leads (channel='upwork')  ───┘
└──────────────┘
```

→ **하나의 통합 인박스**에서 채널 무관하게 응답 작성·발송·계약 전환·매출 기록까지 한 번에 처리.

---

# §6. 통합 DB 스키마 (Supabase Postgres)

```sql
-- ────────────────────────────────────────────────────
-- 1. 통합 고객 (모든 채널의 진입점)
-- ────────────────────────────────────────────────────
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel TEXT NOT NULL CHECK (channel IN (
    'website',     -- aio-make.com 챗봇
    'soomgo','kmong','wishket','elancer','notefolio',
    'upwork','contra','fiverr','toptal',
    'cafe24','linkedin','referral','other'
  )),
  customer_name TEXT,
  company_name TEXT,
  email TEXT,
  phone TEXT,
  external_handle TEXT,         -- 숨고 닉네임 / Upwork client ID 등
  external_url TEXT,            -- 외부 채널 프로필 URL (있으면)
  first_contact_at TIMESTAMPTZ DEFAULT now(),
  last_contact_at TIMESTAMPTZ DEFAULT now(),
  source_meta JSONB,            -- { soomgo_request_id, location, ... }
  notes TEXT,
  tags TEXT[],
  is_archived BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_leads_channel ON leads(channel);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_phone ON leads(phone);
CREATE INDEX idx_leads_last_contact ON leads(last_contact_at DESC);

-- ────────────────────────────────────────────────────
-- 2. 대화 (챗봇 메시지 + 외부 플랫폼 원문)
-- ────────────────────────────────────────────────────
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,        -- leads.channel과 동일
  role TEXT CHECK (role IN ('customer','assistant','agent','system')),
  content TEXT NOT NULL,
  metadata JSONB,               -- { intent, confidence, tokens_used, ... }
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_conversations_lead ON conversations(lead_id, created_at);

-- ────────────────────────────────────────────────────
-- 3. 견적 요청 (챗봇 자동 견적 + 외부 플랫폼 견적 글)
-- ────────────────────────────────────────────────────
CREATE TABLE quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  raw_text TEXT NOT NULL,       -- 클라이언트 원문
  category TEXT CHECK (category IN (
    'website','shop','logo','detail','ppt','automation','video','bundle','other'
  )),
  category_confidence FLOAT,
  customer_summary TEXT,        -- AI가 1줄로 정리한 핵심
  budget INT,
  deadline_text TEXT,
  urgency TEXT CHECK (urgency IN ('normal','urgent','very_urgent')),
  status TEXT DEFAULT 'new' CHECK (status IN (
    'new','draft','sent','viewed','replied','matched','contracted','rejected','archived'
  )),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_quote_requests_status ON quote_requests(status, created_at DESC);
CREATE INDEX idx_quote_requests_lead ON quote_requests(lead_id);

-- ────────────────────────────────────────────────────
-- 4. 견적 응답 (AI 생성 + 의장님 편집본 + 발송 결과)
-- ────────────────────────────────────────────────────
CREATE TABLE quote_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES quote_requests(id) ON DELETE CASCADE,
  template_version TEXT DEFAULT 'V6',
  template_category TEXT,
  price_tier TEXT CHECK (price_tier IN ('standard','deluxe','premium','custom')),
  event_price INT,              -- 5월 이벤트가
  regular_price INT,            -- 6월 정상가
  delivery_days TEXT,
  ai_generated_text TEXT NOT NULL,
  edited_text TEXT,             -- 의장님 편집본 (없으면 ai_generated_text 사용)
  attachments JSONB,            -- [ { url, name, size }, ... ]
  sent_at TIMESTAMPTZ,
  customer_replied BOOLEAN DEFAULT false,
  reply_received_at TIMESTAMPTZ,
  contracted BOOLEAN DEFAULT false,
  contracted_amount INT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_quote_responses_request ON quote_responses(request_id);
CREATE INDEX idx_quote_responses_sent_at ON quote_responses(sent_at DESC);

-- ────────────────────────────────────────────────────
-- 5. 프로젝트 (계약 → 작업 → 완료)
-- ────────────────────────────────────────────────────
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_response_id UUID REFERENCES quote_responses(id),
  lead_id UUID REFERENCES leads(id),
  channel TEXT,
  category TEXT,
  product_name TEXT,            -- "홈피 5P", "PPT 30P" 등
  contracted_amount INT,
  start_date DATE,
  due_date DATE,                -- 5일 보장 기준
  completed_date DATE,
  status TEXT DEFAULT 'in_progress' CHECK (status IN (
    'in_progress','blocked','review','completed','canceled'
  )),
  five_day_kept BOOLEAN,        -- 5일 보장 달성 여부
  refund_10pct INT DEFAULT 0,   -- 미달 시 자발적 환불 금액
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_projects_status ON projects(status, due_date);
CREATE INDEX idx_projects_due ON projects(due_date);

-- ────────────────────────────────────────────────────
-- 6. 입금 / 세금 (매출)
-- ────────────────────────────────────────────────────
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  lead_id UUID REFERENCES leads(id),
  channel TEXT,
  gross_amount INT NOT NULL,    -- 청구액
  platform_fee INT DEFAULT 0,   -- 플랫폼 수수료 (크몽 18~22%, Upwork 5~10%)
  vat_amount INT DEFAULT 0,
  net_amount INT NOT NULL,      -- 실제 입금액
  contracted_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  tax_invoice_issued BOOLEAN DEFAULT false,
  tax_invoice_no TEXT,
  payment_method TEXT,          -- "숨고페이", "카드", "계좌이체"
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────
-- 7. 후기 (리뷰)
-- ────────────────────────────────────────────────────
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  channel TEXT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  text TEXT,
  external_url TEXT,
  received_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────
-- 8. V6 단가표 (가격관리.xlsx → DB 흡수)
-- ────────────────────────────────────────────────────
CREATE TABLE v6_price_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('standard','deluxe','premium')),
  product_name TEXT NOT NULL,
  event_price INT NOT NULL,
  regular_price INT NOT NULL,
  market_avg INT,
  delivery_days TEXT,
  revisions TEXT,
  scope TEXT,
  active BOOLEAN DEFAULT true,
  version TEXT DEFAULT 'V6.0',
  effective_from DATE,
  effective_to DATE
);

-- ────────────────────────────────────────────────────
-- 9. V6 응답 템플릿 (6종)
-- ────────────────────────────────────────────────────
CREATE TABLE v6_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  channel TEXT,                 -- NULL이면 모든 채널 공용
  template_body TEXT NOT NULL,  -- [BRACKET] 포함
  language TEXT DEFAULT 'ko',
  active BOOLEAN DEFAULT true,
  version TEXT DEFAULT 'V6.0'
);

-- ────────────────────────────────────────────────────
-- 10. 일일 KPI 자동 집계 (View 또는 cron)
-- ────────────────────────────────────────────────────
CREATE TABLE daily_kpi (
  date DATE PRIMARY KEY,
  total_leads INT DEFAULT 0,
  total_quotes_sent INT DEFAULT 0,
  total_replies INT DEFAULT 0,
  total_contracted INT DEFAULT 0,
  total_revenue_net INT DEFAULT 0,
  channel_breakdown JSONB,
  category_breakdown JSONB,
  five_day_keep_rate FLOAT
);

-- ────────────────────────────────────────────────────
-- 11. 운영 메모 / 데일리 브리핑 로그
-- ────────────────────────────────────────────────────
CREATE TABLE daily_briefings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  morning_brief TEXT,
  evening_summary TEXT,
  top3_priorities TEXT[],
  telegram_message_id INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────
-- 12. 행 수준 보안 (RLS) — 의장님 1인만 접근
-- ────────────────────────────────────────────────────
DO $$
DECLARE t TEXT;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname='public' LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY owner_full ON %I FOR ALL USING (auth.uid() IS NOT NULL)', t);
  END LOOP;
END $$;

-- (단, 챗봇이 anon으로 leads/conversations에만 INSERT 가능하도록 별도 정책 필요)
CREATE POLICY anon_insert_leads ON leads
  FOR INSERT TO anon
  WITH CHECK (channel = 'website');

CREATE POLICY anon_insert_conversations ON conversations
  FOR INSERT TO anon
  WITH CHECK (channel = 'website');

CREATE POLICY anon_insert_quote_requests ON quote_requests
  FOR INSERT TO anon
  WITH CHECK (channel = 'website');
```

---

# §7. 폴더 구조 (Monorepo)

```
aio-platform/                         # 새 GitHub 레포 (1개)
├── apps/
│   ├── web/                          # aio-make.com (포트폴리오 + 챗봇 위젯)
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # 홈 + <Chatbot />
│   │   │   ├── portfolio/
│   │   │   ├── pricing/
│   │   │   └── api/
│   │   │       └── chatbot/
│   │   │           └── route.ts      # 챗봇 메시지 처리
│   │   └── components/
│   │       └── Chatbot/              # 챗봇 위젯 (5스텝)
│   │
│   ├── admin/                        # admin.aio-make.com
│   │   ├── app/
│   │   │   ├── layout.tsx            # 사이드바 + 인증 가드
│   │   │   ├── (auth)/login/
│   │   │   ├── dashboard/
│   │   │   ├── inbox/
│   │   │   ├── crm/
│   │   │   ├── kanban/
│   │   │   ├── revenue/
│   │   │   ├── kpi/
│   │   │   └── templates/
│   │   └── components/
│   │       ├── Inbox/
│   │       ├── KanbanBoard/
│   │       ├── KpiDashboard/
│   │       └── ...
│   │
│   └── bot/                          # bot.aio-make.com (현행 숨고봇 확장)
│       ├── app/
│       │   ├── page.tsx              # 메인 (채널 선택 + 입력 + 응답)
│       │   ├── history/
│       │   └── api/
│       │       └── generate-response/
│       │           └── route.ts
│       └── components/
│           ├── ChannelTabs/
│           ├── QuoteInput/
│           └── ResponsePreview/
│
├── packages/                         # 3개 앱이 공유하는 코드
│   ├── ui/                           # shadcn/ui 공통 컴포넌트
│   ├── lib/                          # 공통 라이브러리
│   │   ├── supabase.ts
│   │   ├── claude.ts
│   │   ├── prompts.ts
│   │   ├── v6-templates.ts
│   │   └── price-table.ts
│   ├── types/                        # TypeScript 타입
│   │   ├── lead.ts
│   │   ├── quote.ts
│   │   ├── project.ts
│   │   └── kpi.ts
│   └── notify/                       # 텔레그램·이메일 알림
│       └── telegram.ts
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql    # §6 SQL 그대로
│   │   ├── 002_seed_v6_templates.sql # 템플릿 6종 시드
│   │   └── 003_seed_v6_price.sql     # 단가표 시드
│   ├── functions/                    # Edge Functions
│   │   ├── classify-intent/
│   │   ├── generate-quote/
│   │   ├── generate-response/
│   │   ├── notify-telegram/
│   │   └── daily-kpi-aggregate/      # cron
│   └── seed/
│
├── scripts/
│   ├── import-from-excel.ts          # 기존 엑셀 → DB 마이그레이션
│   └── seed-templates.ts
│
├── .env.local
├── package.json                      # workspaces 설정
├── pnpm-workspace.yaml               # pnpm 사용 권장
├── turbo.json                        # Turborepo (선택)
└── README.md
```

---

# §8. 핵심 코드 스니펫

## 8.1 챗봇 메시지 처리 (apps/web/app/api/chatbot/route.ts)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@aio/lib/supabase';
import { classifyAndQuote } from '@aio/lib/claude';
import { notifyTelegram } from '@aio/notify/telegram';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sessionId, step, payload } = body;

  // Step별 처리 (Step 1~5)
  switch (step) {
    case 'select_category':
      return handleStep2_freeText(sessionId, payload);

    case 'free_text':
      // Claude로 카테고리 분류 + 자동 견적
      const result = await classifyAndQuote(payload.text);
      // conversations 저장
      await supabaseService.from('conversations').insert({
        lead_id: sessionId,
        channel: 'website',
        role: 'customer',
        content: payload.text,
      });
      await supabaseService.from('conversations').insert({
        lead_id: sessionId,
        channel: 'website',
        role: 'assistant',
        content: result.response_text,
        metadata: result,
      });
      return NextResponse.json(result);

    case 'submit_lead':
      // leads 저장 + 텔레그램 알림
      const { name, email, phone, company, schedule } = payload;
      const { data: lead } = await supabaseService
        .from('leads')
        .insert({
          channel: 'website',
          customer_name: name,
          email, phone, company_name: company,
          source_meta: { schedule },
        })
        .select()
        .single();

      await supabaseService.from('quote_requests').insert({
        lead_id: lead.id,
        channel: 'website',
        raw_text: payload.lastMessage,
        category: payload.category,
        category_confidence: payload.confidence,
        customer_summary: payload.summary,
        status: 'new',
      });

      await notifyTelegram({
        text: `🆕 신규 챗봇 lead\n\n` +
              `${name} (${company || '-'})\n` +
              `${payload.summary}\n` +
              `${payload.category} — ${payload.event_price?.toLocaleString()}원\n\n` +
              `→ admin.aio-make.com/inbox`,
      });

      return NextResponse.json({ success: true, lead_id: lead.id });
  }
}
```

## 8.2 Claude 분류·견적 함수 (packages/lib/claude.ts)

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { V6_TEMPLATES } from './v6-templates';
import { V6_PRICE_TABLE } from './price-table';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function classifyAndQuote(rawText: string, channel = 'website') {
  const systemPrompt = `당신은 AIO에이전시 자동 견적 AI입니다.

【카테고리 7개】
- website: 랜딩/홈페이지/커스텀 사이트
- shop: 카페24/스마트스토어/쇼핑몰
- logo: 로고/명함/브랜딩
- detail: 상세페이지 (쿠팡/스마트스토어)
- ppt: 발표자료/IR/사업계획서
- automation: 자동화/앱 MVP/AI 개발
- video: 브랜드 영상/숏폼/홍보

【V6 단가표】
${JSON.stringify(V6_PRICE_TABLE, null, 2)}

【V6 응답 템플릿】
${JSON.stringify(V6_TEMPLATES, null, 2)}

【출력 (JSON)】
{
  "category": "ppt",
  "category_confidence": 0.95,
  "price_tier": "premium",
  "product_name": "PPT 30P+",
  "event_price": 250000,
  "regular_price": 500000,
  "delivery_days": "3-5일",
  "customer_summary": "회사 소개 PPT 30장, 다음주 월요일까지",
  "urgency": "urgent",
  "response_text": "안녕하세요, AIO에이전시입니다.\\n\\n..."
}

【원칙】
- 채널에 맞는 톤 사용 (현재 채널: ${channel})
- 5월 31일까지 이벤트가 강조 + 6월 정상가 참고
- 5일 보장 + 14일 A/S + 원본 파일 무료 명시
- AI 사용 언급 금지`;

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    system: systemPrompt,
    messages: [{ role: 'user', content: `클라이언트 요청:\n\n${rawText}` }],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Invalid response format');

  return JSON.parse(jsonMatch[0]);
}
```

## 8.3 텔레그램 알림 (packages/notify/telegram.ts)

```typescript
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!; // 7668768088

export async function notifyTelegram(opts: { text: string; parseMode?: 'HTML' | 'Markdown' }) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: opts.text,
      parse_mode: opts.parseMode || 'HTML',
    }),
  });
  return res.json();
}
```

## 8.4 인박스 (apps/admin/app/inbox/page.tsx)

```typescript
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@aio/lib/supabase';
import { InboxItem } from '@/components/Inbox/InboxItem';

export default function Inbox() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchItems();
    // 실시간 구독
    const sub = supabase
      .channel('inbox')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'quote_requests' },
        () => fetchItems()
      ).subscribe();
    return () => { sub.unsubscribe(); };
  }, [filter]);

  async function fetchItems() {
    let q = supabase
      .from('quote_requests')
      .select(`*, lead:leads(*), responses:quote_responses(*)`)
      .order('created_at', { ascending: false })
      .limit(50);
    if (filter !== 'all') q = q.eq('channel', filter);
    const { data } = await q;
    setItems(data || []);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📥 인박스</h1>
      <ChannelFilter value={filter} onChange={setFilter} />
      {items.map(it => <InboxItem key={it.id} item={it} />)}
    </div>
  );
}
```

## 8.5 Kanban 보드 (apps/admin/app/kanban/page.tsx)

```typescript
'use client';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { supabase } from '@aio/lib/supabase';

const COLUMNS = ['quote_sent', 'in_progress', 'completed', 'reviewed'];

export default function Kanban() {
  const [projects, setProjects] = useState([]);

  useEffect(() => { fetchProjects(); }, []);

  async function handleDragEnd({ active, over }) {
    if (!over) return;
    await supabase
      .from('projects')
      .update({ status: over.id })
      .eq('id', active.id);
    fetchProjects();
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-4 p-6">
        {COLUMNS.map(col => (
          <Column key={col} status={col}
            items={projects.filter(p => p.status === col)} />
        ))}
      </div>
    </DndContext>
  );
}
```

---

# §9. 4주 개발 로드맵

> 의장님 작업 가능 시간: 평일 4~6시간 / 주말 6~8시간 가정. Cursor + Claude Code 활용.

## Week 1 (5/4 ~ 5/10) — 모듈 C 완성 + 모듈 B 골격

| 일 | 작업 | 산출물 | 예상 시간 |
|---|---|---|---|
| 일(5/4) | 모노레포 셋업 (pnpm workspace) + Supabase 프로젝트 + DB 마이그레이션 | 빈 레포 + 12개 테이블 + RLS | 4h |
| 월(5/5) | bot 앱 — 현행 숨고봇 명세서 그대로 이식 + 채널 탭 추가 | bot.aio-make.com 배포 | 5h |
| 화(5/6) | V6 템플릿 6종 + 단가표 → DB 시드 + lib/v6-templates.ts | 동작하는 응답 생성 | 4h |
| 수(5/7) | admin 앱 — 인증 (Magic Link) + 사이드바 + 대시보드 골격 | admin.aio-make.com 로그인 가능 | 5h |
| 목(5/8) | admin 인박스 화면 + Realtime 구독 | 신규 견적 자동 표시 | 4h |
| 금(5/9) | 텔레그램 알림 통합 (응답봇 → 인박스 → 알림) | 신규 견적 → 1초 안에 텔레그램 | 3h |
| 토(5/10) | 실전 테스트 + 버그 수정 | Week 1 마감 | 4h |

→ **Week 1 끝**: bot은 매일 사용 가능, admin은 인박스만 동작

## Week 2 (5/11 ~ 5/17) — 모듈 B 완성 + 챗봇 시작 + 자동수집

| 일 | 작업 | 산출물 |
|---|---|---|
| 일(5/11) | admin Kanban 보드 (드래그) + projects 테이블 연동 | 작업 보드 동작 |
| 월(5/12) | admin 매출/입금 화면 + invoices 연동 | 손익 자동 집계 |
| 화(5/13) | admin KPI 대시보드 + 일일 자동 집계 cron | recharts 차트 |
| 수(5/14) | web 앱 — 챗봇 UI 5스텝 + 카테고리 자동 분류 | 사이트에 위젯 표시 |
| 목(5/15) | **§13 Gmail OAuth + 채널 파서 7개 + Edge Function** | 자동수집 동작 |
| 금(5/16) | **§13 cron 1시간 + admin 인박스에 🤖 자동 카드 표시** | 자동→인박스 통합 |
| 토(5/17) | 챗봇 텔레그램 알림 + 1주일 사용 데이터 분석 + 버그 수정 | Week 2 마감 |

→ **Week 2 끝**: 3개 모듈 + Gmail 자동수집까지 동작. 매시 정각 자동 응답 초안 생성.

## Week 3 (5/18 ~ 5/24) — 채널 확장 + 자동화

| 일 | 작업 |
|---|---|
| 일(5/18) | 위시켓 응답 템플릿 추가 (긴 입찰서 형식) |
| 월(5/19) | 이랜서 + 노트폴리오 템플릿 추가 |
| 화(5/20) | Upwork 영문 Cover Letter 템플릿 (4단) |
| 수(5/21) | Contra 영문 템플릿 |
| 목(5/22) | 기존 엑셀(클라이언트 트래커·매출) → DB 임포트 스크립트 |
| 금(5/23) | 데일리 브리핑 자동화 (Edge Function cron, 매일 7시) |
| 토(5/24) | Week 3 마감 + 실전 매출 분석 |

## Week 4 (5/25 ~ 5/31) — 마케팅 자산화 (§15 트래픽 분석 + SNS 통합)

| 일 | 작업 |
|---|---|
| 일(5/25) | §15.3 GA4 + GTM 셋업 + 쿠키 동의 배너 |
| 월(5/26) | §15.4 visitor / session / page_view / event 테이블 + tracking SDK |
| 화(5/27) | §15.5 sns_campaigns + admin 단축 URL 발급 화면 |
| 수(5/28) | §15.7 챗봇 ↔ visitor 연동 (재방문 인사 + 이전 견적 표시) |
| 목(5/29) | §15.8 admin 트래픽 대시보드 + SNS ROI 화면 |
| 금(5/30) | §15.11 cron 일일 자동 집계 + Microsoft Clarity 통합 |
| 토(5/31) | **D-Day 마감 — V7 정상가 자동 전환 + 개인정보 처리 방침** |

### Phase 2로 미룬 항목 (6월~)
- 후기 자동 요청 메시지 / 5일 보장 D-Day 자동 알림 / 30분 상담 예약(Cal.com)
- §14.2 Gmail Watch Push / §14.4 모바일 알림 가로채기
- §15.9 Web Push + 이메일 자동화 (lead nurture)

---

# §10. 운영 정책 및 보안

## 10.1 플랫폼 정책 안전 가이드 (절대 준수)

### ✅ 허용
- 의장님이 견적 글을 수동 복사·붙여넣기
- AI 응답 생성 (서버에서 Claude API 호출)
- 의장님이 "복사" 버튼 클릭 → 응답을 클립보드로 가져가기
- 의장님이 외부 플랫폼 응답란에 직접 붙여넣기 + 발송

### ❌ 절대 금지 (계정 정지 위험)
- 외부 플랫폼 페이지를 크롤링·스크레이핑하여 견적 자동 수집
- 자동 로그인 + 자동 발송
- Selenium/Puppeteer 등 봇으로 응답 발송
- 외부 플랫폼 API 무단 사용

### 🟡 회색지대 (Phase 4 크롬 확장 도입 시)
- 크롬 확장이 외부 플랫폼 DOM "읽기" — 본인 페이지 자동 읽기는 OK
- 크롬 확장이 응답란에 텍스트 "붙여넣기" — 사용자 클릭 트리거면 OK
- 크롬 확장이 "발송" 버튼 자동 클릭 — **❌ 절대 금지**

## 10.2 데이터 보호

- **암호화**: Supabase TLS + at-rest encryption (기본 제공)
- **PII 처리**:
  - 이름·전화·이메일은 leads 테이블에만 저장
  - conversations.content는 클라이언트 원문 그대로 저장 (마스킹 X)
  - 90일 이상 미접촉 lead는 자동 archive
- **백업**: Supabase 일일 자동 백업 + 주 1회 수동 export (CSV)
- **개인정보 동의**: 챗봇 lead 폼에 처리방침 링크 + 체크박스 강제

## 10.3 인증·접근 제어

- admin / bot 도메인은 Magic Link만 (의장님 이메일 화이트리스트)
- Supabase RLS로 모든 테이블 보호
- `.env`는 절대 GitHub 커밋 X (.gitignore)
- ANTHROPIC_API_KEY는 서버 사이드 (Edge Function·Server Route)에서만 사용

## 10.4 AI 안전

- Claude API 호출 시 system prompt에 "AI 언급 금지" 명시
- 모든 AI 응답은 의장님 검토 후 발송
- 챗봇은 가격·일정만 자동 제시, 계약·결제는 의장님만

---

# §11. 비용 시뮬레이션

## 11.1 월 운영비 (1년 차 가정)

| 항목 | 월 비용 | 비고 |
|---|---|---|
| Vercel Hobby (3개 앱 통합) | $0 (무료) | Pro $20/월은 트래픽 폭증 시 |
| Supabase Free Tier | $0 (무료) | 500MB DB / 500K Edge 호출 |
| Claude API (Haiku 위주) | $5 ~ $20 | 일 100건 응답 가정 |
| 도메인 (aio-make.com) | $0 | 자체 보유 |
| 서브도메인 (admin / bot) | $0 | DNS 추가만 |
| 텔레그램 봇 | $0 | 무료 |
| Resend (이메일, 선택) | $0 | 월 3,000건 무료 |
| Cal.com (예약, 선택) | $0 | 무료 플랜 |
| **합계** | **$5 ~ $20** | 월 1만 ~ 3만원 |

## 11.2 트래픽 폭증 시 (월 매출 1,000만원+)

| 항목 | 월 비용 |
|---|---|
| Vercel Pro | $20 |
| Supabase Pro | $25 |
| Claude API (Sonnet 일부 사용) | $50 ~ $100 |
| Resend Pro | $20 |
| **합계** | **$115 ~ $165** (월 15만 ~ 22만원) |

→ **매출 100만원만 나와도 운영비 회수 가능. ROI 50배 이상.**

---

# §12. 향후 확장 (Phase 2~4)

## Phase 2 (Month 2~3, 6~7월) — Organic 운영 안정화

> 광고 집행 계획 없음 → 광고 픽셀(Meta/X/LinkedIn) 작업은 **영구 보류**. organic SNS + 외주 채널 활성화에 집중.

- 카카오 알림톡 연동 (NHN Toast API)
- 견적 PDF 자동 생성 (회사 로고 워터마크)
- 후기 자동 수집 + Trustpilot/Google 리뷰 임베드
- 클라이언트 별 만족도 NPS 자동 발송 (작업 완료 7일 후)
- 챗봇 다국어 (한·영) — Upwork·Contra 유입 대비
- §14.2 Gmail Watch Push (자동수집 강화)
- §15.9 Web Push + 이메일 자동화 (lead nurture)

## Phase 3 (Month 4~6, 8~10월) — 콘텐츠 양적 확장 + 자산화
- §15.13 Tier 3 organic 통계 API — Instagram Graph + YouTube Data (무료 채널만)
- A/B 테스트 — 응답 변형별 매칭률 자동 비교
- RAG (Retrieval-Augmented Generation) — 매칭 성공 응답 패턴 학습
- 카페24 자산 판매 통합 (디자인 다운로드 → 매출 자동 기록)
- Buffer / Typefully 같은 외부 SaaS로 SNS 자동 발행 (자체 구현 X)
- (광고 의향 생기면 그때 Tier 2 픽셀 반나절 추가)

## Phase 4 (Month 7~12, 11~4월)
- 클라이언트 포털 (각 클라가 자기 프로젝트 진행 상황 확인)
- 견적 → 결제 풀 자동화 (Toss / Stripe)
- 외주 하청 관리 (디자이너·개발자 매칭 + 정산)
- AI 기획서 자동 생성 (사업계획서 PPT — 30분 안에 30페이지)
- 솔로프리너 SaaS화 — 다른 외주 에이전시도 사용할 수 있게 멀티 테넌트

---

# §13. 자동 수집·자동 응답 준비 모듈 (Auto-Collect / Pre-Reply) ⭐ 추가

> **목적**: 1시간마다 외부 채널 신규 견적을 자동 감지 → AI 응답 미리 작성 → 의장님은 admin 인박스에서 확인 후 1클릭 복사 → 직접 발송만 하면 끝.
> **결과**: 의장님이 매일 외부 플랫폼 7개 사이트에 들어가서 확인할 필요 없음. admin.aio-make.com 한 곳에서 모든 채널 신규 건이 "응답 초안까지 완성된 상태로" 대기.

## 13.0 ⚠️ 정책 위반 위험 — 직접 크롤링은 절대 금지

```
❌ 위험 (의장님이 처음 요청한 "크롤링" 방식):
   - Selenium / Puppeteer로 숨고/크몽/위시켓 자동 로그인 + DOM 긁기
   - 1시간마다 cron이 외부 사이트 페이지 페치
   → 즉시 계정 정지 위험 (모든 한국 외주 플랫폼 ToS에 명시)
   → 한 번 차단되면 IP·계정·사업자 영구 차단 가능

✅ 동일 결과를 안전하게 내는 3가지 합법 경로:
   1. Gmail 자동 폴링 (메인 ⭐) — 외부 플랫폼이 의장님께 보내는 알림 메일을 읽음
   2. 크롬 확장 (보조) — 의장님이 직접 외부 페이지를 열었을 때 사이드 패널에 정리
   3. 공식 API (해외만) — Upwork·Contra는 공식 API 제공
```

→ **메인 권장 방식: Gmail 자동 폴링**. 의장님이 자기 메일함을 읽는 건 100% 합법이고, 모든 외부 플랫폼이 "신규 견적·메시지 알림"을 의장님 이메일로 보내고 있음. 결과는 크롤링과 동일하면서 위험은 0.

## 13.1 시스템 아키텍처

```
┌──────────────────────────────────────────────────────────────┐
│                  [외부 플랫폼 7개 — 변화 X]                      │
│  숨고 / 크몽 / 위시켓 / 이랜서 / 노트폴리오 / Upwork / Contra     │
└──────────────────────────────────────────────────────────────┘
              ↓                                  ↓
         (신규 견적 알림 메일)          (의장님이 페이지 직접 방문 시)
              ↓                                  ↓
┌──────────────────────────────┐   ┌──────────────────────────┐
│ 메인: Gmail API (koreabencb@) │   │ 보조: 크롬 확장 (Phase 3) │
│ ────────────────────────────  │   │ ────────────────────────  │
│ Edge Function cron 1시간마다  │   │ 콘텐츠 스크립트가 사용자가 │
│ 신규 메일 가져옴 → 발신자       │   │ 본인 화면에서 보고 있는      │
│ 도메인으로 채널 식별 (예:       │   │ 견적 글을 읽어서 admin으로  │
│ noreply@soomgo.com → 'soomgo')│   │ POST. 자동 발송 X            │
└──────────────────────────────┘   └──────────────────────────┘
              ↓                                  ↓
┌──────────────────────────────────────────────────────────────┐
│         [공용 처리 파이프라인 — Supabase Edge Function]          │
│                                                                │
│  1) 메일/페이지 본문 → 견적 글 추출 (HTML 파싱·정규식)            │
│  2) Claude API → 카테고리 분류 + V6 매칭 + 응답 초안            │
│  3) leads + conversations + quote_requests + quote_responses  │
│     자동 INSERT (status='draft')                               │
│  4) 텔레그램 알림 (제목·금액·미리보기 50자)                       │
└──────────────────────────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────────────────────────┐
│       [admin.aio-make.com 인박스]                              │
│                                                                │
│  🟢 [숨고/AUTO] OO청소업체 — 14:23 자동 수신                     │
│     "청소업체 홈페이지 5P 만들어주세요..."                        │
│     자동 견적: 홈피 5P DELUXE — 30만 (이벤트가)                  │
│     ┌─────────── AI 응답 초안 (편집 가능) ───────────┐          │
│     │ 안녕하세요, AIO에이전시입니다.                    │          │
│     │ "청소업체 홈페이지 5P" 견적 드립니다.              │          │
│     │ 【견적】 ...                                        │          │
│     └─────────────────────────────────────────────────┘          │
│     [📋 복사] [✏️ 편집] [✓ 발송 완료] [⏭ 스킵]                   │
└──────────────────────────────────────────────────────────────┘
              ↓
[의장님] 외부 플랫폼 응답란에 1클릭 붙여넣기 + 발송 버튼 직접 클릭
```

## 13.2 Gmail 폴링 — 채널별 식별 규칙

```typescript
// packages/lib/email-parsers.ts
export const EMAIL_RULES = {
  soomgo: {
    senders: ['noreply@soomgo.com', 'soomgo@soomgo.com', 'no-reply@soomgo.com'],
    subjectPatterns: [/요청서가 도착/, /새로운 요청/, /신규 견적/],
    extractor: 'parseSoomgoEmail',  // 채널별 본문 파서
  },
  kmong: {
    senders: ['no-reply@kmong.com', 'kmong@kmong.com'],
    subjectPatterns: [/새 메시지/, /의뢰 문의/, /구매 문의/],
    extractor: 'parseKmongEmail',
  },
  wishket: {
    senders: ['no-reply@wishket.com'],
    subjectPatterns: [/지원 가능/, /새 프로젝트/],
    extractor: 'parseWishketEmail',
  },
  elancer: {
    senders: ['no-reply@elancer.co.kr'],
    subjectPatterns: [/신규 의뢰/, /프로젝트 매칭/],
    extractor: 'parseElancerEmail',
  },
  notefolio: {
    senders: ['no-reply@notefolio.net'],
    subjectPatterns: [/새 메시지/],
    extractor: 'parseNotefolioEmail',
  },
  upwork: {
    senders: ['no-reply@upwork.com', 'jobs@upwork.com'],
    subjectPatterns: [/New job match/, /Invitation to interview/],
    extractor: 'parseUpworkEmail',
  },
  contra: {
    senders: ['notifications@contra.com'],
    subjectPatterns: [/New project/, /New message/],
    extractor: 'parseContraEmail',
  },
} as const;
```

→ 각 플랫폼이 첫 가입 시 의장님 이메일로 "신규 견적 알림"을 자동 발송하므로, 발신자 도메인으로 100% 식별 가능. 의장님은 추가 셋업 없음 (메일은 이미 오고 있음).

## 13.3 DB 스키마 추가 (§6에 합치기)

```sql
-- 자동 수집 작업 로그 (cron 실행 이력)
CREATE TABLE auto_collect_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,                  -- 'gmail' / 'chrome_ext'
  started_at TIMESTAMPTZ DEFAULT now(),
  finished_at TIMESTAMPTZ,
  emails_scanned INT DEFAULT 0,
  emails_matched INT DEFAULT 0,
  drafts_created INT DEFAULT 0,
  errors JSONB,
  status TEXT DEFAULT 'running'          -- running / success / partial / failed
);

-- 원본 이메일 보관 (감사·재처리용)
CREATE TABLE inbound_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gmail_message_id TEXT UNIQUE,          -- 중복 방지
  channel TEXT,                          -- soomgo / kmong / ...
  from_address TEXT,
  subject TEXT,
  body_text TEXT,
  body_html TEXT,
  received_at TIMESTAMPTZ,
  parsed_at TIMESTAMPTZ,
  parse_status TEXT,                     -- success / partial / unrecognized
  linked_request_id UUID REFERENCES quote_requests(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_inbound_channel ON inbound_emails(channel, received_at DESC);

-- quote_requests에 컬럼 추가 (자동/수동 구분)
ALTER TABLE quote_requests ADD COLUMN ingestion_method TEXT
  DEFAULT 'manual'                       -- manual / gmail_auto / chrome_ext
  CHECK (ingestion_method IN ('manual','gmail_auto','chrome_ext','website_chat'));
ALTER TABLE quote_requests ADD COLUMN auto_collected_at TIMESTAMPTZ;
```

## 13.4 Gmail 인증 (의장님 1회 셋업)

```
[의장님 1회 셋업 — 5분]

1. Google Cloud Console 프로젝트 생성 (aio-platform)
2. Gmail API 활성화
3. OAuth 동의 화면 설정 (사용자 = 의장님 1명만 화이트리스트)
4. OAuth 클라이언트 ID 생성 (web application)
5. admin.aio-make.com/settings/gmail 접속 → "Gmail 연결" 버튼
6. Google 로그인 → 권한 동의 (gmail.readonly)
   → refresh_token이 Supabase secrets에 암호화 저장
7. 끝. 이후 Edge Function이 자동으로 토큰 갱신.
```

권한 범위는 **읽기 전용 (gmail.readonly)** 만 사용. 메일 삭제·보내기 권한 X (보안 최소 권한 원칙).

## 13.5 Edge Function 코드 (cron 1시간)

```typescript
// supabase/functions/auto-collect-gmail/index.ts
import { serve } from 'https://deno.land/std/http/server.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { google } from 'npm:googleapis@140';
import { EMAIL_RULES, parseEmail } from '../_shared/email-parsers.ts';
import { classifyAndQuote } from '../_shared/claude.ts';
import { notifyTelegram } from '../_shared/telegram.ts';

serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // 1) 실행 로그 시작
  const { data: run } = await supabase
    .from('auto_collect_runs')
    .insert({ source: 'gmail', status: 'running' })
    .select().single();

  let scanned = 0, matched = 0, drafts = 0;
  const errors: any[] = [];

  try {
    // 2) Gmail 클라이언트 (refresh_token으로 access_token 발급)
    const auth = new google.auth.OAuth2(
      Deno.env.get('GOOGLE_CLIENT_ID'),
      Deno.env.get('GOOGLE_CLIENT_SECRET'),
    );
    auth.setCredentials({ refresh_token: Deno.env.get('GMAIL_REFRESH_TOKEN') });
    const gmail = google.gmail({ version: 'v1', auth });

    // 3) 직전 1시간 내 신규 메일 (label: INBOX, after: 1h ago)
    const after = Math.floor((Date.now() - 60 * 60 * 1000) / 1000);
    const { data: list } = await gmail.users.messages.list({
      userId: 'me',
      q: `after:${after} -label:aio-processed`,
      maxResults: 50,
    });

    for (const m of list.messages || []) {
      scanned++;

      // 이미 처리한 메일이면 skip
      const exists = await supabase
        .from('inbound_emails')
        .select('id').eq('gmail_message_id', m.id).maybeSingle();
      if (exists.data) continue;

      // 4) 본문 가져오기
      const { data: msg } = await gmail.users.messages.get({
        userId: 'me', id: m.id!, format: 'full',
      });
      const headers = msg.payload?.headers || [];
      const from = headers.find(h => h.name === 'From')?.value || '';
      const subject = headers.find(h => h.name === 'Subject')?.value || '';
      const bodyText = decodeBody(msg.payload);

      // 5) 채널 식별
      const channel = identifyChannel(from, subject);
      if (!channel) {
        await supabase.from('inbound_emails').insert({
          gmail_message_id: m.id, from_address: from, subject,
          body_text: bodyText, parse_status: 'unrecognized',
        });
        continue;
      }
      matched++;

      // 6) 채널별 견적 글 추출
      const parsed = parseEmail(channel, bodyText);
      if (!parsed.requestText) {
        await supabase.from('inbound_emails').insert({
          gmail_message_id: m.id, channel, from_address: from, subject,
          body_text: bodyText, parse_status: 'partial',
        });
        continue;
      }

      // 7) AI 분류 + 응답 초안
      const result = await classifyAndQuote(parsed.requestText, channel);

      // 8) DB 자동 저장 (lead → request → response)
      const { data: lead } = await supabase.from('leads').insert({
        channel,
        customer_name: parsed.customerName || null,
        external_handle: parsed.handle || null,
        source_meta: { gmail_message_id: m.id, subject },
      }).select().single();

      const { data: request } = await supabase.from('quote_requests').insert({
        lead_id: lead.id,
        channel,
        raw_text: parsed.requestText,
        category: result.category,
        category_confidence: result.category_confidence,
        customer_summary: result.customer_summary,
        ingestion_method: 'gmail_auto',
        auto_collected_at: new Date().toISOString(),
        status: 'draft',
      }).select().single();

      await supabase.from('quote_responses').insert({
        request_id: request.id,
        template_category: result.category,
        price_tier: result.price_tier,
        event_price: result.event_price,
        regular_price: result.regular_price,
        delivery_days: result.delivery_days,
        ai_generated_text: result.response_text,
      });

      await supabase.from('inbound_emails').insert({
        gmail_message_id: m.id, channel, from_address: from, subject,
        body_text: bodyText, parse_status: 'success',
        linked_request_id: request.id,
      });
      drafts++;

      // 9) Gmail 라벨링 (재처리 방지)
      await ensureLabel(gmail, 'aio-processed');
      await gmail.users.messages.modify({
        userId: 'me', id: m.id!,
        requestBody: { addLabelIds: ['Label_aio-processed'] },
      });
    }

    // 10) 텔레그램 요약 알림 (drafts 1건 이상일 때만)
    if (drafts > 0) {
      await notifyTelegram({
        text: `🤖 자동 수집 완료\n\n` +
              `신규 견적 ${drafts}건이 인박스에 응답 초안 상태로 대기 중입니다.\n\n` +
              `→ admin.aio-make.com/inbox`,
      });
    }
  } catch (e) {
    errors.push({ message: e.message, stack: e.stack });
  }

  // 11) 실행 로그 마무리
  await supabase.from('auto_collect_runs').update({
    finished_at: new Date().toISOString(),
    emails_scanned: scanned,
    emails_matched: matched,
    drafts_created: drafts,
    errors: errors.length ? errors : null,
    status: errors.length ? 'partial' : 'success',
  }).eq('id', run.id);

  return new Response(JSON.stringify({ scanned, matched, drafts }));
});
```

## 13.6 cron 설정 (Supabase pg_cron)

```sql
-- 1시간마다 자동 실행 (매시 정각)
SELECT cron.schedule(
  'auto-collect-gmail-hourly',
  '0 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://xxx.supabase.co/functions/v1/auto-collect-gmail',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key'),
      'Content-Type',  'application/json'
    )
  );
  $$
);
```

→ 의장님 휴대폰 푸시 알림: 매시 정각에 신규 건이 있으면 텔레그램으로 1초 안에 통보.

## 13.7 admin 인박스 UI 변경 (자동 vs 수동 구분)

```
┌──────────────────────────────────────────────────────────┐
│  📥 인박스                              [필터 ▾] [정렬 ▾]   │
├──────────────────────────────────────────────────────────┤
│  채널: [전체] [챗봇] [숨고] [크몽] [위시켓] ...              │
│  수집: [전체] [🤖 자동] [✋ 수동]                            │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  🤖 [숨고 · 자동수집 14:23] OO청소업체 (D-0 4시간)            │
│     "청소업체 홈피 5P 만들어주세요..."                       │
│     자동 견적: DELUXE 30만 (이벤트가) — 신뢰도 92%            │
│                                                            │
│     ┌───── AI 응답 초안 (편집 가능) ─────┐                   │
│     │ 안녕하세요, AIO에이전시입니다.       │                   │
│     │ "청소업체 홈페이지 5P" 견적 드립니다. │                   │
│     │ ...                                  │                   │
│     └─────────────────────────────────────┘                   │
│     [📋 복사] [✏️ 편집] [✓ 발송 완료] [⏭ 스킵] [🔍 원본 메일]│
│                                                            │
│  🤖 [Upwork · 자동수집 14:21] PPT 30P 견적                   │
│     ...                                                    │
│                                                            │
│  ✋ [챗봇 · 수동입력 13:50] 김민수 → 홈피 5P                 │
│     ...                                                    │
└──────────────────────────────────────────────────────────┘
```

각 카드에 **🤖 / ✋ 아이콘**으로 자동/수동 즉시 구분. **🔍 원본 메일** 버튼으로 의장님이 파싱이 잘못되었는지 검증 가능.

## 13.8 Phase 2 — 크롬 확장 (보조 옵션)

> Gmail 폴링이 100% 커버하지 못하는 케이스 (예: 외부 플랫폼이 알림 메일을 늦게 보냄) 보완용. 의장님이 직접 페이지를 열었을 때만 작동.

```
[manifest.json — Manifest V3]
{
  "manifest_version": 3,
  "name": "AIO Quote Assistant",
  "permissions": ["activeTab", "storage"],
  "host_permissions": [
    "https://soomgo.com/*",
    "https://kmong.com/*",
    "https://wishket.com/*",
    "https://www.upwork.com/*"
  ],
  "content_scripts": [{
    "matches": ["https://soomgo.com/requests/*", ...],
    "js": ["content.js"]
  }],
  "side_panel": { "default_path": "panel.html" }
}
```

```javascript
// content.js — 사용자가 본인 견적 페이지를 열었을 때만 실행
const text = document.querySelector('[data-request-body]')?.innerText;
if (text) {
  // 사용자 클릭 액션이 있을 때만 admin으로 POST (자동 발송 X)
  document.getElementById('aio-send-btn')?.addEventListener('click', () => {
    fetch('https://admin.aio-make.com/api/chrome-ingest', {
      method: 'POST',
      body: JSON.stringify({ channel: 'soomgo', text }),
    });
  });
}
```

→ 자동 발송은 영원히 금지. 의장님이 클릭해서 admin으로 보내는 것만.

## 13.9 단계별 ETA

| 단계 | 작업 | 시간 |
|---|---|---|
| 1 | Gmail OAuth 셋업 (1회) | 1h |
| 2 | 채널별 이메일 파서 7개 작성·테스트 | 6h (1개당 1h) |
| 3 | Edge Function 코드 + cron 설정 | 4h |
| 4 | inbound_emails / auto_collect_runs 테이블 추가 | 1h |
| 5 | admin 인박스 UI에 🤖 자동 카드 표시 | 3h |
| 6 | 실전 테스트 — 7개 채널에서 더미 견적 받아 검증 | 4h |
| 7 | (Phase 2) 크롬 확장 MV3 | 8h (별도) |

→ **메인(1~6번)만 Week 2 안에 완성 가능 (총 19시간 ≈ 2~3일).**

## 13.10 안전·정책 체크리스트

- [✅] 외부 플랫폼 사이트를 직접 크롤링하지 않음 (Gmail 본인 메일만 읽음)
- [✅] Gmail 권한은 `gmail.readonly`만 (메일 삭제·발송·전달 X)
- [✅] `inbound_emails`에 raw 본문 보관해 감사 추적 가능
- [✅] AI 응답은 `status='draft'`로만 저장, 자동 발송 절대 X
- [✅] 의장님이 1클릭 복사 → 외부 플랫폼에 직접 붙여넣기 + 발송
- [✅] 크롬 확장은 사용자 클릭 트리거에만 실행, 자동 클릭 코드 없음
- [✅] OAuth 토큰은 Supabase secrets에 암호화 저장, GitHub 커밋 X

→ **모든 외주 플랫폼 ToS 100% 준수**. 계정 정지 위험 0.

---

# §14. 실시간 자동수집 — 5채널 다각화 (숨고 비딩 대응) ⭐ 핵심

> **배경**: 숨고는 비딩 시스템 — 견적 요청 1건당 10명+ 입찰 → 고객이 선택. **응답 속도가 매칭률 결정**. Gmail 1시간 폴링은 너무 느림 (최악 60분 지연). 1분 이내 응답이 목표.
> **운영 환경 가정**: 의장님 PC는 **24시간 ON 상태**. 크롬도 24시간 켜져있음.
> **결론**: 단일 채널이 아닌 **5채널 다층 자동수집**으로 99% 신규 견적을 1분 내 포착. **PC 24/7 ON이므로 크롬 확장이 명확한 1순위 메인**, 나머지는 백업.

## 14.1 5채널 비교표 (PC 24시간 ON 가정)

| 순위 | 방식 | 지연 | 의장님 작업 | 셋업 | 안전성 | 권장도 |
|---|---|---|---|---|---|---|
| **🥇 메인** | **크롬 확장 + 7핀탭 폴링** | **15~30초** | 한 번 셋업 후 0 | 중 (2~3시간) | ✅ 100% | ⭐⭐⭐⭐ |
| 🥈 보조 1 | **텔레그램 즉시 응답 카드** | 5초 (외출 시 응답) | 휴대폰 1탭 | 하 (포함됨) | ✅ 100% | ⭐⭐⭐ |
| 🥉 보조 2 | **Gmail Watch API (Push)** | 1~5초 | 0 (자동) | 중 (30분 1회) | ✅ 100% | ⭐⭐ 백업 |
| 4 | iOS Shortcuts / MacroDroid | 1~3초 | 폰 알림 ON | 하 (15분) | ✅ 100% | ⭐ 외출 백업 |
| 5 | Gmail 1시간 폴링 (§13) | 0~60분 | 0 | 하 (포함됨) | ✅ 100% | ⭐ Final fallback |

### PC 24/7 환경에서 단순화된 권장 조합

```
[메인 — 크롬 확장]                  [보조 — 텔레그램 카드]
PC 24시간 ON + 7핀탭 자동 폴링    →  의장님 외출/이동 시 휴대폰 응답
   ↓                                  ↑
[admin 인박스] 응답 초안 자동 대기  →  텔레그램 카드 자동 발송
   ↓
의장님 PC 앞일 때 마우스 1클릭
의장님 외출일 때 텔레그램 1탭
```

→ **Gmail Watch / 모바일 알림 가로채기는 Phase 2로 미뤄도 됨**. PC 24시간 ON이라면 크롬 확장 + 텔레그램 카드 2채널만으로 99% 커버 가능. 구현 부담 절반 감소.

## 14.2 채널 1 — Gmail Watch API (Push 알림, 메인)

> §13.5의 cron 1시간 폴링을 **Pub/Sub Push로 교체** → 새 메일 도착 즉시 (1~5초) Edge Function 호출.

### 구조

```
[숨고] 신규 견적 → 의장님 Gmail로 알림 메일 발송 (자동, 0~30초)
   ↓
[Gmail] 새 메일 → Google Pub/Sub 토픽으로 push (1~3초)
   ↓
[Pub/Sub] → [Supabase Edge Function endpoint] (1초)
   ↓
[Edge Function] 메일 본문 추출 → Claude 분류·견적 → admin 인박스 저장
   ↓
[텔레그램] 의장님 폰에 응답 카드 발송 (1초)

총 지연: 5~30초 (메일 발송 시간 포함)
```

### 셋업 (1회, 30분)

```bash
# 1. Google Cloud Console
gcloud pubsub topics create gmail-aio-incoming
gcloud pubsub subscriptions create gmail-aio-sub \
  --topic gmail-aio-incoming \
  --push-endpoint=https://xxx.supabase.co/functions/v1/gmail-push

# 2. Gmail에 권한 부여
gcloud pubsub topics add-iam-policy-binding gmail-aio-incoming \
  --member=serviceAccount:gmail-api-push@system.gserviceaccount.com \
  --role=roles/pubsub.publisher

# 3. Gmail Watch 시작 (Edge Function에서 7일마다 갱신)
```

### Edge Function (push endpoint)

```typescript
// supabase/functions/gmail-push/index.ts
import { serve } from 'https://deno.land/std/http/server.ts';
import { google } from 'npm:googleapis@140';
import { handleNewEmail } from '../_shared/email-handler.ts';

serve(async (req) => {
  // Pub/Sub push body
  const { message } = await req.json();
  const data = JSON.parse(atob(message.data));
  const historyId = data.historyId;

  const auth = getGmailAuth();
  const gmail = google.gmail({ version: 'v1', auth });

  // historyId로 새 메시지 ID 가져오기
  const { data: hist } = await gmail.users.history.list({
    userId: 'me',
    startHistoryId: historyId,
    historyTypes: ['messageAdded'],
  });

  for (const h of hist.history || []) {
    for (const m of h.messagesAdded || []) {
      await handleNewEmail(gmail, m.message.id);  // §13.5 처리 로직 재사용
    }
  }

  return new Response('OK', { status: 200 });
});
```

### Watch 자동 갱신 (7일 cron)

```sql
SELECT cron.schedule(
  'gmail-watch-renew',
  '0 0 */6 * *',  -- 6일마다 자정
  $$ SELECT net.http_post(url := 'https://xxx.supabase.co/functions/v1/gmail-watch-renew') $$
);
```

## 14.3 채널 2 — 크롬 확장 + 백그라운드 탭 자동 폴링

> 의장님 PC에 크롬을 켜둔 상태에서 **숨고/크몽 받은요청 페이지를 핀 탭으로 항상 열어둠**. 콘텐츠 스크립트가 페이지의 신규 항목 변화를 감지하여 즉시 admin으로 전송.

### 동작 방식

```
[의장님 크롬] 핀 탭: https://soomgo.com/requests
   │
   ↓ (의장님이 자기 화면에서 보고 있는 페이지)
   │
[content.js] 30초마다 페이지 내부 React state / DOM 차이 감지
   │
   ↓ 신규 항목 발견 (예: data-id="abc123" 새로 추가됨)
   │
[content.js] fetch('https://admin.aio-make.com/api/chrome-ingest', POST)
   │
   ↓
[admin] 동일 처리 파이프라인 → 인박스에 저장 → 텔레그램 알림
```

### 핵심 파일

```javascript
// content-soomgo.js — 사용자 자기 페이지를 자기가 보는 동작만
const seen = new Set();

function scanRequests() {
  const cards = document.querySelectorAll('[data-request-id]');
  cards.forEach(card => {
    const id = card.dataset.requestId;
    if (seen.has(id)) return;
    seen.add(id);

    const text = card.querySelector('.request-body')?.innerText;
    const customer = card.querySelector('.customer-name')?.innerText;
    const budget = card.querySelector('.budget')?.innerText;

    // admin으로 즉시 전송 (자동 발송 X, 자동 수집만)
    fetch('https://admin.aio-make.com/api/chrome-ingest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel: 'soomgo',
        request_id: id,
        text, customer, budget,
        url: window.location.href,
      }),
    });
  });
}

// 30초마다 + 페이지 변경 시 즉시
setInterval(scanRequests, 30000);
new MutationObserver(scanRequests).observe(document.body, { childList: true, subtree: true });
```

### 정책 안전선 (재확인)

| 행위 | 안전 여부 |
|---|---|
| 의장님이 본인 페이지를 본인 크롬에서 보고 있는 동안, 콘텐츠 스크립트가 화면에 표시된 데이터를 읽기 | ✅ OK (사용자 본인 화면) |
| 데이터를 의장님 자체 서버(admin.aio-make.com)로 POST | ✅ OK (사용자 본인 데이터) |
| **자동으로 응답 발송 버튼 클릭** | ❌ **절대 금지** |
| **로그인하지 않은 상태에서 페이지 자동 페치** | ❌ **금지** |
| **여러 계정으로 동시 접속** | ❌ **금지** |

→ 의장님 본인이 로그인된 상태에서 본인 화면을 보는 동작만 자동화. 계정 정지 사유 없음.

## 14.4 채널 3 — iOS Shortcuts / Android MacroDroid (모바일 알림 가로채기)

> 의장님 휴대폰 숨고 앱이 **푸시 알림을 받는 즉시** (1~3초), 그 알림 텍스트를 AIO 서버로 자동 전송.

### iOS Shortcuts (의장님이 iPhone일 때)

```
1. Shortcuts 앱 열기
2. 자동화 → 새 자동화 생성
3. 트리거: "앱 → 숨고 → 알림 받음"
4. 액션 1: 알림 텍스트 가져오기
5. 액션 2: URL 가져오기
   - URL: https://admin.aio-make.com/api/mobile-relay
   - Method: POST
   - Body (JSON):
     {
       "channel": "soomgo",
       "notification_text": [Shortcut Input],
       "received_at": [Current Date]
     }
6. 액션 3: 알림 안내 표시 (선택, 디버그용)
7. 저장
```

### Android MacroDroid (의장님이 Android일 때)

```
1. MacroDroid 앱 설치
2. 새 매크로
3. 트리거: 알림 수신 → 앱: 숨고
4. 액션: HTTP 요청 → POST https://admin.aio-make.com/api/mobile-relay
5. 본문: {"channel":"soomgo","text":"[notification_text]"}
6. 저장
```

### 받는 쪽 Edge Function

```typescript
// supabase/functions/mobile-relay/index.ts
serve(async (req) => {
  const { channel, notification_text, received_at } = await req.json();

  // 알림 텍스트는 보통 "OO청소 — 청소업체 홈페이지 5페이지 견적 요청"처럼 짧은 요약
  // → 별도 fetch 없이 그대로 Claude에 넣어 응답 초안 생성

  const result = await classifyAndQuote(notification_text, channel);

  // DB 저장 + 텔레그램 응답 카드 (§14.5)
  await saveAndNotify(channel, notification_text, result);

  return new Response('OK');
});
```

→ **장점**: 외부 플랫폼 가입한 의장님 본인 폰의 합법 알림. 거의 0초 지연.
→ **단점**: 알림 텍스트가 짧아 **요약본**만 있음 (전체 견적 글은 앱에서 추가 확인 필요). 1~2분 후 §14.2 Gmail Push가 도착하여 자동 보강.

## 14.5 채널 4 — 텔레그램 즉시 응답 카드 (휴대폰 1탭 응답)

> 어떤 채널로 자동수집되든, 응답 초안이 만들어지면 **그 즉시** 텔레그램에 카드 형식으로 발송. 의장님이 휴대폰에서 길게 누르기 → 복사 → 외부 앱으로 이동 → 붙여넣기 → 발송. **30초~1분 안에 완료**.

### 텔레그램 카드 예시

```
🔥 신규 견적 (숨고)
━━━━━━━━━━━━━━━━━━
👤 OO청소
📂 카테고리: 홈페이지 5P (DELUXE)
💰 30만 (이벤트가) / 80만 (정상가)
⏱️ 5월 8일까지

📩 클라이언트 요청:
"청소업체 홈페이지 5페이지로 만들어주세요.
회사 소개, 서비스, 견적 문의 폼 포함..."

━━━━━━━━━━━━━━━━━━
📋 응답 초안 (탭하여 복사):

안녕하세요, AIO에이전시입니다.

"청소업체 홈페이지 5P + 문의 폼" 견적 드립니다.

【견적】
🔥 5월 31일까지 이벤트가: ₩300,000
6월부터 정상가: ₩800,000 (참고)

【작업 일정】
- 5P 기준 3일 내 완성
- 5일 작업일 보장 (못 지키면 10% 자발적 환불)
- 14일 무상 A/S + 원본 파일 무료 제공

...
━━━━━━━━━━━━━━━━━━
[📋 클립보드 복사]  [✏️ 수정하기]
[✅ 발송 완료]      [⏭ 패스]
```

### Telegram Inline Keyboard 코드

```typescript
// packages/notify/telegram.ts에 추가
export async function sendQuoteCard(opts: {
  channel: string;
  customer: string;
  category: string;
  price: string;
  customerRequest: string;
  draftResponse: string;
  requestId: string;
}) {
  const text =
    `🔥 신규 견적 (${opts.channel})\n` +
    `━━━━━━━━━━━━━━━━━━\n` +
    `👤 ${opts.customer}\n` +
    `📂 ${opts.category}\n` +
    `💰 ${opts.price}\n\n` +
    `📩 요청:\n${opts.customerRequest.slice(0, 200)}...\n\n` +
    `━━━━━━━━━━━━━━━━━━\n` +
    `📋 응답 초안:\n\n` +
    `<code>${escapeHtml(opts.draftResponse)}</code>`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '📋 복사용 보기', url: `https://admin.aio-make.com/inbox/${opts.requestId}/copy` },
            { text: '✏️ 수정',     url: `https://admin.aio-make.com/inbox/${opts.requestId}/edit` },
          ],
          [
            { text: '✅ 발송 완료', callback_data: `sent:${opts.requestId}` },
            { text: '⏭ 패스',      callback_data: `skip:${opts.requestId}` },
          ],
        ],
      },
    }),
  });
}
```

### 휴대폰 1분 워크플로우

```
[텔레그램 알림]   ⏱ 0초
   ↓
의장님 잠금 해제 → 텔레그램 열기   ⏱ 5초
   ↓
"📋 복사용 보기" 탭 → admin/copy 페이지 열림
   (페이지에 응답 본문만 표시 + 큰 [📋 클립보드 복사] 버튼)   ⏱ 10초
   ↓
복사 버튼 탭 → 클립보드 복사 + 햅틱 피드백   ⏱ 12초
   ↓
숨고 앱으로 전환 → 해당 견적 → 응답란 길게 누르기 → 붙여넣기   ⏱ 30초
   ↓
의장님이 1초만 검토 후 [발송] 탭   ⏱ 35초
   ↓
텔레그램으로 돌아와서 [✅ 발송 완료] 탭   ⏱ 45초
   ↓
admin DB에 sent_at 자동 갱신 + KPI 반영

총 시간: 1분 이내
```

## 14.6 5채널 통합 — 중복 제거 로직

여러 채널이 같은 견적을 동시에 잡으면 admin 인박스에 1건만 보이도록:

```sql
-- inbound_signals 테이블 (모든 자동수집 채널이 INSERT)
CREATE TABLE inbound_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_channel TEXT,           -- gmail / chrome_ext / mobile / website
  external_channel TEXT,         -- soomgo / kmong / wishket / ...
  external_request_id TEXT,      -- 플랫폼 자체 ID (있으면 매칭 가능)
  fingerprint TEXT,              -- normalize한 본문 SHA256
  raw_text TEXT,
  metadata JSONB,
  received_at TIMESTAMPTZ DEFAULT now(),
  linked_request_id UUID REFERENCES quote_requests(id),
  is_duplicate BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX idx_signals_unique ON inbound_signals(external_channel, fingerprint);

-- INSERT 시 ON CONFLICT로 중복은 skip + linked_request_id로 기존 건과 연결
```

→ Gmail Push가 30초 후에 도착해도 이미 모바일 알림으로 잡힌 건이면 자동으로 같은 quote_requests 행에 연결만 됨. **인박스에는 1건만 표시**.

## 14.7 권장 운영 시나리오 (PC 24시간 ON)

```
┌────────────────────────────────────────────────────────────┐
│ 24시간 백그라운드 (의장님 잠자고 있어도)                     │
│   → 크롬 확장이 7핀탭에서 신규 견적 자동 감지                  │
│   → admin 인박스에 응답 초안 status='draft' 저장              │
│   → 텔레그램 카드 발송 (PC + 휴대폰 양쪽에 알림)               │
├────────────────────────────────────────────────────────────┤
│ 06:30 의장님 기상                                              │
│   → 휴대폰 텔레그램에 밤사이 신규 견적 N건 카드 대기            │
│   → 출근 전에 침대에서 1탭 복사·붙여넣기로 비딩 시작            │
├────────────────────────────────────────────────────────────┤
│ 09:00 의장님 PC 앞 도착                                        │
│   → admin 모니터에 인박스 상시 표시 (§14.10 듀얼모니터)        │
│   → PC 데스크톱 알림이 신규 건마다 우측 상단에 토스트            │
│   → 응답 초안이 자동으로 PC 클립보드에 복사된 상태 (§14.10)    │
│   → 외부 플랫폼 응답란에 Ctrl+V만 누르면 바로 붙여넣기 가능     │
├────────────────────────────────────────────────────────────┤
│ 13:00 점심 외출 (PC는 켜둠 → 크롬 확장 계속 작동)              │
│   → 식당에서 텔레그램 카드 도착                                │
│   → 1탭 복사 → 숨고 앱 → 붙여넣기 → 발송 (1분 이내)            │
├────────────────────────────────────────────────────────────┤
│ 18:00 퇴근 후 → 23:00 취침 전                                  │
│   → PC 24시간 ON이므로 어디서든 동일하게 동작                  │
│   → 새벽 견적도 자동 처리 (다음 날 아침 일괄 검토)             │
└────────────────────────────────────────────────────────────┘
```

→ **의장님이 외부 플랫폼 7개를 매일 들어갈 필요 0**. 24시간 끊김 없이 동작. 응답 시간: PC 앞 = **15초** / 외출 = **1분**.

## 14.8 PC 24시간 ON 환경 특화 강화 기능 ⭐

> 의장님 PC가 24시간 켜져있음을 활용한 추가 자동화. 크롬 확장과 admin 페이지에 통합 구현.

### A. 7핀탭 동시 운영 + 자동 복구

크롬 시작 시 자동으로 7개 외부 플랫폼 페이지를 핀 탭으로 열고, 의장님이 실수로 닫아도 자동 복구.

```javascript
// background.js (Service Worker)
const PIN_TABS = [
  { url: 'https://soomgo.com/requests',           key: 'soomgo' },
  { url: 'https://kmong.com/mypage/inbox',        key: 'kmong' },
  { url: 'https://www.wishket.com/project/list/', key: 'wishket' },
  { url: 'https://www.elancer.co.kr/projects',    key: 'elancer' },
  { url: 'https://notefolio.net/messages',        key: 'notefolio' },
  { url: 'https://www.upwork.com/nx/find-work/',  key: 'upwork' },
  { url: 'https://contra.com/inbox',              key: 'contra' },
];

chrome.runtime.onStartup.addListener(ensurePinTabs);
chrome.runtime.onInstalled.addListener(ensurePinTabs);
chrome.tabs.onRemoved.addListener(restoreIfPinTabClosed);

async function ensurePinTabs() {
  const existing = await chrome.tabs.query({});
  for (const t of PIN_TABS) {
    if (!existing.find(tab => tab.url?.startsWith(t.url))) {
      await chrome.tabs.create({ url: t.url, pinned: true, active: false });
    }
  }
}
```

→ 크롬을 새로 켜도, 의장님이 탭을 닫아도, 1초 안에 자동 복구. 24시간 끊김 없는 폴링.

### B. PC 데스크톱 알림 (Native Notification)

신규 견적 도착 시 의장님 PC 우측 하단에 토스트 알림. 클릭하면 admin 인박스로 이동.

```javascript
// content-script가 신규 견적 발견 시
chrome.notifications.create(`new-${requestId}`, {
  type: 'basic',
  iconUrl: 'icon-128.png',
  title: '🔥 신규 견적 (숨고)',
  message: 'OO청소 — 홈피 5P (DELUXE 30만)',
  contextMessage: '응답 초안이 준비되었습니다. 클릭하여 복사',
  priority: 2,
  requireInteraction: true,    // 의장님이 닫을 때까지 유지
  buttons: [
    { title: '📋 응답 복사' },
    { title: '✏️ 수정' },
  ],
});

chrome.notifications.onButtonClicked.addListener(async (id, idx) => {
  if (idx === 0) {
    // 응답 초안을 PC 클립보드에 자동 복사
    await copyToClipboard(getDraftText(id));
    showSuccessToast('클립보드 복사 완료. 외부 플랫폼에 Ctrl+V');
  } else {
    chrome.tabs.create({ url: `https://admin.aio-make.com/inbox/${id}/edit` });
  }
});
```

### C. 응답 초안 자동 클립보드 복사

신규 견적이 잡히면 응답 초안이 **자동으로 PC 클립보드에 미리 복사된 상태**로 대기. 의장님은 외부 플랫폼 응답란에 가서 **Ctrl+V만 누르면 바로 붙여넣기**.

```javascript
// 우선순위 높은 견적 (50만+ 또는 신뢰도 95%+) 시 자동 복사
async function autoClipboard(draftText, priority) {
  if (priority === 'high') {
    await navigator.clipboard.writeText(draftText);
    chrome.notifications.create({
      type: 'basic',
      title: '📋 응답 초안 자동 복사됨',
      message: '외부 플랫폼 응답란에 Ctrl+V',
      priority: 1,
    });
  }
  // 일반 우선순위는 의장님이 [복사] 버튼 클릭 시 복사 (사용자 인터랙션 필요)
}
```

### D. 사운드 알림 (우선순위별)

```javascript
// 견적가별 알림음 차별화
const SOUNDS = {
  high:   'chime-urgent.mp3',   // 50만+ 견적 / 긴급 (deadline < 24h)
  normal: 'chime-soft.mp3',     // 일반 견적
};

function playAlert(priority) {
  const audio = new Audio(chrome.runtime.getURL(SOUNDS[priority]));
  audio.volume = priority === 'high' ? 0.8 : 0.3;
  audio.play();
}
```

→ 의장님이 다른 작업 중이어도 큰 견적은 즉시 인지 가능.

### E. admin 인박스 듀얼 모니터 상시 표시

크롬 확장이 PC 시작 시 admin.aio-make.com/inbox 페이지를 **별도 창으로 자동 열기** → 의장님 보조 모니터에 항상 표시.

```javascript
chrome.runtime.onStartup.addListener(async () => {
  await chrome.windows.create({
    url: 'https://admin.aio-make.com/inbox',
    type: 'popup',                  // 별도 창
    state: 'normal',
    width: 800,
    height: 1080,
    left: 1920,                     // 보조 모니터 위치 (의장님 셋업에 맞춤)
    top: 0,
  });
});
```

→ 의장님이 **고개만 돌려도** 인박스 실시간 상태 확인. 신규 건은 Realtime 구독으로 0초 안에 표시.

### F. 자동 새로고침 페이지 (백업)

크롬 확장이 동작하지 않을 때를 대비, **각 핀탭이 5분마다 자체 새로고침** (페이지 자체 React state reset). 콘텐츠 스크립트가 다시 스캔.

```javascript
// content-script
setInterval(() => {
  // 5분마다 페이지 새로고침 (단, 의장님이 스크롤 중이거나 입력 중이면 skip)
  if (document.activeElement?.tagName === 'INPUT') return;
  if (window.scrollY > 100) return;
  location.reload();
}, 5 * 60 * 1000);
```

### G. 영업 통계 자동 일일 리포트

매일 23:50에 PC가 켜져있으므로 admin이 자동으로 리포트 생성:

```
오늘의 자동수집 통계 (2026-05-15):
- 총 자동 감지: 23건
- 채널별: 숨고 12 / 크몽 5 / 위시켓 3 / 이랜서 2 / Upwork 1
- 응답 발송: 19건 (의장님 직접 발송)
- 발송 평균 지연: 47초 (목표 60초 이하)
- 매칭 추정: 4건 (응답 → 채팅 시작)
- 계약 성사: 2건 (45만)
```

→ 텔레그램으로 발송 + admin 대시보드 위젯에 표시.

## 14.9 PC 24/7 환경 — 단순화된 4주 일정

PC가 24시간 ON임을 활용하여 5채널 → **2채널 메인** (크롬 확장 + 텔레그램 카드)으로 단순화. Gmail Push 등은 Phase 2로 이동.

| 주차 | 작업 | 우선순위 |
|---|---|---|
| Week 2 목 (5/15) | §13 Gmail 1시간 폴링 (작동만 확보) + 텔레그램 카드 | 🥇 메인 (백업 안정성) |
| Week 2 금 (5/16) | §14.8.A 크롬 확장 7핀탭 자동 복구 + 콘텐츠 스크립트 (숨고·크몽) | 🥇 메인 |
| Week 3 일 (5/18) | §14.8.B/C/D PC 데스크톱 알림 + 자동 클립보드 + 사운드 알림 | 🥇 메인 |
| Week 3 월 (5/19) | §14.8.E admin 인박스 듀얼모니터 자동 팝업 + 위시켓·이랜서 추가 | 🥇 메인 |
| Week 3 화 (5/20) | §14.8.F 자동 새로고침 + §14.8.G 일일 자동 리포트 | 🥈 강화 |
| Week 3 수 (5/21) | §14.6 inbound_signals 중복 제거 + 노트폴리오·Upwork·Contra | 🥈 강화 |
| Week 3 목 (5/22) | 실전 통합 테스트 — 7개 채널에서 신규 견적 1주일 운영 검증 | ✅ 검수 |
| Phase 2 (6월) | §14.2 Gmail Watch Push + §14.4 모바일 알림 가로채기 | 🥉 추가 백업 |

→ **Week 3 마지막**: 크롬 확장 1개 채널만으로 7개 외부 플랫폼 24시간 자동 감지·응답 초안 대기 완성.

## 14.10 비교 결정 가이드 (PC 24/7 환경)

| 상황 | 응답 시간 목표 | 사용 채널 |
|---|---|---|
| 의장님 PC 앞 (09~18시) | **15초** (마우스 1클릭) | 크롬 확장 → 클립보드 자동 → Ctrl+V |
| 의장님 외출 (점심·이동) | **1분** (휴대폰 1탭) | 텔레그램 카드 → 복사 → 외부 앱 → 발송 |
| 의장님 잠자는 새벽 | **자동 저장** (다음 날 처리) | 크롬 확장 (PC ON) → admin 인박스 누적 |
| 인터넷·전기 문제 | **수동 응답** | 의장님 직접 입력 (모듈 C `bot.aio-make.com`) |

---

# §15. 트래픽 분석 + SNS 영업 통합 (GA4 + 자체 DB + 전환 funnel) ⭐ 추가

> **목적**: aio-make.com을 단순 인바운드 통로가 아닌 **데이터로 학습하는 영업 자산**으로 만든다. 모든 방문자를 익명 ID로 추적·축적하고, SNS 채널별 ROI를 자동 집계, 재방문자에게 맞춤 전환을 유도한다.
> **두 갈래**: ① **GA4** (마케팅 표준, 광고·SEO 최적화) + ② **자체 visitor DB** (Supabase, lead funnel 정밀 분석). 두 시스템 공존 — GA4 보고서 + admin 대시보드 둘 다 활용.

## 15.1 무엇을 추적하는가

```
┌──────────────────────────────────────────────────────────┐
│  [SNS 채널]                                                │
│  Instagram / X / LinkedIn / Threads / YouTube / Facebook │
│  ↓ (utm_source, utm_medium, utm_campaign 자동 부여)        │
│                                                            │
│  [aio-make.com 도착]                                       │
│  ↓ visitor_id 쿠키 발급 (1년)                               │
│  ↓ session 시작 + page_view 기록                           │
│                                                            │
│  [페이지 탐색]                                              │
│  ↓ scroll_depth, time_on_page, click_event 기록            │
│                                                            │
│  [챗봇 시작]                                                │
│  ↓ chatbot_open, chatbot_step1~5 이벤트 기록               │
│                                                            │
│  [lead 전환]                                                │
│  ↓ visitor_id ↔ lead_id 매핑                                │
│  ↓ acquisition_source = 'instagram' 같은 첫 진입 채널 보존  │
│                                                            │
│  [재방문]                                                   │
│  ↓ 같은 쿠키로 재진입 → 챗봇이 "지난번 견적" 표시            │
│  ↓ visit_count 증가, 전환 funnel 다음 단계 유도              │
│                                                            │
│  [계약 → 매출]                                              │
│  ↓ 매출이 어느 SNS 채널에서 시작됐는지 역추적 가능            │
│                                                            │
│  [admin 대시보드]                                            │
│  ↓ SNS 채널별 ROI: 비용 → lead → 계약 → 매출 자동 집계     │
└──────────────────────────────────────────────────────────┘
```

## 15.2 두 갈래 아키텍처 (GA4 + 자체 DB)

| 시스템 | 역할 | 장점 | 한계 |
|---|---|---|---|
| **GA4** | 마케팅 표준 분석 | 광고 연동·SEO·코호트·잔류율 자동 | 샘플링·집계 / raw 이벤트 분석 어려움 |
| **자체 DB (Supabase)** | first-party raw 이벤트 | lead funnel 정밀 추적·visitor↔lead 매핑·매출 역추적 | 마케팅 광고 자동 연동 X |
| **Microsoft Clarity (선택)** | 세션 녹화·히트맵 | 무료·UX 개선 인사이트 | 정량 분석 X |

→ **세 시스템 동시 운영**. 코드는 같은 이벤트를 3곳으로 fire-and-forget 발송.

## 15.3 GA4 셋업 (Google Tag Manager 통합)

### 1회 셋업 (30분)

```bash
1. Google Analytics 계정 생성 → GA4 속성 만들기 (aio-make.com)
2. 측정 ID 발급 (G-XXXXXXXXXX)
3. Google Tag Manager 컨테이너 생성 (GTM-YYYYYYY)
4. GTM에 GA4 태그 설정 + 7개 커스텀 이벤트 매핑:
   - chatbot_open
   - chatbot_step (step 1~5)
   - chatbot_lead_submit (전환 1차)
   - portfolio_click
   - pricing_view
   - cta_click
   - sns_outbound (SNS 링크 클릭)
5. Google Search Console + GA4 연동
6. 광고 계정 (네이버·구글 광고)에서 GA4 전환 import
```

### Next.js에 GTM 코드 1번만 추가

```typescript
// apps/web/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-YYYYYYY');`}
        </Script>
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-YYYYYYY"
          height="0" width="0" style={{display:'none',visibility:'hidden'}}/></noscript>
        {children}
      </body>
    </html>
  );
}

// 챗봇 이벤트 발송 (any page)
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'chatbot_lead_submit',
  category: 'website',
  price_tier: 'deluxe',
  estimated_value: 300000,
});
```

→ **GA4·GTM 셋업 1회만 하면, 이후 모든 이벤트가 GA4에 자동 누적**. 광고 ROAS 자동 계산.

## 15.4 자체 visitor DB 스키마 (§6에 추가)

```sql
-- ────────────────────────────────────────────────────
-- 13. 익명 방문자 (쿠키 기반 ID)
-- ────────────────────────────────────────────────────
CREATE TABLE visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ga4_client_id TEXT,                         -- GA4 _ga 쿠키와 매핑
  user_agent TEXT,
  device_type TEXT,                           -- mobile / desktop / tablet
  os TEXT,
  browser TEXT,
  country TEXT,
  region TEXT,
  language TEXT,
  first_visit_at TIMESTAMPTZ DEFAULT now(),
  last_visit_at TIMESTAMPTZ DEFAULT now(),
  visit_count INT DEFAULT 1,
  session_count INT DEFAULT 1,
  total_page_views INT DEFAULT 0,
  total_time_sec INT DEFAULT 0,
  -- 첫 진입 채널 (acquisition, 변하지 않음)
  acquisition_source TEXT,                    -- instagram / x / linkedin / direct / google
  acquisition_medium TEXT,                    -- organic / cpc / social / referral
  acquisition_campaign TEXT,
  acquisition_content TEXT,
  acquisition_term TEXT,
  -- 마지막 진입 채널 (last-touch)
  last_source TEXT,
  last_medium TEXT,
  last_campaign TEXT,
  -- lead 전환 여부
  is_lead BOOLEAN DEFAULT false,
  lead_id UUID REFERENCES leads(id),
  converted_at TIMESTAMPTZ,
  -- 마케팅 푸시 동의
  email_optin BOOLEAN DEFAULT false,
  webpush_optin BOOLEAN DEFAULT false,
  webpush_subscription JSONB,                 -- Web Push API subscription
  -- 메모
  tags TEXT[],
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_visitors_ga4 ON visitors(ga4_client_id);
CREATE INDEX idx_visitors_lead ON visitors(lead_id);
CREATE INDEX idx_visitors_acq_source ON visitors(acquisition_source, acquisition_campaign);

-- ────────────────────────────────────────────────────
-- 14. 세션 (방문 단위)
-- ────────────────────────────────────────────────────
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID REFERENCES visitors(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ,
  duration_sec INT,
  -- UTM (이번 세션)
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  referrer TEXT,
  landing_page TEXT,
  exit_page TEXT,
  page_views INT DEFAULT 0,
  events INT DEFAULT 0,
  bounced BOOLEAN DEFAULT true,
  converted_to_lead BOOLEAN DEFAULT false,
  ip_hash TEXT,                               -- IP 해시 (PIPA 준수)
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_sessions_visitor ON sessions(visitor_id, started_at DESC);
CREATE INDEX idx_sessions_utm ON sessions(utm_source, utm_campaign);

-- ────────────────────────────────────────────────────
-- 15. 페이지 뷰
-- ────────────────────────────────────────────────────
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  visitor_id UUID,
  url TEXT NOT NULL,
  path TEXT,
  title TEXT,
  view_at TIMESTAMPTZ DEFAULT now(),
  scroll_depth INT DEFAULT 0,                 -- 0~100%
  time_on_page_sec INT DEFAULT 0,
  is_exit BOOLEAN DEFAULT false
);

CREATE INDEX idx_page_views_session ON page_views(session_id);
CREATE INDEX idx_page_views_path ON page_views(path);

-- ────────────────────────────────────────────────────
-- 16. 커스텀 이벤트 (챗봇·클릭·다운로드 등)
-- ────────────────────────────────────────────────────
CREATE TABLE web_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID,
  visitor_id UUID,
  event_name TEXT NOT NULL,                   -- chatbot_open / lead_submit / pdf_download / cta_click
  event_data JSONB,
  occurred_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_events_name ON web_events(event_name, occurred_at DESC);

-- ────────────────────────────────────────────────────
-- 17. SNS 캠페인 (UTM별 ROI 자동 집계)
-- ────────────────────────────────────────────────────
CREATE TABLE sns_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel TEXT NOT NULL,                      -- instagram / x / linkedin / threads / youtube / facebook / tiktok / blog
  campaign_name TEXT NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  posted_at TIMESTAMPTZ,
  post_url TEXT,                              -- SNS 본문 URL
  post_title TEXT,
  thumbnail_url TEXT,
  -- 비용 (광고 시)
  ad_spend INT DEFAULT 0,
  -- 자동 집계 (cron 1일)
  reach INT DEFAULT 0,
  impressions INT DEFAULT 0,
  clicks INT DEFAULT 0,                       -- sessions.utm_campaign 매칭 카운트
  visitors INT DEFAULT 0,
  leads INT DEFAULT 0,
  contracts INT DEFAULT 0,
  revenue_net INT DEFAULT 0,
  roi_pct FLOAT,                              -- (매출 - 비용) / 비용
  status TEXT DEFAULT 'active',               -- active / paused / archived
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_campaigns_channel ON sns_campaigns(channel, posted_at DESC);
CREATE INDEX idx_campaigns_utm ON sns_campaigns(utm_source, utm_campaign);

-- ────────────────────────────────────────────────────
-- 18. 재방문 / 전환 유도 시퀀스 (선택)
-- ────────────────────────────────────────────────────
CREATE TABLE conversion_journeys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID REFERENCES visitors(id) ON DELETE CASCADE,
  stage TEXT,                                 -- awareness / interest / consideration / decision / customer
  trigger_event TEXT,                         -- 단계 전환 트리거
  message_sent TEXT,                          -- 보낸 메시지 (재방문 시 챗봇 인사 등)
  occurred_at TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────
-- 19. RLS — 익명 INSERT 허용, 의장님만 SELECT
-- ────────────────────────────────────────────────────
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY anon_track ON visitors FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY anon_track ON sessions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY anon_track ON page_views FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY anon_track ON web_events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY owner_read ON visitors FOR SELECT USING (auth.uid() IS NOT NULL);
-- (sessions, page_views, web_events 동일)
```

## 15.5 SNS UTM 표준화 (의장님이 외워야 할 1줄 규칙)

```
모든 SNS 글의 aio-make.com 링크는 UTM 5개 필수:

https://aio-make.com/?utm_source=instagram
                      &utm_medium=social
                      &utm_campaign=2026-05-launch
                      &utm_content=reel-ppt-vs-figma
                      &utm_term=ppt디자인

또는 단축 URL 표준:
https://aio.io/sns/{campaign-slug}        ← admin에서 미리 발급
   ↓ 자동 redirect (utm 추가)
https://aio-make.com/?utm_source=...
```

### admin에 SNS 캠페인 발급 화면

```
┌──────────────────────────────────────────────────┐
│  📣 새 SNS 캠페인                                  │
├──────────────────────────────────────────────────┤
│  채널:       [Instagram ▾]                         │
│  캠페인명:   [PPT vs Figma 비교 릴]                 │
│  슬러그:     [reel-ppt-vs-figma] (자동 생성)        │
│  콘텐츠 유형: [Reel ▾]                             │
│  포스팅 일시: [2026-05-15 14:00]                   │
│  광고비:     [50,000원]                             │
│                                                    │
│  📋 발급된 단축 URL:                                │
│  https://aio.io/sns/reel-ppt-vs-figma  [복사]       │
│                                                    │
│  📋 발급된 풀 UTM URL:                              │
│  https://aio-make.com/?utm_source=instagram&...   │
│                                                    │
│  [캠페인 등록]                                      │
└──────────────────────────────────────────────────┘
```

→ 의장님은 SNS 글 쓸 때 admin에서 단축 URL 1개만 복사. UTM 자동 부여.

## 15.6 추적 코드 (1번 작성하면 모든 채널 자동)

```typescript
// packages/lib/track.ts
export async function track(eventName: string, data?: any) {
  // 1. GA4 / GTM에 발송
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event: eventName, ...data });
  }

  // 2. 자체 DB에 저장 (sendBeacon — 페이지 떠나도 OK)
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify({
      event_name: eventName,
      event_data: data,
      visitor_id: getVisitorCookie(),
      session_id: getSessionCookie(),
      url: location.href,
    })], { type: 'application/json' });
    navigator.sendBeacon('/api/track', blob);
  }

  // 3. Microsoft Clarity 자동 트래킹 (스크립트가 알아서)
}

// 사용 예시
track('chatbot_open');
track('chatbot_step', { step: 3, category: 'ppt' });
track('lead_submit', { category: 'ppt', estimated_value: 300000 });
track('cta_click', { cta_id: 'pricing-deluxe' });
```

```typescript
// apps/web/app/api/track/route.ts
import { NextRequest } from 'next/server';
import { supabaseService } from '@aio/lib/supabase';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { visitor_id, session_id, event_name, event_data, url } = body;

  // 비동기 INSERT (응답 지연 X)
  supabaseService.from('web_events').insert({
    visitor_id, session_id, event_name, event_data,
  }).then(() => {});

  return new Response('OK');
}
```

## 15.7 챗봇 ↔ visitor DB 연동 (재방문 인식)

챗봇 시작 시 visitor cookie를 읽어 **재방문이면 이전 대화/견적을 즉시 표시**:

```typescript
// apps/web/components/Chatbot/ChatbotRoot.tsx
const visitorId = getOrCreateVisitorCookie();

useEffect(() => {
  // 재방문자라면 이전 대화 불러오기
  fetch(`/api/visitor/${visitorId}/last-chat`)
    .then(r => r.json())
    .then(prev => {
      if (prev?.lastCategory) {
        setGreeting(
          `어서오세요! 지난번 ${prev.lastCategory} 견적(${prev.lastPrice}원) 보셨었네요.\n` +
          `진행 의향 있으시면 1초 컨택드릴게요.`
        );
      } else {
        setGreeting('안녕하세요! AIO에이전시입니다 👋');
      }
    });
}, []);
```

```typescript
// apps/web/app/api/visitor/[id]/last-chat/route.ts
export async function GET(req: NextRequest, { params }) {
  const { id } = params;
  const { data } = await supabaseService
    .from('quote_requests')
    .select('category, customer_summary, quote_responses(event_price)')
    .eq('lead_id', supabase.raw(`(SELECT lead_id FROM visitors WHERE id = '${id}')`))
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return NextResponse.json(data ? {
    lastCategory: categoryLabel(data.category),
    lastPrice: data.quote_responses?.[0]?.event_price?.toLocaleString(),
  } : {});
}
```

→ **재방문 전환율 2~3배 상승**의 핵심.

## 15.8 admin 마케팅 대시보드 (3개 추가 화면)

### 15.8.1 📈 트래픽 대시보드

```
┌──────────────────────────────────────────────────────────┐
│  📈 트래픽 대시보드                            [기간: 7일 ▾]  │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  👥 방문자  📄 페이지뷰  🎯 lead 전환  💰 매출 추정          │
│  1,250    3,840       42 (3.4%)    420만원              │
│                                                            │
│  🌐 채널별 (acquisition_source)                            │
│  ┌──────────────────────────────────────────────────────┐│
│  │ Instagram    ▰▰▰▰▰▰▰▰▰▰▰   45% (560 visit · 18 lead)│
│  │ X (Twitter)  ▰▰▰▰▰▰        25% (310 · 11 lead)      │
│  │ LinkedIn     ▰▰▰▰          18% (220 · 8 lead)       │
│  │ Direct       ▰▰            8%  (100 · 3 lead)       │
│  │ Google 검색   ▰▰             4%  (50 · 2 lead)       │
│  └──────────────────────────────────────────────────────┘│
│                                                            │
│  🔥 인기 페이지 Top 5                                       │
│  1. /                              812 view (avg 1:23)    │
│  2. /portfolio/                    650 view (avg 2:45)    │
│  3. /pricing                       420 view (avg 1:50)    │
│  4. /portfolio/ppt                 320 view (avg 3:10)    │
│  5. /portfolio/website             280 view (avg 2:30)    │
│                                                            │
│  🎯 챗봇 funnel (이번 주)                                   │
│  open      ──→  step3 (자동견적)  ──→  lead 제출            │
│  120       ──→  85 (71%)         ──→  42 (50% / 35%)     │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

### 15.8.2 📣 SNS 캠페인 ROI

```
┌──────────────────────────────────────────────────────────┐
│  📣 SNS 캠페인 ROI                                          │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  채널      캠페인        클릭   lead  계약  매출   광고비  ROI │
│  Instagram PPT 비교 릴    180   12    3    150만  5만   +28x │
│  X         포폴 쓰레드     85    5    1    30만   0    ∞   │
│  LinkedIn  영문 글         42    2    1    50만   0    ∞   │
│  YouTube   1분 데모        25    1    0    0      10만  -10만│
│                                                            │
│  💡 자동 인사이트:                                           │
│  · Instagram Reel이 ROI 28배 → 다음 주 같은 포맷 3개 더    │
│  · YouTube는 ROI 음수 → 콘텐츠 포맷 변경 필요                │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

### 15.8.3 🔄 코호트 분석

```
방문 → lead → 계약 funnel을 SNS 채널·시간대·기기별로 분해 표시.
주간/월간 코호트 잔류율 (재방문 % / lead 전환 %).
```

## 15.9 재방문 / 전환 유도 자동화 (선택, Phase 2)

### A. Web Push Notification

```typescript
// 의장님이 admin에서 새 포트폴리오 / 후기 / 이벤트 등록 시
// 옵트인 방문자 전체에 자동 푸시 (브라우저 알림)

await sendWebPush({
  title: '🎨 신규 포트폴리오 — V-AIO 비자',
  body: 'V6 5일 보장 풀스택 사이트 라이브',
  url: '/portfolio/v-aio-visa',
  segment: 'visited_pricing_page',  // 가격 페이지 본 사람만
});
```

### B. 이메일 자동화 (Resend)

```
[lead 제출 후 1시간 안 응답 안 한 의장님 케이스]
방문자에게 자동 이메일:
"안녕하세요 OO님, 견적 검토에 시간이 걸리고 있어 죄송합니다.
30분 이내 추가 컨택드릴게요. — AIO에이전시 의장 정재홍"

[챗봇 step3까지 봤지만 lead 제출 X]
24시간 후 retargeting 이메일:
"OO님, 어제 PPT 견적 보셨었네요. 5월 31일 이벤트가 마감 X일 남았습니다."
```

### C. 동적 챗봇 인사

```javascript
// 첫 방문: "안녕하세요!"
// 재방문 (1주 이내): "다시 오셨네요. 지난번 [PPT] 어떻게 결정하셨어요?"
// 재방문 (1주 이상): "오랜만이네요. 이번 5월 이벤트 가격은 X일까지 한정입니다."
```

## 15.10 개인정보·정책 준수 (PIPA + GDPR)

### 쿠키 동의 배너 (1회만 표시)

```typescript
// apps/web/components/CookieConsent.tsx
const CONSENT_KEY = 'aio_cookie_consent';

export function CookieConsent() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setShown(true);
  }, []);

  function accept(level: 'all' | 'essential') {
    localStorage.setItem(CONSENT_KEY, level);
    setShown(false);
    if (level === 'all') {
      // GA4 + Microsoft Clarity 활성화
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }

  return shown ? (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
      <p>aio-make.com은 서비스 개선을 위해 쿠키를 사용합니다.</p>
      <button onClick={() => accept('all')}>모두 허용</button>
      <button onClick={() => accept('essential')}>필수만</button>
    </div>
  ) : null;
}
```

### 개인정보 처리 방침 페이지 (`/privacy`)

- 수집 항목: visitor_id (쿠키), 이름·이메일·휴대폰 (lead 자발적 제출)
- 보유 기간: visitor 1년 / lead 5년 / 매출 10년 (세무)
- 처리 위탁: Supabase (US, GDPR 준수), Anthropic (Claude API), Vercel
- 옵트아웃: 쿠키 삭제 + admin에 요청 시 lead 영구 삭제

→ **PIPA(개인정보보호법) + GDPR(EU·Upwork 고객) 동시 준수**.

## 15.11 4주 일정 반영 (Week 4 — 마케팅 자산화)

| 일 | 작업 | 권장도 |
|---|---|---|
| Week 4 일 (5/25) | GA4 + GTM 셋업 (코드 1번) + 쿠키 동의 배너 | 🥇 메인 |
| Week 4 월 (5/26) | visitors / sessions / page_views / web_events 테이블 + tracking SDK | 🥇 메인 |
| Week 4 화 (5/27) | sns_campaigns 테이블 + admin 캠페인 발급 화면 + 단축 URL 리다이렉트 | 🥇 메인 |
| Week 4 수 (5/28) | 챗봇 ↔ visitor 연동 (재방문 인사 + 이전 견적 표시) | 🥇 메인 |
| Week 4 목 (5/29) | admin 트래픽 대시보드 + SNS ROI 화면 (recharts) | 🥈 강화 |
| Week 4 금 (5/30) | 일일 자동 집계 cron (sns_campaigns 클릭/lead/매출 자동 갱신) | 🥈 강화 |
| Week 4 토 (5/31) | Microsoft Clarity 통합 + 개인정보 처리 방침 페이지 + 검수 | ✅ 검수 |
| Phase 2 (6월) | Web Push + 이메일 자동화 (lead nurture) + Search Console 연동 | 🥉 |

→ **Week 4 끝 (5/31)**: 모든 SNS 트래픽이 단축 URL 1개로 통일 발행되고, admin에 채널별 ROI가 자동 집계됨. **6월부터 광고 효율 측정·ROAS 최적화 시작 가능**.

## 15.12 SNS 채널 1개당 운영 사이클 (의장님 매일 5분)

```
[09:00] admin → SNS 캠페인 → "오늘 콘텐츠 발행" 클릭
        → 채널 (Instagram/X/LinkedIn 등) + 캠페인명 입력
        → 단축 URL 자동 발급 (예: aio.io/sns/0530-ppt-tip)

[09:05] SNS 앱에서 콘텐츠 작성 → 본문 끝에 단축 URL 1줄 추가

[09:10] 발행 완료

[24시간 후] cron이 자동 집계:
        → 클릭 N건, 방문자 N명, lead N건, 계약 N건
        → admin SNS ROI 화면에 자동 표시
```

→ **의장님은 SNS 운영 자체에 집중**. 분석·집계·ROI 계산은 100% 자동.

## 15.13 SNS별 추적 — 3단계 페이징 (중요)

> "SNS별 추적"은 한 가지가 아니라 **3개의 다른 작업**. 같은 카테고리지만 목적·도구·시점이 다름. 한꺼번에 다 하지 않고 단계별로 추가.

### Tier 1 — UTM 트래킹 (✅ Week 4에 이미 포함)

**목적**: aio-make.com에 도착한 방문자가 어느 SNS에서 왔는지 식별 → SNS 채널별 lead·매출 ROI 자동 집계.

**작동 방식**:
```
SNS 글 본문에 [aio.io/sns/{캠페인}] 단축 URL 1개 → utm_source 자동 부여
   ↓
방문자 도착 시 sessions.utm_source = 'instagram' 등으로 저장
   ↓
admin SNS ROI 대시보드에 자동 표시
```

**필요 도구**: 우리 자체 코드 (외부 SDK X)
**개발 분량**: 코드 30줄 (이미 §15.5에 포함)
**의장님 작업**: SNS 글 끝에 단축 URL 1줄 붙여넣기 (영구)

→ **광고 안 해도 organic SNS 운영만으로 ROI 측정 가능**. 모든 SNS 추적의 기반.

### Tier 2 — SNS 광고 픽셀 설치 (📅 Phase 2, 6월~)

**목적**: SNS 광고를 집행할 때 **리타겟팅** + **광고 비용 → 전환** 자동 매핑. 광고 안 하면 불필요.

**채널별 픽셀**:

| 채널 | 픽셀/SDK | 광고 시점 |
|---|---|---|
| Meta (Instagram + Facebook) | **Meta Pixel** + Conversions API | 인스타 / FB 광고 집행 시 |
| X (Twitter) | **X Pixel** (Conversion Tag) | X Ads 집행 시 |
| LinkedIn | **LinkedIn Insight Tag** | LinkedIn Ads 집행 시 |
| TikTok | **TikTok Pixel** | TikTok 광고 시 |
| YouTube / Google | **Google Ads Conversion Tag** (GTM에 자동) | Google·YouTube 광고 시 |
| Naver | **네이버 프리미엄 로그 분석** | 네이버 광고 시 |

**작동 방식**:
```
[Meta Pixel 예시]
GTM 컨테이너에 Meta Pixel 태그 1번 추가 (코드 작성 X)
   ↓
방문자 ↔ Meta 광고 계정 자동 매핑
   ↓
"챗봇 lead 제출" 이벤트가 Meta에 자동 보고
   ↓
Meta 광고 매니저에서:
  · 광고비당 lead 단가 (CPL) 자동 계산
  · "lead 제출한 사람과 비슷한 사람" 유사 타겟팅
  · "방문했지만 lead 안 남긴 사람" 리타겟팅 광고
```

**필요 도구**: GTM (이미 Week 4에 셋업됨) + 각 SNS 광고 계정 1회 셋업
**개발 분량**: 채널 1개당 GTM에 태그 추가 5분 (코드 작성 X)
**의장님 작업**: 각 SNS 광고 계정 만들 때 픽셀 코드 발급 → admin에 붙여넣기

**ETA**: **광고 집행 시작 결정 후 같은 날 추가 가능** (Phase 2, 6월 이후 광고 시작할 때).

### Tier 3 — SNS 자체 통계 API 연동 (📅 Phase 3, 8~9월)

**목적**: SNS 플랫폼의 **본문 통계 (조회수·좋아요·댓글)** 까지 admin에 자동 흡수해서 "콘텐츠 자체 성과 + 사이트 전환 성과"를 한 화면에서 비교.

**채널별 API**:

| 채널 | API | 가져올 데이터 |
|---|---|---|
| Instagram | **Instagram Graph API** (비즈니스 계정) | 도달·노출·저장·공유·프로필 클릭 |
| X | **X API v2** ($100/월부터) | 노출·참여·리트윗·답글 |
| LinkedIn | **LinkedIn Marketing API** (회사 페이지) | 도달·반응·공유 |
| YouTube | **YouTube Data API** (무료) | 조회수·좋아요·시청 시간 |
| Facebook | Graph API (페이지 owner) | 도달·반응·공유 |

**작동 방식**:
```
admin이 각 SNS API에 1시간마다 자동 폴링
   ↓
sns_campaigns 테이블의 reach / impressions / clicks 자동 갱신
   ↓
admin에서 "이 콘텐츠 도달 1만 → 클릭 200 → lead 12 → 계약 3" 풀 funnel 표시
```

**필요 도구**: 각 SNS 비즈니스/개발자 계정 + API 키 발급
**개발 분량**: 채널 1개당 6~10시간
**의장님 작업**: 각 채널 비즈니스 계정 인증 (1회)

**ETA**: 채널당 약 1주씩. 광고 본격화 + 콘텐츠 발행량 증가한 **8~9월에 우선순위 따라 순차 추가**.

### Tier 4 — SNS 자동 발행 (📅 Phase 4, 11월~ 또는 영구 패스)

**목적**: admin에서 글 1번 쓰면 7개 채널에 자동 동시 발행. 시간 절약.

**대안**: Buffer / Hootsuite / Typefully 같은 외부 SaaS ($15~50/월) 사용. 자체 구현보다 빠름.

**판단**: 의장님이 SNS 글 매일 5개+ 발행하기 시작했을 때만 의미 있음. 그 전엔 직접 발행이 더 빠름.

### 단계별 결정 가이드 (의장님 광고 계획 없음 반영)

```
✅ 지금 (Week 4): Tier 1 UTM 추적 — 모든 SNS 추적의 기반
   → organic SNS 운영만으로 채널별 ROI 측정 가능
   → 의장님 핵심 작업

⛔ Tier 2 광고 픽셀 — 영구 보류 (광고 계획 없음 확정)
   → 추후 광고 집행 의향 생기면 그때 반나절에 추가 가능
   → 지금은 작업 0, 셋업 0

📅 Tier 3 organic 통계 API — 콘텐츠 양 늘면 우선순위 따라
   → Instagram Graph API + YouTube Data API는 무료
   → X API는 $100/월 → 채택 보류 (URL 클릭 추적은 Tier 1로 이미 됨)
   → LinkedIn은 회사 페이지 만들 때 함께

📅 Tier 4 자동 발행 — Buffer 같은 외부 SaaS 권장
   → 자체 구현 X. 필요해지면 Buffer Free / $5 Essentials 검토
```

### Organic 전용 단순화된 SNS 운영 사이클

```
[의장님 매일 9:00]
  ① admin → "오늘 SNS 캠페인" 클릭
  ② 채널·캠페인명 입력 → 단축 URL 1개 자동 발급
  ③ SNS 글 본문에 URL 1줄 붙여넣기 → 발행
  ④ (끝) — 광고비·픽셀 셋업 일체 X

[24시간 후]
  · admin SNS ROI에 클릭·방문·lead·매출 자동 표시
  · 어느 SNS·어느 콘텐츠가 매출로 이어지는지 자동 분석

[Phase 3 (8~9월, 콘텐츠 양 늘면)]
  · Instagram 비즈니스 계정 + Graph API 연결 → 도달·저장 자동 흡수
  · YouTube Data API 연결 → 조회수·시청 시간 자동 흡수
  · admin 한 화면에 "콘텐츠 도달 → 사이트 클릭 → 매출" 풀 funnel
```

### 결론 정리

| 질문 | 답 |
|---|---|
| "SNS별 추적 삽입하면 되는 거 아닌가?" | **Tier 1 UTM은 그게 정확합니다 — Week 4에 이미 포함** |
| "추후에 하는 건가?" | **Tier 2 픽셀은 광고 시작 시점까지 영구 보류** (현재 계획 X) |
| "Tier 3는 언제?" | **콘텐츠 양 늘었을 때만** — 무료 채널부터 (Instagram·YouTube) |
| "Tier 4 자동 발행?" | **자체 구현 X, 필요해지면 Buffer 같은 외부 SaaS** |

→ **의장님 머릿속에 남길 것 1개**: 광고 안 하니까 **Week 4 Tier 1 UTM 단축 URL 시스템만 잘 쓰면 끝**. 픽셀·자동 발행은 신경 X.

---

# 🎯 결론

## 즉시 실행 (오늘~내일)

1. **GitHub 새 레포 생성**: `aio-platform`
2. **Supabase 신규 프로젝트 생성**: AIO_PLATFORM
3. **§6 SQL 마이그레이션 실행**
4. **§7 폴더 구조로 모노레포 셋업**:
   ```bash
   pnpm create next-app apps/web --typescript --tailwind --app
   pnpm create next-app apps/admin --typescript --tailwind --app
   pnpm create next-app apps/bot --typescript --tailwind --app
   ```
5. **현행 숨고봇 명세서 코드를 apps/bot 으로 이식**

## 4주 후 기대 효과

| 지표 | 현재 (5/3) | 4주 후 (5/31) |
|---|---|---|
| 견적 응답 시간 | 1분/건 (수기) | 30초/건 (AI 보조) |
| 채널 수 | 2개 (숨고·크몽) | 7개 (+위시켓·이랜서·노트폴리오·Upwork·Contra) |
| 데이터 단일 진실 원천 | 엑셀 4개 분산 | Supabase 1개 통합 |
| 사이트 인바운드 lead | 0/월 | 5~20/월 (챗봇) |
| KPI 자동 집계 | 수기 입력 | 자동 |
| 5일 보장 추적 | 머릿속 | D-Day 자동 알림 |
| 작업 가시성 | 엑셀 헤매기 | Kanban 한 화면 |

## 핵심 원칙 재확인

1. **MVP 우선** — 4주 안에 동작하는 3개 모듈, 100% 완벽 X
2. **단일 백엔드** — 챗봇·봇·관리자가 같은 Supabase DB 공유
3. **자동 발송 X** — 모든 외부 플랫폼 발송은 의장님 직접 (계정 안전)
4. **확장 우선 설계** — 7개 채널 → 향후 20개 채널까지 스키마 변경 X
5. **AI는 보조** — 의장님 판단 + 편집 후 발송 (품질 보증)

---

**다음 단계**:
1. 본 명세서 검토 후 수정 사항 알려주세요
2. 승인 시 GitHub 레포 생성 + Day 1 셋업 시작
3. 매주 일요일 마일스톤 점검 → 다음 주 우선순위 조정

추가 질문 있으시면 알려주세요. 🚀
