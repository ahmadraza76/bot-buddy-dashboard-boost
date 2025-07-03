import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AIAssistantRequest {
  botId: string;
  userId: string;
  message: string;
  context?: 'error' | 'general' | 'setup' | 'logs';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { botId, userId, message, context }: AIAssistantRequest = await req.json()

    console.log(`Personalized AI request for user ${userId}, bot ${botId}`)

    // Get user's bot data for personalized context
    const botContext = await getUserBotContext(supabaseClient, botId, userId)
    
    if (!botContext.hasAccess) {
      throw new Error('Access denied: Bot does not belong to user')
    }

    // Get user-specific logs and errors
    const userLogs = await getUserBotLogs(supabaseClient, botId, 50)
    
    // Get user's AI interaction history
    const chatHistory = await getUserChatHistory(supabaseClient, userId, botId, 10)

    // Create personalized AI prompt
    const systemPrompt = createPersonalizedPrompt(botContext, userLogs, context)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...chatHistory.map(chat => ({ 
            role: chat.role, 
            content: chat.message 
          })),
          { role: 'user', content: message }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Save interaction for future context
    await saveUserInteraction(supabaseClient, userId, botId, message, aiResponse, context)

    return new Response(JSON.stringify({ 
      success: true,
      response: aiResponse,
      botInfo: {
        name: botContext.bot.username,
        status: botContext.bot.status,
        health: botContext.bot.health_score
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Personalized AI error:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})

async function getUserBotContext(supabaseClient: any, botId: string, userId: string) {
  // Verify user owns this bot
  const { data: bot, error } = await supabaseClient
    .from('bots')
    .select(`
      *,
      profiles!bots_user_id_fkey(email, telegram_id)
    `)
    .eq('id', botId)
    .eq('user_id', userId)
    .single()

  if (error || !bot) {
    return { hasAccess: false, bot: null }
  }

  return { hasAccess: true, bot }
}

async function getUserBotLogs(supabaseClient: any, botId: string, limit: number = 50) {
  const { data: logs } = await supabaseClient
    .from('bot_logs')
    .select('*')
    .eq('bot_id', botId)
    .order('timestamp', { ascending: false })
    .limit(limit)

  return logs || []
}

async function getUserChatHistory(supabaseClient: any, userId: string, botId: string, limit: number = 10) {
  const { data: history } = await supabaseClient
    .from('ai_chat_history')
    .select('role, message, timestamp')
    .eq('user_id', userId)
    .eq('bot_id', botId)
    .order('timestamp', { ascending: false })
    .limit(limit * 2) // Get both user and AI messages

  return (history || []).reverse() // Return in chronological order
}

function createPersonalizedPrompt(botContext: any, userLogs: any[], context?: string) {
  const bot = botContext.bot
  const recentErrors = userLogs.filter(log => log.log_level === 'error').slice(0, 5)
  const lastActivity = bot.last_activity ? new Date(bot.last_activity).toLocaleDateString() : 'Never'

  let contextPrompt = ''
  switch (context) {
    case 'error':
      contextPrompt = '\n\nFocus on helping with errors and troubleshooting.'
      break
    case 'setup':
      contextPrompt = '\n\nFocus on bot configuration and setup guidance.'
      break
    case 'logs':
      contextPrompt = '\n\nFocus on log analysis and monitoring.'
      break
    default:
      contextPrompt = '\n\nProvide general assistance with their bot.'
  }

  return `तुम एक personalized AI assistant हो for ${bot.profiles?.email || 'user'} का Telegram bot "${bot.username}".

🤖 Bot Details:
- Name: ${bot.username}
- Status: ${bot.status}
- Health Score: ${bot.health_score}/100
- Container ID: ${bot.container_id}
- Last Activity: ${lastActivity}
- Auto-heal: ${bot.auto_heal_enabled ? 'Enabled' : 'Disabled'}

📊 Recent Activity:
- Total Errors: ${bot.error_count || 0}
- Restart Count: ${bot.restart_count || 0}
- Deployment Status: ${bot.deployment_status}

🚨 Recent Errors (if any):
${recentErrors.length > 0 ? recentErrors.map(log => `- [${log.timestamp}] ${log.message}`).join('\n') : 'No recent errors detected.'}

💡 Instructions:
- Reply ONLY in Hindi/Hinglish 
- Give solutions specific to THIS bot only
- Use bot's actual data in responses
- If user asks about other bots, politely redirect to their own bot
- Be helpful but concise
- Format responses with emojis for better readability

${contextPrompt}`
}

async function saveUserInteraction(supabaseClient: any, userId: string, botId: string, userMessage: string, aiResponse: string, context?: string) {
  // Save user message
  await supabaseClient
    .from('ai_chat_history')
    .insert({
      user_id: userId,
      bot_id: botId,
      role: 'user',
      message: userMessage,
      context: context || 'general'
    })

  // Save AI response
  await supabaseClient
    .from('ai_chat_history')
    .insert({
      user_id: userId,
      bot_id: botId,
      role: 'assistant',
      message: aiResponse,
      context: context || 'general'
    })
}