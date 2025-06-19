
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  CreditCard, 
  Calendar, 
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl?: string;
}

export default function Billing() {
  const { toast } = useToast();
  
  const currentPlan = {
    name: "Pro Plan",
    price: 9.99,
    billingCycle: "monthly",
    nextBilling: "2025-07-01",
    status: "active"
  };

  const [payments] = useState<Payment[]>([
    { id: "INV-001", date: "2025-05-01", amount: 9.99, plan: "Pro", status: "paid" },
    { id: "INV-002", date: "2025-04-01", amount: 9.99, plan: "Pro", status: "paid" },
    { id: "INV-003", date: "2025-03-01", amount: 9.99, plan: "Pro", status: "paid" },
    { id: "INV-004", date: "2025-02-01", amount: 9.99, plan: "Pro", status: "paid" },
    { id: "INV-005", date: "2025-01-01", amount: 9.99, plan: "Pro", status: "paid" },
    { id: "INV-006", date: "2024-12-01", amount: 9.99, plan: "Pro", status: "paid" },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const exportPayments = () => {
    toast({
      title: "Export Started",
      description: "Your payment history is being prepared for download.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Billing & Payments</h1>
          <Button onClick={exportPayments} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export History
          </Button>
        </div>

        {/* Current Plan */}
        <Card className="bg-card shadow-sm border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <CreditCard className="h-5 w-5" />
              Current Plan
            </CardTitle>
            <CardDescription>Your active subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">{currentPlan.name}</h3>
                <p className="text-muted-foreground">
                  ${currentPlan.price}/{currentPlan.billingCycle}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <Badge className="bg-green-100 text-green-800 mb-2">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Next billing: {formatDate(currentPlan.nextBilling)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="bg-card shadow-sm border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Payment History</CardTitle>
            <CardDescription>Your billing and payment records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Header */}
                <div className="grid grid-cols-4 gap-4 p-3 bg-muted rounded-t-lg font-medium text-muted-foreground text-sm">
                  <div>Invoice ID</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Plan</div>
                </div>
                
                {/* Payment rows */}
                <div className="divide-y divide-border">
                  {payments.map((payment) => (
                    <div key={payment.id} className="grid grid-cols-4 gap-4 p-3 items-center">
                      <div className="font-medium text-card-foreground">{payment.id}</div>
                      <div className="text-muted-foreground text-sm">
                        {formatDate(payment.date)}
                      </div>
                      <div className="font-medium text-card-foreground">${payment.amount}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{payment.plan}</span>
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>Total Spent</CardDescription>
              <CreditCard className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                ${payments.reduce((total, payment) => total + payment.amount, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>This Year</CardDescription>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                ${payments.filter(p => p.date.startsWith('2025')).reduce((total, payment) => total + payment.amount, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">2025 spending</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-sm border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>Avg Monthly</CardDescription>
              <CheckCircle className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">$9.99</div>
              <p className="text-xs text-muted-foreground">Per month</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
