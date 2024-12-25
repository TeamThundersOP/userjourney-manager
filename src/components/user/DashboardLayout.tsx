import { Button } from "@/components/ui/button";
import { useNavigate, Outlet } from 'react-router-dom';
import { Home, FileText, User, LogOut } from 'lucide-react';

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userAuth');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary">User Dashboard</h1>
        </div>
        <nav className="mt-6">
          <Button
            variant="ghost"
            className="w-full justify-start px-6 py-3 text-left"
            onClick={() => navigate('/dashboard')}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-6 py-3 text-left"
            onClick={() => navigate('/dashboard/report')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Report
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-6 py-3 text-left"
            onClick={() => navigate('/dashboard/profile')}
          >
            <User className="mr-2 h-4 w-4" />
            My Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-6 py-3 text-left text-red-600 hover:text-red-700"
            onClick={handleLogout}
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