import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserFile } from '@/types/userFile';
import { Label } from '@/components/ui/label';
import { supabase } from "@/integrations/supabase/client";

interface FileUploadProps {
  onFileUpload: (file: UserFile) => void;
  category?: string;
  accept?: string;
  label?: string;
  isUploaded?: boolean;
  userId?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

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

  const sanitizeFileName = (fileName: string): string => {
    // Remove any non-alphanumeric characters except dots, dashes, and underscores
    return fileName
      .replace(/[^\w\s.-]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
  };

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size should not exceed 5MB");
      return false;
    }

    const allowedTypes = accept?.split(',') || [];
    if (allowedTypes.length > 0 && !allowedTypes.some(type => file.type.includes(type.replace('*', '').trim()))) {
      toast.error(`Invalid file type. Allowed types: ${accept}`);
      return false;
    }

    return true;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) {
      toast.error("Please select a file and ensure you're logged in");
      return;
    }

    if (!validateFile(file)) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setIsUploading(true);

    try {
      const sanitizedFileName = sanitizeFileName(file.name);
      const fileExt = sanitizedFileName.split('.').pop();
      const uniqueFileName = `${crypto.randomUUID()}.${fileExt}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user_files')
        .upload(uniqueFileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Create file metadata record
      const { data: fileData, error: insertError } = await supabase
        .from('user_files')
        .insert({
          name: sanitizedFileName,
          type: file.type,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          category: normalizeCategory(category),
          file_path: uniqueFileName,
          user_id: userId
        })
        .select()
        .single();

      if (insertError) {
        // If metadata insertion fails, clean up the uploaded file
        await supabase.storage
          .from('user_files')
          .remove([uniqueFileName]);
        throw insertError;
      }

      if (fileData) {
        onFileUpload(fileData);
        toast.success("File uploaded successfully");
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to upload file");
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