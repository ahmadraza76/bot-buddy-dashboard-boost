
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Log level types
type LogLevel = "info" | "error" | "warning" | "success";

// Log entry interface
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
}

// Generate mock logs
const generateMockLogs = (): LogEntry[] => {
  const logs: LogEntry[] = [];
  const levels: LogLevel[] = ["info", "error", "warning", "success"];
  const messages = [
    "Bot started successfully",
    "Received message from user",
    "Processing command /start",
    "Invalid command received",
    "API request failed",
    "Database connection error",
    "Message delivered successfully",
    "New user registered",
    "Session expired",
    "Command execution completed",
  ];

  // Generate logs for the past hour
  const now = new Date();
  for (let i = 0; i < 50; i++) {
    const pastTime = new Date(now.getTime() - i * 60000 * Math.random() * 10);
    logs.push({
      timestamp: pastTime.toISOString(),
      level: levels[Math.floor(Math.random() * levels.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
    });
  }

  // Sort by timestamp (newest first)
  return logs.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

export default function LogsViewer() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [liveMode, setLiveMode] = useState<boolean>(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load initial logs
  useEffect(() => {
    setLogs(generateMockLogs());
  }, []);

  // Filter logs when filter changes
  useEffect(() => {
    if (filter === "all") {
      setFilteredLogs(logs);
    } else {
      setFilteredLogs(logs.filter(log => log.level === filter));
    }
  }, [filter, logs]);

  // Auto-scroll logic
  useEffect(() => {
    if (autoScroll && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [filteredLogs, autoScroll]);

  // Simulate live logs coming in
  useEffect(() => {
    if (!liveMode) return;

    const levels: LogLevel[] = ["info", "error", "warning", "success"];
    const messages = [
      "Processing user request",
      "Command executed",
      "Message sent",
      "API request completed",
      "User interaction detected",
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // Only add log sometimes to make it more realistic
        const newLog: LogEntry = {
          timestamp: new Date().toISOString(),
          level: levels[Math.floor(Math.random() * levels.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
        };
        
        setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 99)]); // Keep only the latest 100 logs
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [liveMode]);

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  // Clear logs
  const handleClearLogs = () => {
    setLogs([]);
    toast({
      title: "Logs Cleared",
      description: "All logs have been cleared from the viewer.",
    });
  };

  // Toggle live mode
  const handleLiveModeToggle = (checked: boolean) => {
    setLiveMode(checked);
    if (checked) {
      toast({
        title: "Live Mode Enabled",
        description: "You'll now see logs in real-time.",
      });
    } else {
      toast({
        title: "Live Mode Disabled",
        description: "Real-time log updates have been paused.",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Live Logs</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="live-mode" 
              checked={liveMode} 
              onCheckedChange={handleLiveModeToggle} 
            />
            <Label htmlFor="live-mode">Live Mode</Label>
          </div>
          <Button variant="outline" onClick={handleClearLogs}>Clear Logs</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Bot Logs</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-scroll" 
                  checked={autoScroll} 
                  onCheckedChange={setAutoScroll} 
                />
                <Label htmlFor="auto-scroll">Auto Scroll</Label>
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="terminal" ref={terminalRef}>
            {filteredLogs.length === 0 ? (
              <div className="text-center p-4 text-muted-foreground">
                No logs to display.
                {filter !== "all" && (
                  <p className="mt-2">Try changing the filter or generating some activity.</p>
                )}
              </div>
            ) : (
              filteredLogs.map((log, index) => (
                <div key={index} className="log-entry">
                  <span className="log-timestamp">[{formatTimestamp(log.timestamp)}]</span>
                  <span className={`log-level-${log.level} font-bold`}>
                    [{log.level.toUpperCase()}]
                  </span>
                  <span className="ml-2">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
