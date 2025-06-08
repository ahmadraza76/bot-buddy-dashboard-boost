
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';
import { useTriggerHealing, useHealingHistory, type HealingAction } from '@/hooks/useHealingSystem';
import { useToast } from '@/hooks/use-toast';

interface LogMonitorProps {
  botId: string;
  logs: string[];
}

export const LogMonitor: React.FC<LogMonitorProps> = ({ botId, logs }) => {
  const [detectedErrors, setDetectedErrors] = useState<string[]>([]);
  const { data: healingHistory, isLoading: healingLoading, error: healingError } = useHealingHistory(botId);
  const triggerHealing = useTriggerHealing();
  const { toast } = useToast();

  // Error detection patterns
  const errorPatterns = [
    /ERROR|CRITICAL|FATAL/i,
    /No module named|ImportError|ModuleNotFoundError/i,
    /TOKEN_INVALID|401.*Unauthorized/i,
    /ffmpeg.*not found/i,
    /MemoryError|OutOfMemoryError/i,
    /PermissionError|Permission denied/i,
    /SyntaxError|IndentationError/i,
    /ConnectionError|TimeoutError/i
  ];

  useEffect(() => {
    const newErrors: string[] = [];
    
    logs.forEach(log => {
      errorPatterns.forEach(pattern => {
        if (pattern.test(log) && !detectedErrors.includes(log)) {
          newErrors.push(log);
        }
      });
    });

    if (newErrors.length > 0) {
      setDetectedErrors(prev => [...prev, ...newErrors]);
      
      // Auto-trigger healing for new errors
      newErrors.forEach(errorLog => {
        triggerHealing.mutate(
          { botId, logContent: errorLog },
          {
            onSuccess: (data) => {
              if (data?.healingAction?.status === 'success') {
                toast({
                  title: "🤖 AI Auto-Heal Success",
                  description: `Fixed ${data.analysis?.errorType?.replace('_', ' ')?.toLowerCase() || 'error'} automatically`,
                  duration: 5000,
                });
              }
            },
            onError: () => {
              toast({
                title: "AI Healing Failed",
                description: "Manual intervention may be required",
                variant: "destructive",
              });
            }
          }
        );
      });
    }
  }, [logs, botId, detectedErrors, triggerHealing, toast]);

  const getErrorSeverity = (log: string) => {
    if (/CRITICAL|FATAL|TOKEN_INVALID/i.test(log)) return 'critical';
    if (/ERROR|MemoryError|SyntaxError/i.test(log)) return 'high';
    if (/WARNING|TimeoutError/i.test(log)) return 'medium';
    return 'low';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getActionIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Zap className="h-4 w-4 text-blue-500" />;
    }
  };

  // Debug logging
  console.log('LogMonitor - botId:', botId);
  console.log('LogMonitor - healingHistory:', healingHistory);
  console.log('LogMonitor - healingLoading:', healingLoading);
  console.log('LogMonitor - healingError:', healingError);

  return (
    <div className="space-y-4">
      {/* Error Detection Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            AI Error Detection & Auto-Healing
          </CardTitle>
          <CardDescription>
            Real-time error monitoring with automatic AI-powered fixes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {detectedErrors.length === 0 ? (
            <div className="text-center p-4 text-muted-foreground">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              No errors detected. Bot running smoothly!
            </div>
          ) : (
            <div className="space-y-3">
              {detectedErrors.slice(-5).map((error, index) => {
                const severity = getErrorSeverity(error);
                return (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={`${getSeverityColor(severity)} text-white text-xs`}>
                            {severity.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                        <code className="text-sm bg-muted p-2 rounded block">
                          {error.substring(0, 100)}...
                        </code>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => triggerHealing.mutate({ botId, logContent: error })}
                        disabled={triggerHealing.isPending}
                      >
                        {triggerHealing.isPending ? 'Healing...' : 'Manual Heal'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Healing History */}
      <Card>
        <CardHeader>
          <CardTitle>Auto-Healing History</CardTitle>
          <CardDescription>Recent AI-powered fixes and interventions</CardDescription>
        </CardHeader>
        <CardContent>
          {healingLoading ? (
            <div className="text-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading healing history...</p>
            </div>
          ) : healingError ? (
            <div className="text-center p-4 text-red-500">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
              <p>Error loading healing history</p>
              <p className="text-sm">{healingError.message}</p>
            </div>
          ) : !healingHistory || healingHistory.length === 0 ? (
            <p className="text-muted-foreground text-center p-4">
              No healing actions recorded yet
            </p>
          ) : (
            <div className="space-y-3">
              {healingHistory.slice(0, 10).map((action: HealingAction) => (
                <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getActionIcon(action.status)}
                    <div>
                      <div className="font-medium">
                        {action.error_type.replace('_', ' ').toLowerCase()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Action: {action.action}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={action.status === 'success' ? 'default' : 'destructive'}>
                      {action.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(action.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
