import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import Index from "./pages/Index";
import AdminLogin from "./pages/admin/Login";
import UserLogin from "./pages/user/Login";
import DashboardLayout from "./components/admin/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import ViewUser from "./pages/admin/ViewUser";
import Reports from "./pages/admin/Reports";

const queryClient = new QueryClient();

// Initialize dummy data if not exists
const initializeDummyData = () => {
  // Check if users already exist
  const existingUsers = localStorage.getItem('users');
  if (!existingUsers) {
    const dummyUser = {
      id: 1,
      email: "user@example.com",
      status: "Active",
      personalInfo: {
        fullName: "John Doe",
        phone: "+1234567890",
        address: "123 Main St",
        city: "New York",
        postalCode: "10001"
      }
    };
    localStorage.setItem('users', JSON.stringify([dummyUser]));
  }

  // Check if reports already exist
  const existingReports = localStorage.getItem('reports');
  if (!existingReports) {
    const dummyReport = {
      id: 1,
      type: "Technical Issue",
      status: "Pending",
      date: new Date().toISOString(),
      sender: "user@example.com",
      description: "Having trouble accessing the dashboard"
    };
    localStorage.setItem('reports', JSON.stringify([dummyReport]));
  }
};

// Initialize dummy data
initializeDummyData();

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
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;