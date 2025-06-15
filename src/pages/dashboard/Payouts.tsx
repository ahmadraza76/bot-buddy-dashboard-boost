import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserPayoutRequests, useCreatePayoutRequest } from "@/hooks/usePayoutRequests";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const methodOptions = [
  { label: "Bank Transfer", value: "bank" },
  { label: "UPI", value: "upi" },
  { label: "USDT (TRC20)", value: "usdt_trc20" },
];

function getMethodFields(method: string) {
  if (method === "bank") {
    return (
      <>
        <Label>Account Holder Name</Label>
        <Input name="account_holder" required />
        <Label>Account Number</Label>
        <Input name="account_number" required />
        <Label>Bank Name</Label>
        <Input name="bank_name" required />
        <Label>IFSC Code</Label>
        <Input name="ifsc_code" required />
      </>
    );
  }
  if (method === "upi") {
    return (
      <>
        <Label>UPI ID</Label>
        <Input name="upi_id" required />
      </>
    );
  }
  if (method === "usdt_trc20") {
    return (
      <>
        <Label>USDT (TRC20) Address</Label>
        <Input name="usdt_address" required />
      </>
    );
  }
  return null;
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

  // Notification for when user payout request is approved (demo toast)
  React.useEffect(() => {
    // Here, you would listen for realtime updates on payout_requests table for this user
    // For now, we'll skip realtime and just show a toast on successful payout request
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
          <CardTitle>Request Payout</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label>Amount</Label>
              <Input
                name="amount"
                type="number"
                required
                min={100}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount (INR/USDT)"
              />
            </div>
            <div>
              <Label>Method</Label>
              <Tabs value={method} onValueChange={setMethod} className="w-full">
                <TabsList>
                  {methodOptions.map((opt) => (
                    <TabsTrigger key={opt.value} value={opt.value}>
                      {opt.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {methodOptions.map((opt) => (
                  <TabsContent key={opt.value} value={opt.value}>
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
                  <span>
                    ₹{req.amount} ({req.method.toUpperCase()})
                  </span>
                  <span>
                    <Badge
                      className={`${
                        req.status === "pending"
                          ? "bg-yellow-500"
                          : req.status === "approved"
                          ? "bg-green-600"
                          : req.status === "declined"
                          ? "bg-red-600"
                          : "bg-gray-400"
                      } text-white`}
                    >
                      {req.status}
                    </Badge>
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
