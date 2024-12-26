import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";

interface UserFile {
  id: number;
  userId: number;
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

  // Get files from localStorage with proper type checking and initialization
  const getUserFiles = () => {
    try {
      const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]');
      console.log('All files from storage:', allFiles); // Debug log
      
      // Ensure each file has the required properties
      const filesWithUserId = allFiles.map((file: any) => ({
        id: file.id,
        userId: file.userId || user.id,
        name: file.name,
        type: file.type,
        uploadedAt: file.uploadedAt || new Date().toISOString(),
        size: file.size,
        category: file.category || 'general'
      }));
      
      console.log('Files with userId:', filesWithUserId); // Debug log
      
      // Filter files for the current user
      const userFiles = filesWithUserId.filter((file: UserFile) => 
        String(file.userId) === String(user.id)
      );
      
      console.log('Filtered user files:', userFiles); // Debug log
      return userFiles;
    } catch (error) {
      console.error('Error getting user files:', error);
      return [];
    }
  };

  const files = getUserFiles();

  const handleDownload = (file: UserFile) => {
    toast.success(`Downloading ${file.name}`);
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
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file: UserFile) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">{file.name}</TableCell>
                  <TableCell>{file.type}</TableCell>
                  <TableCell>{new Date(file.uploadedAt).toLocaleDateString()}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(file)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
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