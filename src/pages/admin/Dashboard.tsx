import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Users, FileText, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email === 'vanapallisaisriram7@gmail.com') {
        setIsAdmin(true);
      } else {
        toast.error("Unauthorized access");
        navigate('/admin/login');
      }
    };

    checkAdminStatus();
  }, [navigate]);

  const { data: usersCount = 0 } = useQuery({
    queryKey: ['usersCount'],
    queryFn: async () => {
      if (!isAdmin) return 0;
      
      const { count, error } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true })
        .neq('username', 'vanapallisaisriram7@gmail.com')
        .neq('username', 'admin');

      if (error) {
        console.error('Error fetching users count:', error);
        throw error;
      }
      return count || 0;
    },
    enabled: isAdmin,
  });

  const { data: reportsCount } = useQuery({
    queryKey: ['reportsCount'],
    queryFn: () => {
      const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
      return reports.length;
    },
    enabled: isAdmin,
  });

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-gray-500">Here's an overview of your admin dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-gray-100" 
          onClick={() => navigate('/admin/users')}
        >
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
            <CardTitle className="text-xl mt-4">Manage Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-2">Total registered users in the system</p>
            <p className="text-3xl font-bold text-primary">{usersCount}</p>
          </CardContent>
        </Card>

        <Card 
          className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-gray-100" 
          onClick={() => navigate('/admin/reports')}
        >
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
            <CardTitle className="text-xl mt-4">Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-2">Active reports requiring attention</p>
            <p className="text-3xl font-bold text-primary">{reportsCount || 0}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;