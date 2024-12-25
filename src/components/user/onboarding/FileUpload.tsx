import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Check } from "lucide-react";

interface FileUploadProps {
  label: string;
  onUpload: (file: File) => void;
  isUploaded: boolean;
}

export const FileUpload = ({ label, onUpload, isUploaded }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onUpload(selectedFile);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center space-x-2">
        <Input
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