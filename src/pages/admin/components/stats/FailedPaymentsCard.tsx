
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

export default function FailedPaymentsCard({ value }: { value: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Failed Payments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-red-600">{value}</div>
        <p className="text-xs text-red-600">Failures</p>
      </CardContent>
    </Card>
  );
}
