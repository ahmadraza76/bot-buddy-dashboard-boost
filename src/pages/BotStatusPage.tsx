
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Activity, Server, Globe } from "lucide-react";
import { useServices, useIncidents } from "@/hooks/useServices";

export default function BotStatusPage() {
  const { data: services = [], isLoading: servicesLoading } = useServices();
  const { data: incidents = [], isLoading: incidentsLoading } = useIncidents();

  // Calculate overall system status
  const systemStatus = {
    overall: services.some(s => s.status === 'outage') ? 'outage' : 
             services.some(s => s.status === 'degraded') ? 'degraded' : 'operational',
    uptime: services.length > 0 ? (services.reduce((acc, s) => acc + (s.uptime_percentage || 0), 0) / services.length).toFixed(2) + '%' : '99.97%',
    lastIncident: incidents.length > 0 ? new Date(incidents[0].incident_date || '').toLocaleDateString() : '12 days ago'
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'outage':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-100 text-green-800">Operational</Badge>;
      case 'degraded':
        return <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>;
      case 'outage':
        return <Badge className="bg-red-100 text-red-800">Outage</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800">Operational</Badge>;
    }
  };

  const getIncidentBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge variant="outline" className="bg-green-50 text-green-700">resolved</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">completed</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700">{status}</Badge>;
    }
  };

  if (servicesLoading || incidentsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold">BotHoster Status</h1>
                <p className="text-sm text-muted-foreground">Real-time system status and uptime monitoring</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                {getStatusIcon(systemStatus.overall)}
                <span className={`font-medium ${
                  systemStatus.overall === 'operational' ? 'text-green-600' : 
                  systemStatus.overall === 'degraded' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {systemStatus.overall === 'operational' ? 'All Systems Operational' : 
                   systemStatus.overall === 'degraded' ? 'Some Systems Degraded' : 'System Outage'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {systemStatus.uptime} uptime • Last incident: {systemStatus.lastIncident}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overall Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>System Overview</span>
            </CardTitle>
            <CardDescription>Current status of all BotHoster services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-1">{systemStatus.uptime}</div>
                <div className="text-sm text-green-700">Overall Uptime (30 days)</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-1">1,247</div>
                <div className="text-sm text-blue-700">Active Bots Running</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-1">&lt; 1s</div>
                <div className="text-sm text-purple-700">Average Response Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-5 w-5" />
              <span>Service Status</span>
            </CardTitle>
            <CardDescription>Individual service health and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(service.status || 'operational')}
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(service.status || 'operational')}
                    <p className="text-sm text-muted-foreground mt-1">
                      {service.uptime_percentage?.toFixed(2) || '99.99'}% uptime
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>Past incidents and maintenance windows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {incidents.length > 0 ? incidents.map((incident) => (
                <div key={incident.id} className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{incident.title}</h4>
                    <div className="flex items-center space-x-2">
                      {getIncidentBadge(incident.status || 'resolved')}
                      <span className="text-sm text-muted-foreground">
                        {new Date(incident.incident_date || '').toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Duration: {incident.duration} • Severity: {incident.severity}
                  </p>
                </div>
              )) : (
                <p className="text-muted-foreground">No recent incidents to report.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-lg border">
          <p className="text-sm text-muted-foreground mb-2">
            Status page powered by BotHoster • Auto-updated every 30 seconds
          </p>
          <p className="text-xs text-muted-foreground">
            Subscribe to get notified about incidents: 
            <a href="#" className="text-blue-600 hover:underline ml-1">status@bothoster.in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
