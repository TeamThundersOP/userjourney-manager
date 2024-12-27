import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileText, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";

interface UserFile {
  id: number;
  userId: string | null;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
  category: string;
}

interface UserFilesProps {
  user: User;
}

const UserFiles = ({ user }: UserFilesProps) => {
  const queryClient = useQueryClient();

  // Get files from localStorage with proper type checking
  const getUserFiles = (): UserFile[] => {
    try {
      const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
      // Convert both IDs to strings for comparison
      return allFiles.filter((file) => String(file.userId) === String(user.id));
    } catch (error) {
      console.error('Error parsing user files:', error);
      return [];
    }
  };

  const files = getUserFiles();

  const handleDownload = async (file: UserFile) => {
    try {
      // Get the file data from localStorage
      const fileData = localStorage.getItem(`file_${file.id}`);
      
      if (!fileData) {
        toast.error("File data not found");
        return;
      }

      // Create a blob from the base64 data
      const base64Response = await fetch(fileData);
      const blob = await base64Response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      
      // Append to body, click and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      window.URL.revokeObjectURL(url);
      
      toast.success(`Downloading ${file.name}`);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error("Error downloading file");
    }
  };

  const handleDelete = (file: UserFile) => {
    try {
      // Remove file data
      localStorage.removeItem(`file_${file.id}`);
      
      // Remove file metadata from userFiles array
      const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
      const updatedFiles = allFiles.filter((f) => f.id !== file.id);
      localStorage.setItem('userFiles', JSON.stringify(updatedFiles));
      
      // Invalidate and refetch queries to update UI
      queryClient.invalidateQueries({ queryKey: ['userFiles'] });
      
      toast.success(`${file.name} deleted successfully`);
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error("Error deleting file");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Files</CardTitle>
      </CardHeader>
      <CardContent>
        {(!files || files.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mb-2" />
            <p>No files uploaded yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
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
                  <TableCell>{new Date(file.uploadedAt).toLocaleDateString()}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(file)}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(file)}
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
        )}
      </CardContent>
    </Card>
  );
};

export default UserFiles;