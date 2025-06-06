
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Server, HardDrive, Cpu, MemoryStick, AlertTriangle } from "lucide-react";

// Sample monitoring data
const serverMetrics = [
  { time: "00:00", cpu: 25, memory: 60, disk: 45 },
  { time: "04:00", cpu: 30, memory: 65, disk: 45 },
  { time: "08:00", cpu: 45, memory: 70, disk: 46 },
  { time: "12:00", cpu: 60, memory: 75, disk: 47 },
  { time: "16:00", cpu: 55, memory: 72, disk: 47 },
  { time: "20:00", cpu: 40, memory: 68, disk: 48 },
];

export default function SystemMonitoring() {
  const serverStats = [
    { name: "Server 1", cpu: "45%", memory: "72%", disk: "48%", status: "healthy" },
    { name: "Server 2", cpu: "32%", memory: "58%", disk: "42%", status: "healthy" },
    { name: "Server 3", cpu: "78%", memory: "89%", disk: "65%", status: "warning" },
    { name: "Server 4", cpu: "15%", memory: "34%", disk: "25%", status: "healthy" },
  ];

  const systemAlerts = [
    { level: "critical", message: "Server 3 memory usage above 85%", time: "5 min ago" },
    { level: "warning", message: "High CPU load on Server 3", time: "15 min ago" },
    { level: "info", message: "Docker container restarted: bot_user_123", time: "1 hour ago" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">System Monitoring</h1>
        <div className="text-sm text-muted-foreground">
          Auto-refresh: Every 30 seconds
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>Overall CPU</CardDescription>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-xs text-muted-foreground">Across all servers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>Overall Memory</CardDescription>
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">63%</div>
            <p className="text-xs text-muted-foreground">247GB / 392GB used</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>Overall Disk</CardDescription>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <p className="text-xs text-muted-foreground">1.8TB / 4TB used</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>System Uptime</CardDescription>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-green-600">45 days, 12 hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>System Performance (24h)</CardTitle>
            <CardDescription>CPU, Memory, and Disk usage over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={serverMetrics}>
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Line
                  type="monotone"
                  dataKey="cpu"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="CPU"
                />
                <Line
                  type="monotone"
                  dataKey="memory"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Memory"
                />
                <Line
                  type="monotone"
                  dataKey="disk"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Disk"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Server Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 mr-2" />
              Server Status
            </CardTitle>
            <CardDescription>Individual server health and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serverStats.map((server, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      server.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <span className="font-medium">{server.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span>CPU: {server.cpu}</span>
                    <span>RAM: {server.memory}</span>
                    <span>Disk: {server.disk}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            System Alerts
          </CardTitle>
          <CardDescription>Recent system alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    alert.level === 'critical' ? 'bg-red-500' :
                    alert.level === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-sm">{alert.message}</span>
                </div>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
