
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function OpenAIKeyManager() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const { toast } = useToast();
  const [existingKey, setExistingKey] = useState<null | string | false>(null);

  // Fetch the current key (never reveal in full, for security)
  async function fetchKey() {
    setLoading(true);
    try {
      const resp = await fetch("/api/admin/secrets/openai", {
        credentials: "include",
      });
      const result = await resp.json();
      setExistingKey(result.exists ? "**************" : false);
    } catch {
      setExistingKey(false);
    }
    setLoading(false);
  }

  // On mount, check if exists
  useState(() => {
    fetchKey();
    // eslint-disable-next-line
  }, []);

  async function saveKey() {
    setLoading(true);
    try {
      const resp = await fetch("/api/admin/secrets/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ value: key }),
      });
      if (resp.ok) {
        toast({ title: "Key Updated", description: "OpenAI API key saved securely." });
        setExistingKey("**************");
        setKey("");
      } else {
        const err = await resp.json();
        toast({
          title: "Error",
          description: err?.error || "Failed to save key.",
          variant: "destructive",
        });
      }
    } catch {
      toast({ title: "Network Error", description: "Failed to connect.", variant: "destructive" });
    }
    setLoading(false);
  }

  async function deleteKey() {
    setLoading(true);
    try {
      const resp = await fetch("/api/admin/secrets/openai", {
        method: "DELETE",
        credentials: "include",
      });
      if (resp.ok) {
        toast({ title: "Deleted", description: "Key removed from server." });
        setExistingKey(false);
      } else {
        toast({ title: "Error", description: "Failed to delete key.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network Error", description: "Failed to connect.", variant: "destructive" });
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>OpenAI API Key Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {existingKey ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">
                Key is set and used for bot healing and automatic AI fixes.
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setRevealed(!revealed)}
                aria-label={revealed ? "Hide" : "Reveal"}
              >
                {revealed ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            <Input
              type={revealed ? "text" : "password"}
              value={revealed ? key : ""}
              onChange={(e) => setKey(e.target.value)}
              placeholder={revealed ? "Enter new key" : "**************"}
              className="mb-2"
              autoComplete="off"
            />
            <div className="flex gap-2">
              <Button onClick={saveKey} disabled={loading || !key} size="sm">
                <Save className="w-4 h-4 mr-2" /> Save New Key
              </Button>
              <Button onClick={deleteKey} variant="destructive" disabled={loading} size="sm">
                <Trash2 className="w-4 h-4 mr-2" /> Delete Key
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-2 text-sm">No key present. Add your OpenAI API key to enable bot healing & AI fixes.</div>
            <Input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="sk-..."
              autoComplete="off"
              className="mb-2"
            />
            <Button onClick={saveKey} disabled={loading || !key} size="sm">
              <Save className="w-4 h-4 mr-2" /> Save Key
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
