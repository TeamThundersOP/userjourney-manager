import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from "@/components/ui/button";
import { useNavigate, Outlet } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const DashboardLayout = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/17a49967-e711-4d5a-b8fe-fb02e4469a2a.png" 
              alt="Funelli Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold font-araboto-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Funelli
            </span>
          </div>
          <Button
            variant="ghost"
            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition-all duration-200"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4 text-primary" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;