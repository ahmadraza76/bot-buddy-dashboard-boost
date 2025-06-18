
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
    <div className="grid gap-6">
      <Card className="bg-white shadow-sm border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Key className="h-5 w-5 text-blue-600" />
            Primary API Key
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Main API key for authenticating requests. Keep this secure and do not share it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="primary-api-key" className="text-sm font-medium">API Key</Label>
            <div className="flex gap-2">
              <Input
                id="primary-api-key"
                value={showPrimaryKey ? primaryApiKey : "•".repeat(primaryApiKey.length)}
                readOnly
                className="font-mono text-sm h-10"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={onTogglePrimaryVisibility}
                className="h-10 w-10 shrink-0"
              >
                {showPrimaryKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onCopyToClipboard(primaryApiKey, "Primary API key")}
                className="h-10 w-10 shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => onRegenerateKey('primary')}
                className="h-10 px-4 text-sm shrink-0"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Example API Request</h4>
            <pre className="p-4 rounded-lg bg-gray-50 overflow-x-auto text-xs border text-gray-800">
{`curl -X POST https://api.botbuddy.dev/v1/bots/messages \\
  -H "Authorization: Bearer ${showPrimaryKey ? primaryApiKey : "YOUR_PRIMARY_API_KEY"}" \\
  -H "Content-Type: application/json" \\
  -d '{"chat_id": 123456789, "text": "Hello from API!"}'`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Key className="h-5 w-5 text-green-600" />
            Secondary API Key
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Use this key for development or as a backup. Can be regenerated without affecting primary key.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label htmlFor="secondary-api-key" className="text-sm font-medium">API Key</Label>
            <div className="flex gap-2">
              <Input
                id="secondary-api-key"
                value={showSecondaryKey ? secondaryApiKey : "•".repeat(secondaryApiKey.length)}
                readOnly
                className="font-mono text-sm h-10"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={onToggleSecondaryVisibility}
                className="h-10 w-10 shrink-0"
              >
                {showSecondaryKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onCopyToClipboard(secondaryApiKey, "Secondary API key")}
                className="h-10 w-10 shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => onRegenerateKey('secondary')}
                className="h-10 px-4 text-sm shrink-0"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
