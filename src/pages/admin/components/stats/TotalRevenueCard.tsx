
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

export default function TotalRevenueCard({ value }: { value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Total Revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₹{value}</div>
        <p className="text-xs text-green-600">Live payments</p>
      </CardContent>
    </Card>
  );
}
