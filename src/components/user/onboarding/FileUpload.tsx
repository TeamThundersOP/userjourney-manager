import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  label: string;
  onUpload: (file: File) => void;
  isUploaded: boolean;
  disabled?: boolean;
  category?: string;
}

export const FileUpload = ({ label, onUpload, isUploaded, disabled = false, category }: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should not exceed 5MB");
        return;
      }
      
      // Confirm file replacement if a file is already uploaded
      if (isUploaded) {
        if (window.confirm(`Do you want to replace the existing ${label} file?`)) {
          onUpload(file);
          toast.success(`${label} file replaced successfully`);
        }
      } else {
        onUpload(file);
        toast.success(`${label} file uploaded successfully`);
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant={isUploaded ? "outline" : "default"}
          className={`w-full ${isUploaded ? 'bg-green-50 text-green-600 hover:bg-green-100' : ''}`}
          disabled={disabled}
          onClick={() => document.getElementById(`file-${label}`)?.click()}
        >
          {isUploaded ? (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Replace File
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </>
          )}
        </Button>
        <input
          type="file"
          id={`file-${label}`}
          className="hidden"
          onChange={handleFileChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};