
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import ProtectedRoute from "@/components/ProtectedRoute";

// Layouts
import HomeLayout from "@/components/HomeLayout";
import DashboardLayout from "@/components/DashboardLayout";
import AdminLayout from "@/components/AdminLayout";

// Pages
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

// Dashboard Pages
import DashboardIndex from "@/pages/dashboard/DashboardIndex";
import LogsViewer from "@/pages/dashboard/LogsViewer";
import ApiKeys from "@/pages/dashboard/ApiKeys";
import Billing from "@/pages/dashboard/Billing";
import Settings from "@/pages/dashboard/Settings";
import UptimeMonitor from "@/pages/dashboard/UptimeMonitor";
import ReferralSystem from "@/pages/dashboard/ReferralSystem";
import BotStatusPage from "@/pages/BotStatusPage";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import BotManagement from "@/pages/admin/BotManagement";
import PaymentManagement from "@/pages/admin/PaymentManagement";
import SystemMonitoring from "@/pages/admin/SystemMonitoring";
import SupportTickets from "@/pages/admin/SupportTickets";
import AdminSettings from "@/pages/admin/AdminSettings";

// Auth
import AuthForm from "@/components/AuthForm";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
            
            {/* Auth route */}
            <Route path="/auth" element={<AuthForm />} />
            
            {/* Public Status Page */}
            <Route path="/status" element={<BotStatusPage />} />
            
            {/* Protected Dashboard routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardIndex />} />
              <Route path="logs" element={<LogsViewer />} />
              <Route path="api-keys" element={<ApiKeys />} />
              <Route path="billing" element={<Billing />} />
              <Route path="uptime" element={<UptimeMonitor />} />
              <Route path="referrals" element={<ReferralSystem />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* Protected Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="bots" element={<BotManagement />} />
              <Route path="payments" element={<PaymentManagement />} />
              <Route path="monitoring" element={<SystemMonitoring />} />
              <Route path="support" element={<SupportTickets />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
