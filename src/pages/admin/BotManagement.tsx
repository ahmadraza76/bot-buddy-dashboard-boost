
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Play, Square, RotateCcw, Trash2, Eye, Container } from "lucide-react";

// Sample bot data
const bots = [
  {
    id: 1,
    username: "@MusicBot1",
    owner: "john@example.com",
    status: "running",
    containerId: "abc123def456",
    uptime: "5d 12h",
    lastActivity: "2 min ago",
    memoryUsage: "256MB",
    cpuUsage: "15%"
  },
  {
    id: 2,
    username: "@SarahMusicBot",
    owner: "sarah@example.com", 
    status: "stopped",
    containerId: "def789ghi012",
    uptime: "-",
    lastActivity: "2 hours ago",
    memoryUsage: "-",
    cpuUsage: "-"
  },
  {
    id: 3,
    username: "@MikeBot",
    owner: "mike@example.com",
    status: "error",
    containerId: "ghi345jkl678",
    uptime: "-",
    lastActivity: "1 day ago",
    memoryUsage: "-",
    cpuUsage: "-"
  },
];

export default function BotManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBots = bots.filter(bot => {
    const matchesSearch = bot.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bot.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bot.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-green-500";
      case "stopped": return "bg-yellow-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Bot Management</h1>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search bots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 h-9 text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm bg-white h-9"
            >
              <option value="all">All Status</option>
              <option value="running">Running</option>
              <option value="stopped">Stopped</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">Total Bots</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">892</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">Running Bots</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-600">678</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">Stopped Bots</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-yellow-600">156</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">Error Bots</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-red-600">58</div>
            </CardContent>
          </Card>
        </div>

        {/* Bots Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">All Bots</CardTitle>
            <CardDescription className="text-sm">Monitor and control all deployed bots</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Bot Details</TableHead>
                  <TableHead className="text-xs">Owner</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Container ID</TableHead>
                  <TableHead className="text-xs">Uptime</TableHead>
                  <TableHead className="text-xs">Resource Usage</TableHead>
                  <TableHead className="text-xs">Last Activity</TableHead>
                  <TableHead className="text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBots.map((bot) => (
                  <TableRow key={bot.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Container className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div className="font-medium text-sm">{bot.username}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{bot.owner}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(bot.status)} text-white text-xs`}>
                        {bot.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {bot.containerId.substring(0, 12)}...
                      </code>
                    </TableCell>
                    <TableCell className="text-sm">{bot.uptime}</TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <div>RAM: {bot.memoryUsage}</div>
                        <div>CPU: {bot.cpuUsage}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {bot.lastActivity}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" title="View Logs" className="h-7 w-7 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        {bot.status === "running" ? (
                          <Button variant="ghost" size="sm" title="Stop Bot" className="text-red-600 h-7 w-7 p-0">
                            <Square className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" title="Start Bot" className="text-green-600 h-7 w-7 p-0">
                            <Play className="h-3 w-3" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" title="Restart Bot" className="h-7 w-7 p-0">
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Delete Bot" className="text-red-600 h-7 w-7 p-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
