
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useCreateBot } from '@/hooks/useBots';
import { Bot, Zap, Shield, Play, Music, Brain, Code } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const BotDeployment: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    bot_token: '',
    sudo_user_id: '',
    api_key: '',
    auto_heal_enabled: true,
    bot_type: 'assistant' as 'music' | 'assistant' | 'custom',
    environment: 'production' as 'development' | 'production',
  });
  const [isDeploying, setIsDeploying] = useState(false);
  
  const { toast } = useToast();
  const createBot = useCreateBot();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.bot_token || !formData.sudo_user_id) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in username, bot token, and sudo user ID.",
        variant: "destructive",
      });
      return;
    }

    setIsDeploying(true);
    
    try {
      await createBot.mutateAsync({
        username: formData.username,
        bot_token: formData.bot_token,
        sudo_user_id: formData.sudo_user_id,
        api_key: formData.api_key,
        auto_heal_enabled: formData.auto_heal_enabled,
        bot_type: formData.bot_type,
        environment: formData.environment,
      });

      toast({
        title: "Bot Deployment Started",
        description: "Your bot is being deployed. You'll receive notifications about the progress.",
      });

      // Reset form
      setFormData({
        username: '',
        bot_token: '',
        sudo_user_id: '',
        api_key: '',
        auto_heal_enabled: true,
        bot_type: 'assistant',
        environment: 'production',
      });
    } catch (error) {
      toast({
        title: "Deployment Failed",
        description: "Failed to start bot deployment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <Card className="bg-card shadow-sm border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Bot className="h-5 w-5" />
          Deploy New Bot
        </CardTitle>
        <CardDescription>
          Deploy your Telegram bot with isolated environment, personalized AI assistant, and auto-healing (Replit-style)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Bot Username *</Label>
              <Input
                id="username"
                placeholder="@your_bot"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sudo_user_id">Sudo User ID *</Label>
              <Input
                id="sudo_user_id"
                placeholder="123456789"
                value={formData.sudo_user_id}
                onChange={(e) => setFormData({ ...formData, sudo_user_id: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bot_token">Bot Token *</Label>
            <Textarea
              id="bot_token"
              placeholder="1234567890:ABCdefGHIjklMNOpqrSTUvwxyz"
              value={formData.bot_token}
              onChange={(e) => setFormData({ ...formData, bot_token: e.target.value })}
              className="min-h-[80px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bot_type">Bot Type</Label>
              <Select value={formData.bot_type} onValueChange={(value: 'music' | 'assistant' | 'custom') => setFormData({ ...formData, bot_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bot type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="music">
                    <div className="flex items-center gap-2">
                      <Music className="h-4 w-4" />
                      Music Bot
                    </div>
                  </SelectItem>
                  <SelectItem value="assistant">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      AI Assistant
                    </div>
                  </SelectItem>
                  <SelectItem value="custom">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Custom Bot
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="environment">Environment</Label>
              <Select value={formData.environment} onValueChange={(value: 'development' | 'production') => setFormData({ ...formData, environment: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api_key">API Key (Optional)</Label>
            <Input
              id="api_key"
              placeholder="Your custom API key"
              value={formData.api_key}
              onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <Shield className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <Label htmlFor="auto_heal" className="font-medium">AI Auto-Healing</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically detect and fix common bot issues
                </p>
              </div>
            </div>
            <Switch
              id="auto_heal"
              checked={formData.auto_heal_enabled}
              onCheckedChange={(checked) => setFormData({ ...formData, auto_heal_enabled: checked })}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isDeploying}
          >
            {isDeploying ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Deploying Bot...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Deploy Bot
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
