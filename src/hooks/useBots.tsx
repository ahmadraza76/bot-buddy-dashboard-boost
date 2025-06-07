
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Tables, Enums } from '@/integrations/supabase/types';

type Bot = Tables<'bots'>;

export const useBots = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['bots', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('bots')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
};

export const useCreateBot = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (botData: { username: string }) => {
      if (!user?.id) throw new Error('No user found');

      const { data, error } = await supabase
        .from('bots')
        .insert({
          user_id: user.id,
          username: botData.username,
          status: 'stopped' as Enums<'bot_status'>,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bots', user?.id] });
    },
  });
};

export const useUpdateBotStatus = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ botId, status }: { botId: string; status: Enums<'bot_status'> }) => {
      const { data, error } = await supabase
        .from('bots')
        .update({ 
          status,
          uptime_start: status === 'running' ? new Date().toISOString() : null,
          last_activity: new Date().toISOString()
        })
        .eq('id', botId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bots', user?.id] });
    },
  });
};
