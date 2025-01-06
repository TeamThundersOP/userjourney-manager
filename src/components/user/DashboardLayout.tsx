import { useUserAuth } from '@/contexts/UserAuthContext';
import { Button } from "@/components/ui/button";
import { useNavigate, Outlet, useLocation, Navigate } from 'react-router-dom';
import { Home, MessageSquare, UserRound, LogOut, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardLayout = () => {
  const { logout, userId } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Check if user has filled personal info
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUser = users.find((u: any) => u.id.toString() === userId);
  const hasFilledPersonalInfo = currentUser?.hasFilledPersonalInfo;

  // Only redirect to personal-info if the user hasn't filled it and is trying to access profile
  const shouldRedirectToPersonalInfo = !hasFilledPersonalInfo && 
    location.pathname === '/user/profile';

  if (shouldRedirectToPersonalInfo) {
    return <Navigate to="/user/personal-info" />;
  }

  const isActive = (path: string) => {
    return location.pathname === `/user/${path}`;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
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
          <div className="flex items-center space-x-2">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-[73px] left-0 h-[calc(100vh-73px)] w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-100 dark:border-gray-700 transition-all duration-200 z-40 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <nav className="mt-6 space-y-2 px-3">
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

      {/* Main Content */}
      <main className={`min-h-screen transition-all duration-200 ${
        isSidebarOpen ? 'md:ml-64' : ''
      } pt-[73px] p-4 md:p-8`}>
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