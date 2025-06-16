
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
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Bot Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Monitor your bot performance, track user engagement, and analyze metrics in real-time
          </p>
        </div>

        {/* Session Generator */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <SessionGenerator />
          </div>
        </div>

        {/* Time Range Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Live Monitoring Active</span>
          </div>
          <div className="flex items-center gap-4">
            <Tabs defaultValue="week" value={timeRange} onValueChange={setTimeRange}>
              <TabsList className="bg-gray-100">
                <TabsTrigger value="day" className="px-6 py-2">Day</TabsTrigger>
                <TabsTrigger value="week" className="px-6 py-2">Week</TabsTrigger>
                <TabsTrigger value="month" className="px-6 py-2">Month</TabsTrigger>
                <TabsTrigger value="year" className="px-6 py-2">Year</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" className="px-6 py-2">
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-full bg-gray-50">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart - Full Width on Large Screens */}
          <Card className="lg:col-span-2 bg-white shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">Message Activity</CardTitle>
              <CardDescription className="text-gray-600">
                Daily message processing trends and user engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
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
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Side Charts */}
          <div className="space-y-8">
            
            {/* Uptime Chart */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">Bot Uptime</CardTitle>
                <CardDescription className="text-gray-600">
                  System reliability metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
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
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Commands Usage */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">Command Usage</CardTitle>
                <CardDescription className="text-gray-600">
                  Most popular bot commands
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={commandsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
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
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        wrapperStyle={{ fontSize: '12px' }}
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
