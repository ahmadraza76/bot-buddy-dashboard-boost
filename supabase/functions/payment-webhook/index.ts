
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { payment_id, status, transaction_id } = await req.json()

    // Update payment status
    const { data, error } = await supabaseClient
      .from('payments')
      .update({ status })
      .eq('transaction_id', transaction_id)
      .select(`
        *,
        profiles(id, email, subscription_type)
      `)
      .single()

    if (error) throw error

    // If payment is completed, update user subscription
    if (status === 'completed' && data) {
      await supabaseClient
        .from('profiles')
        .update({ 
          subscription_type: data.plan,
          updated_at: new Date().toISOString()
        })
        .eq('id', data.user_id)
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
