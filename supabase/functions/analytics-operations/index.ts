import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AnalyticsRequest {
  action: string;
  userId?: string;
  botId?: string;
  timeRange?: string;
  filters?: any;
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

    const { action, userId, botId, timeRange, filters }: AnalyticsRequest = await req.json()

    console.log(`Analytics operation triggered: ${action}`)

    let result = {
      success: false,
      message: '',
      data: null as any
    }

    switch (action) {
      case 'get_user_analytics':
        result = await getUserAnalytics(supabaseClient, userId!, timeRange)
        break
      case 'get_bot_analytics':
        result = await getBotAnalytics(supabaseClient, botId!, timeRange)
        break
      case 'get_platform_analytics':
        result = await getPlatformAnalytics(supabaseClient, timeRange)
        break
      case 'get_revenue_analytics':
        result = await getRevenueAnalytics(supabaseClient, timeRange)
        break
      case 'get_healing_analytics':
        result = await getHealingAnalytics(supabaseClient, userId, timeRange)
        break
      case 'record_bot_metric':
        result = await recordBotMetric(supabaseClient, botId!, filters)
        break
      default:
        throw new Error('Invalid analytics operation')
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Analytics operations error:', error)
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

async function getUserAnalytics(supabaseClient: any, userId: string, timeRange: string = '7d') {
  const timeFilter = getTimeFilter(timeRange)
  
  const [botsData, logsData, actionsData, notificationsData] = await Promise.all([
    supabaseClient
      .from('bots')
      .select('*')
      .eq('user_id', userId),
    
    supabaseClient
      .from('bot_logs')
      .select('*')
      .gte('timestamp', timeFilter)
      .in('bot_id', supabaseClient.from('bots').select('id').eq('user_id', userId)),
    
    supabaseClient
      .from('ai_actions')
      .select('*')
      .eq('user_id', userId)
      .gte('timestamp', timeFilter),
    
    supabaseClient
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', timeFilter)
  ])

  const analytics = {
    totalBots: botsData.data?.length || 0,
    runningBots: botsData.data?.filter((bot: any) => bot.status === 'running').length || 0,
    totalLogs: logsData.data?.length || 0,
    errorLogs: logsData.data?.filter((log: any) => log.log_level === 'error').length || 0,
    healingActions: actionsData.data?.length || 0,
    successfulHealing: actionsData.data?.filter((action: any) => action.success).length || 0,
    notifications: notificationsData.data?.length || 0,
    unreadNotifications: notificationsData.data?.filter((notif: any) => !notif.read).length || 0
  }

  return {
    success: true,
    message: 'User analytics retrieved successfully',
    data: analytics
  }
}

async function getBotAnalytics(supabaseClient: any, botId: string, timeRange: string = '7d') {
  const timeFilter = getTimeFilter(timeRange)
  
  const [botData, logsData, actionsData] = await Promise.all([
    supabaseClient
      .from('bots')
      .select('*')
      .eq('id', botId)
      .single(),
    
    supabaseClient
      .from('bot_logs')
      .select('*')
      .eq('bot_id', botId)
      .gte('timestamp', timeFilter),
    
    supabaseClient
      .from('ai_actions')
      .select('*')
      .eq('bot_id', botId)
      .gte('timestamp', timeFilter)
  ])

  const uptime = botData.data?.uptime_start ? 
    Math.floor((Date.now() - new Date(botData.data.uptime_start).getTime()) / 1000) : 0

  const analytics = {
    bot: botData.data,
    uptime: uptime,
    totalLogs: logsData.data?.length || 0,
    errorLogs: logsData.data?.filter((log: any) => log.log_level === 'error').length || 0,
    warningLogs: logsData.data?.filter((log: any) => log.log_level === 'warning').length || 0,
    infoLogs: logsData.data?.filter((log: any) => log.log_level === 'info').length || 0,
    healingActions: actionsData.data?.length || 0,
    successfulHealing: actionsData.data?.filter((action: any) => action.success).length || 0,
    logsByDay: groupLogsByDay(logsData.data || []),
    actionsByType: groupActionsByType(actionsData.data || [])
  }

  return {
    success: true,
    message: 'Bot analytics retrieved successfully',
    data: analytics
  }
}

async function getPlatformAnalytics(supabaseClient: any, timeRange: string = '30d') {
  const timeFilter = getTimeFilter(timeRange)
  
  const [usersData, botsData, paymentsData, actionsData] = await Promise.all([
    supabaseClient
      .from('profiles')
      .select('*')
      .gte('created_at', timeFilter),
    
    supabaseClient
      .from('bots')
      .select('*'),
    
    supabaseClient
      .from('payments')
      .select('*')
      .gte('created_at', timeFilter),
    
    supabaseClient
      .from('ai_actions')
      .select('*')
      .gte('timestamp', timeFilter)
  ])

  const analytics = {
    newUsers: usersData.data?.length || 0,
    totalBots: botsData.data?.length || 0,
    runningBots: botsData.data?.filter((bot: any) => bot.status === 'running').length || 0,
    totalRevenue: paymentsData.data?.reduce((sum: number, payment: any) => 
      sum + (payment.status === 'completed' ? parseFloat(payment.amount) : 0), 0) || 0,
    completedPayments: paymentsData.data?.filter((payment: any) => payment.status === 'completed').length || 0,
    totalHealingActions: actionsData.data?.length || 0,
    successfulHealingRate: actionsData.data?.length > 0 ? 
      (actionsData.data.filter((action: any) => action.success).length / actionsData.data.length) * 100 : 0,
    usersByDay: groupUsersByDay(usersData.data || []),
    revenueByDay: groupRevenueByDay(paymentsData.data || [])
  }

  return {
    success: true,
    message: 'Platform analytics retrieved successfully',
    data: analytics
  }
}

async function getRevenueAnalytics(supabaseClient: any, timeRange: string = '30d') {
  const timeFilter = getTimeFilter(timeRange)
  
  const { data: paymentsData, error } = await supabaseClient
    .from('payments')
    .select(`
      *,
      profiles(email, subscription_type)
    `)
    .gte('created_at', timeFilter)

  if (error) {
    return {
      success: false,
      message: 'Failed to get revenue analytics',
      data: null
    }
  }

  const analytics = {
    totalRevenue: paymentsData.reduce((sum: number, payment: any) => 
      sum + (payment.status === 'completed' ? parseFloat(payment.amount) : 0), 0),
    pendingRevenue: paymentsData.reduce((sum: number, payment: any) => 
      sum + (payment.status === 'pending' ? parseFloat(payment.amount) : 0), 0),
    revenueByPlan: groupRevenueByPlan(paymentsData),
    revenueByMethod: groupRevenueByMethod(paymentsData),
    revenueByDay: groupRevenueByDay(paymentsData)
  }

  return {
    success: true,
    message: 'Revenue analytics retrieved successfully',
    data: analytics
  }
}

async function getHealingAnalytics(supabaseClient: any, userId?: string, timeRange: string = '30d') {
  const timeFilter = getTimeFilter(timeRange)
  
  let query = supabaseClient
    .from('ai_actions')
    .select('*')
    .gte('timestamp', timeFilter)

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data: actionsData, error } = await query

  if (error) {
    return {
      success: false,
      message: 'Failed to get healing analytics',
      data: null
    }
  }

  const analytics = {
    totalActions: actionsData.length,
    successfulActions: actionsData.filter((action: any) => action.success).length,
    failedActions: actionsData.filter((action: any) => !action.success).length,
    successRate: actionsData.length > 0 ? 
      (actionsData.filter((action: any) => action.success).length / actionsData.length) * 100 : 0,
    actionsByType: groupActionsByType(actionsData),
    actionsByDay: groupActionsByDay(actionsData),
    commonErrors: getCommonErrors(actionsData)
  }

  return {
    success: true,
    message: 'Healing analytics retrieved successfully',
    data: analytics
  }
}

async function recordBotMetric(supabaseClient: any, botId: string, metricData: any) {
  const { data, error } = await supabaseClient
    .from('system_health')
    .insert({
      metric_name: metricData.metric_name,
      metric_value: metricData.metric_value,
      unit: metricData.unit || null,
      metadata: { bot_id: botId, ...metricData.metadata }
    })
    .select()
    .single()

  if (error) {
    return {
      success: false,
      message: 'Failed to record bot metric',
      data: null
    }
  }

  return {
    success: true,
    message: 'Bot metric recorded successfully',
    data
  }
}

// Helper functions
function getTimeFilter(timeRange: string): string {
  const now = new Date()
  const days = parseInt(timeRange.replace('d', ''))
  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString()
}

function groupLogsByDay(logs: any[]): any {
  return logs.reduce((acc: any, log: any) => {
    const day = new Date(log.timestamp).toISOString().split('T')[0]
    acc[day] = (acc[day] || 0) + 1
    return acc
  }, {})
}

function groupActionsByType(actions: any[]): any {
  return actions.reduce((acc: any, action: any) => {
    acc[action.action_type] = (acc[action.action_type] || 0) + 1
    return acc
  }, {})
}

function groupActionsByDay(actions: any[]): any {
  return actions.reduce((acc: any, action: any) => {
    const day = new Date(action.timestamp).toISOString().split('T')[0]
    acc[day] = (acc[day] || 0) + 1
    return acc
  }, {})
}

function groupUsersByDay(users: any[]): any {
  return users.reduce((acc: any, user: any) => {
    const day = new Date(user.created_at).toISOString().split('T')[0]
    acc[day] = (acc[day] || 0) + 1
    return acc
  }, {})
}

function groupRevenueByDay(payments: any[]): any {
  return payments.reduce((acc: any, payment: any) => {
    if (payment.status === 'completed') {
      const day = new Date(payment.created_at).toISOString().split('T')[0]
      acc[day] = (acc[day] || 0) + parseFloat(payment.amount)
    }
    return acc
  }, {})
}

function groupRevenueByPlan(payments: any[]): any {
  return payments.reduce((acc: any, payment: any) => {
    if (payment.status === 'completed') {
      acc[payment.plan] = (acc[payment.plan] || 0) + parseFloat(payment.amount)
    }
    return acc
  }, {})
}

function groupRevenueByMethod(payments: any[]): any {
  return payments.reduce((acc: any, payment: any) => {
    if (payment.status === 'completed') {
      acc[payment.method] = (acc[payment.method] || 0) + parseFloat(payment.amount)
    }
    return acc
  }, {})
}

function getCommonErrors(actions: any[]): any {
  return actions.reduce((acc: any, action: any) => {
    if (action.error_detected) {
      acc[action.error_detected] = (acc[action.error_detected] || 0) + 1
    }
    return acc
  }, {})
}