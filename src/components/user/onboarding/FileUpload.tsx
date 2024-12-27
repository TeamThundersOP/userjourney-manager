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

export const FileUpload = ({ label, onUpload, isUploaded }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
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

        // Store file data
        localStorage.setItem(`file_${fileMetadata.id}`, base64Data);

        // Get existing files or initialize empty array
        const existingFiles = JSON.parse(localStorage.getItem('userFiles') || '[]');
        
        // Add new file metadata
        localStorage.setItem('userFiles', JSON.stringify([...existingFiles, fileMetadata]));
        
        onUpload(selectedFile);
        toast.success(`${label} uploaded successfully`);

        // Invalidate queries to update both admin and user views
        queryClient.invalidateQueries({ queryKey: ['userFiles'] });
        queryClient.invalidateQueries({ queryKey: ['user'] });
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
          Selected: {file.name}
        </p>
      )}
    </div>
  );
};