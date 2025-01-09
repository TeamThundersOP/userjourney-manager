import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/user";
import { Tables } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import StatusTabs from '@/components/admin/user/StatusTabs';
import UserHeader from '@/components/admin/user/UserHeader';
import UserContent from '@/components/admin/user/UserContent';
import { transformUserData } from '@/utils/userTransform';

const ADMIN_EMAIL = 'vanapallisaisriram7@gmail.com';

const ViewUser = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAdmin(user?.email === ADMIN_EMAIL);
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError("User ID is required");
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching user data for:', userId);
        const { data: candidate, error: fetchError } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching user:', fetchError);
          throw fetchError;
        }

        if (!candidate) {
          throw new Error("User not found");
        }

        console.log('Fetched candidate data:', candidate);
        const transformedUser = transformUserData(candidate as Tables<'candidates'>);
        console.log('Transformed user data:', transformedUser);
        setUser(transformedUser);
        setError(null);
      } catch (error: any) {
        console.error('Error in fetchUser:', error);
        toast.error(error.message || "Failed to load user data");
        setError(error.message || "Failed to fetch user data");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      setLoading(true); // Reset loading state before fetching
      fetchUser();
    } else {
      setLoading(false); // If no userId, don't show loading state
    }
  }, [userId]);

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Access Denied: </strong>
          <span className="block sm:inline">You do not have permission to view this page.</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <Skeleton className="h-6 w-36" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Not Found: </strong>
          <span className="block sm:inline">The requested user could not be found.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <UserHeader userId={user.id} />
      <StatusTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="mt-6">
        <UserContent activeTab={activeTab} user={user} />
      </div>
    </div>
  );
};

export default ViewUser;