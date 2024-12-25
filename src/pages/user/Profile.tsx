import { useEffect, useState } from "react";
import { User } from "@/types/user";
import UserPersonalInfo from "@/components/admin/UserPersonalInfo";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find((u: User) => u.id.toString() === userId);
    setUser(currentUser);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <UserPersonalInfo user={user} />
    </div>
  );
};

export default Profile;