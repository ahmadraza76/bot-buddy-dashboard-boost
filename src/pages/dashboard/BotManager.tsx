
import { BotDeployment } from '@/components/BotDeployment';
import { BotHealthMonitor } from '@/components/BotHealthMonitor';
import { AIHealingDashboard } from '@/components/AIHealingDashboard';
import { NotificationCenter } from '@/components/NotificationCenter';
import { HealingStatsWidget } from '@/components/HealingStatsWidget';
import { AISettingsWidget } from '@/components/AISettingsWidget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBots } from '@/hooks/useBots';

export default function BotManager() {
  const { data: bots = [] } = useBots();
  const activeBotId = bots.find(bot => bot.status === 'running')?.id;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              AI-Powered Bot Manager
            </h1>
            <p className="text-muted-foreground">
              Deploy, monitor, and auto-heal your Telegram bots with AI
            </p>
          </div>
        </div>

        <Tabs defaultValue="deploy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="deploy">Deploy</TabsTrigger>
            <TabsTrigger value="monitor">Monitor</TabsTrigger>
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
