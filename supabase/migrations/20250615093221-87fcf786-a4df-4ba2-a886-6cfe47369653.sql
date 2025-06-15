
-- 1. Table create kare payout_requests
CREATE TABLE public.payout_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  amount NUMERIC NOT NULL,
  method TEXT NOT NULL CHECK (method IN ('bank', 'usdt_trc20', 'upi')),
  details JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending', -- pending / approved / declined / paid
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. RLS enable karke policies laga rahe
ALTER TABLE public.payout_requests ENABLE ROW LEVEL SECURITY;

-- 3. Users apna hi request dekh/sakthe hain:
CREATE POLICY "User can view own payouts"
  ON public.payout_requests
  FOR SELECT
  USING (user_id = auth.uid());

-- 4. User apne liye hi request insert kar sakte:
CREATE POLICY "User can create own payout request"
  ON public.payout_requests
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- 5. User apne request update/remove nahi kar sake, isliye update/delete RLS nahi diya

-- 6. Admin sab dekh sake:
CREATE POLICY "Admin can manage all payouts"
  ON public.payout_requests
  FOR ALL
  USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin')
  );

