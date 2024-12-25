import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateUserDialog from "@/components/admin/CreateUserDialog";
import UsersList from "@/components/admin/UsersList";

const Users = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Clear any existing users data when component mounts
  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create User
        </Button>
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