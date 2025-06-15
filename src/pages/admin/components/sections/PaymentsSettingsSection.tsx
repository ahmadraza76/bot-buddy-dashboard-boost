
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function PaymentsSettingsSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    gateway: "razorpay",
    merchantId: "",
    currency: "INR",
    minAmount: 10,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast({ title: "Payments Settings Saved", description: "Payments settings updated." });
    // Save logic here
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Payments Settings</h2>
      <Card>
        <CardContent className="space-y-4 py-6">
          <div>
            <Label htmlFor="gateway">Payment Gateway</Label>
            <Input id="gateway" name="gateway" value={form.gateway} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="merchantId">Merchant ID</Label>
            <Input id="merchantId" name="merchantId" value={form.merchantId} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Input id="currency" name="currency" value={form.currency} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="minAmount">Minimum Amount</Label>
            <Input
              id="minAmount"
              name="minAmount"
              type="number"
              min={1}
              value={form.minAmount}
              onChange={handleChange}
            />
          </div>
          <Button type="submit">Save</Button>
        </CardContent>
      </Card>
    </form>
  );
}
