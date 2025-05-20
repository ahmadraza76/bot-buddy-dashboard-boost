
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

// Layouts
import HomeLayout from "@/components/HomeLayout";
import DashboardLayout from "@/components/DashboardLayout";

// Pages
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

// Dashboard Pages
import DashboardIndex from "@/pages/dashboard/DashboardIndex";
import LogsViewer from "@/pages/dashboard/LogsViewer";
import ApiKeys from "@/pages/dashboard/ApiKeys";
import Billing from "@/pages/dashboard/Billing";
import Settings from "@/pages/dashboard/Settings";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Home routes */}
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
            
            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardIndex />} />
              <Route path="logs" element={<LogsViewer />} />
              <Route path="api-keys" element={<ApiKeys />} />
              <Route path="billing" element={<Billing />} />
              <Route path="settings" element={<Settings />} />
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
