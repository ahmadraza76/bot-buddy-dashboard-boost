
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

export default function PendingPaymentsCard({ value }: { value: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Pending Payments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-yellow-600">{value}</div>
        <p className="text-xs text-yellow-600">Awaiting</p>
      </CardContent>
    </Card>
  );
}
