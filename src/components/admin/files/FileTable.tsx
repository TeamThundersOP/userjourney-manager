import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserFile } from "@/types/userFile";

interface FileTableProps {
  files: UserFile[];
  onDownload: (file: UserFile) => void;
  onDelete: (file: UserFile) => void;
}

const FileTable = ({ files, onDownload, onDelete }: FileTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Upload Date</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow key={file.id}>
            <TableCell className="font-medium">{file.name}</TableCell>
            <TableCell>{file.type}</TableCell>
            <TableCell>{file.category}</TableCell>
            <TableCell>{new Date(file.uploadedAt).toLocaleDateString()}</TableCell>
            <TableCell>{file.size}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDownload(file)}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(file)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FileTable;