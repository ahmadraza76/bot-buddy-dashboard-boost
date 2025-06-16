
import { useState } from "react";
import { useAdminPayments } from "@/hooks/useAdmin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CreditCard, RefreshCw, Download, DollarSign, AlertCircle, Clock } from "lucide-react";
import ModernTable from "./components/ModernTable";
import CompactStatsGrid from "./components/CompactStatsGrid";

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
      methodFilter === "all" ||
      (payment.method || "").toLowerCase() === methodFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handlePaymentAction = (action: string, payment: any) => {
    console.log(`${action} action for payment:`, payment);
    // Handle payment actions here
  };

  // Calculate stats
  const totalRevenue = filteredPayments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
  const completedPayments = filteredPayments.filter((p: any) => p.status === 'completed').length;
  const pendingPayments = filteredPayments.filter((p: any) => p.status === 'pending').length;
  const failedPayments = filteredPayments.filter((p: any) => p.status === 'failed').length;

  const stats = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-500", change: 18 },
    { label: "Completed", value: completedPayments, icon: CreditCard, color: "text-blue-500", change: 5 },
    { label: "Pending", value: pendingPayments, icon: Clock, color: "text-yellow-500", change: -2 },
    { label: "Failed", value: failedPayments, icon: AlertCircle, color: "text-red-500", change: -12 },
  ];

  return (
    <div className="px-2 py-2 sm:px-0 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-xs sm:text-sm text-gray-500">Monitor all payment transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-7">
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-7" onClick={() => refetch()}>
            <RefreshCw className="h-3 w-3 mr-1" />
            Sync
          </Button>
        </div>
      </div>

      <CompactStatsGrid stats={stats} />

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 text-xs h-8"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2 py-1 border rounded-md text-xs h-8 bg-white"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="px-2 py-1 border rounded-md text-xs h-8 bg-white"
              >
                <option value="all">All Methods</option>
                <option value="razorpay">Razorpay</option>
                <option value="stripe">Stripe</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-sm sm:text-lg flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment Transactions
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {filteredPayments.length} transactions found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="p-6 text-center text-gray-500">Loading payments...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">Failed to load payments</div>
          ) : (
            <ModernTable 
              data={filteredPayments} 
              type="payments" 
              onAction={handlePaymentAction}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
