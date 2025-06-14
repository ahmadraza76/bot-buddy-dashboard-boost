import { useState } from "react";
import { useAdminPayments } from "@/hooks/useAdmin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, CreditCard, RefreshCw, Eye, Download } from "lucide-react";

export default function PaymentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const { data: payments = [], isLoading, error, refetch } = useAdminPayments();

  const filteredPayments = (payments || []).filter((payment: any) => {
    const matchesSearch =
      (payment.profiles?.email || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (payment.transaction_id || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod =
      methodFilter === "all" || (payment.method || "").toLowerCase() === methodFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "failed":
        return "bg-red-500";
      case "refunded":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync
          </Button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Optionally compute from payments data */}
            <div className="text-2xl font-bold">
              ₹
              {
                filteredPayments
                  .filter((p: any) => p.status === "completed")
                  .reduce((sum: number, p: any) => sum + Number(p.amount || 0), 0)
                  .toLocaleString()
              }
            </div>
            <p className="text-xs text-green-600">Live payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Calculate by filtering payments of this month */}
            <div className="text-2xl font-bold">
              ₹
              {
                filteredPayments
                  .filter(
                    (p: any) =>
                      p.status === "completed" &&
                      new Date(p.created_at).getMonth() === new Date().getMonth() &&
                      new Date(p.created_at).getFullYear() === new Date().getFullYear()
                  )
                  .reduce((sum: number, p: any) => sum + Number(p.amount || 0), 0)
                  .toLocaleString()
              }
            </div>
            <p className="text-xs text-green-600">Stats this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Failed Payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {filteredPayments.filter((p: any) => p.status === "failed").length}
            </div>
            <p className="text-xs text-red-600">Failures</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {filteredPayments.filter((p: any) => p.status === "pending").length}
            </div>
            <p className="text-xs text-yellow-600">Awaiting</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
        <select
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">All Methods</option>
          <option value="razorpay">Razorpay</option>
          <option value="UPI">UPI</option>
          <option value="PayPal">PayPal</option>
          <option value="USDT">USDT</option>
        </select>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Payment Transactions
          </CardTitle>
          <CardDescription>All payment transactions and billing history</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="p-6 text-center text-muted-foreground">Loading payments...</div>
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
                {filteredPayments.map((payment: any) => (
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
                          <Button variant="ghost" size="sm" title="Process Payment" className="text-green-600">
                            <CreditCard className="h-4 w-4" />
                          </Button>
                        )}
                        {payment.status === "completed" && (
                          <Button variant="ghost" size="sm" title="Refund" className="text-blue-600">
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
        </CardContent>
      </Card>
    </div>
  );
}
