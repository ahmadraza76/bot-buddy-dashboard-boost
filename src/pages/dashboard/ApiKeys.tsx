
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCcw, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Generate a random API key
const generateApiKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const segments = [12, 8, 8, 8, 14]; // Format like: xxxxxxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxxxxxxxx
  
  return segments.map(length => {
    let segment = '';
    for (let i = 0; i < length; i++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return segment;
  }).join('-');
};

// Generate a random webhook URL
const generateWebhookUrl = () => {
  const baseUrl = 'https://api.botbuddy.dev/webhook/';
  const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return `${baseUrl}${id}`;
};

export default function ApiKeys() {
  const [primaryApiKey, setPrimaryApiKey] = useState(generateApiKey());
  const [secondaryApiKey, setSecondaryApiKey] = useState(generateApiKey());
  const [webhookUrl, setWebhookUrl] = useState(generateWebhookUrl());
  const [showPrimaryKey, setShowPrimaryKey] = useState(false);
  const [showSecondaryKey, setShowSecondaryKey] = useState(false);
  const [showWebhook, setShowWebhook] = useState(true);

  const { toast } = useToast();

  // Regenerate API key with confirmation
  const handleRegenerateKey = (keyType: 'primary' | 'secondary') => {
    if (confirm(`Are you sure you want to regenerate your ${keyType} API key? This action cannot be undone.`)) {
      const newKey = generateApiKey();
      if (keyType === 'primary') {
        setPrimaryApiKey(newKey);
      } else {
        setSecondaryApiKey(newKey);
      }
      
      toast({
        title: `${keyType.charAt(0).toUpperCase() + keyType.slice(1)} API Key Regenerated`,
        description: "Your new API key is ready to use. The old key has been invalidated.",
      });
    }
  };

  // Regenerate webhook URL
  const handleRegenerateWebhook = () => {
    if (confirm("Are you sure you want to regenerate your webhook URL? This action cannot be undone.")) {
      setWebhookUrl(generateWebhookUrl());
      
      toast({
        title: "Webhook URL Regenerated",
        description: "Your new webhook URL is ready to use. The old URL has been invalidated.",
      });
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, itemName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to Clipboard",
        description: `${itemName} has been copied to your clipboard.`,
      });
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">API Keys & Webhooks</h1>
      </div>

      <Tabs defaultValue="api-keys">
        <TabsList className="mb-6">
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhook URL</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api-keys">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Primary API Key</CardTitle>
                <CardDescription>
                  This is your main API key for authenticating API requests. Keep this secure and do not share it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="primary-api-key">API Key</Label>
                      <div className="flex">
                        <Input
                          id="primary-api-key"
                          value={showPrimaryKey ? primaryApiKey : "•".repeat(primaryApiKey.length)}
                          readOnly
                          className="font-mono"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2"
                          onClick={() => setShowPrimaryKey(!showPrimaryKey)}
                        >
                          {showPrimaryKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2"
                          onClick={() => copyToClipboard(primaryApiKey, "Primary API key")}
                        >
                          <Copy size={16} />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="ml-auto"
                      onClick={() => handleRegenerateKey('primary')}
                    >
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Example API Request</h4>
                    <pre className="p-4 rounded-md bg-muted overflow-x-auto text-xs">
{`curl -X POST https://api.botbuddy.dev/v1/bots/messages \\
  -H "Authorization: Bearer ${showPrimaryKey ? primaryApiKey : "YOUR_PRIMARY_API_KEY"}" \\
  -H "Content-Type: application/json" \\
  -d '{"chat_id": 123456789, "text": "Hello from API!"}'`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Secondary API Key</CardTitle>
                <CardDescription>
                  Use this key for development or as a backup. You can regenerate it without affecting your primary key.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="secondary-api-key">API Key</Label>
                    <div className="flex">
                      <Input
                        id="secondary-api-key"
                        value={showSecondaryKey ? secondaryApiKey : "•".repeat(secondaryApiKey.length)}
                        readOnly
                        className="font-mono"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        onClick={() => setShowSecondaryKey(!showSecondaryKey)}
                      >
                        {showSecondaryKey ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        onClick={() => copyToClipboard(secondaryApiKey, "Secondary API key")}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="ml-auto"
                    onClick={() => handleRegenerateKey('secondary')}
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle>Webhook URL</CardTitle>
              <CardDescription>
                Set this URL in your Telegram bot settings to receive updates from Telegram.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <div className="flex">
                      <Input
                        id="webhook-url"
                        value={webhookUrl}
                        readOnly
                        className="font-mono"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        onClick={() => copyToClipboard(webhookUrl, "Webhook URL")}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="ml-auto"
                    onClick={handleRegenerateWebhook}
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Set Webhook Command</h4>
                  <pre className="p-4 rounded-md bg-muted overflow-x-auto text-xs">
{`curl -F "url=${webhookUrl}" https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Learn how to use the BotBuddy API to interact with your Telegram bot programmatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h3>Getting Started</h3>
                <p>
                  All API requests require authentication using your API key. Include your API key in the request header as follows:
                </p>
                <pre className="p-4 rounded-md bg-muted overflow-x-auto">
{`Authorization: Bearer YOUR_API_KEY`}
                </pre>
                
                <h3 className="mt-6">Available Endpoints</h3>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Endpoint</th>
                      <th>Method</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>/v1/bots/messages</code></td>
                      <td>POST</td>
                      <td>Send a message to a user from your bot</td>
                    </tr>
                    <tr>
                      <td><code>/v1/bots/status</code></td>
                      <td>GET</td>
                      <td>Get the status of your bot</td>
                    </tr>
                    <tr>
                      <td><code>/v1/bots/users</code></td>
                      <td>GET</td>
                      <td>List all users who have interacted with your bot</td>
                    </tr>
                    <tr>
                      <td><code>/v1/bots/restart</code></td>
                      <td>POST</td>
                      <td>Restart your bot</td>
                    </tr>
                  </tbody>
                </table>
                
                <h3 className="mt-6">Rate Limits</h3>
                <p>
                  The API has the following rate limits:
                </p>
                <ul>
                  <li>60 requests per minute for the free plan</li>
                  <li>300 requests per minute for the Pro plan</li>
                  <li>1000 requests per minute for the Business plan</li>
                </ul>
                
                <p className="mt-6">
                  <a href="#" className="text-primary hover:underline">
                    Read the full API documentation →
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
