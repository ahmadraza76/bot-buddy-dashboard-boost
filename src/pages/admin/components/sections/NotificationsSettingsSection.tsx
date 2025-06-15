
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function NotificationsSettingsSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    email: true,
    sms: false,
    webhook: "",
    frequency: "immediate",
  });

  function handleSwitch(name: string, val: boolean) {
    setForm((prev) => ({ ...prev, [name]: val }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast({ title: "Notifications Saved", description: "Notifications preferences updated." });
    // Save logic
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Notifications Settings</h2>
      <Card>
        <CardContent className="space-y-4 py-6">
          <div className="flex items-center gap-3">
            <Switch id="email" checked={form.email} onCheckedChange={(val) => handleSwitch("email", val)} />
            <Label htmlFor="email">Email Notifications</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="sms" checked={form.sms} onCheckedChange={(val) => handleSwitch("sms", val)} />
            <Label htmlFor="sms">SMS Notifications</Label>
          </div>
          <div>
            <Label htmlFor="webhook">Webhook URL</Label>
            <Input id="webhook" name="webhook" value={form.webhook} onChange={handleChange} placeholder="https://..." />
          </div>
          <div>
            <Label htmlFor="frequency">Delivery Frequency</Label>
            <Input id="frequency" name="frequency" value={form.frequency} onChange={handleChange} />
          </div>
          <Button type="submit">Save</Button>
        </CardContent>
      </Card>
    </form>
  );
}
