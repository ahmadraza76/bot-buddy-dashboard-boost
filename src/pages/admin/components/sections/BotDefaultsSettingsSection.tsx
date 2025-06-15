
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function BotDefaultsSettingsSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    botName: "",
    autoReply: false,
    maxSessions: 3,
    description: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  }

  function handleSwitch(val: boolean) {
    setForm((prev) => ({ ...prev, autoReply: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast({ title: "Bot Defaults Saved!", description: "Settings updated successfully." });
    // Save logic goes here
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Bot Defaults</h2>
      <Card>
        <CardContent className="space-y-4 py-6">
          <div>
            <Label htmlFor="botName">Default Bot Name</Label>
            <Input id="botName" name="botName" value={form.botName} onChange={handleChange} required />
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.autoReply} onCheckedChange={handleSwitch} id="autoReply" />
            <Label htmlFor="autoReply">Enable auto-reply</Label>
          </div>
          <div>
            <Label htmlFor="maxSessions">Max Sessions</Label>
            <Input
              id="maxSessions"
              name="maxSessions"
              value={form.maxSessions}
              onChange={handleChange}
              type="number"
              min={1}
              max={100}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe default bot behavior"
            />
          </div>
          <Button type="submit">Save</Button>
        </CardContent>
      </Card>
    </form>
  );
}
