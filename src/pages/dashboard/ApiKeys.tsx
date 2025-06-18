import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCcw, Eye, EyeOff, Plus, Trash2, Key, Shield, FileText, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Generate a random API key
const generateApiKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const segments = [12, 8, 8, 8, 14];
  
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
    }
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Key className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">
              API Keys & Secrets
            </h1>
          </div>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Manage your API keys, secrets, and webhook configurations securely
          </p>
        </div>

        <Tabs defaultValue="api-keys" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-white border shadow-sm">
            <TabsTrigger value="api-keys" className="flex items-center gap-2 text-sm py-2">
              <Key className="h-3 w-3" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="secrets" className="flex items-center gap-2 text-sm py-2">
              <Shield className="h-3 w-3" />
              Secrets
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center gap-2 text-sm py-2">
              <Globe className="h-3 w-3" />
              Webhook
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex items-center gap-2 text-sm py-2">
              <FileText className="h-3 w-3" />
              Docs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="api-keys">
            <div className="grid gap-4">
              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <Key className="h-4 w-4 text-blue-600" />
                    Primary API Key
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Main API key for authenticating requests. Keep this secure and do not share it.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-api-key" className="text-sm font-medium">API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary-api-key"
                        value={showPrimaryKey ? primaryApiKey : "•".repeat(primaryApiKey.length)}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowPrimaryKey(!showPrimaryKey)}
                        className="h-9 w-9"
                      >
                        {showPrimaryKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(primaryApiKey, "Primary API key")}
                        className="h-9 w-9"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleRegenerateKey('primary')}
                        className="h-9 px-3 text-sm"
                      >
                        <RefreshCcw className="mr-1 h-3 w-3" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Example API Request</h4>
                    <pre className="p-3 rounded-md bg-gray-100 overflow-x-auto text-xs border">
{`curl -X POST https://api.botbuddy.dev/v1/bots/messages \\
  -H "Authorization: Bearer ${showPrimaryKey ? primaryApiKey : "YOUR_PRIMARY_API_KEY"}" \\
  -H "Content-Type: application/json" \\
  -d '{"chat_id": 123456789, "text": "Hello from API!"}'`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <Key className="h-4 w-4 text-green-600" />
                    Secondary API Key
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Use this key for development or as a backup. Can be regenerated without affecting primary key.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-api-key" className="text-sm font-medium">API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondary-api-key"
                        value={showSecondaryKey ? secondaryApiKey : "•".repeat(secondaryApiKey.length)}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowSecondaryKey(!showSecondaryKey)}
                        className="h-9 w-9"
                      >
                        {showSecondaryKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(secondaryApiKey, "Secondary API key")}
                        className="h-9 w-9"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleRegenerateKey('secondary')}
                        className="h-9 px-3 text-sm"
                      >
                        <RefreshCcw className="mr-1 h-3 w-3" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="secrets">
            <div className="grid gap-4">
              {/* Add New Secret Card */}
              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <Plus className="h-4 w-4 text-blue-600" />
                    Add New Secret
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Store sensitive configuration values like Bot Tokens, API keys, and other secrets securely.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="secret-name" className="text-sm font-medium">Secret Name</Label>
                      <Input
                        id="secret-name"
                        placeholder="e.g., BOT_TOKEN, SPOTIFY_CLIENT_ID"
                        value={newSecretName}
                        onChange={(e) => setNewSecretName(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secret-value" className="text-sm font-medium">Secret Value</Label>
                      <Input
                        id="secret-value"
                        type="password"
                        placeholder="Enter the secret value"
                        value={newSecretValue}
                        onChange={(e) => setNewSecretValue(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secret-description" className="text-sm font-medium">Description (Optional)</Label>
                    <Input
                      id="secret-description"
                      placeholder="Brief description of what this secret is used for"
                      value={newSecretDescription}
                      onChange={(e) => setNewSecretDescription(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  <Button onClick={addSecret} className="w-fit h-9 px-4 text-sm">
                    <Plus className="mr-2 h-3 w-3" />
                    Add Secret
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Secrets */}
              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    Stored Secrets
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Manage your bot's configuration secrets. These are automatically injected into your bot's environment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {secrets.map((secret) => (
                    <div key={secret.id} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{secret.name}</h4>
                          <p className="text-xs text-gray-600">{secret.description}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSecretVisibility(secret.id)}
                            className="h-7 w-7"
                          >
                            {visibleSecrets.has(secret.id) ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(secret.value, secret.name)}
                            className="h-7 w-7"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteSecret(secret.id)}
                            className="h-7 w-7 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Input
                        value={visibleSecrets.has(secret.id) ? secret.value : "•".repeat(secret.value.length)}
                        readOnly
                        className="font-mono text-xs h-8"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Created: {new Date(secret.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  {secrets.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      <Shield className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">No secrets stored yet. Add your first secret above.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Security Information */}
              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-600" />
                    Security Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p>All secrets are encrypted at rest using AES-256 encryption</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p>Secrets are only accessible by your bot containers</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p>Environment variables are automatically generated for your bot</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p>Secrets are never logged or stored in plain text</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="webhooks">
            <Card className="bg-white shadow-sm border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-purple-600" />
                  Webhook URL
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Set this URL in your Telegram bot settings to receive updates from Telegram.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url" className="text-sm font-medium">Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="webhook-url"
                      value={webhookUrl}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(webhookUrl, "Webhook URL")}
                      className="h-9 w-9"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleRegenerateWebhook}
                      className="h-9 px-3 text-sm"
                    >
                      <RefreshCcw className="mr-1 h-3 w-3" />
                      Regenerate
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Set Webhook Command</h4>
                  <pre className="p-3 rounded-md bg-gray-100 overflow-x-auto text-xs border">
{`curl -F "url=${webhookUrl}" https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documentation">
            <Card className="bg-white shadow-sm border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-indigo-600" />
                  API Documentation
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Learn how to use the BotBuddy API to interact with your Telegram bot programmatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none space-y-4">
                  <div>
                    <h3 className="text-base font-semibold mb-2">Getting Started</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      All API requests require authentication using your API key. Include your API key in the request header as follows:
                    </p>
                    <pre className="p-3 rounded-md bg-gray-100 overflow-x-auto text-xs border">
{`Authorization: Bearer YOUR_API_KEY`}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-semibold mb-3">Available Endpoints</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left font-medium">Endpoint</th>
                            <th className="px-3 py-2 text-left font-medium">Method</th>
                            <th className="px-3 py-2 text-left font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-3 py-2 font-mono text-xs">/v1/bots/messages</td>
                            <td className="px-3 py-2 text-green-600 font-medium">POST</td>
                            <td className="px-3 py-2">Send a message to a user from your bot</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-mono text-xs">/v1/bots/status</td>
                            <td className="px-3 py-2 text-blue-600 font-medium">GET</td>
                            <td className="px-3 py-2">Get the status of your bot</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-mono text-xs">/v1/bots/users</td>
                            <td className="px-3 py-2 text-blue-600 font-medium">GET</td>
                            <td className="px-3 py-2">List all users who have interacted with your bot</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-mono text-xs">/v1/bots/restart</td>
                            <td className="px-3 py-2 text-amber-600 font-medium">POST</td>
                            <td className="px-3 py-2">Restart your bot</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-semibold mb-2">Rate Limits</h3>
                    <p className="text-sm text-gray-600 mb-2">The API has the following rate limits:</p>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>60 requests per minute for the free plan</li>
                      <li>300 requests per minute for the Pro plan</li>
                      <li>1000 requests per minute for the Business plan</li>
                    </ul>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      📚 Need more help? Check out our{" "}
                      <a href="#" className="text-blue-600 hover:underline font-medium">
                        complete API documentation
                      </a>{" "}
                      for detailed examples and advanced usage.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
