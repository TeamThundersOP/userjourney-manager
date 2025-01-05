import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2, Eye } from "lucide-react";
import { User } from "@/types/user";

interface UserTableRowProps {
  user: User;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

const UserTableRow = ({ user, onView, onDelete }: UserTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">#{user.id}</TableCell>
      <TableCell>{user.name || "N/A"}</TableCell>
      <TableCell className="max-w-[200px] truncate">{user.username}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onView(user.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(user.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;