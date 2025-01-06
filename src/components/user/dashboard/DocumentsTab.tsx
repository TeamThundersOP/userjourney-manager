import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "@/components/user/onboarding/FileUpload";
import { UserFile } from "@/types/userFile";

interface DocumentsTabProps {
  onFileUpload: (file: UserFile) => void;
}

export const DocumentsTab = ({ onFileUpload }: DocumentsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Required Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FileUpload
          category="passport"
          onFileUpload={onFileUpload}
          label="Upload Passport"
          accept=".pdf,.jpg,.jpeg,.png"
        />
        <FileUpload
          category="pcc"
          onFileUpload={onFileUpload}
          label="Upload Police Clearance Certificate"
          accept=".pdf"
        />
        <FileUpload
          category="other"
          onFileUpload={onFileUpload}
          label="Upload Other Documents"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        />
      </CardContent>
    </Card>
  );
};