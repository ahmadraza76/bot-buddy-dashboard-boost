
-- 1. Create settings table for payout gateways (Razorpay & USDT/Trc20 payout details)
CREATE TABLE public.platform_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. RLS: Only admins can read/write
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can update settings"
  ON public.platform_settings
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admin can insert settings"
  ON public.platform_settings
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admin can select settings"
  ON public.platform_settings
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
    )
  );
