import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SessionGenerator from "@/components/SessionGenerator";

// Sample data for charts
const messagesData = [
  { name: "Mon", value: 420 },
  { name: "Tue", value: 580 },
  { name: "Wed", value: 510 },
  { name: "Thu", value: 670 },
  { name: "Fri", value: 740 },
  { name: "Sat", value: 380 },
  { name: "Sun", value: 290 },
];

const uptimeData = [
  { name: "Week 1", value: 99.98 },
  { name: "Week 2", value: 99.95 },
  { name: "Week 3", value: 100 },
  { name: "Week 4", value: 99.99 },
];

const commandsData = [
  { name: "Start", value: 35 },
  { name: "Help", value: 25 },
  { name: "Info", value: 20 },
  { name: "Settings", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function DashboardIndex() {
  const [timeRange, setTimeRange] = useState("week");

  // Stats for the current bot
  const stats = [
    { label: "Total Users", value: "1,234" },
    { label: "Active Today", value: "456" },
    { label: "Total Messages", value: "23.4k" },
    { label: "Response Time", value: "1.2s" },
  ];

  return (
    <div>
      {/* Insert SessionGenerator at the top of dashboard */}
      <SessionGenerator />
      {/* Title and filter row */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-4 mt-2">
        <h1 className="font-bold text-base sm:text-2xl leading-none sm:leading-tight">
          <span className="block sm:inline text-[1rem] sm:text-2xl">Dashboard</span>
        </h1>
        <div className="flex items-center gap-1 flex-row">
          <Tabs defaultValue="week" value={timeRange} onValueChange={setTimeRange}>
            <TabsList className="flex px-0 py-0 bg-transparent gap-0">
              <TabsTrigger value="day" className="text-[10px] sm:text-xs px-2 py-1 h-6 sm:h-8 rounded-none">Day</TabsTrigger>
              <TabsTrigger value="week" className="text-[10px] sm:text-xs px-2 py-1 h-6 sm:h-8 rounded-none">Week</TabsTrigger>
              <TabsTrigger value="month" className="text-[10px] sm:text-xs px-2 py-1 h-6 sm:h-8 rounded-none">Month</TabsTrigger>
              <TabsTrigger value="year" className="text-[10px] sm:text-xs px-2 py-1 h-6 sm:h-8 rounded-none">Year</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" className="text-[10px] sm:text-xs px-2 py-1 h-6 sm:h-8">
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs sm:text-sm">{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-base sm:text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Message Activity</CardTitle>
            <CardDescription>Number of messages processed over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={messagesData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uptime</CardTitle>
            <CardDescription>Bot uptime performance</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={uptimeData}>
                <XAxis dataKey="name" />
                <YAxis domain={[99.9, 100]} tickFormatter={(value) => `${value}%`} />
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Uptime']}
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commands Usage</CardTitle>
            <CardDescription>Most used bot commands</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={commandsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {commandsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} uses`, name]}
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
