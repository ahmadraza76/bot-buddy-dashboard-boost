
export interface Secret {
  id: string;
  name: string;
  value: string;
  description: string;
  createdAt: string;
}

export interface ApiKeyTabProps {
  primaryApiKey: string;
  secondaryApiKey: string;
  showPrimaryKey: boolean;
  showSecondaryKey: boolean;
  onTogglePrimaryVisibility: () => void;
  onToggleSecondaryVisibility: () => void;
  onRegenerateKey: (keyType: 'primary' | 'secondary') => void;
  onCopyToClipboard: (text: string, itemName: string) => void;
}

export interface SecretsTabProps {
  secrets: Secret[];
  newSecretName: string;
  newSecretValue: string;
  newSecretDescription: string;
  visibleSecrets: Set<string>;
  onNewSecretNameChange: (value: string) => void;
  onNewSecretValueChange: (value: string) => void;
  onNewSecretDescriptionChange: (value: string) => void;
  onAddSecret: () => void;
  onDeleteSecret: (id: string) => void;
  onToggleSecretVisibility: (id: string) => void;
  onCopyToClipboard: (text: string, itemName: string) => void;
}

export interface WebhookTabProps {
  webhookUrl: string;
  onRegenerateWebhook: () => void;
  onCopyToClipboard: (text: string, itemName: string) => void;
}
