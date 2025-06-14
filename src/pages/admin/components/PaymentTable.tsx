
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Eye, RefreshCw } from "lucide-react";
import { getStatusColor } from "./getStatusColor";

interface PaymentTableProps {
  payments: any[];
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

export default function PaymentTable({
  payments,
  isLoading,
  error,
  refetch,
}: PaymentTableProps) {
  return (
    <div>
      {isLoading ? (
        <div className="p-6 text-center text-muted-foreground">
          Loading payments...
        </div>
      ) : error ? (
        <div className="p-6 text-center text-red-500">Could not load payments.</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment: any) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {payment.transaction_id}
                  </code>
                </TableCell>
                <TableCell>{payment.profiles?.email || "-"}</TableCell>
                <TableCell className="font-medium">₹{payment.amount}</TableCell>
                <TableCell>{payment.plan}</TableCell>
                <TableCell>
                  <Badge variant="outline">{payment.method}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(payment.status)} text-white`}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {payment.created_at
                    ? new Date(payment.created_at).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {payment.status === "pending" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Process Payment"
                        className="text-green-600"
                      >
                        <CreditCard className="h-4 w-4" />
                      </Button>
                    )}
                    {payment.status === "completed" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Refund"
                        className="text-blue-600"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
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
