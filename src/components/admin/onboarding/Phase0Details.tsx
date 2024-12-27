import { User } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditPhase0Dialog from "./EditPhase0Dialog";
import EditPhase1Dialog from "./EditPhase1Dialog";
import EditPhase2Dialog from "./EditPhase2Dialog";
import { Pencil } from "lucide-react";

interface Phase0DetailsProps {
  user: User;
  onSave: (updatedUser: User) => void;
}

const Phase0Details = ({ user, onSave }: Phase0DetailsProps) => {
  const [editPhase0Open, setEditPhase0Open] = useState(false);
  const [editPhase1Open, setEditPhase1Open] = useState(false);
  const [editPhase2Open, setEditPhase2Open] = useState(false);

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Phase 0 Details</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setEditPhase0Open(true)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit Phase 0
        </Button>
      </div>
      
      {/* Show US Contact Information */}
      {(user.onboarding?.phase0?.usContactNumber || user.onboarding?.phase0?.usAddress) && (
        <Card className="p-4 space-y-2">
          <h4 className="font-medium">US Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Contact Number</p>
              <p className="font-medium">{user.onboarding?.phase0?.usContactNumber || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{user.onboarding?.phase0?.usAddress || "Not provided"}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Show UK Contact Information */}
      {(user.onboarding?.phase0?.ukContactNumber || user.onboarding?.phase0?.ukAddress) && (
        <Card className="p-4 space-y-2">
          <h4 className="font-medium">UK Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Contact Number</p>
              <p className="font-medium">{user.onboarding?.phase0?.ukContactNumber || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">UK Address</p>
              <p className="font-medium">{user.onboarding?.phase0?.ukAddress || "Not provided"}</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h4 className="font-medium mb-4">Submission Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Personal Details</p>
            <p className="font-medium">{user.onboarding?.phase0?.personalDetailsCompleted ? "Completed" : "Pending"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">CV Status</p>
            <p className="font-medium">{user.onboarding?.phase0?.cvSubmitted ? "Submitted" : "Pending"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Interview Status</p>
            <p className="font-medium">{user.onboarding?.phase0?.interviewCompleted ? "Completed" : "Pending"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Passport</p>
            <p className="font-medium">{user.onboarding?.phase0?.passportUploaded ? "Uploaded" : "Pending"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">PCC</p>
            <p className="font-medium">{user.onboarding?.phase0?.pccUploaded ? "Uploaded" : "Pending"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Other Documents</p>
            <p className="font-medium">{user.onboarding?.phase0?.otherDocumentsUploaded ? "Uploaded" : "Pending"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Offer Letter</p>
            <p className="font-medium">{user.onboarding?.phase0?.offerLetterSent ? "Sent" : "Pending"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">COS</p>
            <p className="font-medium">{user.onboarding?.phase0?.cosSent ? "Sent" : "Pending"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Right to Work</p>
            <p className="font-medium">{user.onboarding?.phase0?.rightToWorkSent ? "Sent" : "Pending"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Documents</p>
            <p className="font-medium">{user.onboarding?.phase0?.documentsUploaded ? "Uploaded" : "Pending"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Travel Details</p>
            <p className="font-medium">{user.onboarding?.phase0?.travelDetailsUpdated ? "Updated" : "Pending"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Travel Documents</p>
            <p className="font-medium">{user.onboarding?.phase0?.travelDocumentsUploaded ? "Uploaded" : "Pending"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Visa Copy</p>
            <p className="font-medium">{user.onboarding?.phase0?.visaCopyUploaded ? "Uploaded" : "Pending"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Visa Status</p>
            <p className="font-medium capitalize">{user.onboarding?.phase0?.visaStatus || "Pending"}</p>
          </div>
        </div>
      </Card>

      {user.onboarding?.approvals.phase0 && (
        <>
          <div className="flex items-center justify-between mt-8">
            <h3 className="text-lg font-semibold">Phase 1 Details</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditPhase1Open(true)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Phase 1
            </Button>
          </div>
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">HMRC Checklist</p>
                <p className="font-medium">{user.onboarding?.phase1?.hmrcChecklist ? "Completed" : "Pending"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Company Agreements</p>
                <p className="font-medium">{user.onboarding?.phase1?.companyAgreements ? "Completed" : "Pending"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pension Scheme</p>
                <p className="font-medium">{user.onboarding?.phase1?.pensionScheme ? "Completed" : "Pending"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bank Statements</p>
                <p className="font-medium">{user.onboarding?.phase1?.bankStatements ? "Completed" : "Pending"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vaccination Proof</p>
                <p className="font-medium">{user.onboarding?.phase1?.vaccinationProof ? "Completed" : "Pending"}</p>
              </div>
            </div>
          </Card>
        </>
      )}

      {user.onboarding?.approvals.phase1 && (
        <>
          <div className="flex items-center justify-between mt-8">
            <h3 className="text-lg font-semibold">Phase 2 Details</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditPhase2Open(true)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Phase 2
            </Button>
          </div>
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Right to Work</p>
                <p className="font-medium">{user.onboarding?.phase2?.rightToWork ? "Completed" : "Pending"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Share Code</p>
                <p className="font-medium">{user.onboarding?.phase2?.shareCode ? "Completed" : "Pending"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">DBS</p>
                <p className="font-medium">{user.onboarding?.phase2?.dbs ? "Completed" : "Pending"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Onboarding Complete</p>
                <p className="font-medium">{user.onboarding?.phase2?.onboardingComplete ? "Yes" : "No"}</p>
              </div>
            </div>
          </Card>
        </>
      )}

      <EditPhase0Dialog
        user={user}
        open={editPhase0Open}
        onOpenChange={setEditPhase0Open}
        onSave={onSave}
      />
      <EditPhase1Dialog
        user={user}
        open={editPhase1Open}
        onOpenChange={setEditPhase1Open}
        onSave={onSave}
      />
      <EditPhase2Dialog
        user={user}
        open={editPhase2Open}
        onOpenChange={setEditPhase2Open}
        onSave={onSave}
      />
    </div>
  );
};

export default Phase0Details;