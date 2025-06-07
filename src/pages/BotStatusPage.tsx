
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Activity, Server, Globe } from "lucide-react";

export default function BotStatusPage() {
  const systemStatus = {
    overall: "operational",
    uptime: "99.97%",
    lastIncident: "12 days ago"
  };

  const services = [
    { name: "Bot Hosting Service", status: "operational", uptime: "99.99%", description: "Core bot hosting infrastructure" },
    { name: "Telegram API Gateway", status: "operational", uptime: "99.95%", description: "Telegram bot API connectivity" },
    { name: "User Dashboard", status: "operational", uptime: "99.98%", description: "Web dashboard and controls" },
    { name: "Payment Processing", status: "operational", uptime: "99.92%", description: "Billing and subscription management" },
    { name: "Docker Containers", status: "operational", uptime: "99.96%", description: "Container orchestration system" },
    { name: "Auto-Healing System", status: "operational", uptime: "99.94%", description: "Automatic bot recovery service" },
  ];

  const recentIncidents = [
    {
      date: "Dec 24, 2024",
      title: "Telegram API Rate Limiting",
      status: "resolved",
      duration: "45 minutes",
      description: "Some bots experienced delayed message delivery due to Telegram API rate limits. Auto-recovery implemented.",
      severity: "minor"
    },
    {
      date: "Dec 18, 2024", 
      title: "Scheduled Maintenance",
      status: "completed",
      duration: "2 hours",
      description: "Planned infrastructure upgrade completed successfully. All services restored.",
      severity: "maintenance"
    },
    {
      date: "Dec 10, 2024",
      title: "Docker Registry Issue",
      status: "resolved", 
      duration: "1 hour 20 minutes",
      description: "Temporary issue with container deployments. All affected bots automatically restarted.",
      severity: "minor"
    }
  ];

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
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-600">All Systems Operational</span>
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
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(service.status)}
                    <p className="text-sm text-muted-foreground mt-1">{service.uptime} uptime</p>
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
              {recentIncidents.map((incident, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{incident.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {incident.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{incident.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Duration: {incident.duration} • Severity: {incident.severity}
                  </p>
                </div>
              ))}
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
