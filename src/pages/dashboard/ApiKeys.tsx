import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCcw, Eye, EyeOff, Plus, Trash2, Save } from "lucide-react";
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

// Secret management types
interface Secret {
  id: string;
  name: string;
  value: string;
  description: string;
  createdAt: string;
}

export default function ApiKeys() {
  const [primaryApiKey, setPrimaryApiKey] = useState(generateApiKey());
  const [secondaryApiKey, setSecondaryApiKey] = useState(generateApiKey());
  const [webhookUrl, setWebhookUrl] = useState(generateWebhookUrl());
  const [showPrimaryKey, setShowPrimaryKey] = useState(false);
  const [showSecondaryKey, setShowSecondaryKey] = useState(false);
  const [showWebhook, setShowWebhook] = useState(true);

  // Secrets management state
  const [secrets, setSecrets] = useState<Secret[]>([
    {
      id: '1',
      name: 'BOT_TOKEN',
      value: '1234567890:AAEwxyz123456789abcdefghijklmnopqrs',
      description: 'Telegram Bot Token for music bot authentication',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'SUDO_ID',
      value: '123456789',
      description: 'Telegram User ID with sudo privileges',
      createdAt: '2024-01-15T10:31:00Z'
    },
    {
      id: '3',
      name: 'SPOTIFY_CLIENT_ID',
      value: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
      description: 'Spotify API Client ID for music streaming',
      createdAt: '2024-01-15T10:32:00Z'
    },
    {
      id: '4',
      name: 'SESSION_STRING',
      value: '1AABXXXXXXXXXX:abcdxxxxxxxxxxxxxxx-xxxxxxxxx==',
      description: 'Pyrogram/Telethon SESSION_STRING for secure bot authentication',
      createdAt: '2024-01-15T10:33:00Z'
    },
  ]);
  const [newSecretName, setNewSecretName] = useState('');
  const [newSecretValue, setNewSecretValue] = useState('');
  const [newSecretDescription, setNewSecretDescription] = useState('');
  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());

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

  // Secrets management functions
  const addSecret = () => {
    if (!newSecretName || !newSecretValue) {
      toast({
        title: "Missing Information",
        description: "Please provide both secret name and value.",
        variant: "destructive",
      });
      return;
    }

    const newSecret: Secret = {
      id: Date.now().toString(),
      name: newSecretName.toUpperCase(),
      value: newSecretValue,
      description: newSecretDescription || `Secret for ${newSecretName}`,
      createdAt: new Date().toISOString()
    };

    setSecrets([...secrets, newSecret]);
    setNewSecretName('');
    setNewSecretValue('');
    setNewSecretDescription('');

    toast({
      title: "Secret Added",
      description: `${newSecret.name} has been securely stored.`,
    });
  };

  const deleteSecret = (id: string) => {
    const secret = secrets.find(s => s.id === id);
    if (confirm(`Are you sure you want to delete ${secret?.name}? This action cannot be undone.`)) {
      setSecrets(secrets.filter(s => s.id !== id));
      toast({
        title: "Secret Deleted",
        description: `${secret?.name} has been removed.`,
      });
    }
  };

  const toggleSecretVisibility = (id: string) => {
    const newVisible = new Set(visibleSecrets);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleSecrets(newVisible);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">API Keys & Secrets</h1>
      </div>

      <Tabs defaultValue="api-keys">
        <TabsList className="mb-6">
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="secrets">Manage Secrets</TabsTrigger>
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

        <TabsContent value="secrets">
          <div className="grid gap-6">
            {/* Add New Secret Card */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Secret</CardTitle>
                <CardDescription>
                  Store sensitive configuration values like Bot Tokens, API keys, and other secrets securely.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="secret-name">Secret Name</Label>
                      <Input
                        id="secret-name"
                        placeholder="e.g., BOT_TOKEN, SPOTIFY_CLIENT_ID"
                        value={newSecretName}
                        onChange={(e) => setNewSecretName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secret-value">Secret Value</Label>
                      <Input
                        id="secret-value"
                        type="password"
                        placeholder="Enter the secret value"
                        value={newSecretValue}
                        onChange={(e) => setNewSecretValue(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secret-description">Description (Optional)</Label>
                    <Input
                      id="secret-description"
                      placeholder="Brief description of what this secret is used for"
                      value={newSecretDescription}
                      onChange={(e) => setNewSecretDescription(e.target.value)}
                    />
                  </div>
                  <Button onClick={addSecret} className="w-fit">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Secret
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Existing Secrets */}
            <Card>
              <CardHeader>
                <CardTitle>Stored Secrets</CardTitle>
                <CardDescription>
                  Manage your bot's configuration secrets. These are automatically injected into your bot's environment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {secrets.map((secret) => (
                    <div key={secret.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{secret.name}</h4>
                          <p className="text-sm text-muted-foreground">{secret.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSecretVisibility(secret.id)}
                          >
                            {visibleSecrets.has(secret.id) ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(secret.value, secret.name)}
                          >
                            <Copy size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteSecret(secret.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                      <div className="flex">
                        <Input
                          value={visibleSecrets.has(secret.id) ? secret.value : "•".repeat(secret.value.length)}
                          readOnly
                          className="font-mono"
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Created: {new Date(secret.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  {secrets.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No secrets stored yet. Add your first secret above.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Security Information */}
            <Card>
              <CardHeader>
                <CardTitle>Security Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p>All secrets are encrypted at rest using AES-256 encryption</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p>Secrets are only accessible by your bot containers</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p>Environment variables are automatically generated for your bot</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p>Secrets are never logged or stored in plain text</p>
                  </div>
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
