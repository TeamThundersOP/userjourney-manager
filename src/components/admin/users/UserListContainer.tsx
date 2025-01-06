import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SearchBar from "./SearchBar";
import UserListView from "./UserListView";
import { User } from "@/types/user";

const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .neq('username', 'vanapallisaisriram7@gmail.com')
    .neq('username', 'admin');
    
  if (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
  
  return (data || []).map(candidate => ({
    ...candidate,
    email: candidate.email || '',
    status: candidate.interview_status || 'Pending',
    personalInfo: undefined,
    onboarding: undefined
  })) as User[];
};

const UserListContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: users = [], isLoading, error, refetch } = useQuery({
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

  const handleDelete = async (userId: string) => {
    try {
      // First delete the user from the candidates table
      const { error: candidateError } = await supabase
        .from('candidates')
        .delete()
        .eq('id', userId);

      if (candidateError) throw candidateError;

      // Delete the user from auth.users using an edge function
      const { error: authError } = await supabase.functions.invoke('delete-auth-user', {
        body: { userId }
      });

      if (authError) throw authError;

      toast({
        title: "Success",
        description: "User and all associated data deleted successfully",
      });
      
      // Refetch the users list after successful deletion
      refetch();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    }
  };

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

  return (
    <div className="space-y-4">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <UserListView users={filteredUsers} onDelete={handleDelete} />
    </div>
  );
};

export default UserListContainer;