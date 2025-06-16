
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, UserCheck, UserX, Crown, Plus, Filter } from "lucide-react";
import ModernTable from "./components/ModernTable";
import CompactStatsGrid from "./components/CompactStatsGrid";

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
  };

  const stats = [
    { 
      label: "Total Users", 
      value: "1,247",
      change: 12,
      icon: Users, 
      color: "text-blue-600" 
    },
    { 
      label: "Active Users", 
      value: "892",
      change: 8,
      icon: UserCheck, 
      color: "text-green-600" 
    },
    { 
      label: "Inactive Users", 
      value: "320",
      change: -3,
      icon: UserX, 
      color: "text-yellow-600" 
    },
    { 
      label: "Premium Users", 
      value: "156",
      change: 15,
      icon: Crown, 
      color: "text-purple-600" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              User Management
            </h1>
          </div>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Manage and monitor all registered users and their activity
          </p>
        </div>

        {/* Search and Filter Section */}
        <Card className="bg-white shadow-sm border">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-9 text-sm border-gray-200 focus:border-blue-500 rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:border-blue-500 focus:outline-none min-w-[120px]"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="banned">Banned</option>
                  </select>
                  <Button variant="outline" className="h-9 px-4 rounded-lg border-gray-200 text-sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filters
                  </Button>
                </div>
              </div>
              <Button className="h-9 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm">
                <Plus className="h-4 w-4 mr-1" />
                Add User
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <CompactStatsGrid stats={stats} />

        {/* Users Table */}
        <Card className="bg-white shadow-sm border">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              All Users
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {filteredUsers.length} users found • Updated: {new Date().toLocaleTimeString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <ModernTable 
              data={filteredUsers} 
              type="users" 
              onAction={handleUserAction}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
