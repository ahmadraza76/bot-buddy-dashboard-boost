
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
    <Card className="bg-card shadow-sm border">
      <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
        <CardTitle className="text-base md:text-lg font-semibold text-card-foreground flex items-center gap-2">
          <Globe className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
          Webhook URL
        </CardTitle>
        <CardDescription className="text-xs md:text-sm text-muted-foreground">
          Set this URL in your Telegram bot settings to receive updates from Telegram.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
        <div className="space-y-2 md:space-y-3">
          <Label htmlFor="webhook-url" className="text-xs md:text-sm font-medium">Webhook URL</Label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              id="webhook-url"
              value={webhookUrl}
              readOnly
              className="font-mono text-xs md:text-sm h-9 md:h-10 flex-1"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onCopyToClipboard(webhookUrl, "Webhook URL")}
                className="h-9 w-9 md:h-10 md:w-10 shrink-0"
              >
                <Copy className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={onRegenerateWebhook}
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
          <h4 className="text-xs md:text-sm font-medium text-card-foreground">Set Webhook Command</h4>
          <div className="bg-muted p-3 md:p-4 rounded-lg overflow-auto">
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-all">
{`curl -F "url=${webhookUrl}" https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook`}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
