
import { BotDeployment } from '@/components/BotDeployment';
import { BotHealthMonitor } from '@/components/BotHealthMonitor';
import { AIHealingDashboard } from '@/components/AIHealingDashboard';
import { NotificationCenter } from '@/components/NotificationCenter';
import { HealingStatsWidget } from '@/components/HealingStatsWidget';
import { AISettingsWidget } from '@/components/AISettingsWidget';
import { PersonalizedAIAssistant } from '@/components/PersonalizedAIAssistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBots } from '@/hooks/useBots';

export default function BotManager() {
  const { data: bots = [] } = useBots();
  const activeBot = bots.find(bot => bot.status === 'running');
  const activeBotId = activeBot?.id;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Replit-Style Bot SaaS Platform
            </h1>
            <p className="text-muted-foreground">
              Isolated bot environments with personalized AI assistants - जैसे Replit containers!
            </p>
          </div>
        </div>

        <Tabs defaultValue="deploy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="deploy">Deploy</TabsTrigger>
            <TabsTrigger value="monitor">Monitor</TabsTrigger>
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
            <TabsTrigger value="healing">AI Healing</TabsTrigger>
            <TabsTrigger value="ai-settings">AI Settings</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="deploy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <BotDeployment />
              </div>
              <div>
                <HealingStatsWidget />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monitor" className="space-y-6">
            <BotHealthMonitor />
          </TabsContent>

          <TabsContent value="ai-assistant" className="space-y-6">
            {activeBot ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <PersonalizedAIAssistant
                    botId={activeBot.id}
                    botName={activeBot.username}
                    botStatus={activeBot.status}
                    botHealth={activeBot.health_score || 0}
                  />
                </div>
                <div>
                  <HealingStatsWidget />
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  कोई active bot नहीं मिला। पहले एक bot deploy करें।
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="healing" className="space-y-6">
            <AIHealingDashboard botId={activeBotId} />
          </TabsContent>

          <TabsContent value="ai-settings" className="space-y-6">
            <AISettingsWidget />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationCenter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
