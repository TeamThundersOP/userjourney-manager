import { Outlet } from 'react-router-dom';
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from './DashboardSidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';

const MainContent = () => {
  const { state, toggleSidebar } = useSidebar();
  const isOpen = state === "expanded";
  const isMobile = useIsMobile();

  return (
    <main className={cn(
      "flex-1 transition-all duration-300 min-h-screen bg-background",
      isOpen && !isMobile ? "lg:ml-64" : "lg:ml-[70px]",
      isMobile && "ml-0"
    )}>
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-4">
          <span className="font-semibold">Dashboard</span>
        </div>
      </div>
      <div className="p-4 md:p-6 lg:p-8">
        <Outlet />
      </div>
    </main>
  );
};

const DashboardLayout = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultState={isMobile ? "collapsed" : "expanded"}>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <MainContent />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;