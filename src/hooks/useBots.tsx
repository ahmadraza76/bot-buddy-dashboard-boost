
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
    mutationFn: async (botData: { 
      username: string;
      bot_token?: string;
      sudo_user_id?: string;
      api_key?: string;
      auto_heal_enabled?: boolean;
      bot_type?: 'music' | 'assistant' | 'custom';
      environment?: 'development' | 'production';
    }) => {
      if (!user?.id) throw new Error('No user found');

      // Call bot operations edge function
      const { data, error } = await supabase.functions.invoke('bot-operations', {
        body: {
          action: 'deploy',
          botId: null,
          botData: {
            username: botData.username,
            bot_token: botData.bot_token || '',
            sudo_user_id: botData.sudo_user_id || '',
            api_key: botData.api_key || '',
            auto_heal_enabled: botData.auto_heal_enabled ?? true,
            bot_type: botData.bot_type || 'assistant',
            environment: botData.environment || 'production'
          },
          userId: user.id
        }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.message);
      
      return data.data;
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
      const actionMap = {
        'running': 'start',
        'stopped': 'stop',
        'error': 'restart'
      };

      const { data, error } = await supabase.functions.invoke('bot-operations', {
        body: {
          action: actionMap[status] || 'start',
          botId,
          userId: user?.id
        }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.message);
      
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bots', user?.id] });
    },
  });
};
