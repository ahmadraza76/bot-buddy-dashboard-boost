
import { useState } from "react";
import { useAdminPayments } from "@/hooks/useAdmin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CreditCard, RefreshCw, Download, DollarSign, AlertCircle, Clock, Filter } from "lucide-react";
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
  };

  const totalRevenue = filteredPayments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
  const completedPayments = filteredPayments.filter((p: any) => p.status === 'completed').length;
  const pendingPayments = filteredPayments.filter((p: any) => p.status === 'pending').length;
  const failedPayments = filteredPayments.filter((p: any) => p.status === 'failed').length;

  const stats = [
    { 
      label: "Total Revenue", 
      value: `₹${totalRevenue.toLocaleString()}`,
      change: 18,
      icon: DollarSign, 
      color: "text-green-600" 
    },
    { 
      label: "Completed", 
      value: completedPayments,
      change: 5,
      icon: CreditCard, 
      color: "text-blue-600" 
    },
    { 
      label: "Pending", 
      value: pendingPayments,
      change: -2,
      icon: Clock, 
      color: "text-yellow-600" 
    },
    { 
      label: "Failed", 
      value: failedPayments,
      change: -12,
      icon: AlertCircle, 
      color: "text-red-600" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-green-600 rounded-lg">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Payment Management
            </h1>
          </div>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Monitor transactions, manage revenue, and track financial metrics
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
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-9 text-sm border-gray-200 focus:border-green-500 rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:border-green-500 focus:outline-none min-w-[120px]"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                  <select
                    value={methodFilter}
                    onChange={(e) => setMethodFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:border-green-500 focus:outline-none min-w-[120px]"
                  >
                    <option value="all">All Methods</option>
                    <option value="razorpay">Razorpay</option>
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-9 px-4 rounded-lg border-gray-200 text-sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button variant="outline" className="h-9 px-4 rounded-lg border-gray-200 text-sm" onClick={() => refetch()}>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Sync
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <CompactStatsGrid stats={stats} />

        {/* Payments Table */}
        <Card className="bg-white shadow-sm border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center justify-center gap-2">
              <CreditCard className="h-4 w-4 text-green-600" />
              Payment Transactions
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 text-center">
              {filteredPayments.length} transactions found • Total: ₹{totalRevenue.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                <span className="ml-2 text-sm text-gray-600">Loading payments...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-red-600">Failed to load payments</p>
              </div>
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
    </div>
  );
}
