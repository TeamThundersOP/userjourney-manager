import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserFile } from '@/types/userFile';

interface UserFilesProps {
  userId: string;
}

export const UserFiles = ({ userId }: UserFilesProps) => {
  const [files, setFiles] = useState<UserFile[]>([]);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('userFiles') || '[]');
    const userFiles = storedFiles.filter((file: UserFile) => file.userId === userId);
    setFiles(userFiles);
  }, [userId]);

  if (files.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Files</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No files uploaded yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{file.name}</h3>
                <p className="text-sm text-gray-500">
                  {file.category} • {file.size} • Uploaded on {new Date(file.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};