import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types/user";
import { useState, useEffect } from "react";
import { UserFile } from "@/types/userFile";
import FileTable from "./files/FileTable";
import EmptyFiles from "./files/EmptyFiles";
import { getUserFiles, updateOnboardingStatus } from "@/utils/fileOperations";
import FileActions from "./files/FileActions";

interface UserFilesProps {
  user: User;
}

const UserFiles = ({ user }: UserFilesProps) => {
  const [files, setFiles] = useState<UserFile[]>([]);
  
  const { handleDownload, handleDelete } = FileActions({ 
    onFileChange: (updatedFiles) => {
      console.log('File change detected, all files:', updatedFiles);
      console.log('Current user ID:', user.id);
      
      const userFiles = updatedFiles.filter(file => {
        const fileUserId = String(file.userId);
        const currentUserId = String(user.id);
        console.log('Comparing file userId:', fileUserId, 'with current userId:', currentUserId);
        return fileUserId === currentUserId;
      });
      
      console.log('Filtered user files:', userFiles);
      setFiles(userFiles);
      updateOnboardingStatus(user, userFiles);
    }
  });

  useEffect(() => {
    console.log('UserFiles component mounted/updated for user:', user.id);
    const userFiles = getUserFiles(user);
    console.log('Filtered user files:', userFiles);
    setFiles(userFiles);
    updateOnboardingStatus(user, userFiles);
  }, [user.id]);

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