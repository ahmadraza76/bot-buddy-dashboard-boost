
import { useState } from "react";
import { useAdminPayments } from "@/hooks/useAdmin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CreditCard, RefreshCw, Download, DollarSign, AlertCircle, Clock, Filter, Plus } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-green-600 rounded-2xl">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Payment Management
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Monitor all payment transactions, manage revenue, and track financial metrics
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
                    placeholder="Search payments by email or transaction ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 text-base border-gray-200 focus:border-green-500 rounded-xl"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl text-base bg-white focus:border-green-500 focus:outline-none min-w-[140px]"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                  <select
                    value={methodFilter}
                    onChange={(e) => setMethodFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl text-base bg-white focus:border-green-500 focus:outline-none min-w-[140px]"
                  >
                    <option value="all">All Methods</option>
                    <option value="razorpay">Razorpay</option>
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="h-12 px-6 rounded-xl border-gray-200">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" className="h-12 px-6 rounded-xl border-gray-200" onClick={() => refetch()}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <CompactStatsGrid stats={stats} />

        {/* Payments Table */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <CreditCard className="h-6 w-6 text-green-600" />
              Payment Transactions
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              {filteredPayments.length} transactions found • Total Revenue: ₹{totalRevenue.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-3 text-gray-600">Loading payments...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 font-medium">Failed to load payments</p>
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
