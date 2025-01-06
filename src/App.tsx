import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* User Routes */}
        <Route
          path="/user/*"
          element={
            <UserAuthProvider>
              <Routes>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="login" element={<UserLogin />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="reports" element={<UserReports />} />
                <Route path="personal-info" element={<UserPersonalInfo />} />
                <Route path="reset-password" element={<UserResetPassword />} />
                <Route path="phase0" element={<Phase0Page />} />
                <Route path="phase1" element={<Phase1Page />} />
                <Route path="phase2" element={<Phase2Page />} />
                <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
              </Routes>
            </UserAuthProvider>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <AdminAuthProvider>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="login" element={<AdminLogin />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="users/:id" element={<AdminViewUser />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </AdminAuthProvider>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;