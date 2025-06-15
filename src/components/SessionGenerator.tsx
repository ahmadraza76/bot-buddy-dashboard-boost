import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function SessionGenerator() {
  const { user } = useAuth();
  const [step, setStep] = useState<"phone" | "otp" | "done">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [botStatus, setBotStatus] = useState<string | null>(null);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast({ title: "Enter phone number", variant: "destructive" });
      return;
    }
    setLoading(true);
    // Simulate OTP sent. In reality connect to your SMS logic here.
    setTimeout(() => {
      setStep("otp");
      setLoading(false);
      toast({ title: "OTP sent!", description: "Enter the code received on your phone." });
    }, 1200);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call session-generator edge function (simulate Pyrogram session)
      const { data, error } = await supabase.functions.invoke("session-generator", {
        body: { 
          user_id: user?.id, 
          phone, 
          code: otp 
        },
      });
      if (error) throw error;
      setStep("done");
      // Try fetching the bot session status for display
      const { data: bot, error: err } = await supabase
        .from("bot_sessions")
        .select("*")
        .eq("user_id", user?.id)
        .eq("phone", phone)
        .maybeSingle();
      setBotStatus(bot?.bot_status ?? "pending");
    } catch (err: any) {
      toast({ title: "Verification failed", description: String(err.message || err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Show status if step == "done"
  return (
    <Card className="mx-auto max-w-md mt-8">
      <CardHeader>
        <CardTitle>Telegram Session Generator</CardTitle>
        <CardDescription>
          Enter your phone to set up Pyrogram bot session. (OTP is simulated)<br/>
          <span className="text-xs text-muted-foreground">Session string is securely handled by backend for maximum safety.</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "phone" && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                type="tel"
                placeholder="+91 9xxxxxx123"
                value={phone}
                disabled={loading}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Requesting OTP..." : "Send OTP"}
            </Button>
          </form>
        )}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="text-sm font-medium">OTP</label>
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        )}
        {step === "done" && (
          <div className="space-y-3">
            <div className="text-green-700 font-semibold">
              🎉 Bot setup complete!
            </div>
            <div>
              <span className="font-semibold">Bot Status:</span>{" "}
              <span className="inline-block ml-2 px-2 py-1 bg-gray-100 rounded text-gray-700 text-xs">{botStatus}</span>
            </div>
            <Button className="w-full mt-2" onClick={() => setStep("phone")}>Setup New Bot</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
