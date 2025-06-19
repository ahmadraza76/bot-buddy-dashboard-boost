
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BotOperationRequest {
  action: string;
  botId: string;
  botData?: {
    username: string;
    bot_token: string;
    sudo_user_id: string;
    api_key?: string;
    auto_heal_enabled?: boolean;
  };
  userId?: string;
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

    const { action, botId, botData, userId }: BotOperationRequest = await req.json()

    console.log(`Bot operation triggered: ${action} for bot ${botId}`)

    let result = {
      success: false,
      message: '',
      data: null as any
    }

    switch (action) {
      case 'deploy':
        result = await deployBot(botData!, userId!)
        break
      case 'start':
        result = await startBot(botId)
        break
      case 'stop':
        result = await stopBot(botId)
        break
      case 'restart':
        result = await restartBot(botId)
        break
      case 'get_logs':
        result = await getBotLogs(botId)
        break
      case 'update_status':
        result = await updateBotStatus(botId, req)
        break
      default:
        throw new Error('Invalid bot operation')
    }

    // Log the operation
    await supabaseClient
      .from('bot_logs')
      .insert({
        bot_id: botId,
        log_level: result.success ? 'info' : 'error',
        message: `Operation ${action}: ${result.message}`,
        source: 'bot_operations'
      })

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Bot operations error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message,
        data: null 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

async function deployBot(botData: any, userId: string) {
  console.log('Deploying bot for user:', userId)
  
  // Validate bot token with Telegram API
  const tokenValidation = await validateBotToken(botData.bot_token)
  if (!tokenValidation.valid) {
    return {
      success: false,
      message: 'Invalid bot token provided',
      data: null
    }
  }

  // Create Docker container configuration
  const containerConfig = {
    image: 'python:3.9-slim',
    env: {
      BOT_TOKEN: botData.bot_token,
      SUDO_USER_ID: botData.sudo_user_id,
      API_KEY: botData.api_key || '',
      AUTO_HEAL: botData.auto_heal_enabled ? 'true' : 'false'
    },
    ports: ['8080:8080'],
    restart_policy: 'unless-stopped'
  }

  // Simulate container deployment
  const containerId = `bot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  // Update bot in database
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  const { data, error } = await supabaseClient
    .from('bots')
    .insert({
      user_id: userId,
      username: botData.username,
      bot_token: botData.bot_token,
      sudo_user_id: botData.sudo_user_id,
      api_key: botData.api_key,
      auto_heal_enabled: botData.auto_heal_enabled,
      container_id: containerId,
      status: 'running',
      deployment_status: 'deployed',
      health_score: 100,
      uptime_start: new Date().toISOString()
    })
    .select()
    .single()

  if (error) {
    return {
      success: false,
      message: 'Failed to save bot configuration',
      data: null
    }
  }

  // Create notification
  await supabaseClient
    .from('notifications')
    .insert({
      user_id: userId,
      bot_id: data.id,
      title: 'Bot Deployed Successfully',
      message: `Your bot ${botData.username} has been deployed and is now running`,
      type: 'success'
    })

  return {
    success: true,
    message: 'Bot deployed successfully',
    data: {
      botId: data.id,
      containerId,
      status: 'running'
    }
  }
}

async function startBot(botId: string) {
  console.log('Starting bot:', botId)
  
  // Simulate bot start
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  await supabaseClient
    .from('bots')
    .update({
      status: 'running',
      uptime_start: new Date().toISOString(),
      last_activity: new Date().toISOString()
    })
    .eq('id', botId)

  return {
    success: true,
    message: 'Bot started successfully',
    data: { status: 'running' }
  }
}

async function stopBot(botId: string) {
  console.log('Stopping bot:', botId)
  
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  await supabaseClient
    .from('bots')
    .update({
      status: 'stopped',
      uptime_start: null,
      last_activity: new Date().toISOString()
    })
    .eq('id', botId)

  return {
    success: true,
    message: 'Bot stopped successfully',
    data: { status: 'stopped' }
  }
}

async function restartBot(botId: string) {
  console.log('Restarting bot:', botId)
  
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // Increment restart count
  const { data: bot } = await supabaseClient
    .from('bots')
    .select('restart_count')
    .eq('id', botId)
    .single()

  await supabaseClient
    .from('bots')
    .update({
      status: 'running',
      restart_count: (bot?.restart_count || 0) + 1,
      uptime_start: new Date().toISOString(),
      last_activity: new Date().toISOString()
    })
    .eq('id', botId)

  return {
    success: true,
    message: 'Bot restarted successfully',
    data: { status: 'running' }
  }
}

async function getBotLogs(botId: string) {
  console.log('Getting logs for bot:', botId)
  
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  const { data: logs } = await supabaseClient
    .from('bot_logs')
    .select('*')
    .eq('bot_id', botId)
    .order('timestamp', { ascending: false })
    .limit(100)

  return {
    success: true,
    message: 'Logs retrieved successfully',
    data: logs || []
  }
}

async function updateBotStatus(botId: string, req: Request) {
  console.log('Updating bot status:', botId)
  
  // Simulate status update with real-time metrics
  const mockMetrics = {
    cpu_usage: `${Math.floor(Math.random() * 30 + 10)}%`,
    memory_usage: `${Math.floor(Math.random() * 200 + 50)}MB`,
    health_score: Math.floor(Math.random() * 20 + 80)
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  await supabaseClient
    .from('bots')
    .update({
      ...mockMetrics,
      last_activity: new Date().toISOString()
    })
    .eq('id', botId)

  return {
    success: true,
    message: 'Bot status updated',
    data: mockMetrics
  }
}

async function validateBotToken(token: string): Promise<{ valid: boolean, botInfo?: any }> {
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/getMe`)
    const data = await response.json()
    
    return {
      valid: data.ok,
      botInfo: data.result
    }
  } catch (error) {
    return { valid: false }
  }
}
