import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NotificationRequest {
  action: string;
  userId?: string;
  notificationId?: string;
  notificationData?: {
    title: string;
    message: string;
    type?: string;
    bot_id?: string;
  };
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

    const { action, userId, notificationId, notificationData }: NotificationRequest = await req.json()

    console.log(`Notification operation triggered: ${action}`)

    let result = {
      success: false,
      message: '',
      data: null as any
    }

    switch (action) {
      case 'create':
        result = await createNotification(supabaseClient, userId!, notificationData!)
        break
      case 'mark_read':
        result = await markNotificationRead(supabaseClient, notificationId!)
        break
      case 'mark_all_read':
        result = await markAllNotificationsRead(supabaseClient, userId!)
        break
      case 'get_notifications':
        result = await getUserNotifications(supabaseClient, userId!)
        break
      case 'send_to_telegram':
        result = await sendToTelegram(supabaseClient, notificationId!)
        break
      default:
        throw new Error('Invalid notification operation')
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Notification operations error:', error)
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

async function createNotification(supabaseClient: any, userId: string, notificationData: any) {
  console.log('Creating notification for user:', userId)
  
  const { data, error } = await supabaseClient
    .from('notifications')
    .insert({
      user_id: userId,
      title: notificationData.title,
      message: notificationData.message,
      type: notificationData.type || 'info',
      bot_id: notificationData.bot_id || null,
      read: false,
      sent_to_telegram: false
    })
    .select()
    .single()

  if (error) {
    return {
      success: false,
      message: 'Failed to create notification',
      data: null
    }
  }

  return {
    success: true,
    message: 'Notification created successfully',
    data
  }
}

async function markNotificationRead(supabaseClient: any, notificationId: string) {
  console.log('Marking notification as read:', notificationId)
  
  const { data, error } = await supabaseClient
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId)
    .select()
    .single()

  if (error) {
    return {
      success: false,
      message: 'Failed to mark notification as read',
      data: null
    }
  }

  return {
    success: true,
    message: 'Notification marked as read',
    data
  }
}

async function markAllNotificationsRead(supabaseClient: any, userId: string) {
  console.log('Marking all notifications as read for user:', userId)
  
  const { data, error } = await supabaseClient
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false)

  if (error) {
    return {
      success: false,
      message: 'Failed to mark all notifications as read',
      data: null
    }
  }

  return {
    success: true,
    message: 'All notifications marked as read',
    data
  }
}

async function getUserNotifications(supabaseClient: any, userId: string) {
  console.log('Getting notifications for user:', userId)
  
  const { data, error } = await supabaseClient
    .from('notifications')
    .select(`
      *,
      bots(username)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    return {
      success: false,
      message: 'Failed to get notifications',
      data: null
    }
  }

  return {
    success: true,
    message: 'Notifications retrieved successfully',
    data
  }
}

async function sendToTelegram(supabaseClient: any, notificationId: string) {
  console.log('Sending notification to Telegram:', notificationId)
  
  // Get notification details with user profile
  const { data: notification, error: notifError } = await supabaseClient
    .from('notifications')
    .select(`
      *,
      profiles(telegram_id)
    `)
    .eq('id', notificationId)
    .single()

  if (notifError || !notification.profiles?.telegram_id) {
    return {
      success: false,
      message: 'Failed to get notification or user has no Telegram ID',
      data: null
    }
  }

  // Send to Telegram via telegram-notification function
  try {
    const telegramResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/telegram-notification`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        telegramId: notification.profiles.telegram_id,
        message: `*${notification.title}*\n\n${notification.message}`,
        silent: notification.type === 'info'
      })
    })

    const telegramResult = await telegramResponse.json()
    
    if (telegramResult.success) {
      // Mark as sent to Telegram
      await supabaseClient
        .from('notifications')
        .update({ sent_to_telegram: true })
        .eq('id', notificationId)
    }

    return {
      success: telegramResult.success,
      message: telegramResult.success ? 'Notification sent to Telegram' : 'Failed to send to Telegram',
      data: telegramResult
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error sending to Telegram',
      data: null
    }
  }
}