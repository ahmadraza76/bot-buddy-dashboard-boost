
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminPayoutRequests, useUpdatePayoutStatus } from "@/hooks/usePayoutRequests";
import { DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";
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

  // Calculate stats
  const totalAmount = payouts.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
  const pendingCount = payouts.filter((p: any) => p.status === 'pending').length;
  const approvedCount = payouts.filter((p: any) => p.status === 'approved').length;
  const declinedCount = payouts.filter((p: any) => p.status === 'declined').length;

  const stats = [
    { label: "Total Amount", value: `₹${totalAmount.toLocaleString()}`, icon: DollarSign, color: "text-blue-500" },
    { label: "Pending", value: pendingCount, icon: Clock, color: "text-yellow-500" },
    { label: "Approved", value: approvedCount, icon: CheckCircle, color: "text-green-500" },
    { label: "Declined", value: declinedCount, icon: XCircle, color: "text-red-500" },
  ];

  return (
    <div className="px-2 py-2 sm:px-0 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Payout Requests</h1>
          <p className="text-xs sm:text-sm text-gray-500">Manage user payout requests</p>
        </div>
      </div>

      <CompactStatsGrid stats={stats} />

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-sm sm:text-lg flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            All Payout Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="p-6 text-center text-gray-500">Loading payout requests...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">Failed to load payout requests</div>
          ) : payouts.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No payout requests found</div>
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
  );
}
