import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

const UsersList = () => {
  // TODO: Implement actual user data fetching
  const mockUsers = [
    { id: 1, email: "user1@example.com", status: "Active" },
    { id: 2, email: "user2@example.com", status: "Pending" },
  ];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;