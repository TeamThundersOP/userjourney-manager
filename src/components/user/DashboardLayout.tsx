import { useUserAuth } from '@/contexts/UserAuthContext';
import { Button } from "@/components/ui/button";
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Home, MessageSquare, UserRound, LogOut, Menu, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Toggle } from "@/components/ui/toggle";

const DashboardLayout = () => {
  const { logout, userId } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark');
  };

  // Check if user has filled personal info
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUser = users.find((u: any) => u.id.toString() === userId);
  const hasFilledPersonalInfo = currentUser?.hasFilledPersonalInfo;

  const isActive = (path: string) => {
    return location.pathname === `/user/${path}`;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
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

              {isMobile && (
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <Menu className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-100 dark:border-gray-700 transition-transform duration-200 z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <nav className="flex flex-col h-full">
          <div className="flex-1 space-y-2 p-4">
            <Button
              variant={isActive('dashboard') ? 'default' : 'ghost'}
              className={`w-full justify-start px-4 py-2 text-left transition-all duration-200 ${
                isActive('dashboard') 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary'
              }`}
              onClick={() => navigate('/user/dashboard')}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button
              variant={isActive('reports') ? 'default' : 'ghost'}
              className={`w-full justify-start px-4 py-2 text-left transition-all duration-200 ${
                isActive('reports')
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary'
              }`}
              onClick={() => navigate('/user/reports')}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Reports
            </Button>
            <Button
              variant={isActive('profile') ? 'default' : 'ghost'}
              className={`w-full justify-start px-4 py-2 text-left transition-all duration-200 ${
                isActive('profile')
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary'
              }`}
              onClick={() => navigate('/user/profile')}
            >
              <UserRound className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>
          <div className="p-4 border-t border-gray-100 dark:border-gray-700">
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

      {/* Main Content */}
      <main 
        className={`flex-1 min-h-screen transition-all duration-200 ${
          isSidebarOpen ? 'md:ml-64' : ''
        } pt-16 p-4 md:p-8`}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;