import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const navigate = useNavigate();

  // Fetch users count from localStorage
  const { data: usersCount } = useQuery({
    queryKey: ['usersCount'],
    queryFn: () => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      return users.length;
    },
  });

  // For demo purposes, we'll use a mock reports count
  const { data: reportsCount } = useQuery({
    queryKey: ['reportsCount'],
    queryFn: () => {
      return 5; // Mock value for demonstration
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-700">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-900">{usersCount || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-900">{reportsCount || 0}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
              onClick={() => navigate('/admin/users')}>
          <CardHeader>
            <CardTitle>Manage Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Create, edit, and manage user accounts</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/admin/reports')}>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">View and respond to user reports</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;