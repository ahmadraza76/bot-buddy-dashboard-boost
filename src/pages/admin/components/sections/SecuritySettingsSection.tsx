
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function SecuritySettingsSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    require2FA: false,
    passwordExpiryDays: 90,
    allowedIPs: "",
  });

  function handleSwitch(val: boolean) {
    setForm((prev) => ({ ...prev, require2FA: val }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast({ title: "Security Settings Saved", description: "Security settings updated." });
    // Save logic
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
      <Card>
        <CardContent className="space-y-4 py-6">
          <div className="flex items-center gap-3">
            <Switch id="require2FA" checked={form.require2FA} onCheckedChange={handleSwitch} />
            <Label htmlFor="require2FA">Require 2FA for Admins</Label>
          </div>
          <div>
            <Label htmlFor="passwordExpiryDays">Password Expiry (days)</Label>
            <Input
              id="passwordExpiryDays"
              name="passwordExpiryDays"
              type="number"
              min={30}
              max={365}
              value={form.passwordExpiryDays}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="allowedIPs">Allowed Admin Panel IPs (comma separated)</Label>
            <Input
              id="allowedIPs"
              name="allowedIPs"
              value={form.allowedIPs}
              onChange={handleChange}
              placeholder="192.168.0.1, 10.0.0.1"
            />
          </div>
          <Button type="submit">Save</Button>
        </CardContent>
      </Card>
    </form>
  );
}
