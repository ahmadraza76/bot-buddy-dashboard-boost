
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCcw, Globe } from "lucide-react";
import type { WebhookTabProps } from "@/types/apiKeys";

export function WebhookTab({
  webhookUrl,
  onRegenerateWebhook,
  onCopyToClipboard,
}: WebhookTabProps) {
  return (
    <Card className="bg-white shadow-sm border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Globe className="h-5 w-5 text-purple-600" />
          Webhook URL
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Set this URL in your Telegram bot settings to receive updates from Telegram.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="webhook-url" className="text-sm font-medium">Webhook URL</Label>
          <div className="flex gap-2">
            <Input
              id="webhook-url"
              value={webhookUrl}
              readOnly
              className="font-mono text-sm h-10"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => onCopyToClipboard(webhookUrl, "Webhook URL")}
              className="h-10 w-10 shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={onRegenerateWebhook}
              className="h-10 px-4 text-sm shrink-0"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Set Webhook Command</h4>
          <pre className="p-4 rounded-lg bg-gray-50 overflow-x-auto text-xs border text-gray-800">
{`curl -F "url=${webhookUrl}" https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook`}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
