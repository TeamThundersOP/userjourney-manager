import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface User {
  id: number;
  email: string;
  status: string;
  personalInfo?: {
    fullName?: string;
  };
}

const fetchUsers = async (): Promise<User[]> => {
  // For demo purposes, we'll return mock data
  // In a real app, this would be an API call
  return [
    { 
      id: 1, 
      email: "user1@example.com", 
      status: "Active",
      personalInfo: { fullName: "John Doe" }
    },
    { 
      id: 2, 
      email: "user2@example.com", 
      status: "Pending",
      personalInfo: { fullName: "Jane Smith" }
    },
    // Add any newly created users from localStorage
    ...(JSON.parse(localStorage.getItem('users') || '[]'))
  ];
};

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.id.toString().includes(searchTerm) ||
      user.personalInfo?.fullName?.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
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

  const handleView = (userId: number) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleDelete = (userId: number) => {
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // Filter out the deleted user
    const updatedUsers = existingUsers.filter((user: User) => user.id !== userId);
    // Update localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    toast({
      title: "Success",
      description: "User deleted successfully",
    });
    
    // Refetch users
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by ID or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">#{user.id}</TableCell>
                <TableCell>{user.personalInfo?.fullName || "N/A"}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleView(user.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersList;