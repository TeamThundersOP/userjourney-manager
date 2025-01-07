import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/user";
import { useState } from "react";
import BasicInfoSection from "./user-dialog/BasicInfoSection";
import PersonalDetailsSection from "./user-dialog/PersonalDetailsSection";
import PassportSection from "./user-dialog/PassportSection";
import ContactSection from "./user-dialog/ContactSection";

interface EditUserDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedUser: User) => void;
}

const EditUserDialog = ({ user, open, onOpenChange, onSave }: EditUserDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: user.email,
    familyName: user.personalInfo?.familyName || "",
    givenName: user.personalInfo?.givenName || "",
    otherNames: user.personalInfo?.otherNames || "",
    nationality: user.personalInfo?.nationality || "",
    placeOfBirth: user.personalInfo?.placeOfBirth || "",
    dateOfBirth: user.personalInfo?.dateOfBirth || "",
    gender: user.personalInfo?.gender || "",
    countryOfResidence: user.personalInfo?.countryOfResidence || "",
    passportNumber: user.personalInfo?.passportNumber || "",
    passportIssueDate: user.personalInfo?.passportIssueDate || "",
    passportExpiryDate: user.personalInfo?.passportExpiryDate || "",
    passportPlaceOfIssue: user.personalInfo?.passportPlaceOfIssue || "",
    address: user.personalInfo?.address || "",
    city: user.personalInfo?.city || "",
    postalCode: user.personalInfo?.postalCode || "",
    country: user.personalInfo?.country || "",
    phone: user.personalInfo?.phone || "",
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isFirstTimeFillingInfo = !user.onboarding;
    
    const updatedUser: User = {
      ...user,
      email: formData.email,
      personalInfo: {
        ...user.personalInfo,
        familyName: formData.familyName,
        givenName: formData.givenName,
        otherNames: formData.otherNames,
        fullName: `${formData.givenName} ${formData.familyName}`,
        nationality: formData.nationality,
        placeOfBirth: formData.placeOfBirth,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        countryOfResidence: formData.countryOfResidence,
        passportNumber: formData.passportNumber,
        passportIssueDate: formData.passportIssueDate,
        passportExpiryDate: formData.passportExpiryDate,
        passportPlaceOfIssue: formData.passportPlaceOfIssue,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
      },
    };

    // Initialize onboarding if it's the first time filling personal info
    if (isFirstTimeFillingInfo) {
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
          documentsUploaded: false,
          visaStatus: 'pending',
          travelDetailsUpdated: false,
          travelDocumentsUploaded: false,
          visaCopyUploaded: false,
          ukContactUpdated: false
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

    onSave(updatedUser);
    toast({
      title: "Success",
      description: isFirstTimeFillingInfo 
        ? "Personal information saved and onboarding initialized"
        : "User profile updated successfully",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User Profile</DialogTitle>
          <DialogDescription>
            Make changes to the user profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <BasicInfoSection formData={formData} onChange={handleFieldChange} />
            <PersonalDetailsSection formData={formData} onChange={handleFieldChange} />
            <PassportSection formData={formData} onChange={handleFieldChange} />
            <ContactSection formData={formData} onChange={handleFieldChange} />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;