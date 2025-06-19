
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

// Define proper types for our healing system
export interface HealingAction {
  id: string;
  bot_id: string;
  user_id: string;
  error_type: string;
  action: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  logs?: string;
  fix_details?: any;
}

export interface AdminAlert {
  id: string;
  type: string;
  bot_id?: string;
  user_id?: string;
  error_type?: string;
  reason?: string;
  severity?: string;
  message: string;
  status: 'open' | 'resolved';
  created_at: string;
  profiles?: { email: string };
  bots?: { username: string };
}

export const useHealingHistory = (botId?: string) => {
  return useQuery({
    queryKey: ['healing-history', botId],
    queryFn: async () => {
      if (!botId) return [];
      
      const { data, error } = await supabase
        .from('ai_actions')
        .select('*')
        .eq('bot_id', botId)
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('Error fetching healing history:', error);
        throw error;
      }
      return (data || []) as HealingAction[];
    },
    enabled: !!botId,
  });
};

export const useAdminAlerts = () => {
  return useQuery({
    queryKey: ['admin-alerts'],
    queryFn: async () => {
      // For now, return mock data since we don't have admin_alerts table
      // This can be updated when the table is created
      return [] as AdminAlert[];
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
      // Mock implementation for now
      return { id: alertId, status: 'resolved' };
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
        .from('ai_actions')
        .select('success, error_detected, timestamp')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching healing stats:', error);
        throw error;
      }

      const actions = (data || []) as any[];

      const stats = {
        totalHealing: actions.length,
        successRate: actions.length > 0 ? (actions.filter(h => h.success).length / actions.length) * 100 : 0,
        last24Hours: actions.filter(h => 
          new Date(h.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000
        ).length,
        commonErrors: {} as Record<string, number>
      };

      actions.forEach(action => {
        if (action.error_detected) {
          stats.commonErrors[action.error_detected] = (stats.commonErrors[action.error_detected] || 0) + 1;
        }
      });

      return stats;
    },
    enabled: !!user?.id,
  });
};
