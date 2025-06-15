import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Activity, Bot, CreditCard, Users } from "lucide-react";
import { useAdminBots } from "@/hooks/useAdmin";
import { useHealingHistory } from "@/hooks/useHealingSystem";
import BotAdminTable from "./components/BotAdminTable";

export default function AdminDashboard() {
  // Backend bots
  const { data: bots = [], isLoading: botsLoading, error: botsError } = useAdminBots();

  // Stats calculation
  const totalBots = bots.length;
  const runningBots = bots.filter((b: any) => b.status === "running").length;
  const stoppedBots = bots.filter((b: any) => b.status === "stopped").length;
  const errorBots = bots.filter((b: any) => b.status === "error").length;

  // Demo stat cards. You can later backend these too.
  const stats = [
    { label: "Total Bots", value: totalBots, icon: Bot, color: "text-foreground" },
    { label: "Running Bots", value: runningBots, icon: Activity, color: "text-green-600" },
    { label: "Stopped Bots", value: stoppedBots, icon: Activity, color: "text-yellow-600" },
    { label: "Error Bots", value: errorBots, icon: AlertTriangle, color: "text-red-600" },
  ];

  return (
    <div className="px-2 py-2 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-4">
        <h1 className="text-sm sm:text-3xl font-bold">Admin Dashboard</h1>
        <div className="text-[11px] sm:text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2 mb-3 sm:mb-4">
        {stats.map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-1 flex flex-row items-center justify-between">
              <CardDescription className="text-[10px]">{item.label}</CardDescription>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-base sm:text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mb-8 sm:mb-10">
        <BotAdminTable bots={bots} loading={botsLoading} error={botsError} />
      </div>
    </div>
  );
}
