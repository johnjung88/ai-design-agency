# AIO-MAKE 마케팅 추적 운영 컨벤션

> 이 문서는 영업/마케팅 운영자를 위한 UTM 추적 링크 생성 가이드입니다.
> 모든 외부 콘텐츠(SNS, 이메일, 광고 등)에 반드시 이 규칙을 따르세요.

---

## 채널별 표준 추적 패턴

| 채널 | 매체(medium) | 권장 라벨 형식 | 예시 |
|---|---|---|---|
| Instagram | bio | `ig_bio_{YYYYQ#}` | ig_bio_2026q2 |
| Instagram | story | `ig_story_{caption-summary}` | ig_story_detail_promo |
| Instagram | post | `ig_post_{post-id}` | ig_post_38491 |
| Instagram | reel | `ig_reel_{video-id}` | ig_reel_220931 |
| Facebook | post | `fb_post_{id}` | fb_post_109384 |
| Facebook | 광고 | `fb_ad_{campaign-id}` | fb_ad_camp_q2 |
| Threads | bio | `threads_bio_{YYYYQ#}` | threads_bio_2026q2 |
| Threads | post | `threads_post_{id}` | threads_post_7749 |
| 카카오톡 채널 | 메시지 | `kakao_msg_{batch-id}` | kakao_msg_20260501 |
| 카카오 오픈채팅 | 링크 | `kakao_chat_{room-name}` | kakao_chat_freelance |
| 네이버 블로그 | 본문 | `naver_blog_{post-slug}` | naver_blog_detail-page-tips |
| YouTube | 설명란 | `yt_desc_{video-id}` | yt_desc_dQw4w9WgXcQ |
| YouTube | 고정댓글 | `yt_comment_{video-id}` | yt_comment_dQw4w9WgXcQ |
| X (구 Twitter) | bio | `x_bio_{YYYYQ#}` | x_bio_2026q2 |
| LinkedIn | 포스트 | `li_post_{YYYYMMDD}` | li_post_20260501 |
| 이메일 서명 | 시그니처 | `email_sig_v{N}` | email_sig_v3 |
| 이메일 뉴스레터 | 뉴스레터 | `email_nl_{issue-id}` | email_nl_2026q2_01 |
| TikTok | bio | `tiktok_bio_{YYYYQ#}` | tiktok_bio_2026q2 |

---

## 단축 링크 발급 절차

1. `/admin/marketing/links/new` 접속
2. 입력:
   - **목적지**: 7개 카테고리 중 선택 (`website`, `shopping-mall`, `logo-business-card`, `detail-page`, `ppt-design`, `automation-app`, `video-content`)
   - **채널**: 드롭다운 선택
   - **매체**: 채널에 맞는 드롭다운 선택
   - **캠페인**: 기존 캠페인 선택 또는 신규 생성 (예: `2026q2`, `may-promo`)
   - **라벨(메모)**: 위 표의 권장 형식 사용
3. 발급된 단축 링크: `https://aio-make.com/l/{7자리-코드}`
4. 풀 UTM 링크도 함께 표시 → SNS 플랫폼에 따라 선택 사용

---

## 카테고리 슬러그 표 (변경 금지)

| 카테고리 | 슬러그 | 페이지 URL |
|---|---|---|
| 웹사이트 제작 | `website` | /ko/services/website |
| 쇼핑몰 제작 | `shopping-mall` | /ko/services/shopping-mall |
| 로고·명함 디자인 | `logo-business-card` | /ko/services/logo-business-card |
| 상세페이지 디자인 | `detail-page` | /ko/services/detail-page |
| PPT 디자인 | `ppt-design` | /ko/services/ppt-design |
| 자동화·앱 개발 | `automation-app` | /ko/services/automation-app |
| 영상 콘텐츠 | `video-content` | /ko/services/video-content |

> 슬러그는 외부 영업 링크에 노출된 상태입니다. **절대 변경하지 마세요.**

---

## 이벤트 추적 명세 (개발자용)

| 이벤트명 | 발사 시점 | 주요 파라미터 |
|---|---|---|
| `page_view` | 자동 (GA4) | path, locale |
| `click_category_card` | 홈 카테고리 카드 클릭 | category |
| `click_portfolio_card` | 포트폴리오 카드 클릭 | portfolio_slug, category |
| `click_cta` | 견적/문의 CTA 버튼 클릭 | label, location, category |
| `open_chatbot` | 챗봇 위젯 열기 | category |
| `submit_chat` | 챗봇 메시지 전송 | category, intent |
| `submit_quote` | 견적 폼 제출 성공 | category, channel |
| `submit_contact` | 연락 폼 제출 성공 | source |
| `scroll_depth_50/90` | 스크롤 50%/90% 도달 | path |
| `time_30s/2min` | 페이지 체류 30초/2분 | path, category |

GA4 콘솔에서 `submit_quote`, `submit_contact` 를 **전환 이벤트**로 표시하세요.

---

## 데이터 흐름 요약

```
SNS/이메일 → 단축링크 /l/{code} → redirect + UTM 부착
    → 카테고리 페이지 → visitor_session 생성 (first-touch UTM 저장)
    → visitor_event 기록 + GA4 dual-write
    → 견적 폼 제출 → session.has_converted = true, lead_id 연결
    → 관리자 대시보드 → 채널별 전환율 조회
```

---

## 컴플라이언스 주의사항

- IP는 평문 저장 없음 — SHA-256 해시로 변환 저장
- 쿠키/세션 데이터는 90일 후 자동 archive
- 삭제 요청: `/api/privacy/delete-request` 엔드포인트 사용
