-- ============================================
-- 005: 카테고리 + 포트폴리오 (코드 하드코딩 → DB)
-- ============================================

-- 카테고리 메타 (services-data.ts와 동기화)
CREATE TABLE IF NOT EXISTS service_categories (
  id                   TEXT PRIMARY KEY,
  name_ko              TEXT NOT NULL,
  name_en              TEXT NOT NULL,
  summary_ko           TEXT,
  summary_en           TEXT,
  starting_price_krw   INTEGER,
  starting_lead_days   INTEGER,
  ending_lead_days     INTEGER,
  display_order        INTEGER DEFAULT 0,
  is_active            BOOLEAN DEFAULT true,
  related_category_ids TEXT[]  DEFAULT '{}',
  meta_keywords        TEXT[]  DEFAULT '{}',
  og_image_path        TEXT,
  created_at           TIMESTAMPTZ DEFAULT now(),
  updated_at           TIMESTAMPTZ DEFAULT now()
);

-- 초기 7개 카테고리 시드
INSERT INTO service_categories
  (id, name_ko, name_en, summary_ko, summary_en, starting_price_krw, starting_lead_days, ending_lead_days, display_order, related_category_ids)
VALUES
  ('website',            '웹사이트',      'Website',            '서비스 소개·신뢰·문의 흐름이 한 화면에 정리되는 웹사이트', 'Service intro, trust, and inquiry flow on one screen',  99000, 1, 5, 1, ARRAY['logo-business-card','automation-app']),
  ('shopping-mall',      '쇼핑몰',        'Shopping Mall',      '카페24 메인부터 카테고리 동선까지 정리된 쇼핑몰',          'Cafe24 main and category navigation',                  149000, 2, 5, 2, ARRAY['detail-page','video-content']),
  ('logo-business-card', '로고 및 명함',  'Logo & Business Card','브랜드 오픈에 필요한 로고와 명함 빠른 납품',              'Brand-ready logo and business card',                    79000, 1, 3, 3, ARRAY['website','ppt-design']),
  ('detail-page',        '상세페이지',    'Detail Page',        '쿠팡·스마트스토어 전환 카피와 디자인',                   'Conversion-driven detail page for marketplaces',        69000, 2, 5, 4, ARRAY['shopping-mall','video-content','logo-business-card']),
  ('ppt-design',         'PPT 디자인',    'PPT Design',         '회사소개서·IR·제안서용 PPT',                            'PPT for company intro / IR / proposal',                  99000, 2, 5, 5, ARRAY['logo-business-card']),
  ('automation-app',     '자동화 및 앱',  'Automation & App',   '관리 화면·반복 업무 자동화·모바일 앱',                  'Admin dashboard, automation, and mobile apps',          199000, 3, 7, 6, ARRAY['website']),
  ('video-content',      '영상 콘텐츠',   'Video Content',      '유튜브·쇼츠·모션그래픽',                                'YouTube, Shorts, motion graphics',                      199000, 3, 7, 7, ARRAY['detail-page','shopping-mall'])
ON CONFLICT (id) DO NOTHING;


-- 포트폴리오 케이스
CREATE TABLE IF NOT EXISTS portfolios (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                 TEXT UNIQUE NOT NULL,
  primary_category_id  TEXT NOT NULL REFERENCES service_categories(id),
  title_ko             TEXT NOT NULL,
  title_en             TEXT,
  client_name          TEXT,
  industry             TEXT,
  summary_ko           TEXT,
  summary_en           TEXT,
  duration_days        INTEGER,
  delivered_at         DATE,
  is_featured          BOOLEAN DEFAULT false,
  is_published         BOOLEAN DEFAULT true,
  display_order        INTEGER DEFAULT 0,
  hero_asset_id        UUID,
  external_url         TEXT,
  tech_stack           TEXT[]  DEFAULT '{}',
  testimonial          TEXT,
  testimonial_author   TEXT,
  meta_seo_keywords    TEXT[]  DEFAULT '{}',
  og_image_path        TEXT,
  created_at           TIMESTAMPTZ DEFAULT now(),
  updated_at           TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_portfolios_primary_category ON portfolios(primary_category_id);
CREATE INDEX idx_portfolios_slug             ON portfolios(slug);
CREATE INDEX idx_portfolios_featured         ON portfolios(is_featured) WHERE is_featured = true;
CREATE INDEX idx_portfolios_published        ON portfolios(is_published) WHERE is_published = true;


-- 포트폴리오 ↔ 카테고리 N:M (한 포트폴리오가 여러 카테고리에 태그)
CREATE TABLE IF NOT EXISTS portfolio_categories_join (
  portfolio_id  UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  category_id   TEXT REFERENCES service_categories(id),
  PRIMARY KEY (portfolio_id, category_id)
);


-- 포트폴리오 자산 (이미지/영상)
CREATE TABLE IF NOT EXISTS portfolio_assets (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id  UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  asset_type    TEXT NOT NULL CHECK (asset_type IN ('image','video','before','after','gif')),
  url           TEXT NOT NULL,
  thumbnail_url TEXT,
  caption_ko    TEXT,
  caption_en    TEXT,
  width         INTEGER,
  height        INTEGER,
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_portfolio_assets_portfolio ON portfolio_assets(portfolio_id);


-- KPI 카드 (성과 지표)
CREATE TABLE IF NOT EXISTS portfolio_kpis (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id  UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  label_ko      TEXT NOT NULL,
  label_en      TEXT,
  value_text    TEXT NOT NULL,
  value_subtext TEXT,
  display_order INTEGER DEFAULT 0
);

CREATE INDEX idx_portfolio_kpis_portfolio ON portfolio_kpis(portfolio_id);


-- 자동 updated_at trigger
CREATE OR REPLACE FUNCTION trg_set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_service_categories BEFORE UPDATE ON service_categories
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();
CREATE TRIGGER set_updated_at_portfolios BEFORE UPDATE ON portfolios
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();


-- RLS 활성화
ALTER TABLE service_categories       ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios               ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_assets         ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_kpis           ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_categories_join ENABLE ROW LEVEL SECURITY;

-- public: 읽기만 (게시된 것만)
CREATE POLICY "Public read service_categories" ON service_categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read published portfolios" ON portfolios
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read portfolio_assets" ON portfolio_assets
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM portfolios p WHERE p.id = portfolio_assets.portfolio_id AND p.is_published = true)
  );

CREATE POLICY "Public read portfolio_kpis" ON portfolio_kpis
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM portfolios p WHERE p.id = portfolio_kpis.portfolio_id AND p.is_published = true)
  );

CREATE POLICY "Public read portfolio_categories_join" ON portfolio_categories_join
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM portfolios p WHERE p.id = portfolio_categories_join.portfolio_id AND p.is_published = true)
  );

-- INSERT/UPDATE/DELETE: public 정책 없음 → service_role(RLS 우회)만 가능
