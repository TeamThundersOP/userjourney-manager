import { User } from "@/types/user";
import { Card } from "@/components/ui/card";

interface Phase0DetailsProps {
  user: User;
}

const Phase0Details = ({ user }: Phase0DetailsProps) => {
  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-lg font-semibold">Phase 0 Details</h3>
      
      {/* Show UK Contact Information if it exists */}
      {user.onboarding?.phase0?.ukContactNumber || user.onboarding?.phase0?.ukAddress ? (
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
    </div>
  );
};

export default Phase0Details;