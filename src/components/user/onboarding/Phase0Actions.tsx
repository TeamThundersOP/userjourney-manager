import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FileUpload from "./FileUpload";
import ActionTypeIndicator from "@/components/shared/onboarding/ActionTypeIndicator";
import { UserFile } from "@/types/userFile";

interface Phase0ActionsProps {
  formData: any;
  onFileUpload: (type: string, file: UserFile) => void;
  onPersonalDetailsChange: (checked: boolean) => void;
  onUKContactChange: (field: 'ukContactNumber' | 'ukAddress', value: string) => void;
  onVisaStatusChange?: (status: 'pending' | 'approved' | 'rejected') => void;
}

const Phase0Actions = ({
  formData,
  onFileUpload,
  onPersonalDetailsChange,
  onUKContactChange,
  onVisaStatusChange
}: Phase0ActionsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-end">
        <ActionTypeIndicator type="admin" />
        <ActionTypeIndicator type="user" />
        <ActionTypeIndicator type="upload" />
      </div>

      {/* User Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">User Actions</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              checked={formData.personalDetailsCompleted} 
              onCheckedChange={(checked) => onPersonalDetailsChange(checked as boolean)}
            />
            <div className="flex items-center gap-2">
              <Label>Fill Personal Details</Label>
              <ActionTypeIndicator type="user" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Visa Application Status</h4>
            <RadioGroup
              value={formData.visaStatus}
              onValueChange={onVisaStatusChange}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="visa-pending" />
                <Label htmlFor="visa-pending">Pending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="approved" id="visa-approved" />
                <Label htmlFor="visa-approved">Approved</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rejected" id="visa-rejected" />
                <Label htmlFor="visa-rejected">Rejected</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">UK Contact Details</h4>
            <div className="space-y-2">
              <Input
                placeholder="UK Contact Number"
                value={formData.ukContactNumber || ''}
                onChange={(e) => onUKContactChange('ukContactNumber', e.target.value)}
              />
              <Input
                placeholder="UK Address"
                value={formData.ukAddress || ''}
                onChange={(e) => onUKContactChange('ukAddress', e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Upload Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Required Documents</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <FileUpload
              label="CV Upload"
              onFileUpload={(file) => onFileUpload('cv', file)}
              isUploaded={formData.cvSubmitted}
            />
            <ActionTypeIndicator type="upload" />
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <FileUpload
              label="Passport Copy"
              onFileUpload={(file) => onFileUpload('passport', file)}
              isUploaded={formData.passportUploaded}
            />
            <ActionTypeIndicator type="upload" />
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <FileUpload
              label="PCC (Police Clearance Certificate)"
              onFileUpload={(file) => onFileUpload('pcc', file)}
              isUploaded={formData.pccUploaded}
            />
            <ActionTypeIndicator type="upload" />
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <FileUpload
              label="Other Required Documents"
              onFileUpload={(file) => onFileUpload('other', file)}
              isUploaded={formData.otherDocumentsUploaded}
            />
            <ActionTypeIndicator type="upload" />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <FileUpload
              label="Travel Documents (Including Tickets)"
              onFileUpload={(file) => onFileUpload('travelDocs', file)}
              isUploaded={formData.travelDocumentsUploaded}
            />
            <ActionTypeIndicator type="upload" />
          </div>

          <div className="flex items-center gap-2">
            <FileUpload
              label="Visa Copy"
              onFileUpload={(file) => onFileUpload('visaCopy', file)}
              isUploaded={formData.visaCopyUploaded}
            />
            <ActionTypeIndicator type="upload" />
          </div>
        </div>
      </Card>

      {/* Admin Actions - Disabled */}
      <Card className="p-6 opacity-50">
        <h3 className="text-lg font-medium mb-4">Admin Actions</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox disabled checked={formData.interviewCompleted} />
            <div className="flex items-center gap-2">
              <Label>Interview Status</Label>
              <ActionTypeIndicator type="admin" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox disabled checked={formData.offerLetterSent} />
            <div className="flex items-center gap-2">
              <Label>Offer Letter Status</Label>
              <ActionTypeIndicator type="admin" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox disabled checked={formData.cosSent} />
            <div className="flex items-center gap-2">
              <Label>CoS Status</Label>
              <ActionTypeIndicator type="admin" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox disabled checked={formData.rightToWorkSent} />
            <div className="flex items-center gap-2">
              <Label>Right to Work Status</Label>
              <ActionTypeIndicator type="admin" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Phase0Actions;