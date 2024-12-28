import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Users, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'create' | 'view' | 'delete'>('create');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: usersCount, refetch: refetchUsersCount } = useQuery({
    queryKey: ['usersCount'],
    queryFn: () => {
      const localStorageUsers = JSON.parse(localStorage.getItem('users') || '[]');
      return localStorageUsers.length;
    },
    refetchInterval: 5000,
  });

  const { data: reportsCount } = useQuery({
    queryKey: ['reportsCount'],
    queryFn: () => {
      const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
      return reports.length;
    },
    refetchInterval: 5000,
  });

  const handleTabClick = (tab: 'create' | 'view' | 'delete') => {
    setActiveTab(tab);
    if (tab === 'create') {
      setIsCreateDialogOpen(true);
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser = {
      id: Date.now(),
      email,
      password,
      status: "Pending",
      personalInfo: {},
      files: []
    };

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

    toast.success("Candidate created successfully");
    refetchUsersCount();
    setEmail("");
    setPassword("");
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Admin Dashboard</h1>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <Button
          variant={activeTab === 'create' ? 'default' : 'ghost'}
          className={`rounded-none border-b-2 ${
            activeTab === 'create' ? 'border-primary' : 'border-transparent'
          }`}
          onClick={() => handleTabClick('create')}
        >
          Create Candidate
        </Button>
        <Button
          variant={activeTab === 'view' ? 'default' : 'ghost'}
          className={`rounded-none border-b-2 ${
            activeTab === 'view' ? 'border-primary' : 'border-transparent'
          }`}
          onClick={() => handleTabClick('view')}
        >
          View Candidates
        </Button>
        <Button
          variant={activeTab === 'delete' ? 'default' : 'ghost'}
          className={`rounded-none border-b-2 ${
            activeTab === 'delete' ? 'border-primary' : 'border-transparent'
          }`}
          onClick={() => handleTabClick('delete')}
        >
          Delete Candidate
        </Button>
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
            <p className="text-3xl font-bold text-primary">{usersCount || 0}</p>
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

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Candidate</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create Candidate
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;