import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AdminRequest {
  action: string;
  adminUserId: string;
  targetUserId?: string;
  botId?: string;
  data?: any;
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

    const { action, adminUserId, targetUserId, botId, data }: AdminRequest = await req.json()

    console.log(`Admin operation triggered: ${action} by admin: ${adminUserId}`)

    // Verify admin role
    const { data: adminRole, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', adminUserId)
      .eq('role', 'admin')
      .single()

    if (roleError || !adminRole) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Unauthorized: Admin access required',
          data: null 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        }
      )
    }

    let result = {
      success: false,
      message: '',
      data: null as any
    }

    switch (action) {
      case 'get_all_users':
        result = await getAllUsers(supabaseClient)
        break
      case 'get_all_bots':
        result = await getAllBots(supabaseClient)
        break
      case 'suspend_user':
        result = await suspendUser(supabaseClient, targetUserId!, adminUserId)
        break
      case 'activate_user':
        result = await activateUser(supabaseClient, targetUserId!, adminUserId)
        break
      case 'delete_user':
        result = await deleteUser(supabaseClient, targetUserId!, adminUserId)
        break
      case 'force_stop_bot':
        result = await forceStopBot(supabaseClient, botId!, adminUserId)
        break
      case 'get_system_stats':
        result = await getSystemStats(supabaseClient)
        break
      case 'create_admin_alert':
        result = await createAdminAlert(supabaseClient, data)
        break
      case 'resolve_admin_alert':
        result = await resolveAdminAlert(supabaseClient, data.alertId, adminUserId)
        break
      case 'get_admin_alerts':
        result = await getAdminAlerts(supabaseClient)
        break
      default:
        throw new Error('Invalid admin operation')
    }

    // Log admin action
    await supabaseClient
      .from('admin_logs')
      .insert({
        user_id: adminUserId,
        action: action,
        message: `Admin ${action} operation performed`,
        bot_id: botId || null
      })

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Admin operations error:', error)
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

async function getAllUsers(supabaseClient: any) {
  const { data, error } = await supabaseClient
    .from('profiles')
    .select(`
      *,
      user_roles(role),
      bots(count),
      payments(count)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return {
      success: false,
      message: 'Failed to get users',
      data: null
    }
  }

  return {
    success: true,
    message: 'Users retrieved successfully',
    data
  }
}

async function getAllBots(supabaseClient: any) {
  const { data, error } = await supabaseClient
    .from('bots')
    .select(`
      *,
      profiles(email)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return {
      success: false,
      message: 'Failed to get bots',
      data: null
    }
  }

  return {
    success: true,
    message: 'Bots retrieved successfully',
    data
  }
}

async function suspendUser(supabaseClient: any, userId: string, adminUserId: string) {
  // Update user status
  const { data, error } = await supabaseClient
    .from('profiles')
    .update({ status: 'banned' })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    return {
      success: false,
      message: 'Failed to suspend user',
      data: null
    }
  }

  // Stop all user bots
  await supabaseClient
    .from('bots')
    .update({ status: 'stopped' })
    .eq('user_id', userId)

  return {
    success: true,
    message: 'User suspended successfully',
    data
  }
}

async function activateUser(supabaseClient: any, userId: string, adminUserId: string) {
  const { data, error } = await supabaseClient
    .from('profiles')
    .update({ status: 'active' })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    return {
      success: false,
      message: 'Failed to activate user',
      data: null
    }
  }

  return {
    success: true,
    message: 'User activated successfully',
    data
  }
}

async function deleteUser(supabaseClient: any, userId: string, adminUserId: string) {
  // Delete all related data first
  await supabaseClient.from('ai_actions').delete().eq('user_id', userId)
  await supabaseClient.from('bot_logs').delete().eq('bot_id', 
    supabaseClient.from('bots').select('id').eq('user_id', userId)
  )
  await supabaseClient.from('bots').delete().eq('user_id', userId)
  await supabaseClient.from('api_keys').delete().eq('user_id', userId)
  await supabaseClient.from('notifications').delete().eq('user_id', userId)
  await supabaseClient.from('payments').delete().eq('user_id', userId)
  await supabaseClient.from('payout_requests').delete().eq('user_id', userId)
  await supabaseClient.from('user_roles').delete().eq('user_id', userId)
  
  const { error } = await supabaseClient
    .from('profiles')
    .delete()
    .eq('id', userId)

  if (error) {
    return {
      success: false,
      message: 'Failed to delete user',
      data: null
    }
  }

  return {
    success: true,
    message: 'User deleted successfully',
    data: null
  }
}

async function forceStopBot(supabaseClient: any, botId: string, adminUserId: string) {
  const { data, error } = await supabaseClient
    .from('bots')
    .update({ 
      status: 'stopped',
      last_activity: new Date().toISOString()
    })
    .eq('id', botId)
    .select()
    .single()

  if (error) {
    return {
      success: false,
      message: 'Failed to stop bot',
      data: null
    }
  }

  return {
    success: true,
    message: 'Bot stopped successfully',
    data
  }
}

async function getSystemStats(supabaseClient: any) {
  const [usersResult, botsResult, paymentsResult, alertsResult] = await Promise.all([
    supabaseClient.from('profiles').select('count', { count: 'exact' }),
    supabaseClient.from('bots').select('count', { count: 'exact' }),
    supabaseClient.from('payments').select('amount').eq('status', 'completed'),
    supabaseClient.from('admin_alerts').select('count', { count: 'exact' }).eq('status', 'open')
  ])

  const totalRevenue = paymentsResult.data?.reduce((sum: number, payment: any) => 
    sum + parseFloat(payment.amount), 0) || 0

  return {
    success: true,
    message: 'System stats retrieved successfully',
    data: {
      totalUsers: usersResult.count || 0,
      totalBots: botsResult.count || 0,
      totalRevenue: totalRevenue,
      openAlerts: alertsResult.count || 0
    }
  }
}

async function createAdminAlert(supabaseClient: any, alertData: any) {
  const { data, error } = await supabaseClient
    .from('admin_alerts')
    .insert({
      type: alertData.type,
      message: alertData.message,
      severity: alertData.severity || 'medium',
      user_id: alertData.user_id || null,
      bot_id: alertData.bot_id || null,
      error_type: alertData.error_type || null,
      reason: alertData.reason || null
    })
    .select()
    .single()

  if (error) {
    return {
      success: false,
      message: 'Failed to create admin alert',
      data: null
    }
  }

  return {
    success: true,
    message: 'Admin alert created successfully',
    data
  }
}

async function resolveAdminAlert(supabaseClient: any, alertId: string, adminUserId: string) {
  const { data, error } = await supabaseClient
    .from('admin_alerts')
    .update({ status: 'resolved' })
    .eq('id', alertId)
    .select()
    .single()

  if (error) {
    return {
      success: false,
      message: 'Failed to resolve admin alert',
      data: null
    }
  }

  return {
    success: true,
    message: 'Admin alert resolved successfully',
    data
  }
}

async function getAdminAlerts(supabaseClient: any) {
  const { data, error } = await supabaseClient
    .from('admin_alerts')
    .select(`
      *,
      profiles(email),
      bots(username)
    `)
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    return {
      success: false,
      message: 'Failed to get admin alerts',
      data: null
    }
  }

  return {
    success: true,
    message: 'Admin alerts retrieved successfully',
    data
  }
}