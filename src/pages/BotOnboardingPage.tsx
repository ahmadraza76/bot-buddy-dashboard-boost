
import { useState } from "react";
import { useOtpSession } from "@/hooks/useOtpSession";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export default function BotOnboardingPage() {
  const [step, setStep] = useState<"phone" | "otp" | "done">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [botStatus, setBotStatus] = useState<null | string>(null);

  const { startOtpSession, verifyOtpCode, otpSessionId, loading, error, setError } = useOtpSession();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    await startOtpSession(phone);
    setStep("otp");
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await verifyOtpCode(phone, otp, otpSessionId!);
    if (res?.success) {
      setBotStatus(res.botStatus);
      setStep("done");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Start Your Telegram Bot</CardTitle>
          <CardDescription>
            {step === "phone" && "Enter your phone number to receive an OTP"}
            {step === "otp" && "Enter the OTP sent to your phone"}
            {step === "done" && "Your bot is being started..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-100 rounded px-3 py-2">{error}</div>
          )}

          {step === "phone" && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <Input
                type="tel"
                placeholder="Phone Number (with country code)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <Input
                type="number"
                placeholder="OTP Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold mb-4">
                {botStatus === "running"
                  ? "✅ Your bot is now online!"
                  : "Bot is initializing..."}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
