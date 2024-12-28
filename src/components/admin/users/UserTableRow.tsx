import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2, Eye } from "lucide-react";

interface UserTableRowProps {
  user: {
    id: number;
    email: string;
    personalInfo?: {
      fullName?: string;
    };
  };
  onView: (id: number) => void;
  onDelete: (id: number) => void;
}

const UserTableRow = ({ user, onView, onDelete }: UserTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">#{user.id}</TableCell>
      <TableCell>{user.personalInfo?.fullName || "N/A"}</TableCell>
      <TableCell>{user.email}</TableCell>
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