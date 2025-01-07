import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from './DashboardSidebar';

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <div className="fixed top-0 left-0 h-screen">
          <DashboardSidebar />
        </div>
        <main className="flex-1 ml-[70px] lg:ml-64">
          <div className="flex h-14 items-center border-b px-4 lg:px-8">
            <SidebarTrigger />
          </div>
          <div className="p-4 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;