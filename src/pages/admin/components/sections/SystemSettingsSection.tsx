
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function SystemSettingsSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    maintenanceMode: false,
    version: "v1.0.0",
    announcement: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast({ title: "System Settings Saved", description: "System settings updated!" });
    // Save logic
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <h2 className="text-xl font-semibold mb-4">System Settings</h2>
      <Card>
        <CardContent className="space-y-4 py-6">
          <div>
            <Label htmlFor="version">Current Version</Label>
            <Input id="version" name="version" value={form.version} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="announcement">Global Announcement</Label>
            <Input id="announcement" name="announcement" value={form.announcement} onChange={handleChange} />
          </div>
          <Button type="submit">Save</Button>
        </CardContent>
      </Card>
    </form>
  );
}
