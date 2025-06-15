
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const { phone } = await req.json();
    // TODO: Replace with your backend or external API call to send OTP via Telegram/your Pyrogram infra
    // For now, just simulate and return a fake otpSessionId
    console.log("Would trigger OTP for phone:", phone);

    // Simulate session id (in practice, store in user_otp_sessions in Supabase via edge function or your backend)
    return new Response(JSON.stringify({ otpSessionId: "mock-session-id" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
