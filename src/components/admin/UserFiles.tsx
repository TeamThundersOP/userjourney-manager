import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { useState, useEffect } from "react";
import { UserFile } from "@/types/userFile";
import FileTable from "./files/FileTable";
import EmptyFiles from "./files/EmptyFiles";
import { downloadFile, deleteFile, getUserFiles } from "@/utils/fileStorage";

interface UserFilesProps {
  user: User;
}

const UserFiles = ({ user }: UserFilesProps) => {
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<UserFile[]>([]);

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const userFiles = await getUserFiles(user.id);
        setFiles(userFiles);
        updateOnboardingStatus(userFiles);
      } catch (error) {
        console.error('Error fetching user files:', error);
        toast.error('Failed to fetch user files');
      }
    };

    fetchUserFiles();
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
      const blob = await downloadFile(file.id);
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

  const handleDelete = async (file: UserFile) => {
    try {
      await deleteFile(file.id);
      const userFiles = await getUserFiles(user.id);
      setFiles(userFiles);
      updateOnboardingStatus(userFiles);
      
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