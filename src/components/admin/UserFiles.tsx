import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileText, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "@/types/user";

interface FileUploadButtonProps {
  category: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, category: string) => void;
  disabled?: boolean;
}

const FileUploadButton = ({ category, onUpload, disabled }: FileUploadButtonProps) => (
  <Button variant="outline" size="sm" className="flex items-center gap-2" disabled={disabled}>
    <input
      type="file"
      className="hidden"
      onChange={(e) => onUpload(e, category)}
      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
    />
    <Upload className="h-4 w-4" />
    Upload {category}
  </Button>
);

interface FileTableProps {
  files: any[];
  onDownload: (file: any) => void;
}

const FileTable = ({ files, onDownload }: FileTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Upload Date</TableHead>
        <TableHead>Size</TableHead>
        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {files.map((file) => (
        <TableRow key={file.id}>
          <TableCell className="font-medium">{file.name}</TableCell>
          <TableCell>{file.type}</TableCell>
          <TableCell>{new Date(file.uploadedAt).toLocaleDateString()}</TableCell>
          <TableCell>{file.size}</TableCell>
          <TableCell>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDownload(file)}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

interface UserFilesProps {
  user: User;
}

const UserFiles = ({ user }: UserFilesProps) => {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Create new file object with category-specific name
      const newFile = {
        id: Date.now(),
        name: `${category}_${file.name}`,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        category
      };

      // Update user's files array and onboarding status
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: User) => {
        if (u.id === user.id) {
          const updatedUser = { ...u };
          if (!updatedUser.files) updatedUser.files = [];
          updatedUser.files.push(newFile);

          // Initialize onboarding if not exists
          if (!updatedUser.onboarding) {
            updatedUser.onboarding = {
              currentPhase: 0,
              phase0: {
                personalDetailsCompleted: false,
                cvSubmitted: false,
                interviewCompleted: false,
                jobStatus: 'pending',
                passportUploaded: false,
                pccUploaded: false,
                otherDocumentsUploaded: false,
                offerLetterSent: false,
                cosSent: false,
                rightToWorkSent: false,
                documentsUploaded: false,
                visaStatus: 'pending',
                travelDetailsUpdated: false,
                travelDocumentsUploaded: false,
                visaCopyUploaded: false,
                ukContactUpdated: false,
                phase0Complete: false
              },
              phase1: {
                hmrcChecklist: false,
                companyAgreements: false,
                pensionScheme: false,
                bankStatements: false,
                vaccinationProof: false
              },
              phase2: {
                rightToWork: false,
                shareCode: false,
                dbs: false,
                onboardingComplete: false
              },
              approvals: {
                phase0: false,
                phase1: false,
                phase2: false
              }
            };
          }

          // Update onboarding status based on file category
          if (updatedUser.onboarding) {
            switch (category) {
              case 'cv':
                updatedUser.onboarding.phase0.cvSubmitted = true;
                break;
              case 'passport':
                updatedUser.onboarding.phase0.passportUploaded = true;
                break;
              case 'pcc':
                updatedUser.onboarding.phase0.pccUploaded = true;
                break;
              case 'offerLetter':
                updatedUser.onboarding.phase0.offerLetterSent = true;
                break;
              case 'visa':
                updatedUser.onboarding.phase0.visaCopyUploaded = true;
                break;
              case 'travelDocuments':
                updatedUser.onboarding.phase0.travelDocumentsUploaded = true;
                break;
            }
          }

          return updatedUser;
        }
        return u;
      });

      localStorage.setItem('users', JSON.stringify(updatedUsers));
      queryClient.invalidateQueries({ queryKey: ['users'] });

      toast.success(`${category} uploaded successfully`);
    } catch (error) {
      toast.error('Error uploading file');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = (file: any) => {
    toast.success(`Downloading ${file.name}`);
  };

  const showUploadButtons = !user.onboarding || user.onboarding.currentPhase === 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Uploaded Files</CardTitle>
        {showUploadButtons && (
          <div className="flex flex-wrap gap-2">
            <FileUploadButton category="cv" onUpload={handleFileUpload} disabled={uploading} />
            <FileUploadButton category="passport" onUpload={handleFileUpload} disabled={uploading} />
            <FileUploadButton category="pcc" onUpload={handleFileUpload} disabled={uploading} />
            <FileUploadButton category="travelDocuments" onUpload={handleFileUpload} disabled={uploading} />
            <FileUploadButton category="visa" onUpload={handleFileUpload} disabled={uploading} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        {(!user.files || user.files.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mb-2" />
            <p>No files uploaded yet</p>
          </div>
        ) : (
          <FileTable files={user.files} onDownload={handleDownload} />
        )}
      </CardContent>
    </Card>
  );
};

export default UserFiles;