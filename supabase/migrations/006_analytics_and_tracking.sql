-- ============================================
-- 006: 방문자 트래킹 + UTM 단축링크 + 캠페인
-- ============================================

-- 마케팅 캠페인
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  starts_at   DATE,
  ends_at     DATE,
  budget_krw  INTEGER,
  notes       TEXT,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 추적 단축링크
CREATE TABLE IF NOT EXISTS tracking_links (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code             TEXT UNIQUE NOT NULL,
  destination_path TEXT NOT NULL,
  utm_source       TEXT NOT NULL,
  utm_medium       TEXT,
  utm_campaign     TEXT,
  utm_content      TEXT,
  utm_term         TEXT,
  campaign_id      UUID REFERENCES marketing_campaigns(id),
  category_id      TEXT REFERENCES service_categories(id),
  label            TEXT,
  created_by       TEXT,
  is_active        BOOLEAN DEFAULT true,
  created_at       TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_tracking_links_code     ON tracking_links(code);
CREATE INDEX idx_tracking_links_campaign ON tracking_links(campaign_id);
CREATE INDEX idx_tracking_links_source   ON tracking_links(utm_source);


-- 방문 세션
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_uid            TEXT UNIQUE NOT NULL,
  first_seen_at          TIMESTAMPTZ DEFAULT now(),
  last_seen_at           TIMESTAMPTZ DEFAULT now(),
  ip_hash                TEXT,
  ua_summary             TEXT,
  device                 TEXT CHECK (device IN ('desktop','mobile','tablet','bot','other')),
  country                TEXT,
  city                   TEXT,
  referrer_host          TEXT,
  first_utm_source       TEXT,
  first_utm_medium       TEXT,
  first_utm_campaign     TEXT,
  first_utm_content      TEXT,
  first_tracking_link_id UUID REFERENCES tracking_links(id),
  first_landing_path     TEXT,
  interests              TEXT[] DEFAULT '{}',
  has_converted          BOOLEAN DEFAULT false,
  lead_id                UUID REFERENCES leads(id),
  total_pageviews        INTEGER DEFAULT 0,
  total_chat_messages    INTEGER DEFAULT 0
);

CREATE INDEX idx_visitor_sessions_uid        ON visitor_sessions(session_uid);
CREATE INDEX idx_visitor_sessions_lead       ON visitor_sessions(lead_id);
CREATE INDEX idx_visitor_sessions_source     ON visitor_sessions(first_utm_source);
CREATE INDEX idx_visitor_sessions_link       ON visitor_sessions(first_tracking_link_id);
CREATE INDEX idx_visitor_sessions_first_seen ON visitor_sessions(first_seen_at);


-- 방문자 이벤트
CREATE TABLE IF NOT EXISTS visitor_events (
  id          BIGSERIAL PRIMARY KEY,
  session_id  UUID NOT NULL REFERENCES visitor_sessions(id) ON DELETE CASCADE,
  event_type  TEXT NOT NULL CHECK (event_type IN (
    'pageview','click_cta','click_category_card','click_portfolio_card',
    'click_phone','click_email','click_kakao','click_telegram',
    'open_chatbot','submit_chat','submit_quote','submit_contact',
    'scroll_depth_50','scroll_depth_90','time_30s','time_2min',
    'video_play','video_complete','external_link_click','tracking_link_click'
  )),
  event_path  TEXT,
  event_props JSONB,
  occurred_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_visitor_events_session  ON visitor_events(session_id);
CREATE INDEX idx_visitor_events_type     ON visitor_events(event_type);
CREATE INDEX idx_visitor_events_occurred ON visitor_events(occurred_at);
CREATE INDEX idx_visitor_events_path     ON visitor_events(event_path);


-- RLS
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_links      ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_sessions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_events      ENABLE ROW LEVEL SECURITY;

-- tracking_links: anon이 redirect 시점에 코드로 조회만 허용
CREATE POLICY "Public lookup tracking_links" ON tracking_links
  FOR SELECT USING (is_active = true);

-- 나머지 모든 테이블: public 쓰기 정책 없음 (service_role RLS 우회로만 INSERT/UPDATE)
-- visitor_sessions, visitor_events, marketing_campaigns → 서버 endpoint에서 service_role로만 쓰기


-- 관리자 대시보드용 뷰
CREATE OR REPLACE VIEW v_daily_traffic AS
SELECT
  date_trunc('day', occurred_at)::DATE AS day,
  event_path,
  COUNT(*)                             AS events,
  COUNT(DISTINCT session_id)           AS unique_visitors
FROM visitor_events
WHERE event_type = 'pageview'
GROUP BY 1, 2;

CREATE OR REPLACE VIEW v_channel_funnel AS
SELECT
  vs.first_utm_source   AS source,
  vs.first_utm_campaign AS campaign,
  COUNT(*)              AS sessions,
  COUNT(DISTINCT vs.id) FILTER (WHERE vs.total_pageviews >= 2) AS engaged,
  COUNT(DISTINCT vs.id) FILTER (WHERE vs.has_converted)        AS converted,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE vs.has_converted) / NULLIF(COUNT(*), 0),
    2
  ) AS conversion_rate
FROM visitor_sessions vs
WHERE vs.first_seen_at >= now() - interval '30 days'
GROUP BY 1, 2
ORDER BY sessions DESC;

CREATE OR REPLACE VIEW v_category_interest AS
SELECT
  unnest(vs.interests) AS category_id,
  COUNT(*)             AS sessions
FROM visitor_sessions vs
WHERE vs.first_seen_at >= now() - interval '30 days'
GROUP BY 1
ORDER BY sessions DESC;
