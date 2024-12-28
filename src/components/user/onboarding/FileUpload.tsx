import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserFile } from '@/types/userFile';
import { Label } from '@/components/ui/label';

interface FileUploadProps {
  onFileUpload: (file: UserFile) => void;
  category?: string;
  accept?: string;
  label?: string;
  isUploaded?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

const FileUpload = ({ onFileUpload, category = '', accept, label, isUploaded = false }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64String = reader.result as string;
        const fileSize = (file.size / 1024).toFixed(2) + ' KB';
        
        // Generate a smaller preview if it's an image
        let preview = base64String;
        if (file.type.startsWith('image/')) {
          const img = new Image();
          img.src = base64String;
          await new Promise((resolve) => {
            img.onload = resolve;
          });

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          preview = canvas.toDataURL(file.type, 0.7);
        }

        const newFile: UserFile = {
          id: Date.now(),
          userId: localStorage.getItem('userId'),
          name: file.name,
          type: file.type,
          uploadedAt: new Date().toISOString(),
          size: fileSize,
          category: category,
        };

        try {
          // Store file metadata in localStorage
          const files = JSON.parse(localStorage.getItem('userFiles') || '[]');
          files.push(newFile);
          localStorage.setItem('userFiles', JSON.stringify(files));

          // Store the actual file data in a separate key
          localStorage.setItem(`file_${newFile.id}`, preview);

          onFileUpload(newFile);
          toast.success("File uploaded successfully");
        } catch (storageError) {
          console.error('Storage error:', storageError);
          toast.error("Failed to store file. Storage quota exceeded.");
          // Clean up any partial data
          const files = JSON.parse(localStorage.getItem('userFiles') || '[]');
          const filteredFiles = files.filter((f: UserFile) => f.id !== newFile.id);
          localStorage.setItem('userFiles', JSON.stringify(filteredFiles));
        }
      } catch (error) {
        console.error('Error processing file:', error);
        toast.error("Failed to process file");
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.onerror = () => {
      console.error('FileReader error:', reader.error);
      toast.error("Failed to read file");
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
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
        className="w-full"
      >
        {isUploading ? "Uploading..." : isUploaded ? "Uploaded ✓" : "Upload File"}
      </Button>
    </div>
  );
};

export default FileUpload;