
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
    bot_type?: 'music' | 'assistant' | 'custom';
    environment?: 'development' | 'production';
    resource_limits?: {
      cpu: string;
      memory: string;
      storage: string;
    };
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
  console.log('Deploying isolated bot instance for user:', userId)
  
  // Validate bot token with Telegram API
  const tokenValidation = await validateBotToken(botData.bot_token)
  if (!tokenValidation.valid) {
    return {
      success: false,
      message: 'Invalid bot token provided',
      data: null
    }
  }

  // Create user-specific isolated container configuration (Replit-style)
  const userNamespace = `user_${userId.substring(0, 8)}`
  const botType = botData.bot_type || 'assistant'
  const environment = botData.environment || 'production'
  
  const containerConfig = {
    // User-isolated container with unique namespace
    image: getBotImage(botType),
    name: `${userNamespace}_${botData.username}_${Date.now()}`,
    env: {
      // User-specific environment
      USER_ID: userId,
      BOT_TOKEN: botData.bot_token,
      SUDO_USER_ID: botData.sudo_user_id,
      API_KEY: botData.api_key || '',
      AUTO_HEAL: botData.auto_heal_enabled ? 'true' : 'false',
      BOT_TYPE: botType,
      ENVIRONMENT: environment,
      USER_NAMESPACE: userNamespace,
      // Resource isolation
      PYTHONPATH: `/app/user_${userId}`,
      LOG_PATH: `/logs/user_${userId}`,
      CONFIG_PATH: `/config/user_${userId}`
    },
    // Resource limits (Replit-style)
    resource_limits: botData.resource_limits || {
      cpu: '0.5',
      memory: '512MB',
      storage: '1GB'
    },
    // User-specific networking
    ports: [`${8080 + parseInt(userId.substring(0, 4), 16) % 1000}:8080`],
    restart_policy: 'unless-stopped',
    // Mount user-specific volumes
    volumes: [
      `/data/users/${userId}:/app/data`,
      `/logs/users/${userId}:/app/logs`,
      `/config/users/${userId}:/app/config`
    ]
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

// Get appropriate Docker image based on bot type (Replit-style templates)
function getBotImage(botType: string): string {
  const images = {
    'music': 'python:3.9-slim', // Will have music libraries pre-installed
    'assistant': 'python:3.9-slim', // Will have AI/NLP libraries
    'custom': 'python:3.9-slim' // Basic Python environment
  }
  return images[botType] || images['custom']
}

// Create user-specific workspace (Replit-style file system)
async function createUserWorkspace(userId: string, botId: string, botType: string) {
  const workspace = {
    userId,
    botId,
    botType,
    files: {
      'main.py': generateBotTemplate(botType),
      'requirements.txt': generateRequirements(botType),
      'config.json': generateConfig(),
      'README.md': generateReadme(botType)
    },
    environment: {
      python_version: '3.9',
      pip_packages: getDefaultPackages(botType)
    }
  }
  
  return workspace
}

function generateBotTemplate(botType: string): string {
  const templates = {
    'music': `# Music Bot Template
import telebot
import yt_dlp
from telebot import types

bot = telebot.TeleBot(os.getenv('BOT_TOKEN'))

@bot.message_handler(commands=['play'])
def play_music(message):
    # Music bot logic here
    pass

if __name__ == '__main__':
    bot.polling()`,
    
    'assistant': `# AI Assistant Bot Template  
import telebot
import openai
from telebot import types

bot = telebot.TeleBot(os.getenv('BOT_TOKEN'))

@bot.message_handler(func=lambda message: True)
def ai_response(message):
    # AI assistant logic here
    pass

if __name__ == '__main__':
    bot.polling()`,
    
    'custom': `# Custom Bot Template
import telebot
from telebot import types

bot = telebot.TeleBot(os.getenv('BOT_TOKEN'))

@bot.message_handler(commands=['start'])
def start(message):
    bot.reply_to(message, "Bot is running!")

if __name__ == '__main__':
    bot.polling()`
  }
  
  return templates[botType] || templates['custom']
}

function generateRequirements(botType: string): string {
  const requirements = {
    'music': 'telebot\nyt-dlp\nffmpeg-python\nrequests',
    'assistant': 'telebot\nopenai\nrequests\nnumpy',
    'custom': 'telebot\nrequests'
  }
  
  return requirements[botType] || requirements['custom']
}

function generateConfig(): string {
  return JSON.stringify({
    bot_settings: {
      timeout: 30,
      polling_interval: 1,
      retry_attempts: 3
    },
    features: {
      auto_heal: true,
      logging: true,
      metrics: true
    }
  }, null, 2)
}

function generateReadme(botType: string): string {
  return `# Your ${botType.charAt(0).toUpperCase() + botType.slice(1)} Bot

## Features
- User-isolated environment
- Auto-healing enabled  
- Real-time monitoring
- Personalized AI assistant

## Commands
- /start - Start the bot
- /help - Get help

## Powered by BotBuddy SaaS
Your personal bot instance with dedicated resources.`
}

function getDefaultPackages(botType: string): string[] {
  const packages = {
    'music': ['telebot', 'yt-dlp', 'ffmpeg-python'],
    'assistant': ['telebot', 'openai', 'numpy'],
    'custom': ['telebot', 'requests']
  }
  
  return packages[botType] || packages['custom']
}
