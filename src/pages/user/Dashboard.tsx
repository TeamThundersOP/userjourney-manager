import { useEffect, useState } from "react";
import { User } from "@/types/user";
import Phase1Onboarding from "@/components/user/Phase1Onboarding";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find((u: User) => u.email === userEmail);
    setUser(currentUser);
  }, [userEmail]);

  if (!user) {
    return (
      <div className="text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome Back!</h1>
      <Phase1Onboarding user={user} />
    </div>
  );
};

export default Dashboard;