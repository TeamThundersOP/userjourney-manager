import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { User, PersonalInfo, OnboardingPhase0, OnboardingPhase1, OnboardingPhase2 } from "@/types/user";
import { Tables } from "@/integrations/supabase/types";

export const transformUserData = (candidate: Tables<'candidates'>): User => {
  // Transform personal_info
  const personalInfo = candidate.personal_info as Record<string, unknown>;
  const transformedPersonalInfo: PersonalInfo = {
    familyName: String(personalInfo?.familyName || ''),
    givenName: String(personalInfo?.givenName || ''),
    otherNames: String(personalInfo?.otherNames || ''),
    fullName: String(personalInfo?.fullName || ''),
    nationality: String(personalInfo?.nationality || ''),
    placeOfBirth: String(personalInfo?.placeOfBirth || ''),
    dateOfBirth: String(personalInfo?.dateOfBirth || ''),
    gender: String(personalInfo?.gender || ''),
    countryOfResidence: String(personalInfo?.countryOfResidence || ''),
    passportNumber: String(personalInfo?.passportNumber || ''),
    passportIssueDate: String(personalInfo?.passportIssueDate || ''),
    passportExpiryDate: String(personalInfo?.passportExpiryDate || ''),
    passportPlaceOfIssue: String(personalInfo?.passportPlaceOfIssue || ''),
    address: String(personalInfo?.address || ''),
    city: String(personalInfo?.city || ''),
    postalCode: String(personalInfo?.postalCode || ''),
    country: String(personalInfo?.country || ''),
    phone: String(personalInfo?.phone || ''),
  };

  // Transform onboarding data
  const defaultPhase0: OnboardingPhase0 = {
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
    ukContactUpdated: false,
  };

  const defaultPhase1: OnboardingPhase1 = {
    hmrcChecklist: false,
    companyAgreements: false,
    pensionScheme: false,
    bankStatements: false,
    vaccinationProof: false,
  };

  const defaultPhase2: OnboardingPhase2 = {
    rightToWork: false,
    shareCode: false,
    dbs: false,
    onboardingComplete: false,
  };

  const onboardingData = candidate.onboarding as Record<string, unknown>;
  const transformedOnboarding = {
    currentPhase: Number(onboardingData?.currentPhase ?? 0),
    phase0: { ...defaultPhase0, ...(onboardingData?.phase0 as Partial<OnboardingPhase0> ?? {}) },
    phase1: { ...defaultPhase1, ...(onboardingData?.phase1 as Partial<OnboardingPhase1> ?? {}) },
    phase2: { ...defaultPhase2, ...(onboardingData?.phase2 as Partial<OnboardingPhase2> ?? {}) },
    approvals: {
      phase0: Boolean(onboardingData?.approvals?.phase0 ?? false),
      phase1: Boolean(onboardingData?.approvals?.phase1 ?? false),
      phase2: Boolean(onboardingData?.approvals?.phase2 ?? false),
    },
  };

  return {
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
    personal_info: transformedPersonalInfo,
    personalInfo: transformedPersonalInfo,
    onboarding: transformedOnboarding,
  };
};

const ViewUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      try {
        const { data: candidate, error } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (error) throw error;
        if (candidate) {
          const transformedUser = transformUserData(candidate);
          setUser(transformedUser);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">User Details</h1>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <p className="font-medium capitalize">{user.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;