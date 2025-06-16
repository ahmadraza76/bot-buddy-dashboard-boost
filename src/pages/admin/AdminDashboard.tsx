
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Activity, Bot, Users, TrendingUp, Shield, Server } from "lucide-react";
import { useAdminBots } from "@/hooks/useAdmin";
import BotAdminTable from "./components/BotAdminTable";

export default function AdminDashboard() {
  const { data: bots = [], isLoading: botsLoading, error: botsError } = useAdminBots();

  // Stats calculation
  const totalBots = bots.length;
  const runningBots = bots.filter((b: any) => b.status === "running").length;
  const stoppedBots = bots.filter((b: any) => b.status === "stopped").length;
  const errorBots = bots.filter((b: any) => b.status === "error").length;

  const stats = [
    { 
      label: "Total Bots", 
      value: totalBots,
      change: "+12%",
      icon: Bot, 
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      label: "Running Bots", 
      value: runningBots,
      change: "+8%",
      icon: Activity, 
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      label: "Stopped Bots", 
      value: stoppedBots,
      change: "-3%",
      icon: Server, 
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    { 
      label: "Error Bots", 
      value: errorBots,
      change: "-15%",
      icon: AlertTriangle, 
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive system monitoring and management for your bot infrastructure
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            All Systems Operational
          </div>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
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

        {/* Quick Actions */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600">
              Common administrative tasks and system controls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                <Users className="h-8 w-8 mx-auto mb-3" />
                <div className="font-semibold text-lg">Manage Users</div>
                <div className="text-sm opacity-90">View and control user accounts</div>
              </button>
              
              <button className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                <Bot className="h-8 w-8 mx-auto mb-3" />
                <div className="font-semibold text-lg">Bot Control</div>
                <div className="text-sm opacity-90">Start, stop, and monitor bots</div>
              </button>
              
              <button className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                <TrendingUp className="h-8 w-8 mx-auto mb-3" />
                <div className="font-semibold text-lg">Analytics</div>
                <div className="text-sm opacity-90">View system performance metrics</div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Bot Management Table */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Bot Management</CardTitle>
            <CardDescription className="text-gray-600">
              Monitor and control all deployed bots in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BotAdminTable bots={bots} loading={botsLoading} error={botsError} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
