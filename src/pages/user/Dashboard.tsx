import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/user/FileUpload";
import { UserFiles } from "@/components/user/UserFiles";
import PersonalInfoForm from "@/components/user/personal-info/PersonalInfoForm";

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
        const userData: User = {
          ...candidate,
          personalInfo: candidate.personal_info,
          onboarding: candidate.onboarding as User['onboarding']
        };
        setUser(userData);

        // Check if personal info is filled
        const hasFilledInfo = candidate.personal_info && 
          Object.values(candidate.personal_info).some(value => value !== null);
        setHasFilledPersonalInfo(hasFilledInfo);
      }
    };

    fetchUser();
  }, [userId, navigate, setHasFilledPersonalInfo, toast]);

  const handleFileUpload = async (file: File, category: string) => {
    if (!user) return;

    const timestamp = new Date().toISOString();
    const newFile = {
      id: Date.now(),
      userId: user.id,
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadedAt: timestamp,
      category: category,
    };

    // Update local storage
    const existingFiles = JSON.parse(localStorage.getItem('userFiles') || '[]');
    localStorage.setItem('userFiles', JSON.stringify([...existingFiles, newFile]));

    // Update onboarding status based on file category
    if (user.onboarding) {
      const updatedOnboarding = { ...user.onboarding };
      
      switch (category) {
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
      const updatedUsers = users.map((u: User) => 
        u.id === user.id ? { ...u, onboarding: updatedOnboarding } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Update local state
      setUser(prev => prev ? { ...prev, onboarding: updatedOnboarding } : null);
    }

    toast({
      title: "Success",
      description: "File uploaded successfully",
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
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Onboarding Progress</span>
              <span className="text-sm font-medium">{Math.round(phase0Progress)}%</span>
            </div>
            <Progress value={phase0Progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

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
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUpload
                category="passport"
                onUpload={handleFileUpload}
                label="Upload Passport"
                description="Please upload a clear copy of your passport"
                acceptedFileTypes={['.pdf', '.jpg', '.jpeg', '.png']}
              />
              <FileUpload
                category="pcc"
                onUpload={handleFileUpload}
                label="Upload Police Clearance Certificate"
                description="Please upload your police clearance certificate"
                acceptedFileTypes={['.pdf']}
              />
              <FileUpload
                category="other"
                onUpload={handleFileUpload}
                label="Upload Other Documents"
                description="Please upload any other required documents"
                acceptedFileTypes={['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <UserFiles userId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;