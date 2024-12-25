import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UserPersonalInfo from '@/components/admin/UserPersonalInfo';
import UserOnboarding from '@/components/admin/UserOnboarding';
import UserFiles from '@/components/admin/UserFiles';
import { User } from '@/types/user';

const fetchUser = async (userId: string): Promise<User> => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: User) => u.id === parseInt(userId));
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
};

const ViewUser = () => {
  const { userId } = useParams();
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId || ''),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading user details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">
          Error loading user details. Please try again later.
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">User not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Profile</h1>
      <UserPersonalInfo user={user} />
      <UserOnboarding user={user} />
      <UserFiles />
    </div>
  );
};

export default ViewUser;