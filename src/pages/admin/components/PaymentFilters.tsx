
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PaymentFiltersProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  methodFilter: string;
  setMethodFilter: (v: string) => void;
}

export default function PaymentFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  methodFilter,
  setMethodFilter,
}: PaymentFiltersProps) {
  return (
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
  );
}
