import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import UserDashboard from "@/pages/user/Dashboard";
import UserLogin from "@/pages/user/Login";
import UserProfile from "@/pages/user/Profile";
import UserReports from "@/pages/user/Reports";
import UserPersonalInfo from "@/pages/user/PersonalInfo";
import UserResetPassword from "@/pages/user/ResetPassword";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLogin from "@/pages/admin/Login";
import AdminUsers from "@/pages/admin/Users";
import AdminViewUser from "@/pages/admin/ViewUser";
import AdminReports from "@/pages/admin/Reports";
import { UserAuthProvider } from "@/contexts/UserAuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import Phase0Page from "@/pages/user/Phase0";
import Phase1Page from "@/pages/user/Phase1";
import Phase2Page from "@/pages/user/Phase2";
import UserDashboardLayout from "@/components/user/DashboardLayout";
import AdminDashboardLayout from "@/components/admin/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* User Routes with DashboardLayout */}
        <Route
          path="/user"
          element={
            <UserAuthProvider>
              <UserDashboardLayout>
                <Outlet />
              </UserDashboardLayout>
            </UserAuthProvider>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="reports" element={<UserReports />} />
          <Route path="personal-info" element={<UserPersonalInfo />} />
          <Route path="phase0" element={<Phase0Page />} />
          <Route path="phase1" element={<Phase1Page />} />
          <Route path="phase2" element={<Phase2Page />} />
          <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
        </Route>

        {/* Standalone User Routes without navbar */}
        <Route
          path="/user/login"
          element={
            <UserAuthProvider>
              <UserLogin />
            </UserAuthProvider>
          }
        />
        <Route
          path="/user/reset-password"
          element={
            <UserAuthProvider>
              <UserResetPassword />
            </UserAuthProvider>
          }
        />

        {/* Admin Routes with DashboardLayout */}
        <Route
          path="/admin"
          element={
            <AdminAuthProvider>
              <AdminDashboardLayout />
            </AdminAuthProvider>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id" element={<AdminViewUser />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* Standalone Admin Routes without navbar */}
        <Route
          path="/admin/login"
          element={
            <AdminAuthProvider>
              <AdminLogin />
            </AdminAuthProvider>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;