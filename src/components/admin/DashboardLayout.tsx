import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

const DashboardLayout = () => {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-20 pb-8">
          <Outlet />
        </main>
      </div>
    </AdminAuthProvider>
  );
};

export default DashboardLayout;