
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, CheckCircle, Clock, Zap, TrendingUp, Shield } from 'lucide-react';
import { useAdminAlerts, useResolveAlert } from '@/hooks/useHealingSystem';
import { useToast } from '@/hooks/use-toast';

export default function HealingDashboard() {
  const { data: alerts = [] } = useAdminAlerts();
  const resolveAlert = useResolveAlert();
  const { toast } = useToast();

  const handleResolveAlert = (alertId: string) => {
    resolveAlert.mutate(alertId, {
      onSuccess: () => {
        toast({
          title: "Alert Resolved",
          description: "The alert has been marked as resolved",
        });
      }
    });
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'healing_failed': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'manual_intervention_required': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Zap className="h-4 w-4 text-blue-500" />;
    }
  };

  // Calculate stats
  const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
  const todayAlerts = alerts.filter(a => 
    new Date(a.created_at).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">AI Healing System Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Auto-Healing Active</span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-xs">Active Alerts</CardDescription>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{alerts.length}</div>
              <p className="text-xs text-muted-foreground">
                {criticalAlerts} critical
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-xs">Today's Alerts</CardDescription>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{todayAlerts}</div>
              <p className="text-xs text-muted-foreground">
                New issues detected
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-xs">Auto-Heal Success</CardDescription>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-xs">Manual Interventions</CardDescription>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {alerts.filter(a => a.type === 'manual_intervention_required').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active Alerts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Active Alerts & Manual Interventions
            </CardTitle>
            <CardDescription className="text-sm">
              Issues that require admin attention or couldn't be auto-fixed
            </CardDescription>
          </CardHeader>
          <CardContent>
            {alerts.length === 0 ? (
              <div className="text-center p-8">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-base font-medium mb-2">All Clear!</h3>
                <p className="text-muted-foreground text-sm">
                  No active alerts. The AI healing system is working perfectly.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">Bot</TableHead>
                    <TableHead className="text-xs">User</TableHead>
                    <TableHead className="text-xs">Error</TableHead>
                    <TableHead className="text-xs">Severity</TableHead>
                    <TableHead className="text-xs">Message</TableHead>
                    <TableHead className="text-xs">Created</TableHead>
                    <TableHead className="text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div className="flex items-center">
                          {getAlertTypeIcon(alert.type)}
                          <span className="ml-2 text-xs">
                            {alert.type.replace('_', ' ').toLowerCase()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {(alert as any).bots?.username || 'Unknown'}
                        </code>
                      </TableCell>
                      <TableCell className="text-xs">
                        {(alert as any).profiles?.email || 'Unknown'}
                      </TableCell>
                      <TableCell>
                        {alert.error_type ? (
                          <Badge variant="outline" className="text-xs">
                            {alert.error_type.replace('_', ' ').toLowerCase()}
                          </Badge>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        {alert.severity && (
                          <Badge className={getSeverityColor(alert.severity) + " text-xs"}>
                            {alert.severity}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-xs">
                        {alert.message}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(alert.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResolveAlert(alert.id)}
                          disabled={resolveAlert.isPending}
                          className="h-7 px-2 text-xs"
                        >
                          Resolve
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
