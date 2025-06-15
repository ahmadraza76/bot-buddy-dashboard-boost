import { useState } from "react";
import SettingsSidebar, { settingsSections } from "./components/SettingsSidebar";
import PlatformSettingsSection from "./components/sections/PlatformSettingsSection";
import BotDefaultsSettingsSection from "./components/sections/BotDefaultsSettingsSection";
import PaymentsSettingsSection from "./components/sections/PaymentsSettingsSection";
import NotificationsSettingsSection from "./components/sections/NotificationsSettingsSection";
import SecuritySettingsSection from "./components/sections/SecuritySettingsSection";
import SystemSettingsSection from "./components/sections/SystemSettingsSection";
import SocialSettingsSection from "./components/sections/SocialSettingsSection";
import OpenAIKeyManager from "./components/OpenAIKeyManager";

// Short placeholder components for illustration. Baad mein, yahi approach baaki sab par bhi use ho sakti hai.
function PlaceholderSection({ label }: { label: string }) {
  return (
    <div className="p-6 text-muted-foreground text-center">
      <span className="opacity-70 text-lg">{label} Settings coming soon</span>
    </div>
  );
}

export default function AdminSettings() {
  // Default selected is pehla section
  const [selectedSection, setSelectedSection] = useState(settingsSections[0].key);

  // Section content mapping
  const sectionComponents: { [key: string]: React.ReactNode } = {
    platform: <PlatformSettingsSection />,
    bot: <BotDefaultsSettingsSection />,
    payments: <PaymentsSettingsSection />,
    notifications: <NotificationsSettingsSection />,
    security: <SecuritySettingsSection />,
    system: <SystemSettingsSection />,
    social: <SocialSettingsSection />,
    ai: <OpenAIKeyManager />,
  };

  return (
    <div className="flex flex-col sm:flex-row w-full min-h-[70vh] bg-background rounded-lg shadow-lg overflow-hidden border">
      {/* Sidebar */}
      <SettingsSidebar selected={selectedSection} onSelect={setSelectedSection} />
      {/* Content */}
      <div className="flex-1 bg-card p-0 sm:p-8 overflow-y-auto">
        {sectionComponents[selectedSection]}
      </div>
    </div>
  );
}
