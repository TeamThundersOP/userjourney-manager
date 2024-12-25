import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from "@/components/ui/button";
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Home, Users, FileText, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardLayout = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if dark mode is enabled on mount
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  useEffect(() => {
    // Close sidebar by default on mobile
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === `/admin/${path}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Modern Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-100 dark:border-gray-700 transition-all duration-200 z-40 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <Toggle 
            pressed={isDark}
            onPressedChange={toggleTheme}
            aria-label="Toggle theme"
            className="ml-2"
          >
            {isDark ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Toggle>
        </div>
        <nav className="mt-6 space-y-2 px-3">
          <Button
            variant={isActive('dashboard') ? 'default' : 'ghost'}
            className={`w-full justify-start px-4 py-2 text-left transition-all duration-200 ${
              isActive('dashboard') 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary'
            }`}
            onClick={() => {
              navigate('/admin/dashboard');
              isMobile && setSidebarOpen(false);
            }}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            variant={isActive('users') ? 'default' : 'ghost'}
            className={`w-full justify-start px-4 py-2 text-left transition-all duration-200 ${
              isActive('users')
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary'
            }`}
            onClick={() => {
              navigate('/admin/users');
              isMobile && setSidebarOpen(false);
            }}
          >
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
          <Button
            variant={isActive('reports') ? 'default' : 'ghost'}
            className={`w-full justify-start px-4 py-2 text-left transition-all duration-200 ${
              isActive('reports')
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary'
            }`}
            onClick={() => {
              navigate('/admin/reports');
              isMobile && setSidebarOpen(false);
            }}
          >
            <FileText className="mr-2 h-4 w-4" />
            Reports
          </Button>
          <div className="absolute bottom-8 left-0 w-full px-3">
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-2 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition-all duration-200"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main content with modern styling */}
      <main className={`min-h-screen p-8 transition-all duration-200 ${
        isSidebarOpen ? 'md:ml-64' : ''
      }`}>
        <div className="max-w-7xl mx-auto pt-12 md:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;