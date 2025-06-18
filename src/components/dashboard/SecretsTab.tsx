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
    <div className="grid gap-4 md:gap-6">
      {/* Add New Secret Card - Mobile Optimized */}
      <Card className="bg-card shadow-sm border">
        <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
          <CardTitle className="text-base md:text-lg font-semibold text-card-foreground flex items-center gap-2">
            <Plus className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            Add New Secret
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-muted-foreground">
            Store sensitive configuration values like Bot Tokens, API keys, and other secrets securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="secret-name" className="text-xs md:text-sm font-medium">Secret Name</Label>
              <Input
                id="secret-name"
                placeholder="e.g., BOT_TOKEN, SPOTIFY_CLIENT_ID"
                value={newSecretName}
                onChange={(e) => onNewSecretNameChange(e.target.value)}
                className="text-xs md:text-sm h-9 md:h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secret-value" className="text-xs md:text-sm font-medium">Secret Value</Label>
              <Input
                id="secret-value"
                type="password"
                placeholder="Enter the secret value"
                value={newSecretValue}
                onChange={(e) => onNewSecretValueChange(e.target.value)}
                className="text-xs md:text-sm h-9 md:h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secret-description" className="text-xs md:text-sm font-medium">Description (Optional)</Label>
              <Input
                id="secret-description"
                placeholder="Brief description of what this secret is used for"
                value={newSecretDescription}
                onChange={(e) => onNewSecretDescriptionChange(e.target.value)}
                className="text-xs md:text-sm h-9 md:h-10"
              />
            </div>
          </div>
          <Button onClick={onAddSecret} className="w-full sm:w-fit h-9 md:h-10 px-4 text-xs md:text-sm">
            <Plus className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            Add Secret
          </Button>
        </CardContent>
      </Card>

      {/* Existing Secrets - Mobile Optimized */}
      <Card className="bg-card shadow-sm border">
        <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
          <CardTitle className="text-base md:text-lg font-semibold text-card-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
            Stored Secrets
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-muted-foreground">
            Manage your bot's configuration secrets. These are automatically injected into your bot's environment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4 px-4 md:px-6">
          {secrets.map((secret) => (
            <div key={secret.id} className="border rounded-lg p-3 md:p-4 bg-muted/50">
              <div className="flex items-start justify-between mb-2 md:mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs md:text-sm text-card-foreground truncate">{secret.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{secret.description}</p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onToggleSecretVisibility(secret.id)}
                    className="h-7 w-7 md:h-8 md:w-8"
                  >
                    {visibleSecrets.has(secret.id) ? <EyeOff className="h-3 w-3 md:h-4 md:w-4" /> : <Eye className="h-3 w-3 md:h-4 md:w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onCopyToClipboard(secret.value, secret.name)}
                    className="h-7 w-7 md:h-8 md:w-8"
                  >
                    <Copy className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteSecret(secret.id)}
                    className="h-7 w-7 md:h-8 md:w-8 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              </div>
              <Input
                value={visibleSecrets.has(secret.id) ? secret.value : "•".repeat(Math.min(secret.value.length, 20))}
                readOnly
                className="font-mono text-xs h-8 md:h-9 bg-background"
              />
              <div className="text-xs text-muted-foreground mt-2">
                Created: {new Date(secret.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
          {secrets.length === 0 && (
            <div className="text-center py-6 md:py-8 text-muted-foreground">
              <Shield className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 text-muted-foreground/50" />
              <p className="text-xs md:text-sm">No secrets stored yet. Add your first secret above.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Information - Mobile Optimized */}
      <Card className="bg-card shadow-sm border">
        <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
          <CardTitle className="text-base md:text-lg font-semibold text-card-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
            Security Information
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full mt-1.5 md:mt-2 shrink-0"></div>
              <p className="text-muted-foreground">All secrets are encrypted at rest using AES-256 encryption</p>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full mt-1.5 md:mt-2 shrink-0"></div>
              <p className="text-muted-foreground">Secrets are only accessible by your bot containers</p>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full mt-1.5 md:mt-2 shrink-0"></div>
              <p className="text-muted-foreground">Environment variables are automatically generated for your bot</p>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full mt-1.5 md:mt-2 shrink-0"></div>
              <p className="text-muted-foreground">Secrets are never logged or stored in plain text</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
