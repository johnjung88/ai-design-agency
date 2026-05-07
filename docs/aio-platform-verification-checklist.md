# AIO 통합 플랫폼 실제 검증 체크리스트

작성일: 2026-05-07  
목적: 배포 전후에 의장님이 직접 확인해야 하는 관리자, 응답봇, 인박스, 견적 폼, Supabase, 알림 흐름을 한 번에 검증한다.

## 0. 현재 기준 상태

- 실제 구현 레포: `AIO_SITE`
- 기준 브랜치: `master`
- 기준 커밋:
  - `f7696db` 운영 기반/env/Supabase 문서
  - `dcb4d43` 관리자/응답봇/인박스
  - `476a84d` Supabase local temp ignore
  - `fff4f22` 마켓플레이스/포트폴리오 자산
- 코드 검증 기준:
  - `git diff --check`
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`

## 1. 환경변수 설정

로컬은 `.env.local`, 배포는 Vercel Project Settings > Environment Variables에 설정한다.

### 필수

| 변수 | 확인 기준 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://aio-make.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key, 절대 공개 금지 |
| `ADMIN_PASSWORD` | 관리자 로그인 비밀번호 |
| `ADMIN_SESSION_SECRET` | 긴 랜덤 문자열, `ADMIN_PASSWORD`와 다르게 설정 |

### 응답봇 품질 향상

| 변수 | 확인 기준 |
| --- | --- |
| `ANTHROPIC_API_KEY` | Claude API 키 |
| `ANTHROPIC_MODEL` | 기본값 `claude-3-5-haiku-latest` |

### 알림/문의

| 변수 | 확인 기준 |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | AIO 텔레그램 봇 토큰 |
| `TELEGRAM_CHAT_ID` | `7668768088` |
| `RESEND_API_KEY` | Resend API 키 |
| `RESEND_FROM_EMAIL` | 발신자 이메일 |
| `CONTACT_TO_EMAIL` | `koreabencb@gmail.com` |

### 빠른 점검 명령

```bash
npm run verify:env
```

이 명령은 실제 API 연결을 하지 않고, `.env.local` 또는 현재 쉘 환경변수에 필요한 값이 있는지만 확인한다.

## 2. Supabase 마이그레이션 검증

### 적용 대상 파일

```text
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_core_schema_completion.sql
```

### 적용 방법

1. Supabase Dashboard 접속.
2. 해당 프로젝트 선택.
3. SQL Editor 열기.
4. `001_initial_schema.sql` 전체 실행.
5. `002_core_schema_completion.sql` 전체 실행.

### 적용 후 확인할 테이블

- `leads`
- `quote_requests`
- `quote_responses`
- `conversations`
- `projects`
- `invoices`
- `v6_price_table`
- `v6_templates`
- `daily_kpi`

### 합격 기준

- 두 SQL 파일 모두 에러 없이 실행된다.
- 위 테이블들이 Table Editor에 보인다.
- RLS가 켜져 있다.
- 웹사이트 견적 제출용 anon insert policy가 존재한다.

## 3. 관리자 로그인 검증

### 절차

1. `/admin/login` 접속.
2. `ADMIN_PASSWORD` 입력.
3. 로그인 성공 후 `/admin`으로 이동하는지 확인.
4. `/admin/inbox`, `/admin/bot` 이동 확인.
5. 로그아웃 클릭.
6. 로그아웃 후 `/admin` 직접 접근.

### 합격 기준

- 비밀번호가 맞으면 `/admin` 대시보드로 이동한다.
- 로그아웃 후 `/admin` 접근 시 `/admin/login`으로 이동한다.
- 로그인하지 않은 상태에서 `/admin/bot`, `/admin/inbox` 접근이 막힌다.

## 4. 응답봇 검증

### 절차

1. `/admin/bot` 접속.
2. 채널 선택: 숨고, 크몽, 위시켓, 이랜서, 노트폴리오, Upwork, Contra 중 하나.
3. 실제 또는 테스트 견적 요청 글을 붙여넣는다.
4. `V6 응답 생성` 클릭.
5. 생성된 응답 초안을 확인한다.
6. 필요한 문구를 직접 수정한다.
7. `복사` 클릭.
8. 외부 플랫폼 입력란에 직접 붙여넣는다.

### 테스트 원문 예시

```text
회사 소개 PPT 30장 제작이 필요합니다. 다음주 월요일까지 가능할까요?
디자인 톤은 전문적이고 깔끔했으면 좋겠습니다.
```

### 합격 기준

- 카테고리가 `ppt` 또는 PPT 계열로 잡힌다.
- 가격, 일정, 작업 범위가 응답문에 포함된다.
- `ANTHROPIC_API_KEY`가 없으면 `Claude 키가 없어 로컬 V6 템플릿으로 생성했습니다.` 메시지가 뜬다.
- `ANTHROPIC_API_KEY`가 있으면 `Claude 응답으로 초안을 생성했습니다.` 메시지가 뜬다.
- `복사` 버튼 클릭 후 외부 입력란에 붙여넣을 수 있다.
- 자동 발송 기능은 없어야 한다. 직접 붙여넣기와 직접 발송만 정상이다.

## 5. 저장 및 인박스 검증

### 절차

1. `/admin/bot`에서 응답 초안 생성.
2. `초안 저장` 클릭.
3. `/admin/inbox` 이동.
4. 새 카드가 생성되었는지 확인.
5. 카드에서 응답 초안이 열리는지 확인.
6. `발송 완료` 클릭.
7. 상태가 `발송 완료`로 바뀌는지 확인.
8. `계약 전환`, `보관`도 각각 상태만 바뀌는지 확인.

### 합격 기준

- `SUPABASE_SERVICE_ROLE_KEY`가 없으면 저장 시 503 에러가 나는 것이 정상이다.
- `SUPABASE_SERVICE_ROLE_KEY`가 있으면 저장이 성공한다.
- `leads`, `quote_requests`, `quote_responses`, `conversations`에 관련 데이터가 저장된다.
- `발송 완료` 상태 변경 시 `quote_responses.sent_at`이 채워진다.
- 상태 변경은 외부 플랫폼에 어떤 메시지도 자동 발송하지 않는다.

## 6. 사이트 견적 폼 검증

### 절차

1. `/ko/quote` 접속.
2. 테스트 문의 1건 제출.
3. Supabase Table Editor에서 `leads` 확인.
4. Supabase Table Editor에서 `quote_requests` 확인.
5. `/admin/inbox`에서 웹사이트 문의 카드 확인.
6. 이메일 수신 확인.
7. 텔레그램 수신 확인.

### 테스트 데이터 예시

| 항목 | 값 |
| --- | --- |
| 이름 | 테스트 고객 |
| 이메일 | 본인 테스트 이메일 |
| 전화번호 | `010-0000-0000` |
| 카테고리 | PPT 디자인 |
| 일정 | 다음주 월요일 |
| 설명 | `회사 소개 PPT 30장 제작 테스트 문의입니다. 운영 검증 후 삭제 예정입니다.` |

### 합격 기준

- `leads.channel`이 `website`로 저장된다.
- `quote_requests.channel`이 `website`로 저장된다.
- `/admin/inbox`에 고객명, 이메일, 요청 내용이 보인다.
- `CONTACT_TO_EMAIL`로 이메일이 온다.
- `TELEGRAM_CHAT_ID`로 신규 견적 알림이 온다.

## 7. 배포 검증

### 절차

1. 최신 커밋 push.
2. Vercel 배포 완료 확인.
3. Vercel Production 환경변수 확인.
4. 운영 도메인에서 아래 경로 확인:
   - `/admin/login`
   - `/admin`
   - `/admin/bot`
   - `/admin/inbox`
   - `/ko/quote`

### 합격 기준

- 운영 도메인에서도 로그인 보호가 유지된다.
- 응답봇 생성이 성공한다.
- 인박스 저장이 성공한다.
- 사이트 견적 폼 제출 후 DB, 인박스, 이메일, 텔레그램이 연결된다.

## 8. 최종 운영 전 정리

### 테스트 데이터 처리

- 검증용 문의 1건을 남겨 운영 샘플로 쓸지, 삭제할지 결정한다.
- 삭제할 경우 관련 테이블에서 같은 테스트 건을 함께 정리한다:
  - `conversations`
  - `quote_responses`
  - `quote_requests`
  - `leads`

### 아직 남은 개발 작업

- Kanban 업무 보드
- 매출/입금 화면
- KPI 대시보드
- Realtime 인박스
- Gmail 자동 수집
- 텔레그램 인라인 응답 카드

## 9. 기본 운영 순서

1. 외부 플랫폼 요청 발견.
2. `/admin/bot`에 요청 글 붙여넣기.
3. 응답 생성.
4. 문구 직접 확인 및 수정.
5. 복사.
6. 숨고/크몽 등 외부 플랫폼에 직접 붙여넣어 발송.
7. `/admin/bot` 또는 `/admin/inbox`에서 발송 완료 표시.
8. 고객 답변 또는 계약 여부에 따라 인박스 상태 업데이트.

