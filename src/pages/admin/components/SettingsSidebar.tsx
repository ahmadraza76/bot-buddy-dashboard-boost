
import {
  Settings,
  Cpu,
  Banknote,
  Bell,
  Shield,
  Activity,
  Users,
  Globe2,
  Bot,
  Key,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export const settingsSections = [
  {
    key: "platform",
    label: "Platform",
    icon: Settings,
  },
  {
    key: "bot",
    label: "Bot Defaults",
    icon: Bot,
  },
  {
    key: "payments",
    label: "Payments",
    icon: Banknote,
  },
  {
    key: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    key: "security",
    label: "Security",
    icon: Shield,
  },
  {
    key: "system",
    label: "System",
    icon: Activity,
  },
  {
    key: "social",
    label: "Social Media",
    icon: Globe2,
  },
  {
    key: "ai",
    label: "AI Management",
    icon: Key,
  },
];

export default function SettingsSidebar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (key: string) => void;
}) {
  return (
    <nav className="w-full sm:w-60 bg-muted/20 border-r h-full flex-shrink-0">
      <ul className="flex sm:flex-col flex-row whitespace-nowrap overflow-x-auto sm:overflow-visible">
        {settingsSections.map((section) => (
          <li key={section.key}>
            <button
              className={cn(
                "w-full flex items-center px-4 py-3 gap-3 text-sm font-medium rounded-none sm:rounded-r-lg focus:outline-none transition-colors",
                selected === section.key
                  ? "bg-card border-r-4 border-primary text-primary"
                  : "hover:bg-muted hover:text-primary"
              )}
              onClick={() => onSelect(section.key)}
              aria-current={selected === section.key ? "page" : undefined}
              type="button"
            >
              <section.icon className="h-5 w-5" />
              <span>{section.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
