-- 004_expenses.sql
-- 지출 관리 (사업비) + 정기 구독 마스터
-- Safe to run after 003_contract_payment_tracking.sql

-- =====================================================
-- expenses: 일반 지출 (모든 사업 비용)
-- =====================================================
CREATE TABLE IF NOT EXISTS expenses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date            DATE NOT NULL,
  category        TEXT NOT NULL CHECK (category IN (
    'platform_fee',     -- 플랫폼 수수료 (숨고페이, 크몽 수수료 등)
    'tools',            -- 도구·구독 (Claude, ChatGPT, Cursor, Vercel, Supabase 등)
    'marketing',        -- 마케팅 (도메인, 호스팅, 광고, 명함 등)
    'outsourcing',      -- 외주 인건비·자료 구매
    'tax_office',       -- 세금·사무 (부가세, 종소세, 4대보험)
    'assets',           -- 자산 (장비)
    'other'
  )),
  vendor          TEXT,                          -- 예: 숨고, Anthropic, Vercel
  item            TEXT NOT NULL,                 -- 구체 항목명
  amount          INT NOT NULL CHECK (amount >= 0),
  currency        TEXT NOT NULL DEFAULT 'KRW',
  payment_method  TEXT CHECK (payment_method IN (
    'card_business','card_personal','bank_transfer','cash','platform_credit','other'
  )),
  vat_deductible  BOOLEAN DEFAULT FALSE,
  receipt_url     TEXT,                          -- Supabase Storage URL
  recurring       BOOLEAN DEFAULT FALSE,
  recurring_id    UUID,                          -- recurring_expenses FK (NULL이면 1회성)
  contract_id     UUID,                          -- 특정 외주에 직결되면 projects.id
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category, date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_recurring ON expenses(recurring_id) WHERE recurring_id IS NOT NULL;

-- =====================================================
-- recurring_expenses: 정기 구독 마스터 (구독·정기결제)
-- =====================================================
CREATE TABLE IF NOT EXISTS recurring_expenses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor          TEXT NOT NULL,
  item            TEXT NOT NULL,
  category        TEXT NOT NULL CHECK (category IN (
    'platform_fee','tools','marketing','outsourcing','tax_office','assets','other'
  )),
  amount          INT,                           -- 알려진 경우 (변동이면 NULL)
  currency        TEXT NOT NULL DEFAULT 'KRW',
  cycle           TEXT NOT NULL CHECK (cycle IN ('monthly','quarterly','yearly','prepaid','custom')),
  next_charge     DATE,                          -- 다음 결제 예정일 (NULL이면 미정)
  active          BOOLEAN NOT NULL DEFAULT TRUE,
  vat_deductible  BOOLEAN DEFAULT FALSE,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recurring_active ON recurring_expenses(active, next_charge);

-- =====================================================
-- updated_at 트리거 (있으면 skip)
-- =====================================================
CREATE OR REPLACE FUNCTION set_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_expenses_updated_at ON expenses;
CREATE TRIGGER trg_expenses_updated_at
  BEFORE UPDATE ON expenses
  FOR EACH ROW EXECUTE FUNCTION set_updated_at_timestamp();

DROP TRIGGER IF EXISTS trg_recurring_expenses_updated_at ON recurring_expenses;
CREATE TRIGGER trg_recurring_expenses_updated_at
  BEFORE UPDATE ON recurring_expenses
  FOR EACH ROW EXECUTE FUNCTION set_updated_at_timestamp();

-- =====================================================
-- 시드 데이터 (현재 알려진 정기 구독 4종)
-- =====================================================
INSERT INTO recurring_expenses (vendor, item, category, amount, cycle, next_charge, active, vat_deductible, notes)
VALUES
  ('Anthropic',  'Claude Max',     'tools', 290400, 'monthly', '2026-06-07', TRUE, TRUE, '5/7 결제 / 가장 큰 구독'),
  ('OpenAI',     'ChatGPT Pro',    'tools', NULL,   'prepaid', NULL,         TRUE, TRUE, '3개월 선결제 / 다음 결제 시점 미정'),
  ('Supabase',   'Supabase Pro',   'tools', 40000,  'monthly', NULL,         TRUE, TRUE, '5월 미결제 / 무료 한도 초과 시 전환'),
  ('Google',     'Gemini Pro',     'tools', 29000,  'monthly', NULL,         TRUE, TRUE, '5월 미결제 / 결제일 미정')
ON CONFLICT DO NOTHING;
