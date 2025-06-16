
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, UserCheck, UserX, Crown } from "lucide-react";
import ModernTable from "./components/ModernTable";
import CompactStatsGrid from "./components/CompactStatsGrid";

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

  const handleUserAction = (action: string, user: any) => {
    console.log(`${action} action for user:`, user);
    // Handle user actions here
  };

  const stats = [
    { label: "Total Users", value: "1,247", icon: Users, color: "text-blue-500", change: 12 },
    { label: "Active Users", value: "892", icon: UserCheck, color: "text-green-500", change: 8 },
    { label: "Inactive Users", value: "320", icon: UserX, color: "text-yellow-500", change: -3 },
    { label: "Premium Users", value: "156", icon: Crown, color: "text-purple-500", change: 15 },
  ];

  return (
    <div className="px-2 py-2 sm:px-0 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-xs sm:text-sm text-gray-500">Manage and monitor all registered users</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full sm:w-44 text-xs h-8"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2 py-1 border rounded-md text-xs h-8 bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      <CompactStatsGrid stats={stats} />

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-sm sm:text-lg flex items-center gap-2">
            <Users className="h-4 w-4" />
            All Users
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {filteredUsers.length} users found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ModernTable 
            data={filteredUsers} 
            type="users" 
            onAction={handleUserAction}
          />
        </CardContent>
      </Card>
    </div>
  );
}
