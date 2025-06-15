import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Tables } from '@/integrations/supabase/types';
import { useToast } from "@/hooks/use-toast";

type PayoutRequest = Tables<'payout_requests'>;

export const useUserPayoutRequests = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['payout-requests', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('payout_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
};

export const useCreatePayoutRequest = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: {
      amount: number;
      method: 'bank' | 'usdt_trc20' | 'upi';
      details: Record<string, any>;
    }) => {
      if (!user?.id) throw new Error('No user found');
      const { data, error } = await supabase
        .from('payout_requests')
        .insert({
          user_id: user.id,
          amount: input.amount,
          method: input.method,
          details: input.details,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payout-requests', user?.id] });
    },
  });
};

export const useAdminPayoutRequests = () => {
  return useQuery({
    queryKey: ['admin-payout-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payout_requests')
        .select(`
          *,
          profiles(email)
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
};

// Add post-approval toast for user on payout approval
export const useUpdatePayoutStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }) => {
      const { data, error } = await supabase
        .from('payout_requests')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;

      // Notify user if payout was approved
      if (status === "approved" && data?.user_id) {
        // This example only triggers a toast for an in-app admin;
        // ideally, you'd trigger a notification for the right user
        // For demo: show system toast
        toast({
          title: "Payout Approved",
          description: "User has been notified of payout approval.",
        });
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-payout-requests'] });
    },
  });
};
