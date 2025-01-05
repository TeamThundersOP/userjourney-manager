import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import CreateUserDialog from "@/components/admin/CreateUserDialog";
import UsersList from "@/components/admin/UsersList";
import { clearAllData } from "@/utils/clearData";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      clearAllData();
      toast.success('All data has been cleared');
      navigate('/admin/login');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-araboto-bold text-primary">Manage Users</h1>
        <div className="flex gap-2">
          <Button 
            variant="destructive" 
            onClick={handleClearData}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All Data
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create User
          </Button>
        </div>
      </div>

      <UsersList />
      
      <CreateUserDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default Users;