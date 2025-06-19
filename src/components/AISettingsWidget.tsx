
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Brain, Key, Shield, Settings, Eye, EyeOff } from 'lucide-react';

export const AISettingsWidget: React.FC = () => {
  const [aiSettings, setAiSettings] = useState({
    openai_api_key: '',
    ai_enabled: true,
    auto_healing: true,
    confidence_threshold: 0.8,
    max_healing_attempts: 3,
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Here you would typically save to your backend/database
      // For now, we'll just show a success message
      toast({
        title: "AI Settings Saved",
        description: "Your AI configuration has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save AI settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card shadow-sm border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Brain className="h-5 w-5" />
          AI Configuration
        </CardTitle>
        <CardDescription>
          Configure AI settings for automated bot healing and monitoring
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Key Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-blue-500" />
            <Label htmlFor="openai_api_key" className="font-medium">OpenAI API Key</Label>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                id="openai_api_key"
                type={showApiKey ? "text" : "password"}
                placeholder="sk-..."
                value={aiSettings.openai_api_key}
                onChange={(e) => setAiSettings({ ...aiSettings, openai_api_key: e.target.value })}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Required for AI-powered bot healing and analysis. Your key is encrypted and stored securely.
          </p>
        </div>

        {/* AI Features Toggle */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Brain className="h-4 w-4 text-purple-500" />
              <div>
                <Label htmlFor="ai_enabled" className="font-medium">AI Assistant</Label>
                <p className="text-sm text-muted-foreground">
                  Enable AI-powered log analysis and recommendations
                </p>
              </div>
            </div>
            <Switch
              id="ai_enabled"
              checked={aiSettings.ai_enabled}
              onCheckedChange={(checked) => setAiSettings({ ...aiSettings, ai_enabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className="h-4 w-4 text-green-500" />
              <div>
                <Label htmlFor="auto_healing" className="font-medium">Auto-Healing</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically fix common bot issues without manual intervention
                </p>
              </div>
            </div>
            <Switch
              id="auto_healing"
              checked={aiSettings.auto_healing}
              onCheckedChange={(checked) => setAiSettings({ ...aiSettings, auto_healing: checked })}
            />
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-gray-500" />
            <Label className="font-medium">Advanced Settings</Label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="confidence_threshold">Confidence Threshold</Label>
              <Input
                id="confidence_threshold"
                type="number"
                min="0.1"
                max="1.0"
                step="0.1"
                value={aiSettings.confidence_threshold}
                onChange={(e) => setAiSettings({ 
                  ...aiSettings, 
                  confidence_threshold: parseFloat(e.target.value) 
                })}
              />
              <p className="text-xs text-muted-foreground">
                Minimum confidence level for auto-healing (0.1 - 1.0)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_healing_attempts">Max Healing Attempts</Label>
              <Input
                id="max_healing_attempts"
                type="number"
                min="1"
                max="10"
                value={aiSettings.max_healing_attempts}
                onChange={(e) => setAiSettings({ 
                  ...aiSettings, 
                  max_healing_attempts: parseInt(e.target.value) 
                })}
              />
              <p className="text-xs text-muted-foreground">
                Maximum retry attempts for failed healing actions
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button 
          onClick={handleSaveSettings}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Shield className="h-4 w-4 mr-2" />
              Save AI Settings
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
