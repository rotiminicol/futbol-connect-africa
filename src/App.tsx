
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlayersPage from "./pages/PlayersPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PricingPage from "./pages/PricingPage";
import DashboardPage from "./pages/DashboardPage";
import TransferMarketPage from "./pages/TransferMarketPage";
import EventsPage from "./pages/EventsPage";
import NewsPage from "./pages/NewsPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import UsersManagementPage from "./pages/admin/UsersManagementPage";
import PlayersManagementPage from "./pages/admin/PlayersManagementPage";
import AddPlayerPage from "./pages/admin/AddPlayerPage";
import SystemSettingsPage from "./pages/admin/SystemSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/dashboard/*" element={<DashboardPage />} />
            <Route path="/transfer-market" element={<TransferMarketPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/news" element={<NewsPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<UsersManagementPage />} />
            <Route path="/admin/players" element={<PlayersManagementPage />} />
            <Route path="/admin/players/add" element={<AddPlayerPage />} />
            <Route path="/admin/settings" element={<SystemSettingsPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
