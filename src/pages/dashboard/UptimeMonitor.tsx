
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bot Uptime & Auto-Healing</h1>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-sm font-medium">All Systems Operational</span>
        </div>
      </div>

      {/* Uptime Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>Current Uptime</CardDescription>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{botStats.currentUptime}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>Total Downtime</CardDescription>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{botStats.totalDowntime}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>Last Restart</CardDescription>
            <RefreshCw className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{botStats.lastRestart}</div>
            <p className="text-xs text-green-600">Auto-healed</p>
          </CardContent>
        </Card>
        <Card>
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
        <Card>
          <CardHeader>
            <CardTitle>Uptime History (24h)</CardTitle>
            <CardDescription>Bot availability percentage over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={uptimeData}>
                <XAxis dataKey="time" />
                <YAxis domain={[95, 100]} />
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <Tooltip formatter={(value) => [`${value}%`, 'Uptime']} />
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
        <Card>
          <CardHeader>
            <CardTitle>Auto-Healing Configuration</CardTitle>
            <CardDescription>Configure automatic bot recovery settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto-Restart</h4>
                <p className="text-sm text-muted-foreground">Automatically restart bot on crash</p>
              </div>
              <Switch checked={botStats.autoHealing} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Send email alerts on incidents</p>
              </div>
              <Switch checked={botStats.notifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Telegram Notifications</h4>
                <p className="text-sm text-muted-foreground">Send Telegram alerts on incidents</p>
              </div>
              <Switch checked={true} />
            </div>
            <Button className="w-full">Test Notification</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents & Auto-Healing</CardTitle>
          <CardDescription>History of bot incidents and automatic recovery actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {incidents.map((incident, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                  <div>
                    <span className="text-sm font-medium">{incident.message}</span>
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
  );
}
