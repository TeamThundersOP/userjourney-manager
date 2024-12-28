import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserTableRow from "./users/UserTableRow";
import SearchBar from "./users/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";

const UsersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // Get users from localStorage
      const storedUsers = localStorage.getItem('users');
      if (!storedUsers) {
        return [];
      }
      return JSON.parse(storedUsers);
    },
  });

  const handleViewUser = (id: number) => {
    navigate(`/admin/users/${id}`);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const storedUsers = localStorage.getItem('users');
      if (!storedUsers) return;

      const users = JSON.parse(storedUsers);
      const updatedUsers = users.filter((user: any) => user.id !== id);
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      await refetch();
      
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const filteredUsers = users.filter((user: any) =>
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <td colSpan={4} className="p-4 text-center text-muted-foreground">
                  No users found
                </td>
              </TableRow>
            ) : (
              filteredUsers.map((user: any) => (
                <UserTableRow 
                  key={user.id} 
                  user={user} 
                  onView={handleViewUser}
                  onDelete={handleDeleteUser}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersList;