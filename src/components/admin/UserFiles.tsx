import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { useState, useEffect } from "react";
import { UserFile } from "@/types/userFile";
import FileTable from "./files/FileTable";
import EmptyFiles from "./files/EmptyFiles";
import { getUserFiles, handleFileDownload, handleFileDelete } from "@/utils/fileOperations";
import { updateOnboardingStatus, updateUserOnboardingStatusOnDelete } from "@/utils/onboardingStatusUpdates";

interface UserFilesProps {
  user: User;
}

const UserFiles = ({ user }: UserFilesProps) => {
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<UserFile[]>([]);

  useEffect(() => {
    const fetchFiles = () => {
      if (!user?.id) {
        console.log('No user ID provided');
        return;
      }
      
      console.log('Fetching files for user ID:', user.id);
      const userFiles = getUserFiles(user.id);
      console.log('Retrieved files:', userFiles);
      setFiles(userFiles);
      
      const updatedUser = updateOnboardingStatus(user, userFiles);
      if (updatedUser !== user) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map((u: User) => 
          u.id === updatedUser.id ? updatedUser : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    };

    fetchFiles();
    // Set up an interval to check for new files every 2 seconds
    const interval = setInterval(fetchFiles, 2000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [user?.id, queryClient, user]);

  const onDownload = async (file: UserFile) => {
    await handleFileDownload(file);
  };

  const onDelete = (file: UserFile) => {
    const updatedFiles = handleFileDelete(file);
    setFiles(updatedFiles);
    
    const updatedUser = updateUserOnboardingStatusOnDelete(user, file);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => 
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    queryClient.invalidateQueries({ queryKey: ['userFiles'] });
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
            onDownload={onDownload}
            onDelete={onDelete}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default UserFiles;