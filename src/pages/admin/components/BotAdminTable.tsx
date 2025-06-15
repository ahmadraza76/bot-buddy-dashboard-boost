
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Square, RotateCcw, Trash2, Eye, Container } from "lucide-react";
import { useHealingHistory, useTriggerHealing } from "@/hooks/useHealingSystem";
import { useToast } from "@/hooks/use-toast";

export default function BotAdminTable({ bots, loading, error }: { bots: any[]; loading: boolean; error: any }) {
  const [selectedBotLogs, setSelectedBotLogs] = useState<string | null>(null);
  const triggerHealing = useTriggerHealing();
  const { toast } = useToast();

  if (loading) {
    return (
      <Card>
        <CardContent>
          <div className="p-8 text-center text-muted-foreground">Loading bots...</div>
        </CardContent>
      </Card>
    );
  }
  if (error) {
    return (
      <Card>
        <CardContent>
          <div className="p-8 text-center text-red-500">Failed to load bots list.</div>
        </CardContent>
      </Card>
    );
  }
  if (!bots.length) {
    return (
      <Card>
        <CardContent>
          <div className="p-8 text-center text-muted-foreground">No bots found.</div>
        </CardContent>
      </Card>
    );
  }

  // Helper
  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-green-500";
      case "stopped": return "bg-yellow-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  // Dummy log data for demo if logs are not available
  const getLogs = (bot: any) => bot.logs || [
    `[INFO] Bot started at ${bot.created_at}`,
    `[ERROR] ffmpeg: command not found`,
    `[ERROR] yt-dlp: Unable to extract video URL`,
    `[SUCCESS] AI Healing: pip install -U yt-dlp`
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Bots</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bot</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Container ID</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Resource Usage</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>Logs</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bots.map((bot) => (
              <TableRow key={bot.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Container className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div className="font-medium">{bot.username}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(bot.status)} text-white`}>
                    {bot.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {bot.container_id?.slice(0, 10)}...
                  </code>
                </TableCell>
                <TableCell>
                  {bot.profiles?.email}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>RAM: {bot.memory_usage || "0MB"}</div>
                    <div>CPU: {bot.cpu_usage || "0%"}</div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {bot.last_activity ? new Date(bot.last_activity).toLocaleString() : "-"}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => setSelectedBotLogs(selectedBotLogs === bot.id ? null : bot.id)}>
                    <Eye className="h-4 w-4" /> Logs
                  </Button>
                  {selectedBotLogs === bot.id && (
                    <div className="absolute z-30 bg-background shadow-lg rounded-lg p-4 mt-2 border w-96 max-w-full">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-semibold text-muted-foreground text-sm">Recent Logs</div>
                        <Button size="icon" variant="ghost" onClick={() => setSelectedBotLogs(null)}>x</Button>
                      </div>
                      <div className="text-xs max-h-64 overflow-y-auto font-mono whitespace-pre">
                        {getLogs(bot).map((log: string, idx: number) => (
                          <div key={idx} className={log.includes("ERROR") ? "text-red-500" : log.includes("SUCCESS") ? "text-green-600" : ""}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {bot.status === "running" ? (
                      <Button size="icon" variant="ghost" title="Stop Bot">
                        <Square className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button size="icon" variant="ghost" title="Start Bot">
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="icon" variant="ghost" title="Restart Bot">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" title="Delete Bot" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
