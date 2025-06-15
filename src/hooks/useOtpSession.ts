
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useOtpSession() {
  const [loading, setLoading] = useState(false);
  const [otpSessionId, setOtpSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Start the OTP process (call the edge function to send OTP)
  const startOtpSession = async (phone: string) => {
    setLoading(true);
    setError(null);

    // Placeholder: call edge function here
    const { data, error } = await supabase.functions.invoke("send-otp", {
      body: { phone },
    });

    if (error) {
      setError(error.message || "Failed to send OTP");
      setLoading(false);
      return;
    }
    setOtpSessionId(data?.otpSessionId);
    setLoading(false);
  };

  // Verify the OTP code (calls edge function to verify and generate session string)
  const verifyOtpCode = async (phone: string, code: string, otpSessionId: string) => {
    setLoading(true);
    setError(null);

    // Placeholder: call edge function here
    const { data, error } = await supabase.functions.invoke("verify-otp", {
      body: { phone, code, otpSessionId },
    });

    if (error) {
      setError(error.message || "Verification failed");
      setLoading(false);
      return { success: false };
    }
    setLoading(false);
    return { success: true, botStatus: data.botStatus };
  };

  return {
    startOtpSession,
    verifyOtpCode,
    otpSessionId,
    loading,
    error,
    setError,
  };
}
