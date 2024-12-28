import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, FileText, LogOut, Sun, Moon } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark');
  };

  const isActive = (path: string) => {
    return location.pathname === `/admin/${path}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/17a49967-e711-4d5a-b8fe-fb02e4469a2a.png" 
              alt="Funelli Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-3 text-xl font-bold font-araboto-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Funelli
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant={isActive('dashboard') ? 'default' : 'ghost'}
              className="flex items-center space-x-2"
              onClick={() => navigate('/admin/dashboard')}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
            <Button
              variant={isActive('users') ? 'default' : 'ghost'}
              className="flex items-center space-x-2"
              onClick={() => navigate('/admin/users')}
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
            </Button>
            <Button
              variant={isActive('reports') ? 'default' : 'ghost'}
              className="flex items-center space-x-2"
              onClick={() => navigate('/admin/reports')}
            >
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </Button>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Toggle 
              pressed={isDark}
              onPressedChange={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Toggle>
            <Button
              variant="ghost"
              className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;