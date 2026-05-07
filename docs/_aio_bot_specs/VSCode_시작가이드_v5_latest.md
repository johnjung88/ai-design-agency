# AIO 통합 플랫폼 — VS Code 시작 가이드 (Day 1, 30분 셋업)

> **대상**: 의장님 (바이브코딩 4개월차, Cursor + Claude Code Max 사용 가능)
> **목표**: 본 명세서(`솔로프리너_v5_AIO통합플랫폼_개발명세서.md`)를 들고 30분 안에 코딩 시작
> **핵심 원칙**: 의장님은 직접 코드 거의 안 씀. Claude Code Max에게 명세서 섹션 단위로 위임.

---

# 🎯 결론부터

```
✅ 네, 본 명세서로 VS Code(또는 Cursor)에서 바로 시작하시면 됩니다.

[추천 도구]
- 메인 IDE: Cursor (Claude Code Max 통합 가장 매끄러움)
- 또는: VS Code + Claude Code CLI (`claude` 명령)
- 옵션: 둘 다 켜놓고 상황별 사용

[추천 워크플로우]
1. 명세서를 항상 옆에 띄워둠
2. CLAUDE.md를 레포 루트에 만들어 Claude에게 컨텍스트 제공
3. 명세서 섹션 1개씩 Claude에게 작업 지시
4. 작업 완료 후 git commit (커밋 단위 = 명세서 1섹션)
5. 막히면 명세서 어느 줄에서 막혔는지 정확히 인용해서 질문
```

---

# §1. Day 1 — 30분 셋업 (오늘 바로)

## 1.1 사전 준비물 체크 (5분)

```
[필수]
☐ Node.js v20+ (https://nodejs.org)
☐ pnpm (npm install -g pnpm)
☐ Git
☐ GitHub 계정
☐ Cursor 또는 VS Code
☐ Claude Code Max 구독 (이미 있으심)
☐ Supabase 계정 (https://supabase.com — Google 로그인 OK)
☐ Vercel 계정 (이미 aio-make.com 운영 중이니 있음)
☐ Anthropic API 키 (https://console.anthropic.com)

[1회 셋업]
☐ Supabase CLI (npm install -g supabase)
☐ Vercel CLI (npm install -g vercel)
```

## 1.2 GitHub 레포 + 폴더 셋업 (10분)

터미널에서 차례대로:

```bash
# 1. 작업 폴더로 이동
cd ~/Desktop/솔로프리너/솔로프리너

# 2. 새 레포 폴더 생성
mkdir aio-platform
cd aio-platform

# 3. pnpm workspace 셋업
pnpm init
echo "packages:
  - 'apps/*'
  - 'packages/*'" > pnpm-workspace.yaml

# 4. 3개 앱 폴더 생성 (단계적으로)
mkdir -p apps/web apps/admin apps/bot
mkdir -p packages/lib packages/types packages/ui packages/notify
mkdir -p supabase/migrations supabase/functions

# 5. Git 초기화
git init
echo "node_modules
.next
.env*
.vercel
.turbo
.pnpm-store
.DS_Store" > .gitignore

# 6. GitHub 레포 생성 (gh CLI 또는 웹에서)
gh repo create aio-platform --private --source=. --push
# 또는: github.com/new에서 수동 생성 후 git remote add origin ...
```

## 1.3 Supabase 신규 프로젝트 (5분)

```
1. https://supabase.com/dashboard 접속
2. "New project" 클릭
3. 이름: aio-platform
4. 비밀번호: (안전한 비번 + 메모장에 저장)
5. Region: Northeast Asia (Seoul)
6. 생성 → 약 2분 대기
7. Settings → API 메뉴에서:
   - Project URL 복사 (NEXT_PUBLIC_SUPABASE_URL)
   - anon key 복사 (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - service_role key 복사 (SUPABASE_SERVICE_ROLE_KEY)
```

## 1.4 .env.local 작성 (3분)

레포 루트에 `.env.local` 파일:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-xxx

# Telegram (이미 보유)
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_CHAT_ID=7668768088

# 도메인
NEXT_PUBLIC_APP_URL_WEB=https://aio-make.com
NEXT_PUBLIC_APP_URL_ADMIN=https://admin.aio-make.com
NEXT_PUBLIC_APP_URL_BOT=https://bot.aio-make.com

# 의장님 이메일 (Magic Link 화이트리스트)
OWNER_EMAIL=koreabencb@gmail.com
```

⚠️ **`.gitignore`에 `.env*` 들어있는지 재확인**. 절대 커밋 X.

## 1.5 CLAUDE.md 작성 (5분, 가장 중요)

레포 루트에 `CLAUDE.md` 파일을 만들어 Claude Code에게 프로젝트 맥락을 알립니다. 아래 §3 템플릿 그대로 복붙하시면 됩니다.

## 1.6 명세서 + CLAUDE.md 첫 커밋 (2분)

```bash
cp ~/Desktop/솔로프리너/솔로프리너/솔로프리너_v5_AIO통합플랫폼_개발명세서.md ./SPEC.md
git add .
git commit -m "chore: initial setup with spec + CLAUDE.md"
git push origin main
```

→ **30분 셋업 끝**. 이제 Claude Code Max에게 일을 시킬 준비 완료.

---

# §2. 매일 작업 패턴 — Claude Code Max 활용

## 2.1 권장 일과 (1일 4~6시간)

```
09:00 [10분] git pull + 어제 끝난 지점 확인 + 오늘 작업 섹션 결정
       → "명세서 §6 DB 스키마 마이그레이션 → 오늘 끝낸다"

09:10 [3시간] Claude Code Max에 작업 위임
       → 아래 §2.2 프롬프트 패턴 사용

12:10 [30분] 점심 + 외부 플랫폼 신규 견적 확인

12:40 [2시간] 오전 작업 검수 + 다음 섹션 진행

14:40 [10분] git commit + push (섹션 단위 커밋)

14:50 [10분] 명세서 진행도 체크 (✅ 표시)

15:00 [업무] 외주 작업·견적 응답
```

## 2.2 Claude Code Max 프롬프트 패턴 (3가지)

### 패턴 A — "섹션 단위 위임" (가장 자주 사용)

```
SPEC.md §6 데이터 모델 (Supabase Postgres)을 그대로 구현해줘.

지시:
- supabase/migrations/001_initial_schema.sql 파일에 작성
- §6의 SQL 12개 테이블 + RLS 정책 + 인덱스 그대로
- 끝나면 supabase db push 명령 알려줘

한 번에 다 끝내지 말고 테이블 3~4개 단위로 나눠서 보여줘. 검토 후 진행할게.
```

### 패턴 B — "코드 + 검증 동시 요청"

```
SPEC.md §8.2 Claude API 호출 함수를 packages/lib/claude.ts에 구현해줘.

추가 요구사항:
- TypeScript strict 모드
- 에러 핸들링 (Claude API 실패 시 재시도 1회)
- vitest 테스트 코드도 함께 (mock으로 더미 응답 검증)

작업 후:
1. 작성한 파일 경로
2. 실행 명령 (pnpm test 등)
3. 예상 동작 1줄 설명
```

### 패턴 C — "막혔을 때 정확한 인용"

```
SPEC.md §13.5 Edge Function 코드 49번 줄에서

await ensureLabel(gmail, 'aio-processed');

이 함수가 정의 안 됐어. 
ensureLabel 함수를 같은 파일에 정의해줘 (없으면 만들고, 있으면 export).
Gmail 라벨이 없으면 생성, 있으면 ID 반환하는 로직이어야 해.
```

→ **명세서 §·줄 번호를 인용**하면 Claude가 100% 맥락 파악. 짐작 X.

## 2.3 절대 하지 말 것 (의장님 4개월 경험상)

```
❌ "프로젝트 처음부터 다 만들어줘" — 컨텍스트 폭주, 결과물 품질 ↓
❌ ".env에 API 키 넣어줘" — Claude가 가짜 키 만들어 넣음
❌ "지금까지 만든 거 다 검토해줘" — 토큰 낭비
❌ 한 채팅에서 5시간 작업 — 컨텍스트 한계 도달, /clear 또는 새 세션
❌ "에러 났어 고쳐줘" (스택트레이스 없이) — 추측만 함

✅ 명세서 섹션 1개씩 위임
✅ 막히면 정확한 줄 번호 + 에러 메시지 전체 복붙
✅ 작업 완료 → git commit → 새 채팅에서 다음 섹션
✅ 의심스러우면 "이 코드 한 줄씩 설명해줘" 요청
✅ 큰 작업은 plan mode (Cursor: Cmd+Shift+L)로 계획 먼저
```

## 2.4 4주 우선순위 (명세서 §9 + §13 + §14 + §15 통합)

```
[Week 1: 5/4~5/10] 인프라 + 응답봇 (모듈 C)
  D1 일: 본 가이드 §1 셋업 완료
  D2 월: §6 DB 스키마 마이그레이션
  D3 화: apps/bot — 채널 탭 + 입력 폼 + Claude 호출
  D4 수: V6 템플릿 6종 시드 + apps/bot 응답 생성 동작
  D5 목: apps/admin — Magic Link 인증 + 사이드바 골격
  D6 금: apps/admin 인박스 (Realtime 구독)
  D7 토: 텔레그램 알림 통합 + Vercel 배포 (3개 서브도메인)

[Week 2: 5/11~5/17] 관리자 완성 + 챗봇 + 자동수집
  D8 일: admin Kanban 보드 (드래그)
  D9 월: admin 매출/입금 화면
  D10 화: admin KPI 대시보드 (recharts)
  D11 수: apps/web 챗봇 위젯 5스텝
  D12 목: §13 Gmail 1시간 폴링 (안정 운영용)
  D13 금: §14.5 텔레그램 응답 카드 + apps/web 챗봇 → admin 통합
  D14 토: 1주일 운영 데이터 검수 + 버그 fix

[Week 3: 5/18~5/24] 크롬 확장 + PC 24시간 강화
  D15 일: §14.8.A 크롬 확장 — 7핀탭 자동 복구 + 콘텐츠 스크립트
  D16 월: §14.8.B/C/D 데스크톱 알림 + 자동 클립보드 + 사운드
  D17 화: §14.8.E 듀얼모니터 admin 자동 팝업 + 위시켓·이랜서 추가
  D18 수: §14.8.F/G 자동 새로고침 + 일일 자동 리포트
  D19 목: §14.6 inbound_signals 중복 제거 + 노트폴리오·Upwork·Contra
  D20 금: 5채널 통합 테스트 (실제 신규 견적 5건 처리)
  D21 토: 외부 플랫폼별 응답 템플릿 6종 검수

[Week 4: 5/25~5/31] 트래픽 분석 + SNS 통합
  D22 일: §15.3 GA4 + GTM 셋업 + 쿠키 동의 배너
  D23 월: §15.4 visitor/session/event 테이블 + tracking SDK
  D24 화: §15.5 sns_campaigns + 단축 URL 발급 화면
  D25 수: §15.7 챗봇 ↔ visitor 연동 (재방문 인사)
  D26 목: §15.8 admin 트래픽 대시보드 + SNS ROI 화면
  D27 금: §15.11 cron 일일 자동 집계 + Microsoft Clarity
  D28 토: 5/31 D-Day — V7 정상가 자동 전환 + 개인정보 처리 방침
```

---

# §3. CLAUDE.md 템플릿 (레포 루트에 그대로 복붙)

```markdown
# AIO 통합 영업·운영 플랫폼

> **상세 명세**: `SPEC.md` (반드시 작업 전 해당 섹션 읽기)

## 프로젝트 개요

aio-make.com을 단순 포트폴리오에서 "영업·운영 통합 플랫폼"으로 확장.
3개 모듈 + 1개 공용 백엔드 (Supabase) + 5채널 자동수집 + GA4 트래킹.

## 기술 스택

- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind + shadcn/ui
- **Backend**: Supabase (Postgres + Auth Magic Link + Edge Functions Deno + Realtime)
- **AI**: Anthropic Claude API (Haiku 4.5 위주, Sonnet 4 옵션)
- **알림**: Telegram Bot API
- **트래킹**: GA4 + GTM + Microsoft Clarity + 자체 visitor DB
- **배포**: Vercel (3개 서브도메인) + Supabase 호스팅
- **모노레포**: pnpm workspace

## 폴더 구조

```
aio-platform/
├── apps/
│   ├── web/        # aio-make.com (포트폴리오 + 챗봇 위젯)
│   ├── admin/      # admin.aio-make.com (관리자, 의장님 1인)
│   └── bot/        # bot.aio-make.com (외부 플랫폼 응답봇)
├── packages/
│   ├── lib/        # supabase·claude·prompts·v6-templates·price-table
│   ├── types/      # 공통 TypeScript 타입
│   ├── ui/         # shadcn/ui 공통 컴포넌트
│   └── notify/     # telegram·email
├── supabase/
│   ├── migrations/ # SQL 마이그레이션
│   └── functions/  # Edge Functions (Deno)
└── SPEC.md         # 본 명세서 (절대 변경 금지, 작업 시 항상 참조)
```

## 작업 원칙

1. **항상 SPEC.md 해당 섹션을 먼저 읽고 작업 시작**
2. **자동 발송 절대 금지** — 외부 플랫폼 응답은 의장님 직접 발송
3. **AI 사용 언급 금지** — V6 템플릿에서 "AI"라는 단어 X
4. **5일 보장 + 14일 A/S** — 모든 견적 응답 필수
5. **개인정보 보호** — visitor IP는 해시, lead PII는 RLS로 의장님만 접근

## 비즈니스 컨텍스트

- 운영자: 정재홍 의장 1인 (사업자등록 682-01-02748)
- 카테고리 7개: 웹사이트 / 쇼핑몰 / 로고 / 상세 / PPT / 자동화 / 영상
- 5월 31일 D-Day: 이벤트가 → 6월 정상가 자동 전환
- 외부 채널 7개: 숨고·크몽·위시켓·이랜서·노트폴리오·Upwork·Contra
- PC 24시간 ON 환경 → 크롬 확장이 메인 자동수집 채널

## 코딩 컨벤션

- TypeScript strict 모드 강제
- 함수 / 컴포넌트는 export 명시
- 환경변수는 절대 코드에 하드코딩 X
- 모든 DB 쿼리는 supabase 클라이언트 통해서만 (raw SQL은 마이그레이션에만)
- 클라이언트 컴포넌트는 'use client' 명시
- 서버 라우트는 app/api/*/route.ts 패턴

## 현재 진행 상황

(매일 갱신)
- ✅ Week 1 D1 셋업
- ⏳ Week 1 D2 DB 스키마 (진행 중)

## 자주 쓰는 명령

```bash
pnpm install                          # 의존성 설치
pnpm --filter @aio/web dev            # apps/web 개발 서버
pnpm --filter @aio/admin dev          # apps/admin 개발 서버
pnpm --filter @aio/bot dev            # apps/bot 개발 서버
supabase db push                      # 마이그레이션 적용
supabase functions deploy <name>      # Edge Function 배포
vercel --prod                         # 배포
```

## 참고 자산

- 기존 포트폴리오: `~/Desktop/솔로프리너/솔로프리너/portfolio_page/`
- 가격관리 엑셀: `AIO_가격관리.xlsx` → V6_PRICE_TABLE 시드 데이터 원본
- V6 템플릿 6종: `솔로프리너_v4_숨고_응답_SOP.md` §3
- 텔레그램 봇: @aio_company_bot, Chat ID 7668768088
```

---

# §4. 자주 막히는 5가지 + 해결법

## 4.1 "Supabase RLS 때문에 데이터가 안 나와요"

```
원인: 익명 client에서 SELECT 시도. RLS가 막음.

해결:
1. apps/web의 챗봇은 익명이어도 OK (anon_insert 정책 있음)
2. apps/admin은 반드시 Magic Link 로그인 후 사용
3. 디버깅: SQL Editor에서 SELECT * FROM <테이블>은 항상 동작
   → 코드에서만 안 나오면 RLS 문제

테스트 SQL:
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = 'OWNER_UUID';
SELECT * FROM leads;  -- 의장님 본인 lead만 나와야 함
```

## 4.2 "Edge Function이 로컬에서 동작하는데 배포 후 안 됨"

```
원인 95%: 환경변수 누락 또는 deno.json import map 문제

해결:
1. supabase secrets list로 확인
   supabase secrets set ANTHROPIC_API_KEY=sk-ant-xxx
   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJxxx

2. import는 npm: 또는 jsr: prefix 사용 (Deno)
   import { createClient } from 'jsr:@supabase/supabase-js@2'
   import { google } from 'npm:googleapis@140'

3. 로그 확인: supabase functions logs <name> --tail
```

## 4.3 "Vercel 배포했는데 도메인 연결 안 됨"

```
순서:
1. Vercel 프로젝트 → Settings → Domains에 admin.aio-make.com 추가
2. DNS (가비아·후이즈 등)에서 CNAME 레코드 추가:
   admin → cname.vercel-dns.com
3. SSL 자동 발급까지 5~30분 대기
4. https://admin.aio-make.com 접속 확인

* aio-make.com이 이미 다른 곳에 있으면 같은 도메인 등록 필요
```

## 4.4 "Claude API 응답이 JSON 형식 안 지켜져요"

```
원인: 시스템 프롬프트 부족 또는 모델이 마크다운 감쌈

해결:
- 시스템 프롬프트에 강조: "JSON만 출력. 마크다운 코드블록 X. 설명 X."
- response_format 옵션 사용 (Sonnet/Opus)
- 정규식으로 JSON 추출:
  const jsonMatch = text.match(/\{[\s\S]*\}/);
- 파싱 실패 시 1회 재시도 + 의장님에게 fallback
```

## 4.5 "터미널에서 한글이 깨져요 (Windows)"

```
PowerShell:
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001

또는 Git Bash 사용 (Windows + bash 호환)

또는 WSL2 + Ubuntu (가장 깔끔)
```

---

# §5. 검증 체크포인트 — 매주 일요일 5분

```
[Week 1 끝 (5/10) 체크]
☐ apps/bot 동작: 견적 글 붙여넣기 → AI 응답 생성 OK
☐ apps/admin 로그인 OK + 인박스 화면 보임
☐ Supabase DB에 12개 테이블 + RLS 적용 확인
☐ 텔레그램 알림 1건 이상 수신 확인
☐ 3개 서브도메인 Vercel 배포 완료

[Week 2 끝 (5/17) 체크]
☐ admin Kanban 드래그 → 단계 변경 OK
☐ admin 매출 화면에서 첫 매출 1건 표시 (Week 1 데이터)
☐ apps/web 챗봇 5스텝 완주 → admin 인박스에 도착
☐ 챗봇 → 텔레그램 즉시 알림
☐ §13 Gmail 자동수집 1시간마다 동작 확인 (auto_collect_runs 로그)

[Week 3 끝 (5/24) 체크]
☐ 크롬 확장 7핀탭 자동 복구
☐ 데스크톱 알림 토스트 표시
☐ 자동 클립보드 복사 (50만+ 견적 시)
☐ 듀얼모니터에 admin 인박스 자동 팝업
☐ 5채널 통합 — 같은 견적 중복 표시 X

[Week 4 끝 (5/31) 체크]
☐ GA4에 데이터 수집됨 (실시간 보고서 확인)
☐ admin 트래픽 대시보드 동작
☐ SNS 단축 URL 발급 → 클릭 → 자동 집계
☐ 챗봇 재방문 인사 동작
☐ 6월 정상가 자동 전환 cron 검증
```

---

# §6. Cursor / Claude Code Max 핵심 단축키

```
[Cursor]
Cmd+L            인라인 채팅 (선택 코드 수정)
Cmd+I            전체 파일 컨텍스트로 채팅
Cmd+K            인라인 명령 (이 줄 수정해줘)
Cmd+Shift+L      Plan Mode (계획 먼저, 실행은 다음)
Cmd+Enter        선택 코드만 보내기

[Claude Code CLI]
claude           대화형 시작
claude /init     CLAUDE.md 자동 생성
claude /clear    컨텍스트 초기화
claude /compact  컨텍스트 압축 (긴 작업 후)

[모든 도구 공통]
- 큰 작업 = plan mode → 작은 작업 = 인라인 수정
- 작업 완료 → /clear 또는 새 채팅
- 막히면 명세서 § · 줄 번호 인용
```

---

# 🚀 결론 — 다음 액션

```
오늘 (D1, 일요일 5/4):
  1. 본 가이드 §1 30분 셋업 그대로 실행
  2. CLAUDE.md를 레포 루트에 §3 그대로 복붙
  3. SPEC.md를 레포 루트에 복사
  4. git commit + push

내일 (D2, 월요일 5/5):
  1. Cursor 켜고 SPEC.md를 사이드 패널에 띄움
  2. Claude Code Max에 §2.2 패턴 A로 §6 DB 스키마 위임
  3. 마이그레이션 SQL 검토 → supabase db push
  4. git commit "feat: initial DB schema (SPEC §6)"

매주 일요일:
  - 본 가이드 §5 체크포인트 검증
  - 다음 주 명세서 섹션 머릿속 정리
  - 막힌 부분 정리 후 재계획
```

**핵심**: 의장님은 "오늘 어느 섹션을 끝낼지" 결정만 하시면 됩니다. 코드는 Claude Code Max가 짭니다. 의장님은 **명세서 → 위임 → 검수 → 커밋**의 사이클만 돌리세요.

질문 있으시면 언제든 알려주세요. 🚀
