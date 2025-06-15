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
    <div className="px-2 py-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <h1 className="text-base sm:text-3xl font-bold break-words">Billing & Subscription</h1>
        <Button variant="outline" className="text-xs py-1 h-8 sm:h-10">
          <CreditCard className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Update Payment Method</span>
          <span className="inline sm:hidden">Payment</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm sm:text-xl">Current Plan</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              You are currently on the {currentPlan.name} plan with {billingCycle} billing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-bold leading-none">
                  {currentPlan.price}
                  <span className="text-xs sm:text-sm font-normal ml-1">/{currentPlan.cycle}</span>
                </div>
                <Badge variant="outline" className="mt-2 text-xs sm:text-base py-1 px-2">
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
              <div className="text-left sm:text-right">
                <div className="text-xs sm:text-sm font-medium">Next billing date</div>
                <div className="text-xs sm:text-base">{currentPlan.nextBillingDate}</div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              <h3 className="text-xs sm:text-sm font-medium mb-2">Features included:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-xs sm:text-sm">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span className="break-words">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs sm:text-lg">Change Plan</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Upgrade or downgrade your subscription plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-xs sm:text-sm font-medium mb-1 block">Billing Cycle</label>
              <Select value={billingCycle} onValueChange={setBillingCycle}>
                <SelectTrigger className="text-xs sm:text-base h-8 sm:h-10">
                  <SelectValue placeholder="Select billing cycle" />
                </SelectTrigger>
                <SelectContent className="text-xs sm:text-base">
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly (Save 16%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium mb-1 block">Select Plan</label>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger className="text-xs sm:text-base h-8 sm:h-10">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent className="text-xs sm:text-base">
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name} - {billingCycle === "monthly" ? plan.price : plan.yearly}
                      {plan.yearlyDiscount && billingCycle === "yearly" && (
                        <span className="ml-2 text-[10px] text-green-500">
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
            <Button
              className="w-full py-2 sm:py-3 text-xs sm:text-base"
              onClick={handleChangePlan}
              disabled={loading}
            >
              {loading ? "Processing..." : "Update Plan"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-6 sm:mt-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <CardTitle className="text-xs sm:text-lg">Payment History</CardTitle>
              <Button variant="outline" size="sm" className="text-xs py-1 h-7 sm:h-9">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table className="min-w-[50vw]">
                <TableHeader>
                  <TableRow className="text-xs">
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
                    <TableRow key={payment.id} className="text-xs sm:text-base">
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{formatDate(payment.date)}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.plan}</TableCell>
                      <TableCell>
                        <Badge variant={payment.status === "paid" ? "outline" : "secondary"} className="text-xs">
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
