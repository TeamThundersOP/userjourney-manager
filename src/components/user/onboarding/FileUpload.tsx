import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserFile } from '@/types/userFile';
import { Label } from '@/components/ui/label';
import { uploadFile } from '@/utils/fileStorage';
import { compressImage } from './FileCompressor';
import { normalizeCategory } from './FileCategories';

interface FileUploadProps {
  onFileUpload: (file: UserFile) => void;
  category?: string;
  accept?: string;
  label?: string;
  isUploaded?: boolean;
  userId?: number;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

const FileUpload = ({ 
  onFileUpload, 
  category = '', 
  accept, 
  label, 
  isUploaded = false, 
  userId 
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File is too large. Maximum size is 5MB.");
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setIsUploading(true);

    try {
      let processedFile = file;
      
      if (file.type.startsWith('image/')) {
        processedFile = await compressImage(file);
      }

      const uploadedFile = await uploadFile(
        processedFile,
        userId,
        normalizeCategory(category)
      );

      onFileUpload(uploadedFile);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-4 w-full">
      {label && <Label htmlFor={`file-upload-${category}`}>{label}</Label>}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
        id={`file-upload-${category}`}
      />
      <Button
        type="button"
        variant={isUploaded ? "secondary" : "outline"}
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        className="w-full h-[42px] min-w-[200px]"
      >
        {isUploading ? "Uploading..." : isUploaded ? "Uploaded ✓" : "Upload File"}
      </Button>
    </div>
  );
};

export default FileUpload;