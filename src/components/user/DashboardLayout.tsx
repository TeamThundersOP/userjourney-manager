import { useUserAuth } from '@/contexts/UserAuthContext';
import { Button } from "@/components/ui/button";
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Home, MessageSquare, UserRound, LogOut, Moon, Sun } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from 'next-themes';

const DashboardLayout = () => {
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const isActive = (path: string) => {
    return location.pathname === `/user/${path}`;
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <aside className={`fixed top-0 left-0 h-screen w-64 bg-card shadow-lg border-r border-border transition-all duration-200 z-40 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
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
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <nav className="mt-6 space-y-2 px-3">
          <Button
            variant={isActive('dashboard') ? 'default' : 'ghost'}
            className={`w-full justify-start px-4 py-2 text-left transition-all duration-200 ${
              isActive('dashboard') 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'hover:bg-accent hover:text-accent-foreground'
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
                : 'hover:bg-accent hover:text-accent-foreground'
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
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
            onClick={() => navigate('/user/profile')}
          >
            <UserRound className="mr-2 h-4 w-4" />
            My Profile
          </Button>
          <div className="absolute bottom-8 left-0 w-full px-3">
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-2 text-left text-destructive hover:bg-destructive/10 transition-all duration-200"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>
      </aside>

      <main className={`min-h-screen p-8 transition-all duration-200 ${
        isSidebarOpen ? 'md:ml-64' : ''
      }`}>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;