import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Database } from '@/integrations/supabase/types';

export type HealingAction = Database['public']['Tables']['healing_actions']['Row'];
export type AdminAlert = Database['public']['Tables']['admin_alerts']['Row'] & {
  profiles?: { email: string };
  bots?: { username: string };
};

export const useHealingHistory = (botId?: string) => {
  return useQuery({
    queryKey: ['healing-history', botId],
    queryFn: async () => {
      if (!botId) return [];
      
      const { data, error } = await supabase
        .from('healing_actions')
        .select('*')
        .eq('bot_id', botId)
        .order('timestamp', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!botId,
  });
};

export const useAdminAlerts = () => {
  return useQuery({
    queryKey: ['admin-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_alerts')
        .select(`
          *,
          profiles!admin_alerts_user_id_fkey(email),
          bots!admin_alerts_bot_id_fkey(username)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useTriggerHealing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ botId, logContent }: { botId: string; logContent: string }) => {
      const { data, error } = await supabase.functions.invoke('ai-healing-system', {
        body: {
          action: 'analyze_and_heal',
          botId,
          logContent,
          userId: (await supabase.auth.getUser()).data.user?.id
        }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['healing-history', variables.botId] });
      queryClient.invalidateQueries({ queryKey: ['bots'] });
      queryClient.invalidateQueries({ queryKey: ['admin-alerts'] });
    },
  });
};

export const useResolveAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (alertId: string) => {
      const { data, error } = await supabase
        .from('admin_alerts')
        .update({ status: 'resolved' })
        .eq('id', alertId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-alerts'] });
    },
  });
};

export const useHealingStats = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['healing-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from('healing_actions')
        .select('status, error_type, timestamp')
        .eq('user_id', user.id);

      if (error) throw error;

      const stats = {
        totalHealing: data?.length || 0,
        successRate: data ? (data.filter(h => h.status === 'success').length / data.length) * 100 : 0,
        last24Hours: data?.filter(h => 
          new Date(h.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000
        ).length || 0,
        commonErrors: {} as Record<string, number>
      };

      data?.forEach(action => {
        stats.commonErrors[action.error_type] = (stats.commonErrors[action.error_type] || 0) + 1;
      });

      return stats;
    },
    enabled: !!user?.id,
  });
};
