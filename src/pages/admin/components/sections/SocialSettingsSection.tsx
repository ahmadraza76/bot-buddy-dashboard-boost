
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function SocialSettingsSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    twitter: "",
    facebook: "",
    linkedin: "",
    github: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast({ title: "Social Media Settings Saved", description: "Links updated!" });
    // Save logic
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Social Media Settings</h2>
      <Card>
        <CardContent className="space-y-4 py-6">
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input id="twitter" name="twitter" value={form.twitter} onChange={handleChange} placeholder="Twitter URL" />
          </div>
          <div>
            <Label htmlFor="facebook">Facebook</Label>
            <Input id="facebook" name="facebook" value={form.facebook} onChange={handleChange} placeholder="Facebook URL" />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL" />
          </div>
          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input id="github" name="github" value={form.github} onChange={handleChange} placeholder="GitHub URL" />
          </div>
          <Button type="submit">Save</Button>
        </CardContent>
      </Card>
    </form>
  );
}
