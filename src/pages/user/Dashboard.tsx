import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserFiles } from "@/components/user/UserFiles";
import PersonalInfoForm from "@/components/user/personal-info/PersonalInfoForm";
import { ProgressCard } from "@/components/user/dashboard/ProgressCard";
import { DocumentsTab } from "@/components/user/dashboard/DocumentsTab";
import { User } from "@/types/user";
import { UserFile } from "@/types/userFile";

const Dashboard = () => {
  const { userId, setHasFilledPersonalInfo } = useUserAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("personal-info");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        navigate('/user/login');
        return;
      }

      const { data: candidate, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user:', error);
        toast({
          title: "Error",
          description: "Failed to fetch user data",
          variant: "destructive",
        });
        return;
      }

      if (candidate) {
        // Convert database fields to match our User type
        const personalInfo = candidate.personal_info as User['personal_info'];
        
        // Safely cast the onboarding data with default values if needed
        const rawOnboarding = candidate.onboarding as any;
        const onboarding = {
          currentPhase: rawOnboarding?.currentPhase ?? 0,
          phase0: {
            personalDetailsCompleted: rawOnboarding?.phase0?.personalDetailsCompleted ?? false,
            cvSubmitted: rawOnboarding?.phase0?.cvSubmitted ?? false,
            interviewCompleted: rawOnboarding?.phase0?.interviewCompleted ?? false,
            jobStatus: rawOnboarding?.phase0?.jobStatus ?? 'pending',
            passportUploaded: rawOnboarding?.phase0?.passportUploaded ?? false,
            pccUploaded: rawOnboarding?.phase0?.pccUploaded ?? false,
            otherDocumentsUploaded: rawOnboarding?.phase0?.otherDocumentsUploaded ?? false,
            offerLetterSent: rawOnboarding?.phase0?.offerLetterSent ?? false,
            cosSent: rawOnboarding?.phase0?.cosSent ?? false,
            documentsUploaded: rawOnboarding?.phase0?.documentsUploaded ?? false,
            visaStatus: rawOnboarding?.phase0?.visaStatus ?? 'pending',
            travelDetailsUpdated: rawOnboarding?.phase0?.travelDetailsUpdated ?? false,
            travelDocumentsUploaded: rawOnboarding?.phase0?.travelDocumentsUploaded ?? false,
            visaCopyUploaded: rawOnboarding?.phase0?.visaCopyUploaded ?? false,
            ukContactUpdated: rawOnboarding?.phase0?.ukContactUpdated ?? false,
            ukContactNumber: rawOnboarding?.phase0?.ukContactNumber ?? '',
            ukAddress: rawOnboarding?.phase0?.ukAddress ?? '',
            feedback: rawOnboarding?.phase0?.feedback ?? '',
          },
          phase1: {
            hmrcChecklist: rawOnboarding?.phase1?.hmrcChecklist ?? false,
            companyAgreements: rawOnboarding?.phase1?.companyAgreements ?? false,
            pensionScheme: rawOnboarding?.phase1?.pensionScheme ?? false,
            bankStatements: rawOnboarding?.phase1?.bankStatements ?? false,
            vaccinationProof: rawOnboarding?.phase1?.vaccinationProof ?? false,
            feedback: rawOnboarding?.phase1?.feedback ?? '',
          },
          phase2: {
            rightToWork: rawOnboarding?.phase2?.rightToWork ?? false,
            shareCode: rawOnboarding?.phase2?.shareCode ?? false,
            dbs: rawOnboarding?.phase2?.dbs ?? false,
            onboardingComplete: rawOnboarding?.phase2?.onboardingComplete ?? false,
            feedback: rawOnboarding?.phase2?.feedback ?? '',
          },
          approvals: {
            phase0: rawOnboarding?.approvals?.phase0 ?? false,
            phase1: rawOnboarding?.approvals?.phase1 ?? false,
            phase2: rawOnboarding?.approvals?.phase2 ?? false,
          },
        };
        
        const userData: User = {
          id: candidate.id,
          name: candidate.name,
          username: candidate.username,
          email: candidate.email || '',
          status: candidate.status || 'pending',
          created_at: candidate.created_at,
          cv_submitted: candidate.cv_submitted,
          interview_status: candidate.interview_status,
          offer_letter_sent: candidate.offer_letter_sent,
          cos_sent: candidate.cos_sent,
          right_to_work: candidate.right_to_work,
          onboarding_complete: candidate.onboarding_complete,
          has_reset_password: candidate.has_reset_password,
          personal_info: personalInfo,
          personalInfo: personalInfo, // Alias for frontend compatibility
          onboarding: onboarding,
        };

        setUser(userData);

        // Check if personal info is filled
        const hasFilledInfo = personalInfo && Object.values(personalInfo).some(value => value !== null);
        setHasFilledPersonalInfo(hasFilledInfo);
      }
    };

    fetchUser();
  }, [userId, navigate, setHasFilledPersonalInfo, toast]);

  const handleFileUpload = (file: UserFile) => {
    if (!user) return;

    // Update local storage
    const existingFiles = JSON.parse(localStorage.getItem('userFiles') || '[]');
    localStorage.setItem('userFiles', JSON.stringify([...existingFiles, file]));

    // Update onboarding status based on file category
    if (user.onboarding) {
      const updatedOnboarding = { ...user.onboarding };
      
      switch(file.category) {
        case 'passport':
          updatedOnboarding.phase0.passportUploaded = true;
          break;
        case 'pcc':
          updatedOnboarding.phase0.pccUploaded = true;
          break;
        case 'other':
          updatedOnboarding.phase0.otherDocumentsUploaded = true;
          break;
        case 'visa':
          updatedOnboarding.phase0.visaCopyUploaded = true;
          break;
        case 'travel':
          updatedOnboarding.phase0.travelDocumentsUploaded = true;
          break;
      }

      // Update user in local storage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, onboarding: updatedOnboarding } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Update local state
      setUser(prev => prev ? { ...prev, onboarding: updatedOnboarding } : null);
    }

    toast({
      title: "Success",
      description: "File uploaded successfully"
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p>Please wait while we fetch your information.</p>
        </div>
      </div>
    );
  }

  const phase0Progress = user.onboarding?.phase0 
    ? Object.values(user.onboarding.phase0).filter(value => value === true).length / 
      Object.values(user.onboarding.phase0).filter(value => typeof value === 'boolean').length * 100
    : 0;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <ProgressCard userName={user.name} progress={phase0Progress} />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="files">My Files</TabsTrigger>
        </TabsList>

        <TabsContent value="personal-info" className="space-y-4">
          <PersonalInfoForm />
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <DocumentsTab onFileUpload={handleFileUpload} />
        </TabsContent>

        <TabsContent value="files">
          <UserFiles userId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
