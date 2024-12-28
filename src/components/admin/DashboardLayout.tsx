import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from "@/components/ui/button";
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { User } from 'lucide-react';

const DashboardLayout = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/admin/dashboard" className="text-2xl font-bold text-red-500">
              Admin Dashboard
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">Welcome, admin</span>
              <Button 
                variant="ghost" 
                onClick={logout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex space-x-4 bg-white rounded-lg p-2 shadow-sm">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900"
            onClick={() => navigate('/admin/users/create')}
          >
            Create Candidate
          </Button>
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900"
            onClick={() => navigate('/admin/users')}
          >
            View Candidates
          </Button>
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900"
          >
            Delete Candidate
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;