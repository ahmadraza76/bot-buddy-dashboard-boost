
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart2,
  Terminal,
  Settings,
  Key,
  CreditCard,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Analytics",
    icon: BarChart2,
    href: "/dashboard/analytics",
  },
  {
    label: "Live Logs",
    icon: Terminal,
    href: "/dashboard/logs",
  },
  {
    label: "API Keys",
    icon: Key,
    href: "/dashboard/api-keys",
  },
  {
    label: "Billing",
    icon: CreditCard,
    href: "/dashboard/billing",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export default function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState("My First Bot");
  const navigate = useNavigate();

  const bots = [
    "My First Bot",
    "Support Bot",
    "Marketing Bot"
  ];

  const handleBotChange = (bot: string) => {
    setSelectedBot(bot);
    // Here you could navigate or update state based on selected bot
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navigation */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            
            <Link to="/" className="flex items-center mr-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 240 240"
                className="mr-2"
              >
                <path
                  fill="#0088cc"
                  d="M120 20c55.23 0 100 44.77 100 100s-44.77 100-100 100S20 175.23 20 120S64.77 20 120 20z"
                />
                <path
                  fill="#FFF"
                  d="M165 72.84c-3.79-1.58-17.6-5.63-49.32 17.25c-15.84 11.44-26.35 21.47-30.55 26.9c-1.56 2.03-1.88 3.1-2.05 4.44c0 0-.58 5.02 3.68 6.89c1.35.59 3.31.95 5.12 0c3.64-1.94 9.83-6.21 15.05-9.54c5.86-3.75 6.22-1.2 4.44 1.73c-3.67 6.04-11.28 14.56-15.15 19.07c-1.58 1.85-.17 3.77 1.25 4.42c3.52 1.62 9.25 3.68 13.13 4.92c3.88 1.24 6.28.47 8.1-3.08c2.77-5.39 8.86-28.78 10.7-37.56c.18-.89.39-1.75.6-2.58c1.65-6.41 3.14-12.14 6.56-11.47c5.9 1.15 3.8 21.8 3.51 26.08c-.28 3.95-1.5 8.28-.56 10.25c.93 1.97 2.66 1.79 5.09 1.12c1.91-.53 12.2-4.72 12.76-5.12c1.53-1.08 1.36-2.18 1.36-2.18s1.35-11.15 2.06-19.99c.7-8.84 1.73-18.09.76-25.45c-.96-7.36-5.1-7.9-7.06-7.28z"
                />
              </svg>
              <span className="font-bold">BotBuddy</span>
            </Link>

            {/* Bot selector dropdown */}
            <div className="relative hidden md:block">
              <button 
                className="flex items-center px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                onClick={() => document.getElementById("botDropdown")?.classList.toggle("hidden")}
              >
                <span className="mr-2">{selectedBot}</span>
                <ChevronDown size={16} />
              </button>
              <div 
                id="botDropdown" 
                className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-card hidden z-10"
              >
                <div className="py-1 rounded-md bg-popover shadow-md" role="menu">
                  {bots.map((bot) => (
                    <button
                      key={bot}
                      className={cn(
                        "block px-4 py-2 text-sm w-full text-left",
                        bot === selectedBot
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                      onClick={() => {
                        handleBotChange(bot);
                        document.getElementById("botDropdown")?.classList.add("hidden");
                      }}
                    >
                      {bot}
                    </button>
                  ))}
                  <div className="border-t border-border my-1"></div>
                  <button
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-accent hover:text-accent-foreground"
                    onClick={() => {
                      // Here you would open a modal to add a new bot
                      document.getElementById("botDropdown")?.classList.add("hidden");
                    }}
                  >
                    + Add New Bot
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <ThemeToggle />
            
            <div className="ml-4 relative">
              <button 
                className="flex items-center gap-2"
                onClick={() => document.getElementById("profileDropdown")?.classList.toggle("hidden")}
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  U
                </div>
              </button>
              <div 
                id="profileDropdown"
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg hidden z-10"
              >
                <div className="py-1 rounded-md bg-popover shadow-md">
                  <div className="px-4 py-2 text-sm font-medium">user@example.com</div>
                  <div className="border-t border-border"></div>
                  <Link
                    to="/dashboard/settings"
                    className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => document.getElementById("profileDropdown")?.classList.add("hidden")}
                  >
                    Profile Settings
                  </Link>
                  <button
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-accent hover:text-accent-foreground flex items-center"
                    onClick={() => {
                      navigate("/");
                      document.getElementById("profileDropdown")?.classList.add("hidden");
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside className="w-64 bg-sidebar border-r hidden md:block">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center px-4 py-3 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile navigation drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-background/80" onClick={() => setMobileNavOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 w-64 bg-sidebar p-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 240 240"
                    className="mr-2"
                  >
                    <path
                      fill="#0088cc"
                      d="M120 20c55.23 0 100 44.77 100 100s-44.77 100-100 100S20 175.23 20 120S64.77 20 120 20z"
                    />
                    <path
                      fill="#FFF"
                      d="M165 72.84c-3.79-1.58-17.6-5.63-49.32 17.25c-15.84 11.44-26.35 21.47-30.55 26.9c-1.56 2.03-1.88 3.1-2.05 4.44c0 0-.58 5.02 3.68 6.89c1.35.59 3.31.95 5.12 0c3.64-1.94 9.83-6.21 15.05-9.54c5.86-3.75 6.22-1.2 4.44 1.73c-3.67 6.04-11.28 14.56-15.15 19.07c-1.58 1.85-.17 3.77 1.25 4.42c3.52 1.62 9.25 3.68 13.13 4.92c3.88 1.24 6.28.47 8.1-3.08c2.77-5.39 8.86-28.78 10.7-37.56c.18-.89.39-1.75.6-2.58c1.65-6.41 3.14-12.14 6.56-11.47c5.9 1.15 3.8 21.8 3.51 26.08c-.28 3.95-1.5 8.28-.56 10.25c.93 1.97 2.66 1.79 5.09 1.12c1.91-.53 12.2-4.72 12.76-5.12c1.53-1.08 1.36-2.18 1.36-2.18s1.35-11.15 2.06-19.99c.7-8.84 1.73-18.09.76-25.45c-.96-7.36-5.1-7.9-7.06-7.28z"
                    />
                  </svg>
                  <span className="font-bold">BotBuddy</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Bot selector */}
              <div className="mb-4">
                <div className="text-xs uppercase text-muted-foreground font-semibold mb-2">Current Bot</div>
                <button 
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md bg-muted"
                  onClick={() => document.getElementById("mobileBotDropdown")?.classList.toggle("hidden")}
                >
                  <span>{selectedBot}</span>
                  <ChevronDown size={16} />
                </button>
                <div 
                  id="mobileBotDropdown" 
                  className="mt-2 w-full rounded-md shadow-sm bg-card hidden"
                >
                  <div className="py-1 rounded-md bg-popover shadow-md">
                    {bots.map((bot) => (
                      <button
                        key={bot}
                        className={cn(
                          "block px-3 py-2 text-sm w-full text-left",
                          bot === selectedBot
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                        onClick={() => {
                          handleBotChange(bot);
                          document.getElementById("mobileBotDropdown")?.classList.add("hidden");
                        }}
                      >
                        {bot}
                      </button>
                    ))}
                    <div className="border-t border-border my-1"></div>
                    <button
                      className="block px-3 py-2 text-sm w-full text-left hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        // Here you would open a modal to add a new bot
                        document.getElementById("mobileBotDropdown")?.classList.add("hidden");
                      }}
                    >
                      + Add New Bot
                    </button>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center px-4 py-3 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
