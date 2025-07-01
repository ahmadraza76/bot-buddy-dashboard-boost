
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  BarChart3, 
  Settings, 
  CreditCard, 
  Key,
  FileText,
  Activity,
  DollarSign,
  Users,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';

export const DashboardLayout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: BarChart3 },
    { name: 'Bot Manager', href: '/dashboard/bots', icon: Bot },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Uptime Monitor', href: '/dashboard/uptime', icon: Activity },
    { name: 'Logs Viewer', href: '/dashboard/logs', icon: FileText },
    { name: 'API Keys', href: '/dashboard/api-keys', icon: Key },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Payouts', href: '/dashboard/payouts', icon: DollarSign },
    { name: 'Referrals', href: '/dashboard/referrals', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-card shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 bg-primary">
          <h1 className="text-primary-foreground text-lg font-semibold">Bot Manager</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-primary-foreground hover:bg-primary/80"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                  ${isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-card-foreground hover:bg-accent/50 hover:text-accent-foreground'
                  }
                `}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-accent-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="flex-shrink-0 flex border-t border-border p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-card-foreground">
                {user?.email}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="text-xs text-muted-foreground hover:text-card-foreground"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:pl-0">
        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-card shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Bot Manager</h1>
          <div></div>
        </div>

        {/* Page content */}
        <main className="flex-1 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
