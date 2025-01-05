import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '@/pages/Index';
import AdminLogin from '@/pages/admin/Login';
import UserLogin from '@/pages/user/Login';
import UserResetPassword from '@/pages/user/ResetPassword';
import DashboardLayout from '@/components/admin/DashboardLayout';
import UserDashboardLayout from '@/components/user/DashboardLayout';
import Dashboard from '@/pages/admin/Dashboard';
import Users from '@/pages/admin/Users';
import Reports from '@/pages/admin/Reports';
import ViewUser from '@/pages/admin/ViewUser';
import UserDashboard from '@/pages/user/Dashboard';
import UserReports from '@/pages/user/Reports';
import UserProfile from '@/pages/user/Profile';
import UserPersonalInfo from '@/pages/user/PersonalInfo';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import { UserAuthProvider } from '@/contexts/UserAuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AdminAuthProvider>
          <UserAuthProvider>
            <Routes>
              {/* Root redirect */}
              <Route path="/" element={<Navigate to="/admin/login" replace />} />
              
              {/* Public routes */}
              <Route path="/index" element={<Index />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/user/reset-password" element={<UserResetPassword />} />

              {/* Admin routes */}
              <Route path="/admin" element={<DashboardLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="reports" element={<Reports />} />
                <Route path="users/:id" element={<ViewUser />} />
              </Route>

              {/* User routes */}
              <Route path="/user" element={<UserDashboardLayout />}>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="reports" element={<UserReports />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="personal-info" element={<UserPersonalInfo />} />
              </Route>
            </Routes>
            <Toaster />
          </UserAuthProvider>
        </AdminAuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;