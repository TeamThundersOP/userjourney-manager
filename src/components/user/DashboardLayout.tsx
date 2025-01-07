import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from './DashboardSidebar';
import { cn } from '@/lib/utils';

const MainContent = () => {
  const { state } = useSidebar();
  const isOpen = state === "expanded";

  return (
    <main className={cn(
      "flex-1 transition-[margin] duration-300",
      isOpen ? "ml-64" : "ml-[70px]"
    )}>
      <div className="flex h-14 items-center border-b px-4 lg:px-8">
        <SidebarTrigger />
      </div>
      <div className="p-4 lg:p-8">
        <Outlet />
      </div>
    </main>
  );
};

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <div className="fixed top-0 left-0 h-screen">
          <DashboardSidebar />
        </div>
        <MainContent />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;