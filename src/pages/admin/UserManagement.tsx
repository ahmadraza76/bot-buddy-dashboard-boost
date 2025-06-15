import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, UserCheck, UserX, MoreVertical, Eye } from "lucide-react";

// Sample user data
const users = [
  {
    id: 1,
    email: "john@example.com",
    telegramId: "@johndev",
    botToken: "1234567890:AAAA***************",
    joinDate: "2024-01-15",
    status: "active",
    subscription: "Monthly",
    botCount: 2,
    lastSeen: "2 hours ago"
  },
  {
    id: 2,
    email: "sarah@example.com", 
    telegramId: "@sarahmusic",
    botToken: "9876543210:BBBB***************",
    joinDate: "2024-02-10",
    status: "inactive",
    subscription: "Yearly",
    botCount: 1,
    lastSeen: "2 days ago"
  },
  {
    id: 3,
    email: "mike@example.com",
    telegramId: "@mikecoder",
    botToken: "5555555555:CCCC***************", 
    joinDate: "2024-03-05",
    status: "banned",
    subscription: "3 Months",
    botCount: 0,
    lastSeen: "1 week ago"
  },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.telegramId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "inactive": return "bg-yellow-500";
      case "banned": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="px-2 py-2 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3 sm:mb-4 gap-1">
        <h1 className="text-sm sm:text-3xl font-bold">User Management</h1>
        <div className="flex items-center space-x-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3 w-3" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-32 sm:w-44 text-xs h-7"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2 py-1 border rounded-md text-xs h-7"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2 mb-2 sm:mb-4">
        <Card>
          <CardHeader className="pb-1">
            <CardDescription className="text-[10px] sm:text-xs">Total Users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-base sm:text-2xl font-bold">1,247</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardDescription className="text-[10px] sm:text-xs">Active Users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-base sm:text-2xl font-bold text-green-600">892</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardDescription className="text-[10px] sm:text-xs">Inactive Users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-base sm:text-2xl font-bold text-yellow-600">320</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardDescription className="text-[10px] sm:text-xs">Banned Users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-base sm:text-2xl font-bold text-red-600">35</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xs sm:text-lg">All Users</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Manage and monitor all registered users</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-[50vw]">
            <TableHeader>
              <TableRow className="text-xs">
                <TableHead>User Details</TableHead>
                <TableHead>Telegram ID</TableHead>
                <TableHead>Bot Token</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Bots</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="text-xs sm:text-base">
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.email}</div>
                      <div className="text-xs text-muted-foreground break-all">
                        Joined: {user.joinDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="break-words">{user.telegramId}</span>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded truncate max-w-[90px] sm:max-w-none">
                      {user.botToken}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(user.status)} text-white text-xs`}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="break-words">{user.subscription}</TableCell>
                  <TableCell>{user.botCount}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{user.lastSeen}</TableCell>
                  <TableCell>
                    <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={user.status === "active" ? "text-red-600" : "text-green-600"}
                      >
                        {user.status === "active" ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
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
  );
}
