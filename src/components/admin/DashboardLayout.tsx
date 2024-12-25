import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from "@/components/ui/button";
import { useNavigate, Outlet } from 'react-router-dom';
import { Home, Users, FileText, LogOut } from 'lucide-react';

const DashboardLayout = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          <Button
            variant="ghost"
            className="w-full justify-start px-6 py-3 text-left"
            onClick={() => navigate('/admin/dashboard')}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-6 py-3 text-left"
            onClick={() => navigate('/admin/users')}
          >
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-6 py-3 text-left"
            onClick={() => navigate('/admin/reports')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Reports
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-6 py-3 text-left text-red-600 hover:text-red-700"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;