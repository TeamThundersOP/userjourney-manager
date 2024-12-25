import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileText, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "@/types/user";

interface UserFile {
  id: number;
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
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Create new file object
      const newFile: UserFile = {
        id: Date.now(),
        name: `${category}_${file.name}`,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        category
      };

      // Update user's files array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: User) => {
        if (u.id === user.id) {
          // Update onboarding status based on file category
          const updatedUser = { ...u };
          if (!updatedUser.files) updatedUser.files = [];
          updatedUser.files.push(newFile);

          if (updatedUser.onboarding) {
            switch (category) {
              case 'cv':
                updatedUser.onboarding.phase0.cvSubmitted = true;
                break;
              case 'passport':
                updatedUser.onboarding.phase0.documentsUploaded = true;
                break;
              case 'pcc':
                updatedUser.onboarding.phase0.documentsUploaded = true;
                break;
              case 'offerLetter':
                updatedUser.onboarding.phase0.offerLetterSent = true;
                break;
            }
          }

          return updatedUser;
        }
        return u;
      });

      localStorage.setItem('users', JSON.stringify(updatedUsers));
      queryClient.invalidateQueries({ queryKey: ['user', user.id.toString()] });

      toast.success(`${category} uploaded successfully`);
    } catch (error) {
      toast.error('Error uploading file');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = (file: UserFile) => {
    toast.success(`Downloading ${file.name}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Uploaded Files</CardTitle>
        <div className="flex gap-2">
          {user.onboarding?.currentPhase === 0 && (
            <>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'cv')}
                  accept=".pdf,.doc,.docx"
                />
                <Upload className="h-4 w-4" />
                Upload CV
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'passport')}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <Upload className="h-4 w-4" />
                Upload Passport
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'pcc')}
                  accept=".pdf"
                />
                <Upload className="h-4 w-4" />
                Upload PCC
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {(!user.files || user.files.length === 0) ? (
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
              {user.files.map((file) => (
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