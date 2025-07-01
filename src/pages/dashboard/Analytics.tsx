
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function Analytics() {
  return (
    <div className="p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive analytics and insights for your bot performance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Sample Analytics Cards */}
          <Card className="bg-card shadow-sm border">
            <CardTitle className="px-4 pt-4 text-card-foreground">Total Messages</CardTitle>
            <CardContent>
              <div className="text-4xl font-bold mb-2 text-card-foreground">12,345</div>
              <CardDescription>Total messages processed this month.</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-sm border">
            <CardTitle className="px-4 pt-4 text-card-foreground">Active Users</CardTitle>
            <CardContent>
              <div className="text-4xl font-bold mb-2 text-card-foreground">1,120</div>
              <CardDescription>Number of unique users this week.</CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-sm border">
            <CardTitle className="px-4 pt-4 text-card-foreground">Avg. Response Time</CardTitle>
            <CardContent>
              <div className="text-4xl font-bold mb-2 text-card-foreground">1.5s</div>
              <CardDescription>Average response time today.</CardDescription>
            </CardContent>
          </Card>
        </div>
        <div className="bg-muted rounded-lg p-8 text-center">
          {/* Placeholder for future analytics charts */}
          <span className="text-muted-foreground">Charts and detailed analytics coming soon.</span>
        </div>
      </div>
    </div>
  );
}
