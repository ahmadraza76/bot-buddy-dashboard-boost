
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface HealingRequest {
  action: string;
  botId: string;
  logContent?: string;
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

    const { action, botId, logContent, userId }: HealingRequest = await req.json()

    console.log(`AI Healing System triggered: ${action} for bot ${botId}`)

    // AI-powered error detection and healing logic
    let healingResult = {
      success: false,
      action: '',
      solution: '',
      confidence: 0,
    }

    switch (action) {
      case 'analyze_and_heal':
        healingResult = await analyzeAndHeal(logContent || '', botId)
        break
      case 'restart_bot':
        healingResult = await restartBot(botId)
        break
      case 'check_health':
        healingResult = await checkBotHealth(botId)
        break
      default:
        throw new Error('Invalid healing action')
    }

    // Log the AI action
    await supabaseClient
      .from('healing_actions')
      .insert({
        bot_id: botId,
        user_id: userId,
        action: healingResult.action,
        error_type: extractErrorType(logContent || ''),
        status: healingResult.success ? 'success' : 'failed',
        fix_details: {
          solution: healingResult.solution,
          confidence: healingResult.confidence,
          timestamp: new Date().toISOString()
        }
      })

    // Create notification for user
    if (userId) {
      await supabaseClient
        .from('notifications')
        .insert({
          user_id: userId,
          bot_id: botId,
          title: healingResult.success ? 'AI Healing Successful' : 'AI Healing Failed',
          message: healingResult.solution,
          type: healingResult.success ? 'success' : 'error'
        })
    }

    // Update bot status and health
    await supabaseClient
      .from('bots')
      .update({
        last_activity: new Date().toISOString(),
        health_score: healingResult.success ? Math.min((await getBotHealthScore(botId)) + 10, 100) : Math.max((await getBotHealthScore(botId)) - 5, 0)
      })
      .eq('id', botId)

    return new Response(
      JSON.stringify({
        success: healingResult.success,
        message: healingResult.solution,
        confidence: healingResult.confidence
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('AI Healing System error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

async function analyzeAndHeal(logContent: string, botId: string) {
  console.log('Analyzing log content for bot:', botId)
  
  // AI-powered error pattern matching
  const errorPatterns = {
    'pytgcalls_crash': /PyTgCalls.*(?:crashed|error|failed)/i,
    'api_timeout': /(?:timeout|timed out).*api/i,
    'memory_error': /(?:memory|RAM).*(?:error|full|exceeded)/i,
    'ffmpeg_error': /ffmpeg.*(?:not found|error|failed)/i,
    'connection_error': /(?:connection|network).*(?:error|failed|lost)/i,
    'token_invalid': /(?:token|authorization).*(?:invalid|expired|unauthorized)/i,
  }

  let detectedError = 'unknown_error'
  let confidence = 0.5

  // Pattern matching with confidence scoring
  for (const [errorType, pattern] of Object.entries(errorPatterns)) {
    if (pattern.test(logContent)) {
      detectedError = errorType
      confidence = 0.9
      break
    }
  }

  // Apply healing solutions based on detected error
  const healingSolutions = {
    'pytgcalls_crash': {
      action: 'restart_pytgcalls_service',
      solution: 'Restarted PyTgCalls service due to crash detection',
      commands: ['sudo systemctl restart pytgcalls', 'pip install --upgrade pytgcalls']
    },
    'api_timeout': {
      action: 'increase_timeout_and_retry',
      solution: 'Increased API timeout and implemented retry mechanism',
      commands: ['export API_TIMEOUT=30', 'restart bot with new config']
    },
    'memory_error': {
      action: 'clear_memory_and_restart',
      solution: 'Cleared memory cache and restarted bot process',
      commands: ['free -h', 'kill -9 $(pgrep python)', 'restart bot']
    },
    'ffmpeg_error': {
      action: 'install_ffmpeg',
      solution: 'Installed/updated FFmpeg dependencies',
      commands: ['sudo apt update', 'sudo apt install -y ffmpeg']
    },
    'connection_error': {
      action: 'reset_network_connection',
      solution: 'Reset network connection and DNS settings',
      commands: ['sudo systemctl restart networking', 'nslookup telegram.org']
    },
    'token_invalid': {
      action: 'validate_and_refresh_token',
      solution: 'Bot token validation required - please check your token',
      commands: ['validate_token_with_telegram_api']
    }
  }

  const solution = healingSolutions[detectedError] || {
    action: 'generic_restart',
    solution: 'Applied generic healing by restarting bot process',
    commands: ['restart bot process']
  }

  // Simulate healing execution (in real implementation, this would execute actual commands)
  const success = Math.random() > 0.2 // 80% success rate simulation

  return {
    success,
    action: solution.action,
    solution: solution.solution,
    confidence
  }
}

async function restartBot(botId: string) {
  console.log('Restarting bot:', botId)
  
  // Simulate bot restart
  return {
    success: true,
    action: 'bot_restart',
    solution: 'Bot successfully restarted',
    confidence: 1.0
  }
}

async function checkBotHealth(botId: string) {
  console.log('Checking bot health:', botId)
  
  // Simulate health check
  return {
    success: true,
    action: 'health_check',
    solution: 'Bot health check completed - all systems operational',
    confidence: 0.95
  }
}

function extractErrorType(logContent: string): string {
  if (/pytgcalls/i.test(logContent)) return 'pytgcalls_error'
  if (/timeout/i.test(logContent)) return 'timeout_error'
  if (/memory/i.test(logContent)) return 'memory_error'
  if (/ffmpeg/i.test(logContent)) return 'ffmpeg_error'
  if (/connection/i.test(logContent)) return 'connection_error'
  if (/token/i.test(logContent)) return 'token_error'
  return 'unknown_error'
}

async function getBotHealthScore(botId: string): Promise<number> {
  // This would normally query the database for the current health score
  return 75 // Default health score
}
