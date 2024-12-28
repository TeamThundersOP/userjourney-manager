import { OnboardingPhase0 } from "@/types/user";
import Phase0StatusItem from "./Phase0StatusItem";

interface Phase0StatusGridProps {
  phase0: OnboardingPhase0;
  onStatusChange: (key: string, value: boolean) => void;
}

const Phase0StatusGrid = ({ phase0, onStatusChange }: Phase0StatusGridProps) => {
  const steps = [
    { 
      title: "Personal Details",
      stateKey: "personalDetailsCompleted",
      completed: phase0?.personalDetailsCompleted,
      status: phase0?.personalDetailsCompleted ? "Completed" : "Pending",
      actionType: "user" as const
    },
    { 
      title: "CV",
      stateKey: "cvSubmitted",
      completed: phase0?.cvSubmitted,
      status: phase0?.cvSubmitted ? "Uploaded" : "Pending",
      actionType: "upload" as const
    },
    { 
      title: "Interview",
      stateKey: "interviewCompleted",
      completed: phase0?.interviewCompleted,
      status: phase0?.interviewCompleted ? "Completed" : "Pending",
      actionType: "admin" as const
    },
    { 
      title: "Passport Copy",
      stateKey: "passportUploaded",
      completed: phase0?.passportUploaded,
      status: phase0?.passportUploaded ? "Uploaded" : "Pending",
      actionType: "upload" as const
    },
    { 
      title: "PCC",
      stateKey: "pccUploaded",
      completed: phase0?.pccUploaded,
      status: phase0?.pccUploaded ? "Uploaded" : "Pending",
      actionType: "upload" as const
    },
    { 
      title: "Other Documents",
      stateKey: "otherDocumentsUploaded",
      completed: phase0?.otherDocumentsUploaded,
      status: phase0?.otherDocumentsUploaded ? "Uploaded" : "Pending",
      actionType: "upload" as const
    },
    { 
      title: "Offer Letter",
      stateKey: "offerLetterSent",
      completed: phase0?.offerLetterSent,
      status: phase0?.offerLetterSent ? "Sent" : "Pending",
      actionType: "admin" as const
    },
    { 
      title: "CoS",
      stateKey: "cosSent",
      completed: phase0?.cosSent,
      status: phase0?.cosSent ? "Sent" : "Pending",
      actionType: "admin" as const
    },
    { 
      title: "Travel Documents",
      stateKey: "travelDocumentsUploaded",
      completed: phase0?.travelDocumentsUploaded,
      status: phase0?.travelDocumentsUploaded ? "Uploaded" : "Pending",
      actionType: "upload" as const
    },
    { 
      title: "Visa Copy",
      stateKey: "visaCopyUploaded",
      completed: phase0?.visaCopyUploaded,
      status: phase0?.visaCopyUploaded ? "Uploaded" : "Pending",
      actionType: "upload" as const
    },
    { 
      title: "UK Contact Details",
      stateKey: "ukContactUpdated",
      completed: phase0?.ukContactUpdated,
      status: phase0?.ukContactUpdated ? "Updated" : "Pending",
      actionType: "user" as const
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-end">
        <ActionTypeIndicator type="admin" />
        <ActionTypeIndicator type="user" />
        <ActionTypeIndicator type="upload" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step) => (
          <Phase0StatusItem
            key={step.stateKey}
            title={step.title}
            completed={step.completed}
            status={step.status}
            stateKey={step.stateKey}
            onStatusChange={onStatusChange}
            actionType={step.actionType}
          />
        ))}
      </div>
    </div>
  );
};

export default Phase0StatusGrid;