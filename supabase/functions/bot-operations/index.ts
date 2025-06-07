
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
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { action, botId, botData } = await req.json()

    switch (action) {
      case 'start':
        // Simulate starting a bot container
        const { data: startData, error: startError } = await supabaseClient
          .from('bots')
          .update({
            status: 'running',
            uptime_start: new Date().toISOString(),
            container_id: `container_${Math.random().toString(36).substring(7)}`,
            last_activity: new Date().toISOString()
          })
          .eq('id', botId)
          .select()
          .single()

        if (startError) throw startError

        return new Response(
          JSON.stringify({ success: true, data: startData }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'stop':
        // Simulate stopping a bot container
        const { data: stopData, error: stopError } = await supabaseClient
          .from('bots')
          .update({
            status: 'stopped',
            uptime_start: null,
            container_id: null,
            last_activity: new Date().toISOString()
          })
          .eq('id', botId)
          .select()
          .single()

        if (stopError) throw stopError

        return new Response(
          JSON.stringify({ success: true, data: stopData }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'restart':
        // Simulate restarting a bot container
        const { data: restartData, error: restartError } = await supabaseClient
          .from('bots')
          .update({
            status: 'running',
            uptime_start: new Date().toISOString(),
            container_id: `container_${Math.random().toString(36).substring(7)}`,
            last_activity: new Date().toISOString()
          })
          .eq('id', botId)
          .select()
          .single()

        if (restartError) throw restartError

        return new Response(
          JSON.stringify({ success: true, data: restartData }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'update_metrics':
        // Simulate updating bot metrics
        const { data: metricsData, error: metricsError } = await supabaseClient
          .from('bots')
          .update({
            memory_usage: `${Math.floor(Math.random() * 512) + 100}MB`,
            cpu_usage: `${Math.floor(Math.random() * 50) + 10}%`,
            last_activity: new Date().toISOString()
          })
          .eq('id', botId)
          .select()
          .single()

        if (metricsError) throw metricsError

        return new Response(
          JSON.stringify({ success: true, data: metricsData }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      default:
        throw new Error('Invalid action')
    }
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
