import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '@/contexts/UserAuthContext';
import PersonalInfoForm from '@/components/user/personal-info/PersonalInfoForm';
import { useToast } from "@/components/ui/use-toast";
import PersonalInfoHeader from '@/components/user/PersonalInfoHeader';
import { supabase } from "@/integrations/supabase/client";
import { LoadingState } from "@/components/user/dashboard/LoadingState";
import { useQuery } from '@tanstack/react-query';

const PersonalInfo = () => {
  const { userId } = useUserAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch user data",
          variant: "destructive",
        });
        return null;
      }

      return data;
    },
    enabled: !!userId,
  });

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

  if (!userId) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 px-4 bg-gray-50/50">
        <div className="max-w-4xl mx-auto">
          <LoadingState />
        </div>
      </div>
    );
  }

  if (!userData) {
    toast({
      title: "Error",
      description: "User data not found",
      variant: "destructive",
    });
    navigate('/user/login');
    return null;
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