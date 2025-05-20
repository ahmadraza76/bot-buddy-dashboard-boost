
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Check, Clock } from "lucide-react";

// Mock payment history data
const paymentHistory = [
  {
    id: "INV-001",
    date: "2025-05-01",
    amount: "$9.99",
    status: "paid",
    plan: "Pro",
  },
  {
    id: "INV-002",
    date: "2025-04-01",
    amount: "$9.99",
    status: "paid",
    plan: "Pro",
  },
  {
    id: "INV-003",
    date: "2025-03-01",
    amount: "$9.99",
    status: "paid",
    plan: "Pro",
  },
  {
    id: "INV-004",
    date: "2025-02-01",
    amount: "$9.99",
    status: "paid",
    plan: "Pro",
  },
  {
    id: "INV-005",
    date: "2025-01-01",
    amount: "$9.99",
    status: "paid",
    plan: "Pro",
  },
  {
    id: "INV-006",
    date: "2024-12-01",
    amount: "$9.99",
    status: "paid",
    plan: "Pro",
  },
  {
    id: "INV-007",
    date: "2024-11-01",
    amount: "$9.99",
    status: "paid",
    plan: "Pro",
  },
  {
    id: "INV-008",
    date: "2024-10-01",
    amount: "$9.99",
    status: "paid",
    plan: "Pro",
  },
];

export default function Billing() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [loading, setLoading] = useState(false);

  const currentPlan = {
    name: "Pro",
    price: billingCycle === "monthly" ? "$9.99" : "$99.90",
    cycle: billingCycle === "monthly" ? "month" : "year",
    status: "active",
    nextBillingDate: "June 1, 2025",
    features: [
      "5 Bots",
      "Unlimited messages",
      "Advanced analytics",
      "Priority support",
      "99.9% Uptime",
      "API access",
      "Webhook integration",
    ],
  };

  const plans = [
    {
      id: "free",
      name: "Starter",
      price: "Free",
      yearly: "Free",
      features: [
        "1 Bot",
        "100 messages/day",
        "Basic analytics",
        "Community support",
        "99.5% Uptime",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "$9.99",
      yearly: "$99.90",
      yearlyDiscount: "Save 16%",
      features: [
        "5 Bots",
        "Unlimited messages",
        "Advanced analytics",
        "Priority support",
        "99.9% Uptime",
        "API access",
        "Webhook integration",
      ],
    },
    {
      id: "business",
      name: "Business",
      price: "$29.99",
      yearly: "$299.90",
      yearlyDiscount: "Save 16%",
      features: [
        "Unlimited Bots",
        "Unlimited messages",
        "Enterprise analytics",
        "Dedicated support",
        "99.99% Uptime",
        "Custom integrations",
        "White-label option",
        "SLA agreement",
      ],
    },
  ];

  const handleChangePlan = () => {
    if (selectedPlan === "business") {
      window.location.href = "/contact-sales";
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`Your plan has been updated to ${selectedPlan.toUpperCase()} with ${billingCycle} billing.`);
    }, 1500);
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <Button variant="outline">
          <CreditCard className="mr-2 h-4 w-4" />
          Update Payment Method
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              You are currently on the {currentPlan.name} plan with {billingCycle} billing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {currentPlan.price}
                  <span className="text-sm font-normal ml-1">/{currentPlan.cycle}</span>
                </div>
                <Badge variant="outline" className="mt-2">
                  {currentPlan.status === "active" ? (
                    <>
                      <Check className="mr-1 h-3 w-3" />
                      Active
                    </>
                  ) : (
                    <>
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </>
                  )}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Next billing date</div>
                <div>{currentPlan.nextBillingDate}</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Features included:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Plan</CardTitle>
            <CardDescription>
              Upgrade or downgrade your subscription plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Billing Cycle</label>
              <Select value={billingCycle} onValueChange={setBillingCycle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select billing cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly (Save 16%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Select Plan</label>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name} - {billingCycle === "monthly" ? plan.price : plan.yearly}
                      {plan.yearlyDiscount && billingCycle === "yearly" && (
                        <span className="ml-2 text-xs text-green-500">
                          {plan.yearlyDiscount}
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleChangePlan} disabled={loading}>
              {loading ? "Processing..." : "Update Plan"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Payment History</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{formatDate(payment.date)}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.plan}</TableCell>
                      <TableCell>
                        <Badge variant={payment.status === "paid" ? "outline" : "secondary"}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
