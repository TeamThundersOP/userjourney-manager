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
          
          // Calculate new dimensions while maintaining aspect ratio
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
          
          // Convert to WebP for better compression if supported
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
        throw new Error('Storage capacity exceeded');
      }

      const newFile: UserFile = {
        id: Date.now(),
        userId: userId,
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
      localStorage.setItem(`file_${newFile.id}`, fileData);

      onFileUpload(newFile);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error('Upload error:', error);
      if (error instanceof Error && error.message === 'Storage capacity exceeded') {
        toast.error("Storage capacity exceeded. Try uploading a smaller file or clearing some space.");
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