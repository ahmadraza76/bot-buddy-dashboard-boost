
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface BotLog {
  id: string;
  bot_id: string;
  timestamp: string;
  log_level: string;
  message: string;
  source?: string;
  processed_by_ai: boolean;
  action_taken?: string;
}

export const useBotLogs = (botId?: string) => {
  return useQuery({
    queryKey: ['bot-logs', botId],
    queryFn: async () => {
      if (!botId) return [];
      
      const { data, error } = await supabase
        .from('bot_logs')
        .select('*')
        .eq('bot_id', botId)
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error) throw error;
      return (data || []) as BotLog[];
    },
    enabled: !!botId,
    refetchInterval: 5000, // Refresh every 5 seconds for real-time logs
  });
};

export const useAddBotLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (logData: {
      bot_id: string;
      log_level: string;
      message: string;
      source?: string;
    }) => {
      const { data, error } = await supabase
        .from('bot_logs')
        .insert(logData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bot-logs', data.bot_id] });
    },
  });
};
