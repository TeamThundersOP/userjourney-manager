import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Trash2, UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/user";
import { Input } from "@/components/ui/input";

const Users = () => {
  const [searchByID, setSearchByID] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <UserIcon className="h-6 w-6" />
        <h1 className="text-2xl font-semibold">View Candidates</h1>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder={searchByID ? "Search by ID..." : "Search by name..."}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="searchById"
            checked={searchByID}
            onCheckedChange={(checked) => setSearchByID(checked as boolean)}
          />
          <label
            htmlFor="searchById"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Search by ID
          </label>
        </div>

        <div className="bg-white rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>CV Status</TableHead>
                <TableHead>Interview Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Yes</TableCell>
                <TableCell>Accepted</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/admin/users/1')}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Users;