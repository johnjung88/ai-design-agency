-- =====================================================
-- 2026년 5월 외주 매출 + 지출 시드 데이터
-- =====================================================
-- 작성일: 2026-05-08
-- 실행 위치: Supabase Dashboard → SQL Editor
-- ⚠️ 1회만 실행 (재실행 시 중복 데이터 발생)
--
-- 입력 내용:
--   매출 7건 (먹튀 1건 포함, 확정 매출 6건 = ₩750,000)
--   지출 5건 (숨고페이 4 + Claude Max = ₩690,400)
--   클라이언트 6명
-- =====================================================

DO $$
DECLARE
  v_lead_id UUID;
  v_project_id UUID;
  v_recurring_claude UUID;
BEGIN
  -- ===========================================
  -- 매출 1: 빌더스 PPT (5/1 → 5/2 완료, 5/7 입금) ✅
  -- ===========================================
  INSERT INTO leads (channel, customer_name, source_meta)
    VALUES ('soomgo', '숨고_빌더스', '{"created_from":"may_2026_seed"}'::jsonb)
    RETURNING id INTO v_lead_id;
  INSERT INTO projects (lead_id, channel, category, product_name, contracted_amount,
                        start_date, completed_date, status, five_day_kept, notes)
    VALUES (v_lead_id, 'soomgo', 'ppt', '빌더스 상품 제안서 PPT', 100000,
            '2026-05-01', '2026-05-02', 'completed', true,
            '1일 마감, 5일 보장 충족, 5/7 입금 완료')
    RETURNING id INTO v_project_id;
  INSERT INTO invoices (project_id, lead_id, channel, gross_amount, net_amount,
                        paid_amount, outstanding_amount,
                        contracted_at, paid_at, payment_status)
    VALUES (v_project_id, v_lead_id, 'soomgo', 100000, 100000, 100000, 0,
            '2026-05-01T00:00:00+09:00', '2026-05-07T00:00:00+09:00', 'paid');

  -- ===========================================
  -- 매출 2: 강의자료 PPT 3파일 (먹튀) ❌
  -- ===========================================
  INSERT INTO leads (channel, customer_name, tags, notes, source_meta)
    VALUES ('soomgo', '숨고_강의자료 의뢰인',
            ARRAY['먹튀'],
            '연락두절, 작업 완료했으나 미입금 - 25만원 손실',
            '{"created_from":"may_2026_seed","status":"mukti"}'::jsonb)
    RETURNING id INTO v_lead_id;
  INSERT INTO projects (lead_id, channel, category, product_name, contracted_amount,
                        start_date, completed_date, status, five_day_kept, notes)
    VALUES (v_lead_id, 'soomgo', 'ppt', '강의자료 PPT 3파일', 250000,
            '2026-05-01', '2026-05-02', 'completed', true,
            '❌ 먹튀 - 작업 완료, 미입금. 매출 제외')
    RETURNING id INTO v_project_id;
  INSERT INTO invoices (project_id, lead_id, channel, gross_amount, net_amount,
                        paid_amount, outstanding_amount,
                        contracted_at, payment_status, notes)
    VALUES (v_project_id, v_lead_id, 'soomgo', 250000, 250000, 0, 250000,
            '2026-05-01T00:00:00+09:00', 'canceled', '먹튀 처리');

  -- ===========================================
  -- 매출 3: 클린앵커 청소사이트 + 블로그 추가 (5/3 시작, 5/8 마감) 🔥
  -- ===========================================
  INSERT INTO leads (channel, customer_name, source_meta)
    VALUES ('soomgo', '숨고_클린앵커',
            '{"created_from":"may_2026_seed","industry":"청소업체"}'::jsonb)
    RETURNING id INTO v_lead_id;

  -- 청소사이트 30만 (메인)
  INSERT INTO projects (lead_id, channel, category, product_name, contracted_amount,
                        start_date, due_date, status, notes)
    VALUES (v_lead_id, 'soomgo', 'website', '클린앵커 청소사이트 제작', 300000,
            '2026-05-03', '2026-05-08', 'in_progress',
            '5/8 마감, 진행 중 (보류 → 5/3 재확정)')
    RETURNING id INTO v_project_id;
  INSERT INTO invoices (project_id, lead_id, channel, gross_amount, net_amount,
                        paid_amount, outstanding_amount,
                        contracted_at, payment_status, due_date)
    VALUES (v_project_id, v_lead_id, 'soomgo', 300000, 300000, 0, 300000,
            '2026-05-03T00:00:00+09:00', 'unpaid', '2026-05-08');

  -- 블로그 추가 5만 (재의뢰, 같은 lead)
  INSERT INTO projects (lead_id, channel, category, product_name, contracted_amount,
                        start_date, due_date, status, notes)
    VALUES (v_lead_id, 'soomgo', 'website', '클린앵커 블로그 추가', 50000,
            '2026-05-08', '2026-05-08', 'in_progress',
            '재의뢰 / 5/8 작업 예정')
    RETURNING id INTO v_project_id;
  INSERT INTO invoices (project_id, lead_id, channel, gross_amount, net_amount,
                        paid_amount, outstanding_amount,
                        contracted_at, payment_status, due_date)
    VALUES (v_project_id, v_lead_id, 'soomgo', 50000, 50000, 0, 50000,
            '2026-05-08T00:00:00+09:00', 'unpaid', '2026-05-08');

  -- ===========================================
  -- 매출 4: 파란하늘 청소 블로그 (5/3 시작, 5/8 마감) 🔥
  -- 클린앵커 추천으로 들어온 케이스
  -- ===========================================
  INSERT INTO leads (channel, customer_name, source_meta)
    VALUES ('soomgo', '숨고_파란하늘',
            '{"created_from":"may_2026_seed","referred_by":"클린앵커","industry":"청소업체"}'::jsonb)
    RETURNING id INTO v_lead_id;
  INSERT INTO projects (lead_id, channel, category, product_name, contracted_amount,
                        start_date, due_date, status, notes)
    VALUES (v_lead_id, 'soomgo', 'website', '파란하늘 청소 블로그 (홈페이지형)', 200000,
            '2026-05-03', '2026-05-08', 'in_progress',
            '클린앵커 추천 - 추천 효과 검증 사례')
    RETURNING id INTO v_project_id;
  INSERT INTO invoices (project_id, lead_id, channel, gross_amount, net_amount,
                        paid_amount, outstanding_amount,
                        contracted_at, payment_status, due_date)
    VALUES (v_project_id, v_lead_id, 'soomgo', 200000, 200000, 0, 200000,
            '2026-05-03T00:00:00+09:00', 'unpaid', '2026-05-08');

  -- ===========================================
  -- 매출 5: 금융사 PPT (5/6 당일 처리 + 입금) ✅
  -- ===========================================
  INSERT INTO leads (channel, customer_name, source_meta)
    VALUES ('soomgo', '숨고_금융사', '{"created_from":"may_2026_seed"}'::jsonb)
    RETURNING id INTO v_lead_id;
  INSERT INTO projects (lead_id, channel, category, product_name, contracted_amount,
                        start_date, completed_date, status, five_day_kept, notes)
    VALUES (v_lead_id, 'soomgo', 'ppt', '금융사 PPT', 50000,
            '2026-05-06', '2026-05-06', 'completed', true,
            '✨ 당일 처리 + 당일 입금')
    RETURNING id INTO v_project_id;
  INSERT INTO invoices (project_id, lead_id, channel, gross_amount, net_amount,
                        paid_amount, outstanding_amount,
                        contracted_at, paid_at, payment_status)
    VALUES (v_project_id, v_lead_id, 'soomgo', 50000, 50000, 50000, 0,
            '2026-05-06T00:00:00+09:00', '2026-05-06T00:00:00+09:00', 'paid');

  -- ===========================================
  -- 매출 6: 세종시 공공지원 PPT (5/7 당일 처리 + 입금) ✅
  -- ===========================================
  INSERT INTO leads (channel, customer_name, source_meta)
    VALUES ('soomgo', '숨고_세종시공공지원', '{"created_from":"may_2026_seed"}'::jsonb)
    RETURNING id INTO v_lead_id;
  INSERT INTO projects (lead_id, channel, category, product_name, contracted_amount,
                        start_date, completed_date, status, five_day_kept, notes)
    VALUES (v_lead_id, 'soomgo', 'ppt', '세종시 공공지원사업 PPT', 50000,
            '2026-05-07', '2026-05-07', 'completed', true,
            '✨ 당일 처리 + 당일 입금')
    RETURNING id INTO v_project_id;
  INSERT INTO invoices (project_id, lead_id, channel, gross_amount, net_amount,
                        paid_amount, outstanding_amount,
                        contracted_at, paid_at, payment_status)
    VALUES (v_project_id, v_lead_id, 'soomgo', 50000, 50000, 50000, 0,
            '2026-05-07T00:00:00+09:00', '2026-05-07T00:00:00+09:00', 'paid');

  -- ===========================================
  -- 지출 5건 (숨고페이 4 + Claude Max 1)
  -- ===========================================
  SELECT id INTO v_recurring_claude FROM recurring_expenses
    WHERE vendor = 'Anthropic' AND item = 'Claude Max' LIMIT 1;

  INSERT INTO expenses (date, category, vendor, item, amount, payment_method, vat_deductible, recurring, notes)
  VALUES
    ('2026-05-01', 'platform_fee', '숨고', '숨고페이 충전', 100000, 'card_business', false, false, '견적 발송용 캐시'),
    ('2026-05-04', 'platform_fee', '숨고', '숨고페이 충전', 100000, 'card_business', false, false, '견적 발송용 캐시'),
    ('2026-05-05', 'platform_fee', '숨고', '숨고페이 충전', 100000, 'card_business', false, false, '견적 발송용 캐시'),
    ('2026-05-07', 'platform_fee', '숨고', '숨고페이 충전', 100000, 'card_business', false, false, '견적 발송용 캐시');

  INSERT INTO expenses (date, category, vendor, item, amount, payment_method, vat_deductible, recurring, recurring_id, notes)
  VALUES
    ('2026-05-07', 'tools', 'Anthropic', 'Claude Max 월 구독', 290400, 'card_business',
     false, true, v_recurring_claude, '5월 정기 구독');

  RAISE NOTICE '✅ 5월 시드 데이터 입력 완료';
  RAISE NOTICE '   • 매출 6건 확정 (먹튀 1 포함 7건) = ₩750,000 (먹튀 제외)';
  RAISE NOTICE '   • 지출 5건 = ₩690,400';
  RAISE NOTICE '   • 영업이익 = +₩59,600';
END $$;

-- =====================================================
-- 검증 쿼리 (실행 후 확인용)
-- =====================================================
-- SELECT count(*) AS leads_count FROM leads;          -- 6명
-- SELECT count(*) AS projects_count FROM projects;    -- 7건
-- SELECT count(*) AS invoices_count FROM invoices;    -- 7건
-- SELECT count(*) AS expenses_count FROM expenses;    -- 5건
--
-- SELECT customer_name, product_name, contracted_amount, status
-- FROM projects p JOIN leads l ON p.lead_id = l.id
-- ORDER BY start_date;
--
-- SELECT date, vendor, item, amount FROM expenses ORDER BY date;
