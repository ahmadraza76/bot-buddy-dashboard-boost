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
import { useProfile } from "@/hooks/useProfile";

const methodOptions = [
  { label: <span className="flex flex-col items-center"><span>Bank</span><span className="hidden sm:inline"> Transfer</span></span>, value: "bank", icon: Banknote },
  { label: <span>UPI</span>, value: "upi", icon: CreditCard },
  {
    label: (
      <span className="flex flex-col items-center leading-tight">
        <span>USDT</span>
        <span className="text-[9px] sm:text-xs -mt-0.5 text-muted-foreground">(TRC20)</span>
      </span>
    ),
    value: "usdt_trc20",
    icon: DollarSign,
  },
];

function getMethodFields(method: string) {
  if (method === "bank") {
    return (
      <div className="grid gap-2">
        <Label className="text-xs md:text-sm">Account Holder Name</Label>
        <Input name="account_holder" required autoComplete="off" className="text-xs md:text-sm py-2" />
        <Label className="text-xs md:text-sm">Account Number</Label>
        <Input name="account_number" required autoComplete="off" className="text-xs md:text-sm py-2" />
        <Label className="text-xs md:text-sm">Bank Name</Label>
        <Input name="bank_name" required autoComplete="off" className="text-xs md:text-sm py-2" />
        <Label className="text-xs md:text-sm">IFSC Code</Label>
        <Input name="ifsc_code" required autoComplete="off" className="text-xs md:text-sm py-2" />
      </div>
    );
  }
  if (method === "upi") {
    return (
      <div className="grid gap-2">
        <Label className="text-xs md:text-sm">UPI ID</Label>
        <Input name="upi_id" required autoComplete="off" placeholder="user@bank" className="text-xs md:text-sm py-2" />
      </div>
    );
  }
  if (method === "usdt_trc20") {
    return (
      <div className="grid gap-2">
        <Label className="text-xs md:text-sm">USDT (TRC20) Address</Label>
        <Input name="usdt_address" required autoComplete="off" className="text-xs md:text-sm py-2" />
      </div>
    );
  }
  return null;
}

function getStatusBadge(status: string) {
  let color = "";
  let label = "";
  let Icon = Circle;

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
    <Badge className={`${color} text-white gap-2 flex items-center text-[10px] sm:text-xs px-2 py-1`}>
      <span>
        <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
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
  const { data: profile, isLoading: isProfileLoading, error: profileError } = useProfile();
  const walletAmount = profile?.balance ?? 0;

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
    <div className="max-w-full sm:max-w-xl mx-auto my-3 px-1 sm:px-0">
      {/* WALLET AMOUNT DISPLAY */}
      <Card className="mb-3 sm:mb-5">
        <CardContent className="flex items-center gap-2 py-2 sm:py-3">
          <DollarSign className="h-5 w-5 sm:h-7 sm:w-7 text-primary" />
          <div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">Wallet Amount</div>
            {isProfileLoading ? (
              <span className="text-xs font-semibold">Loading...</span>
            ) : profileError ? (
              <span className="text-xs text-red-500">Unable to fetch</span>
            ) : (
              <span className="text-base sm:text-xl font-bold">
                ₹{Number(walletAmount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="py-2 sm:py-3">
          <CardTitle>
            <span className="flex items-center gap-1 text-xs sm:text-lg">
              <Banknote className="h-3 w-3 sm:h-5 sm:w-5 text-primary" />
              Request Payout
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-3 sm:py-5">
          <form className="space-y-3 sm:space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label className="text-[10px] sm:text-sm">Amount</Label>
              <Input
                name="amount"
                type="number"
                required
                min={100}
                max={1000000}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount (INR/USDT)"
                className="text-xs sm:text-base py-2 px-3"
              />
            </div>
            <div>
              <Label className="text-[10px] sm:text-sm">Payout Method</Label>
              <Tabs value={method} onValueChange={setMethod} className="w-full mt-1 sm:mt-2">
                <TabsList className="grid grid-cols-3 mb-1 sm:mb-2 h-7 sm:h-8">
                  {methodOptions.map((opt) => (
                    <TabsTrigger
                      key={typeof opt.label === "string" ? opt.label : opt.value}
                      value={opt.value}
                      className="flex flex-col gap-0.5 items-center justify-center text-[10px] sm:text-xs py-1 sm:py-2 px-1 sm:px-2 min-h-0 h-7 sm:h-8"
                    >
                      <opt.icon className="h-3 w-3 sm:h-4 sm:w-4 mb-0.5" />
                      {opt.value === "bank" && <span>Bank</span>}
                      {opt.value === "upi" && <span>UPI</span>}
                      {opt.value === "usdt_trc20" && (
                        <span className="leading-tight">
                          USDT
                          <span className="text-[9px] sm:text-[11px] -mt-0.5 text-muted-foreground block">
                            (TRC20)
                          </span>
                        </span>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {methodOptions.map((opt) => (
                  <TabsContent key={opt.value} value={opt.value} className="pt-1 sm:pt-2">
                    {getMethodFields(opt.value)}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            <Button
              type="submit"
              className="w-full text-xs sm:text-base py-2 sm:py-3 rounded-lg"
              disabled={createPayout.isPending}
            >
              {createPayout.isPending ? "Requesting..." : "Request Payout"}
            </Button>
            {createPayout.error && (
              <div className="text-red-600 text-xs sm:text-sm">{(createPayout.error as any).message}</div>
            )}
            {createPayout.isSuccess && (
              <div className="text-green-600 text-xs sm:text-sm">Request placed successfully!</div>
            )}
          </form>
        </CardContent>
      </Card>
      <Card className="mt-4 sm:mt-6">
        <CardHeader className="py-2 sm:py-3">
          <CardTitle className="text-xs sm:text-lg">Your Payout Requests</CardTitle>
        </CardHeader>
        <CardContent className="py-2 sm:py-4">
          {isLoading ? (
            <div className="text-xs sm:text-base">Loading...</div>
          ) : payoutRequests.length === 0 ? (
            <div className="text-muted-foreground text-xs sm:text-base">No payout requests yet.</div>
          ) : (
            <div className="space-y-2">
              {payoutRequests.map((req: any) => (
                <div
                  key={req.id}
                  className="flex justify-between items-center border-b py-2 text-[10px] sm:text-sm"
                >
                  <span className="flex items-center gap-2 sm:gap-3">
                    {req.method === "bank" && <Banknote className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />}
                    {req.method === "upi" && <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />}
                    {req.method === "usdt_trc20" && <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />}
                    <span className="font-medium">
                      ₹{req.amount}{" "}
                      <span className="uppercase text-[9px] sm:text-xs text-muted-foreground ml-1 sm:ml-2">({req.method})</span>
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
