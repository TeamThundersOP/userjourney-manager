import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import Index from "./pages/Index";
import AdminLogin from "./pages/admin/Login";
import UserLogin from "./pages/user/Login";
import ResetPassword from "./pages/user/ResetPassword";
import PersonalDetails from "./pages/user/PersonalDetails";
import DashboardLayout from "./components/admin/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import ViewUser from "./pages/admin/ViewUser";
import Reports from "./pages/admin/Reports";
import UserDashboardLayout from "./components/user/DashboardLayout";
import UserDashboard from "./pages/user/Dashboard";
import UserReports from "./pages/user/Reports";

const queryClient = new QueryClient();

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

const ProtectedUserRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('userAuth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AdminAuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* User routes */}
            <Route
              path="/user/*"
              element={
                <ProtectedUserRoute>
                  <UserDashboardLayout />
                </ProtectedUserRoute>
              }
            >
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="reports" element={<UserReports />} />
              <Route path="profile" element={<PersonalDetails />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedAdminRoute>
                  <DashboardLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:userId" element={<ViewUser />} />
              <Route path="reports" element={<Reports />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
          </Routes>
          <Toaster />
          <Sonner />
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;