import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Eye, EyeOff, Plus, Trash2, Shield } from "lucide-react";
import type { SecretsTabProps } from "@/types/apiKeys";

export function SecretsTab({
  secrets,
  newSecretName,
  newSecretValue,
  newSecretDescription,
  visibleSecrets,
  onNewSecretNameChange,
  onNewSecretValueChange,
  onNewSecretDescriptionChange,
  onAddSecret,
  onDeleteSecret,
  onToggleSecretVisibility,
  onCopyToClipboard,
}: SecretsTabProps) {
  return (
    <div className="grid gap-6">
      {/* Add New Secret Card */}
      <Card className="bg-white shadow-sm border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-600" />
            Add New Secret
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Store sensitive configuration values like Bot Tokens, API keys, and other secrets securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="secret-name" className="text-sm font-medium">Secret Name</Label>
              <Input
                id="secret-name"
                placeholder="e.g., BOT_TOKEN, SPOTIFY_CLIENT_ID"
                value={newSecretName}
                onChange={(e) => onNewSecretNameChange(e.target.value)}
                className="text-sm h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secret-value" className="text-sm font-medium">Secret Value</Label>
              <Input
                id="secret-value"
                type="password"
                placeholder="Enter the secret value"
                value={newSecretValue}
                onChange={(e) => onNewSecretValueChange(e.target.value)}
                className="text-sm h-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="secret-description" className="text-sm font-medium">Description (Optional)</Label>
            <Input
              id="secret-description"
              placeholder="Brief description of what this secret is used for"
              value={newSecretDescription}
              onChange={(e) => onNewSecretDescriptionChange(e.target.value)}
              className="text-sm h-10"
            />
          </div>
          <Button onClick={onAddSecret} className="w-fit h-10 px-4 text-sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Secret
          </Button>
        </CardContent>
      </Card>

      {/* Existing Secrets */}
      <Card className="bg-white shadow-sm border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Stored Secrets
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Manage your bot's configuration secrets. These are automatically injected into your bot's environment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {secrets.map((secret) => (
            <div key={secret.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-sm text-gray-900">{secret.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{secret.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onToggleSecretVisibility(secret.id)}
                    className="h-8 w-8"
                  >
                    {visibleSecrets.has(secret.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onCopyToClipboard(secret.value, secret.name)}
                    className="h-8 w-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteSecret(secret.id)}
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Input
                value={visibleSecrets.has(secret.id) ? secret.value : "•".repeat(secret.value.length)}
                readOnly
                className="font-mono text-xs h-9"
              />
              <div className="text-xs text-gray-500 mt-2">
                Created: {new Date(secret.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
          {secrets.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Shield className="h-8 w-8 mx-auto mb-3 text-gray-400" />
              <p className="text-sm">No secrets stored yet. Add your first secret above.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Information */}
      <Card className="bg-white shadow-sm border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-600" />
            Security Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
              <p className="text-gray-700">All secrets are encrypted at rest using AES-256 encryption</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
              <p className="text-gray-700">Secrets are only accessible by your bot containers</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
              <p className="text-gray-700">Environment variables are automatically generated for your bot</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
              <p className="text-gray-700">Secrets are never logged or stored in plain text</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
