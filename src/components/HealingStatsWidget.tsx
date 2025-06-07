
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, TrendingUp, Shield, AlertTriangle } from 'lucide-react';
import { useHealingStats } from '@/hooks/useHealingSystem';

export const HealingStatsWidget: React.FC = () => {
  const { data: stats, isLoading } = useHealingStats();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  const topError = Object.entries(stats.commonErrors)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription>AI Auto-Healing</CardDescription>
          <Zap className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {stats.successRate.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Success rate ({stats.totalHealing} total fixes)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription>24h Activity</CardDescription>
          <TrendingUp className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.last24Hours}
          </div>
          <p className="text-xs text-muted-foreground">
            Auto-fixes applied
          </p>
        </CardContent>
      </Card>

      {topError && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Most Common Issue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="outline" className="mb-2">
                  {topError[0].replace('_', ' ').toLowerCase()}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Occurred {topError[1]} times
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
