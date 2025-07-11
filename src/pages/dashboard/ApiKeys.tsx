
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Shield, Globe, FileText, Copy, RefreshCcw, Eye, EyeOff } from "lucide-react";
import { useApiKeysState } from "@/hooks/useApiKeysState";

export default function ApiKeys() {
  const {
    primaryApiKey,
    showPrimaryKey,
    setShowPrimaryKey,
    handleRegenerateKey,
    copyToClipboard,
  } = useApiKeysState();

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Key className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              API Keys & Secrets
            </h1>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Manage your API keys, secrets, and webhook configurations securely
          </p>
        </div>

        {/* Four Section Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Key className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="font-medium text-card-foreground">Keys</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Shield className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="font-medium text-card-foreground">Secrets</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Globe className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="font-medium text-card-foreground">Webhook</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border hover:bg-accent/50 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <FileText className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="font-medium text-card-foreground">Docs</p>
            </CardContent>
          </Card>
        </div>

        {/* Primary API Key Section */}
        <Card className="bg-card shadow-sm border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <Key className="h-5 w-5 text-blue-600" />
              Primary API Key
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Main API key for authenticating requests. Keep this secure and do not share it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="primary-api-key" className="text-sm font-medium">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="primary-api-key"
                  value={showPrimaryKey ? primaryApiKey : "•".repeat(Math.min(primaryApiKey.length, 20))}
                  readOnly
                  className="font-mono text-sm flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowPrimaryKey(!showPrimaryKey)}
                  className="h-10 w-10"
                >
                  {showPrimaryKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(primaryApiKey, "Primary API key")}
                  className="h-10 w-10"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleRegenerateKey('primary')}
                  className="h-10 px-4"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Regen
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-card-foreground">Example API Request</h4>
              <div className="bg-muted p-4 rounded-lg overflow-auto">
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
{`curl -X POST https://api.botbuddy.dev/v1/bots \\
  -H "Authorization: Bearer ${showPrimaryKey ? primaryApiKey : "YOUR_API_KEY"}" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
