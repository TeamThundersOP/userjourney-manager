import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '@/contexts/UserAuthContext';
import PersonalInfoForm from '@/components/user/personal-info/PersonalInfoForm';
import { useToast } from "@/components/ui/use-toast";
import PersonalInfoHeader from '@/components/user/PersonalInfoHeader';

const PersonalInfo = () => {
  const { userId } = useUserAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) {
      toast({
        title: "Error",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      navigate('/user/login');
    }
  }, [userId, navigate, toast]);

  // Render content only if userId exists
  if (!userId) {
    return null; // Early return after all hooks are called
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <PersonalInfoHeader />
        <PersonalInfoForm />
      </div>
    </div>
  );
};

export default PersonalInfo;