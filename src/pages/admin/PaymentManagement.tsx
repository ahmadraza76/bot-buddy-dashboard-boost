import { useState } from "react";
import { useAdminPayments } from "@/hooks/useAdmin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, CreditCard, RefreshCw, Eye, Download } from "lucide-react";
import PaymentStats from "./components/PaymentStats";
import PaymentFilters from "./components/PaymentFilters";
import PaymentTable from "./components/PaymentTable";

export default function PaymentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const { data: payments = [], isLoading, error, refetch } = useAdminPayments();

  // Compute filtered payments only here and share with children
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
      <PaymentStats payments={filteredPayments} />

      {/* Filters */}
      <PaymentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        methodFilter={methodFilter}
        setMethodFilter={setMethodFilter}
      />

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Payment Transactions
          </CardTitle>
          <CardDescription>
            All payment transactions and billing history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentTable
            payments={filteredPayments}
            isLoading={isLoading}
            error={error}
            refetch={refetch}
          />
        </CardContent>
      </Card>
    </div>
  );
}
