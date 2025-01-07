import { useUserData } from "@/hooks/useUserData";
import { useUserAuth } from "@/contexts/UserAuthContext";

export const useUser = () => {
  const { userId } = useUserAuth();
  const { user, isLoading } = useUserData(userId);

  return { user, isLoading };
};