
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAdminPayoutRequests, useUpdatePayoutStatus } from "@/hooks/usePayoutRequests";
import { DollarSign, Clock, CheckCircle, XCircle, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModernTable from "./components/ModernTable";
import CompactStatsGrid from "./components/CompactStatsGrid";

export default function PayoutManagement() {
  const { data: payouts = [], isLoading, error, refetch } = useAdminPayoutRequests();
  const updateStatus = useUpdatePayoutStatus();

  function handlePayoutAction(action: string, payout: any) {
    if (action === 'approve') {
      updateStatus.mutate({ id: payout.id, status: 'approved' }, { onSettled: () => refetch() });
    } else if (action === 'decline') {
      updateStatus.mutate({ id: payout.id, status: 'declined' }, { onSettled: () => refetch() });
    }
  }

  const totalAmount = payouts.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
  const pendingCount = payouts.filter((p: any) => p.status === 'pending').length;
  const approvedCount = payouts.filter((p: any) => p.status === 'approved').length;
  const declinedCount = payouts.filter((p: any) => p.status === 'declined').length;

  const stats = [
    { 
      label: "Total Amount", 
      value: `₹${totalAmount.toLocaleString()}`,
      change: 23,
      icon: DollarSign, 
      color: "text-blue-600" 
    },
    { 
      label: "Pending", 
      value: pendingCount,
      change: 8,
      icon: Clock, 
      color: "text-yellow-600" 
    },
    { 
      label: "Approved", 
      value: approvedCount,
      change: 15,
      icon: CheckCircle, 
      color: "text-green-600" 
    },
    { 
      label: "Declined", 
      value: declinedCount,
      change: -12,
      icon: XCircle, 
      color: "text-red-600" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-orange-600 rounded-lg">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Payout Management
            </h1>
          </div>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Review and manage user payout requests with approval workflow
          </p>
        </div>

        {/* Action Bar */}
        <Card className="bg-white shadow-sm border">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search payout requests..."
                    className="pl-10 h-9 text-sm border-gray-200 focus:border-orange-500 rounded-lg"
                  />
                </div>
                <Button variant="outline" className="h-9 px-4 rounded-lg border-gray-200 text-sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-9 px-4 rounded-lg border-gray-200 text-sm">
                  Export Data
                </Button>
                <Button className="h-9 px-6 rounded-lg bg-orange-600 hover:bg-orange-700 text-sm">
                  Bulk Actions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <CompactStatsGrid stats={stats} />

        {/* Payout Requests Table */}
        <Card className="bg-white shadow-sm border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center justify-center gap-2">
              <DollarSign className="h-4 w-4 text-orange-600" />
              All Payout Requests
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 text-center">
              {payouts.length} requests found • {pendingCount} pending approval
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
                <span className="ml-2 text-sm text-gray-600">Loading payout requests...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-red-600">Failed to load payout requests</p>
              </div>
            ) : payouts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No payout requests found</p>
              </div>
            ) : (
              <ModernTable 
                data={payouts} 
                type="payouts" 
                onAction={handlePayoutAction}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
