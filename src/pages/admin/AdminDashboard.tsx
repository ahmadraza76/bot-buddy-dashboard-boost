
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardDescription>{item.label}</CardDescription>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Bots Table with all controls */}
      <div className="mb-10">
        <BotAdminTable bots={bots} loading={botsLoading} error={botsError} />
      </div>
    </div>
  );
}
