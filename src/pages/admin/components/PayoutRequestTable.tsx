
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PayoutRequestTable({
  payouts,
  onStatusChange,
  loading,
  error,
}: {
  payouts: any[];
  onStatusChange: (id: string, status: string) => void;
  loading: boolean;
  error: any;
}) {
  return (
    <div>
      {loading ? (
        <div className="p-6 text-center text-muted-foreground">
          Loading payout requests...
        </div>
      ) : error ? (
        <div className="p-6 text-center text-red-500">
          Could not load payout requests.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payouts.map((req: any) => (
              <TableRow key={req.id}>
                <TableCell>{req.profiles?.email ?? "-"}</TableCell>
                <TableCell>₹{req.amount}</TableCell>
                <TableCell>{req.method?.toUpperCase()}</TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-2 py-1 rounded block">
                    {JSON.stringify(req.details, null, 1)}
                  </code>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      req.status === "pending"
                        ? "bg-yellow-500"
                        : req.status === "approved"
                        ? "bg-green-600"
                        : req.status === "declined"
                        ? "bg-red-600"
                        : "bg-gray-400"
                    } text-white`}
                  >
                    {req.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {req.created_at
                    ? new Date(req.created_at).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {req.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-green-600"
                          onClick={() => onStatusChange(req.id, "approved")}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="text-red-600"
                          onClick={() => onStatusChange(req.id, "declined")}
                        >
                          Decline
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
