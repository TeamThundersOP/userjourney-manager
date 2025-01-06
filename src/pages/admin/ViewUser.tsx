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

const ViewUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError("No user ID provided");
        setLoading(false);
        return;
      }

      try {
        const { data: candidate, error: fetchError } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (!candidate) {
          setError("User not found");
          setLoading(false);
          return;
        }

        const transformedUser = transformUserData(candidate as Tables<'candidates'>);
        setUser(transformedUser);
      } catch (error: any) {
        console.error('Error fetching user:', error);
        toast.error("Failed to load user data");
        setError(error.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

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
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          <p className="font-medium">User Not Found</p>
          <p>The requested user could not be found.</p>
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