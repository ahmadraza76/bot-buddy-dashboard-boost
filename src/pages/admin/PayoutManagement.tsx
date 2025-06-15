
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Payout Requests</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All User Payout Requests</CardTitle>
        </CardHeader>
        <CardContent>
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
