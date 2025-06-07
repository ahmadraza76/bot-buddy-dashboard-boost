
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);

const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

interface LogAnalysis {
  errorType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  autoFixable: boolean;
  fixCommand?: string;
  reason: string;
  riskLevel: 'safe' | 'medium' | 'risky';
}

interface HealingAction {
  id: string;
  botId: string;
  userId: string;
  errorType: string;
  action: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  logs?: string;
}

const ERROR_PATTERNS = {
  'TOKEN_INVALID': {
    pattern: /(TOKEN_INVALID|401.*Unauthorized|Invalid token)/i,
    severity: 'critical' as const,
    autoFixable: false,
    reason: 'Bot token expired or revoked',
    riskLevel: 'medium' as const
  },
  'MISSING_DEPENDENCY': {
    pattern: /(No module named|ImportError|ModuleNotFoundError)/i,
    severity: 'high' as const,
    autoFixable: true,
    reason: 'Required Python package missing',
    riskLevel: 'safe' as const
  },
  'FFMPEG_MISSING': {
    pattern: /(ffmpeg.*not found|ffmpeg.*command not found)/i,
    severity: 'high' as const,
    autoFixable: true,
    reason: 'FFmpeg not installed in container',
    riskLevel: 'safe' as const
  },
  'MEMORY_ERROR': {
    pattern: /(MemoryError|OutOfMemoryError|OOM killed)/i,
    severity: 'high' as const,
    autoFixable: true,
    reason: 'Container ran out of memory',
    riskLevel: 'safe' as const
  },
  'PERMISSION_ERROR': {
    pattern: /(PermissionError|Permission denied|Access denied)/i,
    severity: 'medium' as const,
    autoFixable: true,
    reason: 'File or directory permission issue',
    riskLevel: 'medium' as const
  },
  'SYNTAX_ERROR': {
    pattern: /(SyntaxError|IndentationError|invalid syntax)/i,
    severity: 'high' as const,
    autoFixable: true,
    reason: 'Code syntax error detected',
    riskLevel: 'medium' as const
  },
  'CONNECTION_ERROR': {
    pattern: /(ConnectionError|TimeoutError|Network.*unreachable)/i,
    severity: 'medium' as const,
    autoFixable: true,
    reason: 'Network connectivity issue',
    riskLevel: 'safe' as const
  }
};

async function analyzeLogWithAI(logContent: string): Promise<LogAnalysis> {
  // First check against known patterns
  for (const [errorType, config] of Object.entries(ERROR_PATTERNS)) {
    if (config.pattern.test(logContent)) {
      return {
        errorType,
        severity: config.severity,
        autoFixable: config.autoFixable,
        reason: config.reason,
        riskLevel: config.riskLevel,
        fixCommand: generateFixCommand(errorType, logContent)
      };
    }
  }

  // If no pattern matches, use AI analysis
  if (!openaiApiKey) {
    return {
      errorType: 'UNKNOWN',
      severity: 'medium',
      autoFixable: false,
      reason: 'Unknown error pattern',
      riskLevel: 'risky'
    };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an AI bot error analyst. Analyze the log and return a JSON response with:
            {
              "errorType": "string",
              "severity": "low|medium|high|critical", 
              "autoFixable": boolean,
              "reason": "string",
              "riskLevel": "safe|medium|risky",
              "fixCommand": "string or null"
            }`
          },
          {
            role: 'user',
            content: `Analyze this bot error log: ${logContent}`
          }
        ],
        temperature: 0.1,
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('AI analysis failed:', error);
    return {
      errorType: 'AI_ANALYSIS_FAILED',
      severity: 'medium',
      autoFixable: false,
      reason: 'AI analysis service unavailable',
      riskLevel: 'risky'
    };
  }
}

function generateFixCommand(errorType: string, logContent: string): string {
  switch (errorType) {
    case 'MISSING_DEPENDENCY':
      const match = logContent.match(/No module named ['"](.*?)['"]|ImportError.*?['"](.*?)['"]|ModuleNotFoundError.*?['"](.*?)['"]/i);
      const moduleName = match?.[1] || match?.[2] || match?.[3] || 'unknown';
      return `pip install ${moduleName}`;
    
    case 'FFMPEG_MISSING':
      return 'apt-get update && apt-get install -y ffmpeg';
    
    case 'MEMORY_ERROR':
      return 'restart_with_memory_limit';
    
    case 'PERMISSION_ERROR':
      return 'fix_permissions';
    
    case 'SYNTAX_ERROR':
      return 'rollback_to_last_working_version';
    
    case 'CONNECTION_ERROR':
      return 'restart_container';
    
    default:
      return 'manual_intervention_required';
  }
}

async function executeAutoFix(botId: string, analysis: LogAnalysis): Promise<boolean> {
  const { fixCommand } = analysis;
  
  if (!fixCommand || analysis.riskLevel === 'risky') {
    return false;
  }

  try {
    // Simulate fix execution based on command type
    switch (fixCommand) {
      case 'restart_with_memory_limit':
        await supabaseClient.functions.invoke('bot-operations', {
          body: { action: 'restart', botId, memoryLimit: '1024MB' }
        });
        break;
      
      case 'restart_container':
        await supabaseClient.functions.invoke('bot-operations', {
          body: { action: 'restart', botId }
        });
        break;
      
      case 'rollback_to_last_working_version':
        await supabaseClient.functions.invoke('bot-operations', {
          body: { action: 'rollback', botId }
        });
        break;
      
      case 'fix_permissions':
        await supabaseClient.functions.invoke('bot-operations', {
          body: { action: 'fix_permissions', botId }
        });
        break;
      
      default:
        if (fixCommand.startsWith('pip install')) {
          await supabaseClient.functions.invoke('bot-operations', {
            body: { action: 'install_package', botId, command: fixCommand }
          });
        } else if (fixCommand.includes('apt-get')) {
          await supabaseClient.functions.invoke('bot-operations', {
            body: { action: 'install_system_package', botId, command: fixCommand }
          });
        }
    }
    
    return true;
  } catch (error) {
    console.error('Auto-fix execution failed:', error);
    return false;
  }
}

async function logHealingAction(action: HealingAction): Promise<void> {
  await supabaseClient.from('healing_actions').insert(action);
}

async function sendSilentNotification(userId: string, message: string): Promise<void> {
  // Get user's Telegram ID
  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('telegram_id')
    .eq('id', userId)
    .single();

  if (profile?.telegram_id) {
    // Send silent Telegram notification
    await supabaseClient.functions.invoke('telegram-notification', {
      body: {
        telegramId: profile.telegram_id,
        message,
        silent: true
      }
    });
  }
}

async function monitorBotAfterFix(botId: string): Promise<boolean> {
  // Monitor for 2 minutes after fix
  let attempts = 0;
  const maxAttempts = 12; // 2 minutes with 10-second intervals

  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
    
    try {
      // Check bot status and logs
      const { data: bot } = await supabaseClient
        .from('bots')
        .select('status, last_activity')
        .eq('id', botId)
        .single();

      if (bot?.status === 'running') {
        const lastActivity = new Date(bot.last_activity || '');
        const now = new Date();
        const timeDiff = now.getTime() - lastActivity.getTime();
        
        // If bot had activity in last 30 seconds, consider it healthy
        if (timeDiff < 30000) {
          return true;
        }
      }
    } catch (error) {
      console.error('Monitoring error:', error);
    }
    
    attempts++;
  }
  
  return false; // Fix didn't work
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { action, logContent, botId, userId } = await req.json();

    switch (action) {
      case 'analyze_and_heal':
        console.log(`Analyzing logs for bot ${botId}`);
        
        // Step 1: Analyze the log with AI
        const analysis = await analyzeLogWithAI(logContent);
        console.log('Analysis result:', analysis);

        const healingAction: HealingAction = {
          id: crypto.randomUUID(),
          botId,
          userId,
          errorType: analysis.errorType,
          action: analysis.fixCommand || 'manual_intervention',
          status: 'pending',
          timestamp: new Date().toISOString(),
          logs: logContent
        };

        // Step 2: Attempt auto-fix if safe and fixable
        if (analysis.autoFixable && analysis.riskLevel !== 'risky') {
          console.log(`Attempting auto-fix for ${analysis.errorType}`);
          
          const fixSuccessful = await executeAutoFix(botId, analysis);
          
          if (fixSuccessful) {
            healingAction.status = 'success';
            
            // Step 3: Monitor bot after fix
            const monitorResult = await monitorBotAfterFix(botId);
            
            if (monitorResult) {
              // Send silent notification to user
              await sendSilentNotification(
                userId, 
                `✅ AI fixed ${analysis.errorType.toLowerCase().replace('_', ' ')} issue in your bot automatically`
              );
            } else {
              healingAction.status = 'failed';
              // Escalate to admin panel
              await supabaseClient.from('admin_alerts').insert({
                type: 'healing_failed',
                botId,
                userId,
                message: `Auto-fix for ${analysis.errorType} failed - manual intervention required`
              });
            }
          } else {
            healingAction.status = 'failed';
          }
        } else {
          // Escalate to admin panel for risky or unfixable issues
          await supabaseClient.from('admin_alerts').insert({
            type: 'manual_intervention_required',
            botId,
            userId,
            errorType: analysis.errorType,
            reason: analysis.reason,
            severity: analysis.severity
          });
        }

        // Step 4: Log the healing action
        await logHealingAction(healingAction);

        return new Response(
          JSON.stringify({ 
            success: true, 
            analysis, 
            healingAction,
            message: 'Healing process completed'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'get_healing_history':
        const { data: history } = await supabaseClient
          .from('healing_actions')
          .select('*')
          .eq('bot_id', botId)
          .order('timestamp', { ascending: false })
          .limit(50);

        return new Response(
          JSON.stringify({ success: true, history }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Healing system error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
