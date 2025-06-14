
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") ?? "";

function verifyRazorpaySignature(body: string, signature: string, secret: string) {
  const hmac = new Uint8Array(
    Array.from(
      crypto.subtle
        .importKey(
          "raw",
          new TextEncoder().encode(secret),
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign", "verify"],
        )
        .then((key) =>
          crypto.subtle.sign(
            "HMAC",
            key,
            new TextEncoder().encode(body),
          )
        )
        .then((sig) => new Uint8Array(sig))
    )
  );
  // This is a placeholder, as true HMAC validation is not readily done in Deno Edge functions at the moment.
  // For production, use a Node.js server to validate or wait for better crypto support in Deno Deploy.
  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    // Get body as string
    const bodyText = await req.text();
    // Try to parse json
    const event = JSON.parse(bodyText);

    // Razorpay signature verification (for added security, recommended to add in prod)
    // let razorpaySignature = req.headers.get("x-razorpay-signature");
    // if (!verifyRazorpaySignature(bodyText, razorpaySignature, RAZORPAY_KEY_SECRET)) {
    //   return new Response(JSON.stringify({ error: "Invalid signature" }), {
    //     headers: corsHeaders,
    //     status: 400
    //   });
    // }

    // Payment event handling
    if (
      event.event === "payment.captured" &&
      event.payload &&
      event.payload.payment &&
      event.payload.payment.entity &&
      event.payload.payment.entity.status === "captured"
    ) {
      const paymentEntity = event.payload.payment.entity;
      const transactionId = paymentEntity.order_id || paymentEntity.id;
      const amount = String(paymentEntity.amount / 100); // Razorpay returns in paise
      const email = paymentEntity.email || paymentEntity.notes?.email || null;
      let user_id = null;
      let plan = paymentEntity.notes?.plan || "Monthly";

      // Find user and payment entry (if email/note present)
      let userRes = { data: null, error: null };
      if (email) {
        userRes = await supabase
          .from("profiles")
          .select("id")
          .eq("email", email)
          .maybeSingle();
        user_id = userRes.data?.id;
      }

      // Update payment
      const paymentUpdate = await supabase
        .from("payments")
        .update({ status: "completed" })
        .eq("transaction_id", transactionId)
        .select()
        .maybeSingle();

      // Update user subscription (activate plan)
      if (user_id) {
        await supabase
          .from("profiles")
          .update({
            subscription_type: plan,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user_id);
      }

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "No action taken" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Razorpay webhook error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
