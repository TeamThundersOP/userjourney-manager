import { User } from "@/types/user";
import { UserFile } from "@/types/userFile";

export const updateOnboardingStatus = (user: User, userFiles: UserFile[]) => {
  if (!user.onboarding) return user;

  const updatedUser = { ...user };
  
  userFiles.forEach(file => {
    switch (file.category.toLowerCase()) {
      // Phase 0 files
      case 'cv':
        updatedUser.onboarding!.phase0.cvSubmitted = true;
        break;
      case 'right to work':
        updatedUser.onboarding!.phase0.rightToWorkSent = true;
        break;
      case 'travel documents':
        updatedUser.onboarding!.phase0.travelDocumentsUploaded = true;
        break;
      case 'passport':
        updatedUser.onboarding!.phase0.passportUploaded = true;
        break;
      case 'pcc':
        updatedUser.onboarding!.phase0.pccUploaded = true;
        break;
      case 'visa':
        updatedUser.onboarding!.phase0.visaCopyUploaded = true;
        break;
      case 'other documents':
        updatedUser.onboarding!.phase0.otherDocumentsUploaded = true;
        break;
      // Phase 1 files
      case 'hmrc checklist':
        updatedUser.onboarding!.phase1.hmrcChecklist = true;
        break;
      case 'company agreements':
        updatedUser.onboarding!.phase1.companyAgreements = true;
        break;
      case 'bank statements':
        updatedUser.onboarding!.phase1.bankStatements = true;
        break;
      case 'vaccination proof':
        updatedUser.onboarding!.phase1.vaccinationProof = true;
        break;
    }
  });

  return updatedUser;
};

export const updateUserOnboardingStatusOnDelete = (user: User, file: UserFile) => {
  if (!user.onboarding) return user;

  const updatedUser = { ...user };

  switch (file.category.toLowerCase()) {
    // Phase 0 files
    case 'passport':
      updatedUser.onboarding.phase0.passportUploaded = false;
      break;
    case 'pcc':
      updatedUser.onboarding.phase0.pccUploaded = false;
      break;
    case 'visa':
      updatedUser.onboarding.phase0.visaCopyUploaded = false;
      break;
    case 'travel documents':
      updatedUser.onboarding.phase0.travelDocumentsUploaded = false;
      break;
    case 'other documents':
      updatedUser.onboarding.phase0.otherDocumentsUploaded = false;
      break;
    case 'cv':
      updatedUser.onboarding.phase0.cvSubmitted = false;
      break;
    case 'right to work':
      updatedUser.onboarding.phase0.rightToWorkSent = false;
      break;
    // Phase 1 files
    case 'hmrc checklist':
      updatedUser.onboarding.phase1.hmrcChecklist = false;
      break;
    case 'company agreements':
      updatedUser.onboarding.phase1.companyAgreements = false;
      break;
    case 'bank statements':
      updatedUser.onboarding.phase1.bankStatements = false;
      break;
    case 'vaccination proof':
      updatedUser.onboarding.phase1.vaccinationProof = false;
      break;
  }

  return updatedUser;
};