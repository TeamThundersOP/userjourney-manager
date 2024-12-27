import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Check } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from '@tanstack/react-query';

interface FileUploadProps {
  label: string;
  onUpload: (file: File) => void;
  isUploaded: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const FileUpload = ({ label, onUpload, isUploaded }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Check file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error(`File size must be less than 5MB. Current size: ${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB`);
        return;
      }

      setFile(selectedFile);
      
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          
          // Create file metadata
          const fileMetadata = {
            id: Date.now(),
            userId: localStorage.getItem('userId'),
            name: selectedFile.name,
            type: selectedFile.type,
            uploadedAt: new Date().toISOString(),
            size: `${(selectedFile.size / 1024).toFixed(2)} KB`,
            category: label
          };

          // Get existing files
          const existingFiles = JSON.parse(localStorage.getItem('userFiles') || '[]');
          
          // Find and remove any existing file with the same category and userId
          const filteredFiles = existingFiles.filter((existingFile: any) => 
            !(existingFile.category === label && 
              String(existingFile.userId) === String(fileMetadata.userId))
          );

          // If we found and removed an old file, also remove its data
          const removedFile = existingFiles.find((existingFile: any) => 
            existingFile.category === label && 
            String(existingFile.userId) === String(fileMetadata.userId)
          );
          
          if (removedFile) {
            localStorage.removeItem(`file_${removedFile.id}`);
          }

          // Store new file data
          localStorage.setItem(`file_${fileMetadata.id}`, base64Data);

          // Add new file metadata to the filtered list
          localStorage.setItem('userFiles', JSON.stringify([...filteredFiles, fileMetadata]));
          
          onUpload(selectedFile);
          toast.success(`${label} uploaded successfully`);

          // Invalidate queries to update both admin and user views
          queryClient.invalidateQueries({ queryKey: ['userFiles'] });
          queryClient.invalidateQueries({ queryKey: ['user'] });
        } catch (error) {
          console.error('Error processing file:', error);
          toast.error("Failed to process file");
        }
      };

      reader.onerror = () => {
        toast.error("Error reading file");
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center space-x-2">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id={`file-${label}`}
        />
        <Button
          variant="outline"
          className="w-full"
          onClick={() => document.getElementById(`file-${label}`)?.click()}
        >
          {isUploaded ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Uploaded
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload {label}
            </>
          )}
        </Button>
      </div>
      {file && (
        <p className="text-sm text-gray-500">
          Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}MB)
        </p>
      )}
    </div>
  );
};