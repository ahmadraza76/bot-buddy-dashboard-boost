
import TotalRevenueCard from "./stats/TotalRevenueCard";
import MonthlyRevenueCard from "./stats/MonthlyRevenueCard";
import FailedPaymentsCard from "./stats/FailedPaymentsCard";
import PendingPaymentsCard from "./stats/PendingPaymentsCard";

interface PaymentStatsProps {
  payments: any[];
}

export default function PaymentStats({ payments }: PaymentStatsProps) {
  const totalRevenue = payments
    .filter((p: any) => p.status === "completed")
    .reduce((sum: number, p: any) => sum + Number(p.amount || 0), 0)
    .toLocaleString();

  const monthlyRevenue = payments
    .filter(
      (p: any) =>
        p.status === "completed" &&
        new Date(p.created_at).getMonth() === new Date().getMonth() &&
        new Date(p.created_at).getFullYear() === new Date().getFullYear()
    )
    .reduce((sum: number, p: any) => sum + Number(p.amount || 0), 0)
    .toLocaleString();

  const failedPayments = payments.filter((p: any) => p.status === "failed").length;
  const pendingPayments = payments.filter((p: any) => p.status === "pending").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <TotalRevenueCard value={totalRevenue} />
      <MonthlyRevenueCard value={monthlyRevenue} />
      <FailedPaymentsCard value={failedPayments} />
      <PendingPaymentsCard value={pendingPayments} />
    </div>
  );
}
