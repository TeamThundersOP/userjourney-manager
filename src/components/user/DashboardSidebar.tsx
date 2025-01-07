import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  LogOut
} from "lucide-react";
import { toast } from "sonner";

export function DashboardSidebar() {
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isOpen = state === "expanded";

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
      navigate("/user/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  return (
    <div
      className={cn(
        "h-screen border-r bg-background/80 backdrop-blur-sm transition-all duration-300",
        isOpen ? "w-64" : "w-[70px]"
      )}
    >
      {/* Header */}
      <div className={cn("flex h-14 items-center justify-between border-b px-3")}>
        <div className={cn("flex items-center gap-2", !isOpen && "justify-center w-full")}>
          <img
            src="/lovable-uploads/17a49967-e711-4d5a-b8fe-fb02e4469a2a.png"
            alt="Logo"
            className="h-8 w-8"
          />
          {isOpen && <span className="font-semibold">Dashboard</span>}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="space-y-2 p-2">
          <NavLink
            to="/user/dashboard"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                !isOpen && "justify-center"
              )
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            {isOpen && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/user/reports"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                !isOpen && "justify-center"
              )
            }
          >
            <FileText className="h-4 w-4" />
            {isOpen && <span>Reports</span>}
          </NavLink>

          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                !isOpen && "justify-center"
              )
            }
          >
            <User className="h-4 w-4" />
            {isOpen && <span>Profile</span>}
          </NavLink>
        </div>

        {/* Footer with Logout */}
        <div className="absolute bottom-4 left-0 right-0 px-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-sm hover:bg-destructive hover:text-destructive-foreground",
              !isOpen && "justify-center"
            )}
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            {isOpen && <span>Logout</span>}
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}