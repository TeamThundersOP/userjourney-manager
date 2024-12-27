import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploadProps {
  label: string;
  onUpload: (file: File) => void;
  isUploaded: boolean;
  disabled?: boolean;
}

export const FileUpload = ({ label, onUpload, isUploaded, disabled = false }: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
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
          disabled={disabled || isUploaded}
          onClick={() => document.getElementById(`file-${label}`)?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          {isUploaded ? 'Uploaded' : 'Upload'}
        </Button>
        <input
          type="file"
          id={`file-${label}`}
          className="hidden"
          onChange={handleFileChange}
          disabled={disabled || isUploaded}
        />
      </div>
    </div>
  );
};