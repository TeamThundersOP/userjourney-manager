import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from './DashboardSidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from "@/hooks/use-mobile";

const MainContent = () => {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  const isOpen = state === "expanded";

  return (
    <main className={cn(
      "flex-1 transition-[margin] duration-300",
      !isMobile && isOpen ? "ml-16" : "ml-0" // Reduced from ml-64 to ml-16
    )}>
      <div className="flex h-14 items-center border-b px-4 lg:px-6">
        <SidebarTrigger />
      </div>
      <div className="container mx-auto p-4 lg:p-6">
        <Outlet />
      </div>
    </main>
  );
};

const DashboardLayout = () => {
  return (
    <SidebarProvider defaultOpen={!useIsMobile()}>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <MainContent />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;