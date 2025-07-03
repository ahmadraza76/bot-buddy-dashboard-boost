-- Create AI chat history table for personalized interactions
CREATE TABLE public.ai_chat_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  bot_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  message TEXT NOT NULL,
  context TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ai_chat_history ENABLE ROW LEVEL SECURITY;

-- Create policies for AI chat history
CREATE POLICY "Users can view their own chat history" 
ON public.ai_chat_history 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert chat history" 
ON public.ai_chat_history 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_ai_chat_history_user_bot ON public.ai_chat_history(user_id, bot_id);
CREATE INDEX idx_ai_chat_history_timestamp ON public.ai_chat_history(timestamp DESC);

-- Add foreign key constraints
ALTER TABLE public.ai_chat_history
ADD CONSTRAINT fk_ai_chat_history_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.ai_chat_history
ADD CONSTRAINT fk_ai_chat_history_bot_id 
FOREIGN KEY (bot_id) REFERENCES public.bots(id) ON DELETE CASCADE;