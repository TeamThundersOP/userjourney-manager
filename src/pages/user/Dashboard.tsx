import { useUserAuth } from '@/contexts/UserAuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserDashboard = () => {
  const { logout } = useUserAuth();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Card>
        <CardHeader>
          <CardTitle>User Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Welcome to your dashboard!</p>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;