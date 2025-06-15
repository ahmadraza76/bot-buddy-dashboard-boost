
-- Table to store OTP session state (phone, hash, etc.) TEMPORARY data
CREATE TABLE public.user_otp_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  phone_code_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  user_id UUID,
  otp_attempts INT NOT NULL DEFAULT 0
);
-- Index for quick lookup by phone
CREATE INDEX user_otp_sessions_phone_idx ON public.user_otp_sessions(phone);

-- Table to store Telegram bot session strings (per user)
CREATE TABLE public.bot_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  phone TEXT,
  session_string TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  bot_status TEXT DEFAULT 'pending' -- pending, running, failed, stopped
);

-- (Optionally you can add an ENCRYPTED or hashed field for session_string storage)

-- RLS policies for security (read/write only for associated user)
ALTER TABLE public.user_otp_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_sessions ENABLE ROW LEVEL SECURITY;

-- Only allow users to see their own OTP sessions
CREATE POLICY "Users can manage own OTP sessions"
  ON public.user_otp_sessions
  USING (auth.uid() = user_id);

-- Only allow users to see/manage their own bot sessions
CREATE POLICY "Users can manage own bot sessions"
  ON public.bot_sessions
  USING (auth.uid() = user_id OR user_id IS NULL);

