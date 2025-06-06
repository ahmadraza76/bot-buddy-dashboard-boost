
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Bot,
  CreditCard,
  Activity,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const adminNavItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "User Management",
    icon: Users,
    href: "/admin/users",
  },
  {
    label: "Bot Management", 
    icon: Bot,
    href: "/admin/bots",
  },
  {
    label: "Payments",
    icon: CreditCard,
    href: "/admin/payments",
  },
  {
    label: "System Monitoring",
    icon: Activity,
    href: "/admin/monitoring",
  },
  {
    label: "Support Tickets",
    icon: MessageSquare,
    href: "/admin/support",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export default function AdminLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();

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
            
            <Link to="/admin" className="flex items-center mr-8">
              <Shield className="h-6 w-6 mr-2 text-primary" />
              <span className="font-bold">BotifyHost Admin</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <ThemeToggle />
            
            <div className="ml-4 relative">
              <button 
                className="flex items-center gap-2"
                onClick={() => document.getElementById("adminProfileDropdown")?.classList.toggle("hidden")}
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  A
                </div>
              </button>
              <div 
                id="adminProfileDropdown"
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg hidden z-10"
              >
                <div className="py-1 rounded-md bg-popover shadow-md">
                  <div className="px-4 py-2 text-sm font-medium">admin@botifyhost.com</div>
                  <div className="border-t border-border"></div>
                  <Link
                    to="/admin/settings"
                    className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => document.getElementById("adminProfileDropdown")?.classList.add("hidden")}
                  >
                    Admin Settings
                  </Link>
                  <button
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-accent hover:text-accent-foreground flex items-center"
                    onClick={() => {
                      navigate("/");
                      document.getElementById("adminProfileDropdown")?.classList.add("hidden");
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
            {adminNavItems.map((item) => (
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
                  <Shield className="h-6 w-6 mr-2 text-primary" />
                  <span className="font-bold">Admin Panel</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <X size={20} />
                </Button>
              </div>

              <nav className="space-y-1">
                {adminNavItems.map((item) => (
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
