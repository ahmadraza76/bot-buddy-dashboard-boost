
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function Analytics() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Sample Analytics Cards */}
        <Card>
          <CardTitle className="px-4 pt-4">Total Messages</CardTitle>
          <CardContent>
            <div className="text-4xl font-bold mb-2">12,345</div>
            <CardDescription>Total messages processed this month.</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardTitle className="px-4 pt-4">Active Users</CardTitle>
          <CardContent>
            <div className="text-4xl font-bold mb-2">1,120</div>
            <CardDescription>Number of unique users this week.</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardTitle className="px-4 pt-4">Avg. Response Time</CardTitle>
          <CardContent>
            <div className="text-4xl font-bold mb-2">1.5s</div>
            <CardDescription>Average response time today.</CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="bg-muted rounded-lg p-8 text-center">
        {/* Placeholder for future analytics charts */}
        <span className="text-muted-foreground">Charts and detailed analytics coming soon.</span>
      </div>
    </div>
  );
}
