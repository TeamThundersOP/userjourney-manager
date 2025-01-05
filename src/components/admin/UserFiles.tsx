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
      console.log('All files:', allFiles);
      console.log('Current user ID:', user.id);
      
      return allFiles.filter((file) => {
        // Convert both IDs to strings for comparison
        const fileUserId = String(file.userId);
        const currentUserId = String(user.id);
        console.log('Comparing file userId:', fileUserId, 'with current userId:', currentUserId);
        return fileUserId === currentUserId;
      });
    } catch (error) {
      console.error('Error parsing user files:', error);
      return [];
    }
  };

  useEffect(() => {
    console.log('UserFiles component mounted/updated for user:', user.id);
    const userFiles = getUserFiles();
    console.log('Filtered user files:', userFiles);
    setFiles(userFiles);
    updateOnboardingStatus(userFiles);
  }, [user.id]);

  const updateOnboardingStatus = (userFiles: UserFile[]) => {
    if (!user.onboarding) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => {
      if (String(u.id) === String(user.id)) {
        const updatedUser = { ...u };
        if (!updatedUser.onboarding) return updatedUser;

        // Get existing onboarding status
        const existingOnboarding = JSON.parse(localStorage.getItem(`onboarding_${user.id}`) || 'null');
        if (existingOnboarding) {
          updatedUser.onboarding.phase0 = {
            ...updatedUser.onboarding.phase0,
            ...existingOnboarding
          };
          return updatedUser;
        }

        // Reset all file-related statuses first
        updatedUser.onboarding.phase0 = {
          ...updatedUser.onboarding.phase0,
          cvSubmitted: false,
          travelDocumentsUploaded: false,
          passportUploaded: false,
          pccUploaded: false,
          visaCopyUploaded: false,
          otherDocumentsUploaded: false,
          documentsUploaded: false
        };

        updatedUser.onboarding.phase2 = {
          ...updatedUser.onboarding.phase2,
          rightToWork: false
        };

        // Update onboarding status based on actual files present
        userFiles.forEach(file => {
          if (!file.category) return;
          
          const category = file.category.toLowerCase();
          switch (category) {
            case 'cv':
              updatedUser.onboarding.phase0.cvSubmitted = true;
              break;
            case 'right to work':
              updatedUser.onboarding.phase2.rightToWork = true;
              break;
            case 'travel documents':
              updatedUser.onboarding.phase0.travelDocumentsUploaded = true;
              break;
            case 'passport':
              updatedUser.onboarding.phase0.passportUploaded = true;
              break;
            case 'pcc':
              updatedUser.onboarding.phase0.pccUploaded = true;
              break;
            case 'visa':
              updatedUser.onboarding.phase0.visaCopyUploaded = true;
              break;
            case 'other documents':
              updatedUser.onboarding.phase0.otherDocumentsUploaded = true;
              break;
          }
        });

        // Update overall documents status
        updatedUser.onboarding.phase0.documentsUploaded = 
          updatedUser.onboarding.phase0.passportUploaded &&
          updatedUser.onboarding.phase0.pccUploaded &&
          updatedUser.onboarding.phase0.otherDocumentsUploaded;

        // Store the current onboarding status
        localStorage.setItem(`onboarding_${user.id}`, JSON.stringify(updatedUser.onboarding.phase0));

        return updatedUser;
      }
      return u;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  const handleDownload = async (file: UserFile) => {
    try {
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
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
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
      
      // Update files list
      const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
      const updatedFiles = allFiles.filter((f) => f.id !== file.id);
      localStorage.setItem('userFiles', JSON.stringify(updatedFiles));
      
      // Update local state and onboarding status
      const userFiles = getUserFiles();
      setFiles(userFiles);
      updateOnboardingStatus(userFiles);
      
      // Invalidate queries to refresh UI
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