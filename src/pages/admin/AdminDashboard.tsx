
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
    },
    { 
      label: "Running Bots", 
      value: runningBots,
      change: "+8%",
      icon: Activity, 
      color: "text-green-600",
    },
    { 
      label: "Stopped Bots", 
      value: stoppedBots,
      change: "-3%",
      icon: Server, 
      color: "text-yellow-600",
    },
    { 
      label: "Error Bots", 
      value: errorBots,
      change: "-15%",
      icon: AlertTriangle, 
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            System monitoring and management for bot infrastructure
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            All Systems Operational
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow border">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-gray-50">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
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
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-white shadow-sm border">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Common administrative tasks and controls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium text-sm">Manage Users</div>
                <div className="text-xs opacity-90">Control user accounts</div>
              </button>
              
              <button className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Bot className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium text-sm">Bot Control</div>
                <div className="text-xs opacity-90">Monitor bots</div>
              </button>
              
              <button className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium text-sm">Analytics</div>
                <div className="text-xs opacity-90">View metrics</div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Bot Management Table */}
        <Card className="bg-white shadow-sm border">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Bot Management</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Monitor and control all deployed bots
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
