import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
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

        <Card className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/admin/documents')}>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Manage user documents and uploads</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;