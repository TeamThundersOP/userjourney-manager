import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UserFile {
  id: number;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
}

// Mock data - in a real app, this would come from your backend
const mockFiles: UserFile[] = [
  {
    id: 1,
    name: "passport.pdf",
    type: "PDF",
    uploadedAt: "2024-02-20",
    size: "2.3 MB"
  },
  {
    id: 2,
    name: "visa.jpg",
    type: "Image",
    uploadedAt: "2024-02-19",
    size: "1.1 MB"
  }
];

const UserFiles = () => {
  const handleDownload = (file: UserFile) => {
    // In a real application, this would trigger a download from your backend
    // For now, we'll just show a toast notification
    toast.success(`Downloading ${file.name}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Uploaded Files</CardTitle>
      </CardHeader>
      <CardContent>
        {mockFiles.length === 0 ? (
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
              {mockFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">{file.name}</TableCell>
                  <TableCell>{file.type}</TableCell>
                  <TableCell>{file.uploadedAt}</TableCell>
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