
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Zap, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { useHealingHistory, useTriggerHealing, useHealingStats } from '@/hooks/useHealingSystem';
import { useToast } from '@/hooks/use-toast';

interface AIHealingDashboardProps {
  botId?: string;
}

export const AIHealingDashboard: React.FC<AIHealingDashboardProps> = ({ botId }) => {
  const { data: healingHistory = [] } = useHealingHistory(botId);
  const { data: stats } = useHealingStats();
  const triggerHealing = useTriggerHealing();
  const { toast } = useToast();

  const handleManualHealing = async () => {
    if (!botId) return;
    
    try {
      await triggerHealing.mutateAsync({
        botId,
        logContent: 'Manual healing triggered by user'
      });
      
      toast({
        title: "AI Healing Triggered",
        description: "AI is analyzing your bot and applying fixes if needed.",
      });
    } catch (error) {
      toast({
        title: "Failed to Trigger Healing",
        description: "Could not start AI healing process. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Healing Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>Success Rate</CardDescription>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.successRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.totalHealing} total fixes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>24h Activity</CardDescription>
              <Zap className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.last24Hours}
              </div>
              <p className="text-xs text-muted-foreground">
                Auto-fixes applied
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>AI Confidence</CardDescription>
              <Brain className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <p className="text-xs text-muted-foreground">
                Average accuracy
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Manual Healing Trigger */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Healing Control
          </CardTitle>
          <CardDescription>
            Manually trigger AI healing or view automatic healing status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground">Manual Healing</h4>
              <p className="text-sm text-muted-foreground">
                Trigger AI to analyze and fix any current issues
              </p>
            </div>
            <Button 
              onClick={handleManualHealing}
              disabled={!botId || triggerHealing.isPending}
              className="flex items-center gap-2"
            >
              {triggerHealing.isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Shield className="h-4 w-4" />
              )}
              {triggerHealing.isPending ? 'Healing...' : 'Trigger Healing'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Healing History */}
      <Card>
        <CardHeader>
          <CardTitle>AI Healing History</CardTitle>
          <CardDescription>
            Recent automatic fixes and interventions by the AI system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {healingHistory.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No AI healing actions yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                AI will automatically fix issues as they arise
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {healingHistory.slice(0, 10).map((action) => (
                <div key={action.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  {getStatusIcon(action.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-card-foreground truncate">
                        {action.action}
                      </h4>
                      {getStatusBadge(action.status)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Error: {action.error_type}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {new Date(action.timestamp).toLocaleString()}
                      </span>
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
