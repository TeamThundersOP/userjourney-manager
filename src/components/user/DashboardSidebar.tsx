import { Home, MessageSquare, UserRound, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "@/contexts/UserAuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function DashboardSidebar() {
  const navigate = useNavigate();
  const { logout } = useUserAuth();

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      onClick: () => navigate("/user/dashboard"),
    },
    {
      title: "Reports",
      icon: MessageSquare,
      onClick: () => navigate("/user/reports"),
    },
    {
      title: "Profile",
      icon: UserRound,
      onClick: () => navigate("/user/profile"),
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <img
            src="/lovable-uploads/17a49967-e711-4d5a-b8fe-fb02e4469a2a.png"
            alt="Funelli Logo"
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold font-araboto-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Funelli
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={item.onClick}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={logout}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}