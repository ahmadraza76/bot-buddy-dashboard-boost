
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCcw, Eye, EyeOff, Key } from "lucide-react";
import type { ApiKeyTabProps } from "@/types/apiKeys";

export function ApiKeysTab({
  primaryApiKey,
  secondaryApiKey,
  showPrimaryKey,
  showSecondaryKey,
  onTogglePrimaryVisibility,
  onToggleSecondaryVisibility,
  onRegenerateKey,
  onCopyToClipboard,
}: ApiKeyTabProps) {
  return (
    <div className="grid gap-4 md:gap-6">
      <Card className="bg-card shadow-sm border">
        <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
          <CardTitle className="text-base md:text-lg font-semibold text-card-foreground flex items-center gap-2">
            <Key className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            Primary API Key
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-muted-foreground">
            Main API key for authenticating requests. Keep this secure and do not share it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
          <div className="space-y-2 md:space-y-3">
            <Label htmlFor="primary-api-key" className="text-xs md:text-sm font-medium">API Key</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="primary-api-key"
                value={showPrimaryKey ? primaryApiKey : "•".repeat(Math.min(primaryApiKey.length, 20))}
                readOnly
                className="font-mono text-xs md:text-sm h-9 md:h-10 flex-1"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onTogglePrimaryVisibility}
                  className="h-9 w-9 md:h-10 md:w-10 shrink-0"
                >
                  {showPrimaryKey ? <EyeOff className="h-3 w-3 md:h-4 md:w-4" /> : <Eye className="h-3 w-3 md:h-4 md:w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onCopyToClipboard(primaryApiKey, "Primary API key")}
                  className="h-9 w-9 md:h-10 md:w-10 shrink-0"
                >
                  <Copy className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onRegenerateKey('primary')}
                  className="h-9 md:h-10 px-3 md:px-4 text-xs md:text-sm shrink-0"
                >
                  <RefreshCcw className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Regenerate</span>
                  <span className="sm:hidden">Regen</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 md:space-y-3">
            <h4 className="text-xs md:text-sm font-medium text-card-foreground">Example API Request</h4>
            <div className="bg-muted p-3 md:p-4 rounded-lg overflow-auto">
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-all">
{`curl -X POST https://api.botbuddy.dev/v1/bots/messages \\
  -H "Authorization: Bearer ${showPrimaryKey ? primaryApiKey : "YOUR_PRIMARY_API_KEY"}" \\
  -H "Content-Type: application/json" \\
  -d '{"chat_id": 123456789, "text": "Hello from API!"}'`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-sm border">
        <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
          <CardTitle className="text-base md:text-lg font-semibold text-card-foreground flex items-center gap-2">
            <Key className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
            Secondary API Key
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-muted-foreground">
            Use this key for development or as a backup. Can be regenerated without affecting primary key.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <div className="space-y-2 md:space-y-3">
            <Label htmlFor="secondary-api-key" className="text-xs md:text-sm font-medium">API Key</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="secondary-api-key"
                value={showSecondaryKey ? secondaryApiKey : "•".repeat(Math.min(secondaryApiKey.length, 20))}
                readOnly
                className="font-mono text-xs md:text-sm h-9 md:h-10 flex-1"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onToggleSecondaryVisibility}
                  className="h-9 w-9 md:h-10 md:w-10 shrink-0"
                >
                  {showSecondaryKey ? <EyeOff className="h-3 w-3 md:h-4 md:w-4" /> : <Eye className="h-3 w-3 md:h-4 md:w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onCopyToClipboard(secondaryApiKey, "Secondary API key")}
                  className="h-9 w-9 md:h-10 md:w-10 shrink-0"
                >
                  <Copy className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onRegenerateKey('secondary')}
                  className="h-9 md:h-10 px-3 md:px-4 text-xs md:text-sm shrink-0"
                >
                  <RefreshCcw className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Regenerate</span>
                  <span className="sm:hidden">Regen</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
