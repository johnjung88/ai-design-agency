-- Add payment tracking fields for admin contract/revenue operations.
-- Safe to run after 001_initial_schema.sql.

ALTER TABLE invoices ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid'
  CHECK (payment_status IN ('unpaid','partial','paid','canceled'));
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS paid_amount INT DEFAULT 0;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS outstanding_amount INT;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS due_date DATE;

UPDATE invoices
SET paid_amount = net_amount
WHERE paid_at IS NOT NULL
  AND COALESCE(paid_amount, 0) = 0;

UPDATE invoices
SET paid_amount = COALESCE(paid_amount, 0);

UPDATE invoices
SET outstanding_amount = GREATEST(net_amount - COALESCE(paid_amount, 0), 0);

UPDATE invoices
SET payment_status = CASE
  WHEN COALESCE(paid_amount, 0) <= 0 THEN 'unpaid'
  WHEN COALESCE(paid_amount, 0) >= net_amount THEN 'paid'
  ELSE 'partial'
END;

CREATE INDEX IF NOT EXISTS idx_invoices_payment_status ON invoices(payment_status, due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);
