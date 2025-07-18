
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
              Launch Scalable Telegram Bots with AI — Instantly
            </h1>
            <p className="text-muted-foreground">
              Deploy isolated, secure bot containers with built-in AI assistants — built for speed, reliability, and scale.
            </p>
          </div>
        </div>

        <Tabs defaultValue="deploy" className="space-y-6">
          <div className="w-full overflow-x-auto scrollbar-hide">
            <TabsList className="flex w-max gap-1 p-1 bg-muted rounded-md md:grid md:grid-cols-6 md:w-full md:gap-0">
              <TabsTrigger value="deploy" className="flex-shrink-0 whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-sm min-w-[80px]">Deploy</TabsTrigger>
              <TabsTrigger value="monitor" className="flex-shrink-0 whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-sm min-w-[80px]">Monitor</TabsTrigger>
              <TabsTrigger value="ai-assistant" className="flex-shrink-0 whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-sm min-w-[100px]">AI Assistant</TabsTrigger>
              <TabsTrigger value="healing" className="flex-shrink-0 whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-sm min-w-[90px]">AI Healing</TabsTrigger>
              <TabsTrigger value="ai-settings" className="flex-shrink-0 whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-sm min-w-[90px]">AI Settings</TabsTrigger>
              <TabsTrigger value="notifications" className="flex-shrink-0 whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-sm min-w-[70px]">Alerts</TabsTrigger>
            </TabsList>
          </div>

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
                  No active bot found. Please deploy a bot first.
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
