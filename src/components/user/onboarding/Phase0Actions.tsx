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
      <Card className="p-6 bg-white/50 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-lg font-medium mb-6 text-primary">User Actions</h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <Checkbox 
              checked={formData.personalDetailsCompleted} 
              onCheckedChange={(checked) => onPersonalDetailsChange(checked as boolean)}
            />
            <div className="flex items-center gap-2">
              <Label className="font-medium">Fill Personal Details</Label>
              <ActionTypeIndicator type="user" />
            </div>
          </div>

          <div className="space-y-4 p-4 bg-gray-50/50 rounded-lg">
            <h4 className="font-medium text-primary">Visa Application Status</h4>
            <RadioGroup
              value={formData.visaStatus}
              onValueChange={(value: 'pending' | 'approved' | 'rejected') => 
                onVisaStatusChange && onVisaStatusChange(value)
              }
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-white/80 transition-colors">
                <RadioGroupItem value="pending" id="visa-pending" />
                <Label htmlFor="visa-pending" className="cursor-pointer">Pending</Label>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-white/80 transition-colors">
                <RadioGroupItem value="approved" id="visa-approved" />
                <Label htmlFor="visa-approved" className="cursor-pointer">Approved</Label>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-white/80 transition-colors">
                <RadioGroupItem value="rejected" id="visa-rejected" />
                <Label htmlFor="visa-rejected" className="cursor-pointer">Rejected</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4 p-4 bg-gray-50/50 rounded-lg">
            <h4 className="font-medium text-primary">UK Contact Details</h4>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="UK Contact Number"
                  value={formData.ukContactNumber || ''}
                  onChange={(e) => onUKContactChange('ukContactNumber', e.target.value)}
                  className="pl-10 bg-white"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  +44
                </span>
              </div>
              <Input
                placeholder="UK Address"
                value={formData.ukAddress || ''}
                onChange={(e) => onUKContactChange('ukAddress', e.target.value)}
                className="bg-white"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Upload Actions */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-lg font-medium mb-6 text-primary">Required Documents</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <FileUpload
              label="CV Upload"
              onFileUpload={(file) => onFileUpload('cv', file)}
              isUploaded={formData.cvSubmitted}
            />
            <ActionTypeIndicator type="upload" />
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <FileUpload
              label="Passport Copy"
              onFileUpload={(file) => onFileUpload('passport', file)}
              isUploaded={formData.passportUploaded}
            />
            <ActionTypeIndicator type="upload" />
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <FileUpload
              label="PCC (Police Clearance)"
              onFileUpload={(file) => onFileUpload('pcc', file)}
              isUploaded={formData.pccUploaded}
            />
            <ActionTypeIndicator type="upload" />
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <FileUpload
              label="Other Documents"
              onFileUpload={(file) => onFileUpload('other', file)}
              isUploaded={formData.otherDocumentsUploaded}
            />
            <ActionTypeIndicator type="upload" />
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <FileUpload
              label="Travel Documents"
              onFileUpload={(file) => onFileUpload('travelDocs', file)}
              isUploaded={formData.travelDocumentsUploaded}
            />
            <ActionTypeIndicator type="upload" />
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
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
      <Card className="p-6 bg-white/50 backdrop-blur-sm border border-gray-100 shadow-lg opacity-50">
        <h3 className="text-lg font-medium mb-6 text-primary">Admin Actions</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 p-3 rounded-lg">
            <Checkbox disabled checked={formData.interviewCompleted} />
            <div className="flex items-center gap-2">
              <Label>Interview Status</Label>
              <ActionTypeIndicator type="admin" />
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg">
            <Checkbox disabled checked={formData.offerLetterSent} />
            <div className="flex items-center gap-2">
              <Label>Offer Letter Status</Label>
              <ActionTypeIndicator type="admin" />
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg">
            <Checkbox disabled checked={formData.cosSent} />
            <div className="flex items-center gap-2">
              <Label>CoS Status</Label>
              <ActionTypeIndicator type="admin" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Phase0Actions;