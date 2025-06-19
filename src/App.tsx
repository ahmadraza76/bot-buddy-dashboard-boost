
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import BotManager from "./pages/dashboard/BotManager";
import Settings from "./pages/dashboard/Settings";
import Analytics from "./pages/dashboard/Analytics";
import Billing from "./pages/dashboard/Billing";
import ApiKeys from "./pages/dashboard/ApiKeys";
import LogsViewer from "./pages/dashboard/LogsViewer";
import UptimeMonitor from "./pages/dashboard/UptimeMonitor";
import Payouts from "./pages/dashboard/Payouts";
import ReferralSystem from "./pages/dashboard/ReferralSystem";
import NotFound from "./pages/NotFound";
import BotStatusPage from "./pages/BotStatusPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import BotManagement from "./pages/admin/BotManagement";
import PaymentManagement from "./pages/admin/PaymentManagement";
import PayoutManagement from "./pages/admin/PayoutManagement";
import SupportTickets from "./pages/admin/SupportTickets";
import SystemMonitoring from "./pages/admin/SystemMonitoring";
import HealingDashboard from "./pages/admin/HealingDashboard";
import AdminSettings from "./pages/admin/AdminSettings";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AdminLayout } from "@/components/AdminLayout";

const queryClient = new QueryClient();

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bot/:token" element={<BotStatusPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardIndex />} />
              <Route path="bots" element={<BotManager />} />
              <Route path="settings" element={<Settings />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="billing" element={<Billing />} />
              <Route path="api-keys" element={<ApiKeys />} />
              <Route path="logs" element={<LogsViewer />} />
              <Route path="uptime" element={<UptimeMonitor />} />
              <Route path="payouts" element={<Payouts />} />
              <Route path="referrals" element={<ReferralSystem />} />
            </Route>
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="bots" element={<BotManagement />} />
              <Route path="payments" element={<PaymentManagement />} />
              <Route path="payouts" element={<PayoutManagement />} />
              <Route path="tickets" element={<SupportTickets />} />
              <Route path="monitoring" element={<SystemMonitoring />} />
              <Route path="healing" element={<HealingDashboard />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
