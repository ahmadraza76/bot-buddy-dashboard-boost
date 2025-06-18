
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
import { TrendingUp, Users, MessageSquare, Clock } from "lucide-react";

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

  const stats = [
    { 
      label: "Total Users", 
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    { 
      label: "Active Today", 
      value: "456",
      change: "+8%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    { 
      label: "Total Messages", 
      value: "23.4k",
      change: "+24%",
      icon: MessageSquare,
      color: "text-purple-600"
    },
    { 
      label: "Response Time", 
      value: "1.2s",
      change: "-5%",
      icon: Clock,
      color: "text-orange-600"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-xl font-semibold text-gray-900">
            Bot Dashboard
          </h1>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Monitor your bot performance, track user engagement, and analyze metrics
          </p>
        </div>

        {/* Session Generator */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <SessionGenerator />
          </div>
        </div>

        {/* Time Range Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-white rounded-lg p-3 shadow-sm border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gray-700">Live Monitoring Active</span>
          </div>
          <div className="flex items-center gap-3">
            <Tabs defaultValue="week" value={timeRange} onValueChange={setTimeRange}>
              <TabsList className="bg-gray-100 h-8">
                <TabsTrigger value="day" className="px-3 py-1 text-xs">Day</TabsTrigger>
                <TabsTrigger value="week" className="px-3 py-1 text-xs">Week</TabsTrigger>
                <TabsTrigger value="month" className="px-3 py-1 text-xs">Month</TabsTrigger>
                <TabsTrigger value="year" className="px-3 py-1 text-xs">Year</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" className="px-3 py-1 text-xs h-8">
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow border">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-gray-50">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart */}
          <Card className="lg:col-span-2 bg-white shadow-sm border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-gray-900">Message Activity</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Daily message processing trends and user engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={messagesData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Side Charts */}
          <div className="space-y-6">
            
            {/* Uptime Chart */}
            <Card className="bg-white shadow-sm border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-gray-900">Bot Uptime</CardTitle>
                <CardDescription className="text-xs text-gray-600">
                  System reliability metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={uptimeData}>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 10 }}
                      />
                      <YAxis 
                        domain={[99.9, 100]} 
                        tickFormatter={(value) => `${value}%`}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 10 }}
                      />
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Uptime']}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #E5E7EB',
                          borderRadius: '6px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Commands Usage */}
            <Card className="bg-white shadow-sm border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-gray-900">Command Usage</CardTitle>
                <CardDescription className="text-xs text-gray-600">
                  Most popular bot commands
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={commandsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {commandsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} uses`, name]}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #E5E7EB',
                          borderRadius: '6px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        height={24}
                        wrapperStyle={{ fontSize: '10px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
