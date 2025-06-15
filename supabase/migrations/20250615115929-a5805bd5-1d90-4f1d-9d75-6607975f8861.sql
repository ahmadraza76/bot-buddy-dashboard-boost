
-- Table to store Pyrogram session strings (per user/bot)
CREATE TABLE IF NOT EXISTS public.bot_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  phone TEXT NOT NULL,
  session_string TEXT NOT NULL,
  bot_status TEXT, -- running/stopped/error
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table for admin/bot logs
CREATE TABLE IF NOT EXISTS public.admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID REFERENCES bots(id),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL, -- e.g., "start", "stop", "restart", "crash"
  message TEXT,         -- error/reason
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bot_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- Policies so: 
-- Users can see/edit their OWN session
CREATE POLICY "User can view their session" ON public.bot_sessions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "User can insert session" ON public.bot_sessions
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admin can see all admin_logs, users can see own bot logs
CREATE POLICY "Admin can view all logs or users can view their logs" ON public.admin_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
    ) OR user_id = auth.uid()
  );

-- Only admins can insert logs (bot actions)
CREATE POLICY "Admin can insert logs" ON public.admin_logs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
    )
  );
