
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
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-orange-600 rounded-2xl">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Payout Management
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review and manage user payout requests with comprehensive approval workflow
          </p>
        </div>

        {/* Action Bar */}
        <Card className="bg-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search payout requests..."
                    className="pl-12 h-12 text-base border-gray-200 focus:border-orange-500 rounded-xl"
                  />
                </div>
                <Button variant="outline" className="h-12 px-6 rounded-xl border-gray-200">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Requests
                </Button>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="h-12 px-6 rounded-xl border-gray-200">
                  Export Data
                </Button>
                <Button className="h-12 px-8 rounded-xl bg-orange-600 hover:bg-orange-700">
                  Bulk Actions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <CompactStatsGrid stats={stats} />

        {/* Payout Requests Table */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <DollarSign className="h-6 w-6 text-orange-600" />
              All Payout Requests
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              {payouts.length} requests found • {pendingCount} pending approval
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                <span className="ml-3 text-gray-600">Loading payout requests...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 font-medium">Failed to load payout requests</p>
              </div>
            ) : payouts.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">No payout requests found</p>
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
