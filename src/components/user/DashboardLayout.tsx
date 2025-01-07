import { Sidebar } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { Navigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated, isLoading } = useUserAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/user/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <main className="relative h-[calc(100vh-2rem)] overflow-auto rounded-[0.5rem] bg-background p-4 md:p-6 lg:p-8">
          {children}
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;