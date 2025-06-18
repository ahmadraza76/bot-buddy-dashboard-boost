
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateApiKey, generateWebhookUrl } from "@/utils/apiKeyUtils";
import type { Secret } from "@/types/apiKeys";

export function useApiKeysState() {
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

  return {
    // API Keys state
    primaryApiKey,
    secondaryApiKey,
    showPrimaryKey,
    showSecondaryKey,
    setShowPrimaryKey,
    setShowSecondaryKey,
    handleRegenerateKey,
    
    // Webhook state
    webhookUrl,
    handleRegenerateWebhook,
    
    // Secrets state
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
    
    // Common utilities
    copyToClipboard,
  };
}
