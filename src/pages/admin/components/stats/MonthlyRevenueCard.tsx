
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

export default function MonthlyRevenueCard({ value }: { value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>This Month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₹{value}</div>
        <p className="text-xs text-green-600">Stats this month</p>
      </CardContent>
    </Card>
  );
}
