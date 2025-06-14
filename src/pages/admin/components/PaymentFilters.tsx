
import SearchFilter from "./filters/SearchFilter";
import StatusFilter from "./filters/StatusFilter";
import MethodFilter from "./filters/MethodFilter";

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
      <SearchFilter value={searchTerm} onChange={setSearchTerm} />
      <StatusFilter value={statusFilter} onChange={setStatusFilter} />
      <MethodFilter value={methodFilter} onChange={setMethodFilter} />
    </div>
  );
}
