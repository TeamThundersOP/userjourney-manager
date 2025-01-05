import { UserFile } from "@/types/userFile";
import { User } from "@/types/user";

export const getUserFiles = (user: User): UserFile[] => {
  try {
    const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
    console.log('All files:', allFiles);
    console.log('Current user ID:', user.id);
    
    return allFiles.filter((file) => {
      if (!file.userId || !user.id) return false;
      const fileUserId = String(file.userId);
      const currentUserId = String(user.id);
      console.log('Comparing file userId:', fileUserId, 'with current userId:', currentUserId);
      return fileUserId === currentUserId;
    });
  } catch (error) {
    console.error('Error parsing user files:', error);
    return [];
  }
};

export const updateOnboardingStatus = (user: User, userFiles: UserFile[]) => {
  if (!user.onboarding) return;

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const updatedUsers = users.map((u: User) => {
    if (String(u.id) === String(user.id)) {
      const updatedUser = { ...u };
      if (!updatedUser.onboarding) return updatedUser;

      // Get existing onboarding status
      const existingOnboarding = JSON.parse(localStorage.getItem(`onboarding_${user.id}`) || 'null');
      if (existingOnboarding) {
        updatedUser.onboarding.phase0 = {
          ...updatedUser.onboarding.phase0,
          ...existingOnboarding
        };
        return updatedUser;
      }

      // Reset all file-related statuses
      updatedUser.onboarding.phase0 = {
        ...updatedUser.onboarding.phase0,
        cvSubmitted: false,
        travelDocumentsUploaded: false,
        passportUploaded: false,
        pccUploaded: false,
        visaCopyUploaded: false,
        otherDocumentsUploaded: false,
        documentsUploaded: false
      };

      updatedUser.onboarding.phase2 = {
        ...updatedUser.onboarding.phase2,
        rightToWork: false
      };

      // Update based on actual files
      userFiles.forEach(file => {
        if (!file.category) return;
        
        const category = file.category.toLowerCase();
        switch (category) {
          case 'cv':
            updatedUser.onboarding.phase0.cvSubmitted = true;
            break;
          case 'right to work':
            updatedUser.onboarding.phase2.rightToWork = true;
            break;
          case 'travel documents':
            updatedUser.onboarding.phase0.travelDocumentsUploaded = true;
            break;
          case 'passport':
            updatedUser.onboarding.phase0.passportUploaded = true;
            break;
          case 'pcc':
            updatedUser.onboarding.phase0.pccUploaded = true;
            break;
          case 'visa':
            updatedUser.onboarding.phase0.visaCopyUploaded = true;
            break;
          case 'other documents':
            updatedUser.onboarding.phase0.otherDocumentsUploaded = true;
            break;
        }
      });

      // Update overall documents status
      updatedUser.onboarding.phase0.documentsUploaded = 
        updatedUser.onboarding.phase0.passportUploaded &&
        updatedUser.onboarding.phase0.pccUploaded &&
        updatedUser.onboarding.phase0.otherDocumentsUploaded;

      localStorage.setItem(`onboarding_${user.id}`, JSON.stringify(updatedUser.onboarding.phase0));

      return updatedUser;
    }
    return u;
  });

  localStorage.setItem('users', JSON.stringify(updatedUsers));
};