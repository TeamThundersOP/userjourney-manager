import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserTableRow from "./users/UserTableRow";
import SearchBar from "./users/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";

const UsersList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: users = [], isLoading } = useQuery({
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
        <div className="bg-muted/50 p-4 grid grid-cols-4 gap-4 font-medium">
          <div>Email</div>
          <div>Status</div>
          <div>Created At</div>
          <div className="text-right">Actions</div>
        </div>
        {filteredUsers.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No users found
          </div>
        ) : (
          filteredUsers.map((user: any) => (
            <UserTableRow key={user.id} user={user} />
          ))
        )}
      </div>
    </div>
  );
};

export default UsersList;