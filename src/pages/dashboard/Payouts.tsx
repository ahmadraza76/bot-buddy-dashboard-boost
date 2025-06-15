
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserPayoutRequests, useCreatePayoutRequest } from "@/hooks/usePayoutRequests";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Banknote, CreditCard, DollarSign, Circle } from "lucide-react";

const methodOptions = [
  { label: "Bank Transfer", value: "bank", icon: Banknote },
  { label: "UPI", value: "upi", icon: CreditCard },
  { label: "USDT (TRC20)", value: "usdt_trc20", icon: DollarSign },
];

function getMethodFields(method: string) {
  if (method === "bank") {
    return (
      <div className="grid gap-2">
        <Label>Account Holder Name</Label>
        <Input name="account_holder" required autoComplete="off" />
        <Label>Account Number</Label>
        <Input name="account_number" required autoComplete="off" />
        <Label>Bank Name</Label>
        <Input name="bank_name" required autoComplete="off" />
        <Label>IFSC Code</Label>
        <Input name="ifsc_code" required autoComplete="off" />
      </div>
    );
  }
  if (method === "upi") {
    return (
      <div className="grid gap-2">
        <Label>UPI ID</Label>
        <Input name="upi_id" required autoComplete="off" placeholder="user@bank" />
      </div>
    );
  }
  if (method === "usdt_trc20") {
    return (
      <div className="grid gap-2">
        <Label>USDT (TRC20) Address</Label>
        <Input name="usdt_address" required autoComplete="off" />
      </div>
    );
  }
  return null;
}

function getStatusBadge(status: string) {
  let color = "";
  let label = "";
  let Icon = Circle; // note the uppercase

  if (status === "pending") {
    color = "bg-yellow-500";
    label = "Pending";
    Icon = Circle;
  } else if (status === "approved") {
    color = "bg-green-600";
    label = "Approved";
    Icon = DollarSign;
  } else if (status === "declined") {
    color = "bg-red-600";
    label = "Declined";
    Icon = CreditCard;
  } else if (status === "paid") {
    color = "bg-blue-600";
    label = "Paid";
    Icon = Banknote;
  } else {
    color = "bg-gray-400";
    label = status;
    Icon = Circle;
  }
  return (
    <Badge className={`${color} text-white gap-2 flex items-center`}>
      <span>
        <Icon className="h-4 w-4" />
      </span>
      {label}
    </Badge>
  );
}

export default function Payouts() {
  const [method, setMethod] = useState("bank");
  const [amount, setAmount] = useState("");
  const createPayout = useCreatePayoutRequest();
  const { data: payoutRequests = [], isLoading } = useUserPayoutRequests();
  const { toast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());
    let details: Record<string, any> = {};
    if (method === "bank") {
      details = {
        account_holder: data.account_holder,
        account_number: data.account_number,
        bank_name: data.bank_name,
        ifsc_code: data.ifsc_code,
      };
    } else if (method === "upi") {
      details = { upi_id: data.upi_id };
    } else if (method === "usdt_trc20") {
      details = { usdt_address: data.usdt_address };
    }
    createPayout.mutate({
      amount: parseFloat(data.amount as string),
      method: method as any,
      details,
    });
    form.reset();
    setAmount("");
  }

  useEffect(() => {
    if (createPayout.isSuccess) {
      toast({
        title: "Withdrawal Requested",
        description: "Your payout request has been submitted and is pending admin approval.",
      });
    }
  }, [createPayout.isSuccess, toast]);

  return (
    <div className="max-w-xl mx-auto my-8">
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-primary" />
              Request Payout
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label>Amount</Label>
              <Input
                name="amount"
                type="number"
                required
                min={100}
                max={1000000}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount (INR/USDT)"
              />
            </div>
            <div>
              <Label>Payout Method</Label>
              <Tabs value={method} onValueChange={setMethod} className="w-full mt-2">
                <TabsList className="grid grid-cols-3 mb-2">
                  {methodOptions.map((opt) => (
                    <TabsTrigger key={opt.value} value={opt.value} className="flex gap-2 items-center">
                      <opt.icon className="h-4 w-4" />
                      {opt.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {methodOptions.map((opt) => (
                  <TabsContent key={opt.value} value={opt.value} className="pt-2">
                    {getMethodFields(opt.value)}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={createPayout.isPending}
            >
              {createPayout.isPending ? "Requesting..." : "Request Payout"}
            </Button>
            {createPayout.error && (
              <div className="text-red-600 text-sm">{(createPayout.error as any).message}</div>
            )}
            {createPayout.isSuccess && (
              <div className="text-green-600 text-sm">Request placed successfully!</div>
            )}
          </form>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Payout Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : payoutRequests.length === 0 ? (
            <div className="text-muted-foreground">No payout requests yet.</div>
          ) : (
            <div className="space-y-2">
              {payoutRequests.map((req: any) => (
                <div
                  key={req.id}
                  className="flex justify-between items-center border-b py-2 text-sm"
                >
                  <span className="flex items-center gap-3">
                    {req.method === "bank" && <Banknote className="h-4 w-4 text-primary" />}
                    {req.method === "upi" && <CreditCard className="h-4 w-4 text-blue-600" />}
                    {req.method === "usdt_trc20" && <DollarSign className="h-4 w-4 text-green-600" />}
                    <span className="font-medium">
                      ₹{req.amount}{" "}
                      <span className="uppercase text-xs text-muted-foreground ml-2">({req.method})</span>
                    </span>
                  </span>
                  <span>
                    {getStatusBadge(req.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
