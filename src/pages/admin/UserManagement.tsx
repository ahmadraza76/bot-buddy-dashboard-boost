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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base sm:text-3xl font-bold">User Management</h1>
        <div className="flex items-center space-x-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3 w-3" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-44 text-xs h-7"
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <Card>
          <CardHeader className="pb-1">
            <CardDescription className="text-xs">Total Users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-base sm:text-2xl font-bold">1,247</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardDescription className="text-xs">Active Users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-base sm:text-2xl font-bold text-green-600">892</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardDescription className="text-xs">Inactive Users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-base sm:text-2xl font-bold text-yellow-600">320</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardDescription className="text-xs">Banned Users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-base sm:text-2xl font-bold text-red-600">35</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xs sm:text-lg">All Users</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Manage and monitor all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
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
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.email}</div>
                      <div className="text-sm text-muted-foreground">
                        Joined: {user.joinDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.telegramId}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {user.botToken}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(user.status)} text-white`}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.subscription}</TableCell>
                  <TableCell>{user.botCount}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastSeen}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
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
