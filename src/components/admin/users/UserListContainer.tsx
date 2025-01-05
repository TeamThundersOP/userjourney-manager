import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SearchBar from "./SearchBar";
import UserListView from "./UserListView";
import { User } from "@/types/user";

const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .neq('username', 'admin'); // Filter out admin user
    
  if (error) throw error;
  
  // Transform the data to match the User interface
  return (data || []).map(candidate => ({
    ...candidate,
    email: '', // Since email doesn't exist in candidates table, set empty string
    status: 'Pending', // Set a default status
    personalInfo: undefined,
    onboarding: undefined
  })) as User[];
};

const UserListContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.id.toString().includes(searchTerm) ||
      user.name?.toLowerCase().includes(searchLower) ||
      user.username.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">Error loading users</div>
      </div>
    );
  }

  const handleDelete = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('candidates')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <UserListView users={filteredUsers} onDelete={handleDelete} />
    </div>
  );
};

export default UserListContainer;