import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { User } from "@/types/user";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Trash2 } from "lucide-react";
import UserTableRow from "./UserTableRow";

interface UserListViewProps {
  users: User[];
  onDelete: (userId: string) => void;
}

const UserListView = ({ users, onDelete }: UserListViewProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleView = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        {users.map((user) => (
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
                  onClick={() => onDelete(user.id)}
                  className="p-2 hover:bg-muted rounded-full text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Name</div>
              <div>{user.name || "N/A"}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Username</div>
              <div>{user.username}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">User ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onView={handleView}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserListView;