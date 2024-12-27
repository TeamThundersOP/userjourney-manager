import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">Welcome to Funelli</h1>
        <p className="text-xl text-gray-600">Please log in to continue</p>
        <Button onClick={() => navigate('/user/login')} size="lg">
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default Index;