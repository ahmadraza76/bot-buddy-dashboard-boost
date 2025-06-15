
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePlatformSettings = () => {
  return useQuery({
    queryKey: ["platform-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platform_settings")
        .select("*");
      if (error) throw error;
      // Return as key-value object
      return (data || []).reduce((acc: any, row: any) => {
        acc[row.key] = row.value;
        return acc;
      }, {});
    },
  });
};

export const useUpdatePlatformSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      // UPSERT
      const { error } = await supabase
        .from("platform_settings")
        .upsert([{ key, value, updated_at: new Date().toISOString() }]);
      if (error) throw error;
      return { key, value };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform-settings"] });
    },
  });
};
