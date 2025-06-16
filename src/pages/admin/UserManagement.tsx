
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
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              User Management
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and monitor all registered users, their subscriptions, and activity
          </p>
        </div>

        {/* Search and Filter Section */}
        <Card className="bg-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search users by email or telegram..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 text-base border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl text-base bg-white focus:border-blue-500 focus:outline-none min-w-[140px]"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="banned">Banned</option>
                  </select>
                  <Button variant="outline" className="h-12 px-6 rounded-xl border-gray-200">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
              <Button className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New User
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <CompactStatsGrid stats={stats} />

        {/* Users Table */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Users className="h-6 w-6 text-blue-600" />
              All Users
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              {filteredUsers.length} users found • Last updated: {new Date().toLocaleTimeString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
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
