-- 007_tasks.sql
-- 일일 / 주간 / 월간 할 일 관리 (텔레그램 ↔ Supabase ↔ 엑셀 동기화 기반)
-- Safe to run after 006_analytics_and_tracking.sql

-- =====================================================
-- tasks: 3계층 할 일 (오늘 / 이 주 / 이 달)
-- =====================================================
CREATE TABLE IF NOT EXISTS tasks (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title               TEXT NOT NULL,
  scope               TEXT NOT NULL CHECK (scope IN ('today','week','month')),
  -- scope_date: today=해당 일자, week=해당 주 월요일, month=해당 월 1일 (KST 기준)
  scope_date          DATE NOT NULL,
  priority            TEXT NOT NULL DEFAULT 'P1' CHECK (priority IN ('P0','P1','P2')),
  status              TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending','in_progress','completed','canceled','deferred')),
  source              TEXT NOT NULL DEFAULT 'telegram'
                      CHECK (source IN ('telegram','admin','excel','auto','briefing')),
  due_date            DATE,
  completed_at        TIMESTAMPTZ,
  related_project_id  UUID REFERENCES projects(id) ON DELETE SET NULL,
  notes               TEXT,
  telegram_message_id INT,
  display_order       INT DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_scope_date ON tasks(scope, scope_date DESC);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status, scope_date DESC);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority, scope_date DESC);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date) WHERE due_date IS NOT NULL;

DROP TRIGGER IF EXISTS trg_tasks_updated_at ON tasks;
CREATE TRIGGER trg_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION set_updated_at_timestamp();

CREATE OR REPLACE FUNCTION set_task_completed_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status <> 'completed' THEN
    NEW.completed_at = NOW();
  ELSIF NEW.status <> 'completed' AND OLD.status = 'completed' THEN
    NEW.completed_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_tasks_completed_at ON tasks;
CREATE TRIGGER trg_tasks_completed_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION set_task_completed_at();

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tasks_service_role_all ON tasks;
CREATE POLICY tasks_service_role_all ON tasks
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE VIEW tasks_active AS
SELECT
  t.*,
  CASE
    WHEN t.scope = 'today' THEN t.scope_date
    WHEN t.scope = 'week'  THEN t.scope_date + INTERVAL '6 days'
    WHEN t.scope = 'month' THEN (date_trunc('month', t.scope_date) + INTERVAL '1 month' - INTERVAL '1 day')::date
  END AS scope_end
FROM tasks t
WHERE t.status IN ('pending','in_progress');
