import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from "@/components/ui/button";
import { useNavigate, Outlet } from 'react-router-dom';
import { Home, Users, FileText, LogOut, Sun, Moon } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { useState, useEffect } from 'react';

const DashboardLayout = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled on mount
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Modern Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-100 dark:border-gray-700 transition-colors duration-200">
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
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-all duration-200"
            onClick={() => navigate('/admin/dashboard')}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-all duration-200"
            onClick={() => navigate('/admin/users')}
          >
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-all duration-200"
            onClick={() => navigate('/admin/reports')}
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
      <main className="ml-64 min-h-screen p-8 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;