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
  userId?: number;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
const MAX_IMAGE_DIMENSION = 800; // Maximum width/height for images
const IMAGE_QUALITY = 0.5; // Reduced image quality for better compression

const FileUpload = ({ onFileUpload, category = '', accept, label, isUploaded = false, userId }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const normalizeCategory = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      'cv': 'cv',
      'passport': 'passport',
      'pcc': 'pcc',
      'other': 'other documents',
      'travelDocs': 'travel documents',
      'visaCopy': 'visa',
      'right to work': 'right to work'
    };
    return categoryMap[category.toLowerCase()] || category;
  };

  const cleanStorage = () => {
    try {
      // Get all localStorage keys
      const keys = Object.keys(localStorage);
      
      // Find old file data entries (older than 30 days)
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      
      // Get userFiles metadata
      const userFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
      const activeFileIds = new Set(userFiles.map(file => `file_${file.id}`));
      
      // Remove orphaned file data
      keys.forEach(key => {
        if (key.startsWith('file_') && !activeFileIds.has(key)) {
          localStorage.removeItem(key);
        }
      });

      // Remove old files from userFiles array
      const updatedFiles = userFiles.filter(file => {
        const uploadDate = new Date(file.uploadedAt).getTime();
        return uploadDate > thirtyDaysAgo;
      });

      localStorage.setItem('userFiles', JSON.stringify(updatedFiles));
      
      // Clean up any orphaned onboarding statuses
      keys.forEach(key => {
        if (key.startsWith('onboarding_') && !userFiles.some(file => `onboarding_${file.userId}` === key)) {
          localStorage.removeItem(key);
        }
      });

    } catch (error) {
      console.error('Error cleaning storage:', error);
    }
  };

  const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_IMAGE_DIMENSION) {
              height *= MAX_IMAGE_DIMENSION / width;
              width = MAX_IMAGE_DIMENSION;
            }
          } else {
            if (height > MAX_IMAGE_DIMENSION) {
              width *= MAX_IMAGE_DIMENSION / height;
              height = MAX_IMAGE_DIMENSION;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const mimeType = 'image/webp';
          resolve(canvas.toDataURL(mimeType, IMAGE_QUALITY));
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
    });
  };

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
      let fileData: string;
      
      if (file.type.startsWith('image/')) {
        fileData = await compressImage(file);
      } else {
        const reader = new FileReader();
        fileData = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      // Test storage capacity before saving
      const testKey = `test_${Date.now()}`;
      try {
        localStorage.setItem(testKey, fileData);
        localStorage.removeItem(testKey);
      } catch (e) {
        // If storage is full, attempt to clean up
        cleanStorage();
        
        // Try again after cleanup
        try {
          localStorage.setItem(testKey, fileData);
          localStorage.removeItem(testKey);
        } catch (e) {
          throw new Error('Storage capacity exceeded even after cleanup');
        }
      }

      const fileId = Date.now();
      const newFile: UserFile = {
        id: fileId,
        userId: userId ? String(userId) : null,
        name: file.name,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        size: (file.size / 1024).toFixed(2) + ' KB',
        category: normalizeCategory(category),
      };

      // Store file metadata
      const files = JSON.parse(localStorage.getItem('userFiles') || '[]');
      files.push(newFile);
      localStorage.setItem('userFiles', JSON.stringify(files));

      // Store the actual file data
      localStorage.setItem(`file_${fileId}`, fileData);

      onFileUpload(newFile);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error('Upload error:', error);
      if (error instanceof Error && error.message.includes('Storage capacity exceeded')) {
        toast.error("Storage capacity exceeded. Please try uploading a smaller file.");
      } else {
        toast.error("Failed to upload file. Please try again.");
      }
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