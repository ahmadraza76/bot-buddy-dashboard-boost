
-- Create comprehensive database structure for AI-powered bot manager

-- Update existing bots table to include more fields for AI management
ALTER TABLE public.bots ADD COLUMN IF NOT EXISTS bot_token TEXT;
ALTER TABLE public.bots ADD COLUMN IF NOT EXISTS sudo_user_id TEXT;
ALTER TABLE public.bots ADD COLUMN IF NOT EXISTS api_key TEXT;
ALTER TABLE public.bots ADD COLUMN IF NOT EXISTS auto_heal_enabled BOOLEAN DEFAULT true;
ALTER TABLE public.bots ADD COLUMN IF NOT EXISTS restart_count INTEGER DEFAULT 0;
ALTER TABLE public.bots ADD COLUMN IF NOT EXISTS health_score INTEGER DEFAULT 100;
ALTER TABLE public.bots ADD COLUMN IF NOT EXISTS deployment_status TEXT DEFAULT 'pending';
ALTER TABLE public.bots ADD COLUMN IF NOT EXISTS container_logs TEXT;
ALTER TABLE public.bots ADD COLUMN IF NOT EXISTS error_count INTEGER DEFAULT 0;
ALTER TABLE public.bots ADD COLUMN IF NOT EXISTS last_error TEXT;

-- Create bot_logs table for real-time log storage
CREATE TABLE IF NOT EXISTS public.bot_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bot_id UUID REFERENCES public.bots(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  log_level TEXT NOT NULL DEFAULT 'info',
  message TEXT NOT NULL,
  source TEXT,
  processed_by_ai BOOLEAN DEFAULT false,
  action_taken TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_actions table for tracking AI interventions
CREATE TABLE IF NOT EXISTS public.ai_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bot_id UUID REFERENCES public.bots(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  error_detected TEXT,
  solution_applied TEXT,
  success BOOLEAN DEFAULT false,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ai_confidence FLOAT DEFAULT 0.0,
  manual_override BOOLEAN DEFAULT false
);

-- Create notifications table for user alerts
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  bot_id UUID REFERENCES public.bots(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  read BOOLEAN DEFAULT false,
  sent_to_telegram BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create system_health table for overall monitoring
CREATE TABLE IF NOT EXISTS public.system_health (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value FLOAT NOT NULL,
  unit TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB
);

-- Enable RLS on new tables
ALTER TABLE public.bot_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_health ENABLE ROW LEVEL SECURITY;

-- RLS policies for bot_logs
CREATE POLICY "Users can view their bot logs" 
  ON public.bot_logs 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.bots 
    WHERE bots.id = bot_logs.bot_id AND bots.user_id = auth.uid()
  ));

CREATE POLICY "System can insert bot logs" 
  ON public.bot_logs 
  FOR INSERT 
  WITH CHECK (true);

-- RLS policies for ai_actions
CREATE POLICY "Users can view their ai actions" 
  ON public.ai_actions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert ai actions" 
  ON public.ai_actions 
  FOR INSERT 
  WITH CHECK (true);

-- RLS policies for notifications
CREATE POLICY "Users can view their notifications" 
  ON public.notifications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their notifications" 
  ON public.notifications 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" 
  ON public.notifications 
  FOR INSERT 
  WITH CHECK (true);

-- RLS policies for system_health (admin only)
CREATE POLICY "Admins can view system health" 
  ON public.system_health 
  FOR SELECT 
  USING (has_admin_role(auth.uid()));

CREATE POLICY "System can insert health metrics" 
  ON public.system_health 
  FOR INSERT 
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bot_logs_bot_id_timestamp ON public.bot_logs(bot_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_ai_actions_bot_id_timestamp ON public.ai_actions(bot_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id_created ON public.notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(user_id, read) WHERE NOT read;

-- Create function to calculate bot health score
CREATE OR REPLACE FUNCTION calculate_bot_health_score(bot_id_param UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  error_count INTEGER;
  restart_count INTEGER;
  last_activity TIMESTAMP;
  health_score INTEGER := 100;
BEGIN
  -- Get bot metrics
  SELECT 
    COALESCE(error_count, 0),
    COALESCE(restart_count, 0),
    last_activity
  INTO error_count, restart_count, last_activity
  FROM public.bots 
  WHERE id = bot_id_param;
  
  -- Deduct points for errors (max 30 points)
  health_score := health_score - LEAST(error_count * 2, 30);
  
  -- Deduct points for restarts (max 20 points)
  health_score := health_score - LEAST(restart_count * 5, 20);
  
  -- Deduct points for inactivity (max 25 points)
  IF last_activity IS NULL OR last_activity < NOW() - INTERVAL '1 hour' THEN
    health_score := health_score - 25;
  ELSIF last_activity < NOW() - INTERVAL '30 minutes' THEN
    health_score := health_score - 10;
  END IF;
  
  -- Ensure minimum score of 0
  health_score := GREATEST(health_score, 0);
  
  RETURN health_score;
END;
$$;

-- Create function to trigger AI healing
CREATE OR REPLACE FUNCTION trigger_ai_healing(bot_id_param UUID, error_message TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert log entry
  INSERT INTO public.bot_logs (bot_id, log_level, message, source)
  VALUES (bot_id_param, 'error', error_message, 'system');
  
  -- Trigger AI healing via edge function (this will be called from the application)
  -- Update bot error count
  UPDATE public.bots 
  SET 
    error_count = error_count + 1,
    last_error = error_message,
    health_score = calculate_bot_health_score(bot_id_param)
  WHERE id = bot_id_param;
END;
$$;

-- Create function to update bot health periodically
CREATE OR REPLACE FUNCTION update_all_bot_health_scores()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.bots 
  SET health_score = calculate_bot_health_score(id)
  WHERE status IN ('running', 'error');
END;
$$;
