
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
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        
        {/* Header Section - Mobile Optimized */}
        <div className="text-center space-y-2 md:space-y-3">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="p-2 md:p-3 bg-primary rounded-lg">
              <Key className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              API Keys & Secrets
            </h1>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto px-4">
            Manage your API keys, secrets, and webhook configurations securely
          </p>
        </div>

        <Tabs defaultValue="api-keys" className="space-y-4 md:space-y-6">
          {/* Mobile-First Tab Navigation */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-card border shadow-sm h-auto p-1">
            <TabsTrigger 
              value="api-keys" 
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3 px-2"
            >
              <Key className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden md:inline">API Keys</span>
              <span className="md:hidden">Keys</span>
            </TabsTrigger>
            <TabsTrigger 
              value="secrets" 
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3 px-2"
            >
              <Shield className="h-3 w-3 md:h-4 md:w-4" />
              <span>Secrets</span>
            </TabsTrigger>
            <TabsTrigger 
              value="webhooks" 
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3 px-2"
            >
              <Globe className="h-3 w-3 md:h-4 md:w-4" />
              <span>Webhook</span>
            </TabsTrigger>
            <TabsTrigger 
              value="documentation" 
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3 px-2"
            >
              <FileText className="h-3 w-3 md:h-4 md:w-4" />
              <span>Docs</span>
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
