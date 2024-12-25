import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">Welcome to Admin Portal</h1>
        <p className="text-xl text-gray-600">Manage your users and documents efficiently</p>
        <Button onClick={() => navigate('/admin/login')} size="lg">
          Go to Admin Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Index;