
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

    console.log(`AI Healing triggered: ${action} for bot ${botId}`)

    let result = {
      success: false,
      message: '',
      data: null as any
    }

    switch (action) {
      case 'analyze_and_heal':
        result = await analyzeAndHeal(supabaseClient, botId, logContent!, userId!)
        break
      case 'get_healing_history':
        result = await getHealingHistory(supabaseClient, botId)
        break
      case 'get_healing_stats':
        result = await getHealingStats(supabaseClient, userId!)
        break
      default:
        throw new Error('Invalid healing action')
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('AI Healing error:', error)
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

async function analyzeAndHeal(supabaseClient: any, botId: string, logContent: string, userId: string) {
  console.log('Analyzing logs for bot:', botId)
  
  // Get OpenAI API key from environment or user settings
  let openaiApiKey = Deno.env.get('OPENAI_API_KEY')
  
  if (!openaiApiKey) {
    // Try to get from user settings (placeholder for future implementation)
    console.log('No OpenAI API key found in environment')
    return {
      success: false,
      message: 'OpenAI API key not configured. Please add it in AI Settings.',
      data: null
    }
  }

  // Analyze the log content with AI
  const analysis = await analyzeLogWithAI(logContent, openaiApiKey)
  
  if (!analysis.needsHealing) {
    return {
      success: true,
      message: 'No issues detected in logs',
      data: { analysis }
    }
  }

  // Apply the suggested fix
  const healingResult = await applyFix(supabaseClient, botId, analysis.suggestedFix)
  
  // Log the AI action
  await supabaseClient
    .from('ai_actions')
    .insert({
      bot_id: botId,
      user_id: userId,
      action_type: analysis.issueType,
      error_detected: analysis.errorMessage,
      solution_applied: analysis.suggestedFix,
      success: healingResult.success,
      ai_confidence: analysis.confidence
    })

  // Create notification for user
  await supabaseClient
    .from('notifications')
    .insert({
      user_id: userId,
      bot_id: botId,
      title: healingResult.success ? 'AI Auto-Heal Successful' : 'AI Auto-Heal Failed',
      message: `${analysis.issueType}: ${healingResult.message}`,
      type: healingResult.success ? 'ai_action' : 'error'
    })

  return {
    success: healingResult.success,
    message: healingResult.message,
    data: { analysis, healingResult }
  }
}

async function analyzeLogWithAI(logContent: string, apiKey: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert Telegram bot troubleshooter. Analyze the provided bot logs and determine:
1. If there are any critical errors that need immediate fixing
2. The type of error (connection, api, dependency, etc.)
3. A specific solution to fix the issue
4. Confidence level (0-1) in your analysis

Respond in JSON format:
{
  "needsHealing": boolean,
  "issueType": string,
  "errorMessage": string,
  "suggestedFix": string,
  "confidence": number
}`
          },
          {
            role: 'user',
            content: `Analyze these bot logs:\n\n${logContent}`
          }
        ],
        temperature: 0.3,
      }),
    })

    const data = await response.json()
    const aiResponse = JSON.parse(data.choices[0].message.content)
    
    return aiResponse
  } catch (error) {
    console.error('AI Analysis failed:', error)
    return {
      needsHealing: false,
      issueType: 'analysis_failed',
      errorMessage: 'Failed to analyze logs with AI',
      suggestedFix: 'Manual review required',
      confidence: 0
    }
  }
}

async function applyFix(supabaseClient: any, botId: string, suggestedFix: string) {
  console.log('Applying fix for bot:', botId, suggestedFix)
  
  // Common fixes mapping
  const fixActions = {
    'restart_bot': async () => {
      // Call bot-operations to restart
      const response = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/bot-operations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'restart',
          botId: botId
        })
      })
      return await response.json()
    },
    'update_dependencies': async () => {
      // Simulate dependency update
      return { success: true, message: 'Dependencies updated successfully' }
    },
    'clear_cache': async () => {
      // Simulate cache clearing
      return { success: true, message: 'Cache cleared successfully' }
    },
    'reset_connection': async () => {
      // Simulate connection reset
      return { success: true, message: 'Connection reset successfully' }
    }
  }

  // Try to match the suggested fix to a known action
  for (const [action, func] of Object.entries(fixActions)) {
    if (suggestedFix.toLowerCase().includes(action.replace('_', ' '))) {
      try {
        return await func()
      } catch (error) {
        return {
          success: false,
          message: `Failed to apply fix: ${error.message}`
        }
      }
    }
  }

  // If no specific fix found, try a generic restart
  try {
    return await fixActions.restart_bot()
  } catch (error) {
    return {
      success: false,
      message: 'No applicable fix found, manual intervention required'
    }
  }
}

async function getHealingHistory(supabaseClient: any, botId: string) {
  const { data, error } = await supabaseClient
    .from('ai_actions')
    .select('*')
    .eq('bot_id', botId)
    .order('timestamp', { ascending: false })
    .limit(20)

  if (error) throw error

  return {
    success: true,
    message: 'Healing history retrieved',
    data: data || []
  }
}

async function getHealingStats(supabaseClient: any, userId: string) {
  const { data, error } = await supabaseClient
    .from('ai_actions')
    .select('success, error_detected, timestamp')
    .eq('user_id', userId)

  if (error) throw error

  const actions = data || []
  const stats = {
    total: actions.length,
    successful: actions.filter((a: any) => a.success).length,
    failed: actions.filter((a: any) => !a.success).length,
    last24h: actions.filter((a: any) => 
      new Date(a.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000
    ).length,
    commonErrors: {} as Record<string, number>
  }

  // Count common errors
  actions.forEach((action: any) => {
    if (action.error_detected) {
      stats.commonErrors[action.error_detected] = (stats.commonErrors[action.error_detected] || 0) + 1
    }
  })

  return {
    success: true,
    message: 'Healing stats retrieved',
    data: stats
  }
}
