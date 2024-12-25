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
import PersonalInfo from "./pages/user/PersonalInfo";
import DashboardLayout from "./components/admin/DashboardLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import ViewUser from "./pages/admin/ViewUser";
import Reports from "./pages/admin/Reports";
import UserDashboard from "./pages/user/Dashboard";
import Report from "./pages/user/Report";
import Profile from "./pages/user/Profile";

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

const ProtectedResetPasswordRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('userAuth') === 'true';
  const isPasswordReset = localStorage.getItem('passwordReset') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (isPasswordReset) {
    return <Navigate to="/personal-info" />;
  }
  
  return <>{children}</>;
};

const ProtectedPersonalInfoRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('userAuth') === 'true';
  const isPasswordReset = localStorage.getItem('passwordReset') === 'true';
  const isPersonalInfoCompleted = localStorage.getItem('personalInfoCompleted') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isPasswordReset) {
    return <Navigate to="/reset-password" />;
  }
  
  if (isPersonalInfoCompleted) {
    return <Navigate to="/dashboard" />;
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
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/reset-password" element={
              <ProtectedResetPasswordRoute>
                <ResetPassword />
              </ProtectedResetPasswordRoute>
            } />
            <Route path="/personal-info" element={
              <ProtectedPersonalInfoRoute>
                <PersonalInfo />
              </ProtectedPersonalInfoRoute>
            } />
            
            {/* User Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedUserRoute>
                  <DashboardLayout />
                </ProtectedUserRoute>
              }
            >
              <Route index element={<UserDashboard />} />
              <Route path="report" element={<Report />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedAdminRoute>
                  <DashboardLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:userId" element={<ViewUser />} />
              <Route path="reports" element={<Reports />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
          </Routes>
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
