import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeLayout from "./components/HomeLayout";
import DashboardLayout from "./components/DashboardLayout";
import BotOnboardingPage from "./pages/BotOnboardingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Navigate to="/" />} />
        </Route>

        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<div>Analytics Content</div>} />
          <Route path="logs" element={<div>Logs Content</div>} />
          <Route path="api-keys" element={<div>API Keys Content</div>} />
          <Route path="uptime" element={<div>Uptime Monitor Content</div>} />
          <Route path="referrals" element={<div>Referral Program Content</div>} />
          <Route path="billing" element={<div>Billing Content</div>} />
          <Route path="payouts" element={<div>Payouts Content</div>} />
          <Route path="settings" element={<div>Settings Content</div>} />
        </Route>

        {/* Add the onboarding route */}
        <Route path="/bot-onboarding" element={<BotOnboardingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
