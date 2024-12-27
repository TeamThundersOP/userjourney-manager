import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { useState, useEffect } from "react";
import { UserFile } from "@/types/userFile";
import FileTable from "./files/FileTable";
import EmptyFiles from "./files/EmptyFiles";

interface UserFilesProps {
  user: User;
}

const UserFiles = ({ user }: UserFilesProps) => {
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<UserFile[]>([]);

  const getUserFiles = (): UserFile[] => {
    try {
      const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
      return allFiles.filter((file) => String(file.userId) === String(user.id));
    } catch (error) {
      console.error('Error parsing user files:', error);
      return [];
    }
  };

  useEffect(() => {
    setFiles(getUserFiles());
  }, [user.id]);

  const handleDownload = async (file: UserFile) => {
    try {
      const fileData = localStorage.getItem(`file_${file.id}`);
      
      if (!fileData) {
        toast.error("File data not found");
        return;
      }

      const base64Response = await fetch(fileData);
      const blob = await base64Response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success(`Downloading ${file.name}`);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error("Error downloading file");
    }
  };

  const updateUserOnboardingStatus = (file: UserFile) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => {
      if (String(u.id) === String(user.id)) {
        const updatedUser = { ...u };
        if (!updatedUser.onboarding) return updatedUser;

        switch (file.category.toLowerCase()) {
          case 'passport':
            updatedUser.onboarding.phase0.passportUploaded = false;
            break;
          case 'pcc':
            updatedUser.onboarding.phase0.pccUploaded = false;
            break;
          case 'visa':
            updatedUser.onboarding.phase0.visaCopyUploaded = false;
            break;
          case 'travel documents':
            updatedUser.onboarding.phase0.travelDocumentsUploaded = false;
            break;
          case 'other documents':
            updatedUser.onboarding.phase0.otherDocumentsUploaded = false;
            break;
        }
        return updatedUser;
      }
      return u;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  const handleDelete = (file: UserFile) => {
    try {
      localStorage.removeItem(`file_${file.id}`);
      const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
      const updatedFiles = allFiles.filter((f) => f.id !== file.id);
      localStorage.setItem('userFiles', JSON.stringify(updatedFiles));
      setFiles(getUserFiles());
      updateUserOnboardingStatus(file);
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
          <EmptyFiles />
        ) : (
          <FileTable 
            files={files}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default UserFiles;