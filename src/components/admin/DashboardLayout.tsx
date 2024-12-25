import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from "@/components/ui/button";
import { useNavigate, Outlet } from 'react-router-dom';
import { Home, Users, FileText, LogOut } from 'lucide-react';

const DashboardLayout = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg border-r border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
        </div>
        <nav className="mt-6 space-y-2 px-3">
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-left hover:bg-gray-50 hover:text-primary transition-all duration-200"
            onClick={() => navigate('/admin/dashboard')}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-left hover:bg-gray-50 hover:text-primary transition-all duration-200"
            onClick={() => navigate('/admin/users')}
          >
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-left hover:bg-gray-50 hover:text-primary transition-all duration-200"
            onClick={() => navigate('/admin/reports')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Reports
          </Button>
          <div className="absolute bottom-8 left-0 w-full px-3">
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-2 text-left text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main content with modern styling */}
      <main className="ml-64 min-h-screen p-8 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;