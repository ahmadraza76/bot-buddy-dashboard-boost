
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, CheckCircle, XCircle, RefreshCw, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// Sample uptime data
const uptimeData = [
  { time: "00:00", uptime: 100 },
  { time: "04:00", uptime: 100 },
  { time: "08:00", uptime: 98.5 },
  { time: "12:00", uptime: 100 },
  { time: "16:00", uptime: 100 },
  { time: "20:00", uptime: 99.8 },
];

export default function UptimeMonitor() {
  const botStats = {
    currentUptime: "99.9%",
    totalDowntime: "2m 15s",
    lastRestart: "2 hours ago",
    autoHealing: true,
    notifications: true
  };

  const incidents = [
    { time: "2 hours ago", status: "resolved", message: "Bot automatically restarted due to memory issue" },
    { time: "1 day ago", status: "resolved", message: "Telegram API timeout - auto-recovered" },
    { time: "3 days ago", status: "resolved", message: "Docker container restart completed" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Bot Uptime & Auto-Healing</h1>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-foreground">All Systems Operational</span>
          </div>
        </div>

        {/* Uptime Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>Current Uptime</CardDescription>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{botStats.currentUptime}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>Total Downtime</CardDescription>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{botStats.totalDowntime}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>Last Restart</CardDescription>
              <RefreshCw className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{botStats.lastRestart}</div>
              <p className="text-xs text-green-600">Auto-healed</p>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>Auto-Healing</CardDescription>
              <Bell className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Enabled</div>
              <p className="text-xs text-muted-foreground">Active monitoring</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Uptime Chart */}
          <Card className="bg-card shadow-sm border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Uptime History (24h)</CardTitle>
              <CardDescription>Bot availability percentage over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={uptimeData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[95, 100]} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Uptime']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      color: 'hsl(var(--card-foreground))'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="uptime"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Auto-Healing Settings */}
          <Card className="bg-card shadow-sm border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Auto-Healing Configuration</CardTitle>
              <CardDescription>Configure automatic bot recovery settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-card-foreground">Auto-Restart</h4>
                  <p className="text-sm text-muted-foreground">Automatically restart bot on crash</p>
                </div>
                <Switch checked={botStats.autoHealing} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-card-foreground">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Send email alerts on incidents</p>
                </div>
                <Switch checked={botStats.notifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-card-foreground">Telegram Notifications</h4>
                  <p className="text-sm text-muted-foreground">Send Telegram alerts on incidents</p>
                </div>
                <Switch checked={true} />
              </div>
              <Button className="w-full">Test Notification</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Incidents */}
        <Card className="bg-card shadow-sm border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Incidents & Auto-Healing</CardTitle>
            <CardDescription>History of bot incidents and automatic recovery actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {incidents.map((incident, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <div>
                      <span className="text-sm font-medium text-card-foreground">{incident.message}</span>
                      <p className="text-xs text-muted-foreground">{incident.time}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Resolved</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
