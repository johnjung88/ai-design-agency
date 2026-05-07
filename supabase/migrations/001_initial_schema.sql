-- AIO-MAKE integrated sales/operations schema.
-- Apply from Supabase SQL Editor or with Supabase CLI after linking the project.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel TEXT NOT NULL DEFAULT 'website' CHECK (channel IN (
    'website',
    'soomgo','kmong','wishket','elancer','notefolio',
    'upwork','contra','fiverr','toptal',
    'cafe24','linkedin','referral','other'
  )),
  customer_name TEXT,
  company_name TEXT,
  email TEXT,
  phone TEXT,
  external_handle TEXT,
  external_url TEXT,
  first_contact_at TIMESTAMPTZ DEFAULT now(),
  last_contact_at TIMESTAMPTZ DEFAULT now(),
  source_meta JSONB,
  notes TEXT,
  tags TEXT[],
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  channel TEXT NOT NULL DEFAULT 'website',
  raw_text TEXT NOT NULL,
  category TEXT CHECK (category IN (
    'website','shop','logo','detail','ppt','automation','video','bundle','other'
  )),
  category_confidence FLOAT,
  customer_summary TEXT,
  budget INT,
  deadline_text TEXT,
  urgency TEXT CHECK (urgency IN ('normal','urgent','very_urgent')),
  status TEXT DEFAULT 'new' CHECK (status IN (
    'new','draft','sent','viewed','replied','matched','contracted','rejected','archived'
  )),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quote_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES quote_requests(id) ON DELETE CASCADE,
  template_version TEXT DEFAULT 'V6',
  template_category TEXT,
  price_tier TEXT CHECK (price_tier IN ('standard','deluxe','premium','custom')),
  event_price INT,
  regular_price INT,
  delivery_days TEXT,
  ai_generated_text TEXT NOT NULL,
  edited_text TEXT,
  attachments JSONB,
  sent_at TIMESTAMPTZ,
  customer_replied BOOLEAN DEFAULT false,
  reply_received_at TIMESTAMPTZ,
  contracted BOOLEAN DEFAULT false,
  contracted_amount INT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_response_id UUID REFERENCES quote_responses(id),
  lead_id UUID REFERENCES leads(id),
  channel TEXT,
  category TEXT,
  product_name TEXT,
  contracted_amount INT,
  start_date DATE,
  due_date DATE,
  completed_date DATE,
  status TEXT DEFAULT 'in_progress' CHECK (status IN (
    'in_progress','blocked','review','completed','canceled'
  )),
  five_day_kept BOOLEAN,
  refund_10pct INT DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  lead_id UUID REFERENCES leads(id),
  channel TEXT,
  gross_amount INT NOT NULL,
  platform_fee INT DEFAULT 0,
  vat_amount INT DEFAULT 0,
  net_amount INT NOT NULL,
  contracted_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  tax_invoice_issued BOOLEAN DEFAULT false,
  tax_invoice_no TEXT,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS v6_price_table (
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

CREATE TABLE IF NOT EXISTS v6_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  channel TEXT,
  template_body TEXT NOT NULL,
  language TEXT DEFAULT 'ko',
  active BOOLEAN DEFAULT true,
  version TEXT DEFAULT 'V6.0'
);

CREATE TABLE IF NOT EXISTS daily_kpi (
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

-- Compatibility for earlier AIO_SITE quote_requests variants.
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS lead_id UUID REFERENCES leads(id) ON DELETE CASCADE;
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS channel TEXT DEFAULT 'website';
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS category_confidence FLOAT;
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS customer_summary TEXT;
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS budget INT;
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS deadline_text TEXT;

CREATE INDEX IF NOT EXISTS idx_leads_channel ON leads(channel);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_last_contact ON leads(last_contact_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_lead ON quote_requests(lead_id);
CREATE INDEX IF NOT EXISTS idx_quote_responses_request ON quote_responses(request_id);
CREATE INDEX IF NOT EXISTS idx_quote_responses_sent_at ON quote_responses(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status, due_date);
CREATE INDEX IF NOT EXISTS idx_projects_due ON projects(due_date);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE v6_price_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE v6_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_kpi ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS owner_full ON leads;
DROP POLICY IF EXISTS owner_full ON quote_requests;
DROP POLICY IF EXISTS owner_full ON quote_responses;
DROP POLICY IF EXISTS owner_full ON projects;
DROP POLICY IF EXISTS owner_full ON invoices;
DROP POLICY IF EXISTS owner_full ON v6_price_table;
DROP POLICY IF EXISTS owner_full ON v6_templates;
DROP POLICY IF EXISTS owner_full ON daily_kpi;

CREATE POLICY owner_full ON leads FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY owner_full ON quote_requests FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY owner_full ON quote_responses FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY owner_full ON projects FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY owner_full ON invoices FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY owner_full ON v6_price_table FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY owner_full ON v6_templates FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY owner_full ON daily_kpi FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS anon_insert_leads ON leads;
DROP POLICY IF EXISTS anon_insert_quote_requests ON quote_requests;

CREATE POLICY anon_insert_leads ON leads
  FOR INSERT TO anon
  WITH CHECK (channel = 'website');

CREATE POLICY anon_insert_quote_requests ON quote_requests
  FOR INSERT TO anon
  WITH CHECK (channel = 'website');
