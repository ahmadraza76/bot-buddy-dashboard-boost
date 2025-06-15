import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminPayoutRequests, useUpdatePayoutStatus } from "@/hooks/usePayoutRequests";
import PayoutRequestTable from "./components/PayoutRequestTable";

export default function PayoutManagement() {
  const { data: payouts = [], isLoading, error, refetch } = useAdminPayoutRequests();
  const updateStatus = useUpdatePayoutStatus();

  function handleStatusChange(id: string, status: string) {
    updateStatus.mutate({ id, status }, { onSettled: () => refetch() });
  }

  return (
    <div className="px-2 py-2 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-3">
        <h1 className="text-sm sm:text-3xl font-bold">Payout Requests</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xs sm:text-lg">All User Payout Requests</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <PayoutRequestTable
            payouts={payouts}
            loading={isLoading}
            error={error}
            onStatusChange={handleStatusChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
