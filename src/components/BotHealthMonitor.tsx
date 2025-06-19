
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Zap, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { useBots } from '@/hooks/useBots';

export const BotHealthMonitor: React.FC = () => {
  const { data: bots = [], isLoading } = useBots();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
    if (score >= 40) return <Badge className="bg-orange-100 text-orange-800">Fair</Badge>;
    return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'stopped':
        return <Clock className="h-4 w-4 text-gray-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Bot Health Monitor</h3>
      
      {bots.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No bots deployed yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bots.map((bot) => (
            <Card key={bot.id} className="bg-card shadow-sm border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
                    {getStatusIcon(bot.status || 'stopped')}
                    {bot.username}
                  </CardTitle>
                  {getHealthBadge(bot.health_score || 0)}
                </div>
                <CardDescription>
                  Deployment: {bot.deployment_status || 'pending'} • 
                  Restarts: {bot.restart_count || 0} • 
                  Errors: {bot.error_count || 0}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Health Score */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-card-foreground">Health Score</span>
                      <span className={`text-sm font-bold ${getHealthColor(bot.health_score || 0)}`}>
                        {bot.health_score || 0}%
                      </span>
                    </div>
                    <Progress value={bot.health_score || 0} className="h-2" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                      <div className="text-sm font-semibold text-card-foreground">
                        {bot.uptime_start ? 
                          Math.floor((Date.now() - new Date(bot.uptime_start).getTime()) / (1000 * 60 * 60)) + 'h'
                          : '0h'
                        }
                      </div>
                    </div>

                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Zap className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div className="text-xs text-muted-foreground">CPU</div>
                      <div className="text-sm font-semibold text-card-foreground">
                        {bot.cpu_usage || '0%'}
                      </div>
                    </div>

                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Activity className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-xs text-muted-foreground">Memory</div>
                      <div className="text-sm font-semibold text-card-foreground">
                        {bot.memory_usage || '0MB'}
                      </div>
                    </div>

                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Shield className="h-4 w-4 text-purple-500" />
                      </div>
                      <div className="text-xs text-muted-foreground">Auto-Heal</div>
                      <div className="text-sm font-semibold text-card-foreground">
                        {bot.auto_heal_enabled ? 'ON' : 'OFF'}
                      </div>
                    </div>
                  </div>

                  {/* Last Error */}
                  {bot.last_error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium text-red-800">Last Error</span>
                      </div>
                      <p className="text-xs text-red-700 truncate">{bot.last_error}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
