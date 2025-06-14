
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

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
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalRevenue}</div>
          <p className="text-xs text-green-600">Live payments</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{monthlyRevenue}</div>
          <p className="text-xs text-green-600">Stats this month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Failed Payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{failedPayments}</div>
          <p className="text-xs text-red-600">Failures</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Pending Payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{pendingPayments}</div>
          <p className="text-xs text-yellow-600">Awaiting</p>
        </CardContent>
      </Card>
    </div>
  );
}
