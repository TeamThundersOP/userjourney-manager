import React from 'react';
import { User } from '@/types/user';
import UserPersonalInfo from '@/components/admin/UserPersonalInfo';
import ProgressStatus from '@/components/admin/user/ProgressStatus';
import UserFiles from '@/components/admin/UserFiles';

interface UserContentProps {
  activeTab: string;
  user: User;
}

const UserContent = ({ activeTab, user }: UserContentProps) => {
  switch (activeTab) {
    case "personal":
      return <UserPersonalInfo user={user} />;
    case "onboarding":
      return <ProgressStatus user={user} />;
    case "files":
      return <UserFiles user={user} />;
    case "reports":
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Reports</h2>
          <p>Reports functionality coming soon...</p>
        </div>
      );
    default:
      return null;
  }
};

export default UserContent;