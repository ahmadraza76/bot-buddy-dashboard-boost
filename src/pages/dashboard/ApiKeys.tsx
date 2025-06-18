
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Shield, FileText, Globe } from "lucide-react";
import { useApiKeysState } from "@/hooks/useApiKeysState";
import { ApiKeysTab } from "@/components/dashboard/ApiKeysTab";
import { SecretsTab } from "@/components/dashboard/SecretsTab";
import { WebhookTab } from "@/components/dashboard/WebhookTab";
import { DocumentationTab } from "@/components/dashboard/DocumentationTab";

export default function ApiKeys() {
  const {
    primaryApiKey,
    secondaryApiKey,
    showPrimaryKey,
    showSecondaryKey,
    setShowPrimaryKey,
    setShowSecondaryKey,
    handleRegenerateKey,
    webhookUrl,
    handleRegenerateWebhook,
    secrets,
    newSecretName,
    newSecretValue,
    newSecretDescription,
    visibleSecrets,
    setNewSecretName,
    setNewSecretValue,
    setNewSecretDescription,
    addSecret,
    deleteSecret,
    toggleSecretVisibility,
    copyToClipboard,
  } = useApiKeysState();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Key className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              API Keys & Secrets
            </h1>
          </div>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Manage your API keys, secrets, and webhook configurations securely
          </p>
        </div>

        <Tabs defaultValue="api-keys" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border shadow-sm h-12">
            <TabsTrigger value="api-keys" className="flex items-center gap-2 text-sm py-3">
              <Key className="h-4 w-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="secrets" className="flex items-center gap-2 text-sm py-3">
              <Shield className="h-4 w-4" />
              Secrets
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center gap-2 text-sm py-3">
              <Globe className="h-4 w-4" />
              Webhook
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex items-center gap-2 text-sm py-3">
              <FileText className="h-4 w-4" />
              Docs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="api-keys">
            <ApiKeysTab
              primaryApiKey={primaryApiKey}
              secondaryApiKey={secondaryApiKey}
              showPrimaryKey={showPrimaryKey}
              showSecondaryKey={showSecondaryKey}
              onTogglePrimaryVisibility={() => setShowPrimaryKey(!showPrimaryKey)}
              onToggleSecondaryVisibility={() => setShowSecondaryKey(!showSecondaryKey)}
              onRegenerateKey={handleRegenerateKey}
              onCopyToClipboard={copyToClipboard}
            />
          </TabsContent>

          <TabsContent value="secrets">
            <SecretsTab
              secrets={secrets}
              newSecretName={newSecretName}
              newSecretValue={newSecretValue}
              newSecretDescription={newSecretDescription}
              visibleSecrets={visibleSecrets}
              onNewSecretNameChange={setNewSecretName}
              onNewSecretValueChange={setNewSecretValue}
              onNewSecretDescriptionChange={setNewSecretDescription}
              onAddSecret={addSecret}
              onDeleteSecret={deleteSecret}
              onToggleSecretVisibility={toggleSecretVisibility}
              onCopyToClipboard={copyToClipboard}
            />
          </TabsContent>
          
          <TabsContent value="webhooks">
            <WebhookTab
              webhookUrl={webhookUrl}
              onRegenerateWebhook={handleRegenerateWebhook}
              onCopyToClipboard={copyToClipboard}
            />
          </TabsContent>
          
          <TabsContent value="documentation">
            <DocumentationTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
