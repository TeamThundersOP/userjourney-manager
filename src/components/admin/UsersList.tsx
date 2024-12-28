import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { UserFile } from "@/types/userFile";
import SearchBar from "./users/SearchBar";
import UserTableRow from "./users/UserTableRow";
import { useIsMobile } from "@/hooks/use-mobile";
import { Eye, Trash2 } from "lucide-react";

interface User {
  id: number;
  email: string;
  personalInfo?: {
    fullName?: string;
  };
}

// Mock data
const mockUsers = [
  { 
    id: 1, 
    email: "john.doe@example.com",
    personalInfo: { fullName: "John Doe" }
  },
  { 
    id: 2, 
    email: "jane.smith@example.com",
    personalInfo: { fullName: "Jane Smith" }
  },
  { 
    id: 3, 
    email: "mike.wilson@example.com",
    personalInfo: { fullName: "Mike Wilson" }
  },
];

// Initialize localStorage with mock users if it hasn't been done
const initializeUsers = () => {
  const existingUsers = localStorage.getItem('users');
  if (!existingUsers) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }
};

const fetchUsers = async (): Promise<User[]> => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users;
};

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

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
    // Delete user from users list
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = existingUsers.filter((user: User) => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Delete user files
    const existingFiles = JSON.parse(localStorage.getItem('userFiles') || '[]');
    const updatedFiles = existingFiles.filter((file: UserFile) => String(file.userId) !== String(userId));
    
    // Delete file data from localStorage
    existingFiles.forEach((file: UserFile) => {
      if (String(file.userId) === String(userId)) {
        localStorage.removeItem(`file_${file.id}`);
      }
    });
    
    localStorage.setItem('userFiles', JSON.stringify(updatedFiles));
    
    // Delete user reports
    const existingReports = JSON.parse(localStorage.getItem('reports') || '[]');
    const updatedReports = existingReports.filter((report: any) => 
      String(report.userId) !== String(userId)
    );
    localStorage.setItem('reports', JSON.stringify(updatedReports));
    
    // Update React Query cache
    queryClient.setQueryData(['users'], updatedUsers);
    queryClient.setQueryData(['userFiles'], updatedFiles);
    queryClient.setQueryData(['reports'], updatedReports);
    
    toast({
      title: "Success",
      description: "User and all related data deleted successfully",
    });
  };

  return (
    <div className="space-y-4">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      {isMobile ? (
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-4 rounded-lg border bg-card shadow-sm space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">#{user.id}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleView(user.id)}
                    className="p-2 hover:bg-muted rounded-full"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 hover:bg-muted rounded-full text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Name</div>
                <div>{user.personalInfo?.fullName || "N/A"}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div>{user.email}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  onView={handleView}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UsersList;
