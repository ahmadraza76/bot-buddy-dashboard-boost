import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AuthRequest {
  action: string;
  email?: string;
  password?: string;
  userData?: any;
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

    const { action, email, password, userData }: AuthRequest = await req.json()

    console.log(`Auth operation triggered: ${action}`)

    let result = {
      success: false,
      message: '',
      data: null as any
    }

    switch (action) {
      case 'create_profile':
        result = await createUserProfile(supabaseClient, userData)
        break
      case 'update_profile':
        result = await updateUserProfile(supabaseClient, userData)
        break
      case 'get_profile':
        result = await getUserProfile(supabaseClient, userData.userId)
        break
      case 'delete_profile':
        result = await deleteUserProfile(supabaseClient, userData.userId)
        break
      default:
        throw new Error('Invalid auth operation')
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Auth operations error:', error)
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

async function createUserProfile(supabaseClient: any, userData: any) {
  console.log('Creating user profile:', userData.userId)
  
  const { data, error } = await supabaseClient
    .from('profiles')
    .insert({
      id: userData.userId,
      email: userData.email,
      telegram_id: userData.telegram_id || null,
      subscription_type: userData.subscription_type || 'Monthly',
      status: 'active'
    })
    .select()
    .single()

  if (error) {
    return {
      success: false,
      message: 'Failed to create user profile',
      data: null
    }
  }

  return {
    success: true,
    message: 'User profile created successfully',
    data
  }
}

async function updateUserProfile(supabaseClient: any, userData: any) {
  console.log('Updating user profile:', userData.userId)
  
  const updateData: any = {}
  if (userData.telegram_id !== undefined) updateData.telegram_id = userData.telegram_id
  if (userData.subscription_type !== undefined) updateData.subscription_type = userData.subscription_type
  if (userData.status !== undefined) updateData.status = userData.status
  if (userData.bot_token !== undefined) updateData.bot_token = userData.bot_token
  
  updateData.updated_at = new Date().toISOString()

  const { data, error } = await supabaseClient
    .from('profiles')
    .update(updateData)
    .eq('id', userData.userId)
    .select()
    .single()

  if (error) {
    return {
      success: false,
      message: 'Failed to update user profile',
      data: null
    }
  }

  return {
    success: true,
    message: 'User profile updated successfully',
    data
  }
}

async function getUserProfile(supabaseClient: any, userId: string) {
  console.log('Getting user profile:', userId)
  
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    return {
      success: false,
      message: 'Failed to get user profile',
      data: null
    }
  }

  return {
    success: true,
    message: 'User profile retrieved successfully',
    data
  }
}

async function deleteUserProfile(supabaseClient: any, userId: string) {
  console.log('Deleting user profile:', userId)
  
  // First delete all related data
  await supabaseClient.from('bots').delete().eq('user_id', userId)
  await supabaseClient.from('api_keys').delete().eq('user_id', userId)
  await supabaseClient.from('notifications').delete().eq('user_id', userId)
  await supabaseClient.from('payments').delete().eq('user_id', userId)
  
  const { error } = await supabaseClient
    .from('profiles')
    .delete()
    .eq('id', userId)

  if (error) {
    return {
      success: false,
      message: 'Failed to delete user profile',
      data: null
    }
  }

  return {
    success: true,
    message: 'User profile deleted successfully',
    data: null
  }
}