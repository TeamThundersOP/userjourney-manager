import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: any) => u.id.toString() === userId);

  const renderInfoSection = (title: string, items: { label: string, value: string }[]) => (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index}>
            <h4 className="font-medium text-sm text-gray-500">{item.label}</h4>
            <p>{item.value || 'Not provided'}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {user?.personalInfo ? (
          <>
            {renderInfoSection('Basic Information', [
              { label: 'Family Name', value: user.personalInfo.familyName },
              { label: 'Given Name', value: user.personalInfo.givenName },
              { label: 'Other Names', value: user.personalInfo.otherNames },
              { label: 'Email', value: user.email }
            ])}
            
            <Separator className="my-6" />
            
            {renderInfoSection('Additional Information', [
              { label: 'Nationality', value: user.personalInfo.nationality },
              { label: 'Place of Birth', value: user.personalInfo.placeOfBirth },
              { label: 'Date of Birth', value: user.personalInfo.dateOfBirth },
              { label: 'Gender', value: user.personalInfo.gender },
              { label: 'Country of Residence', value: user.personalInfo.countryOfResidence }
            ])}
            
            <Separator className="my-6" />
            
            {renderInfoSection('Passport Information', [
              { label: 'Passport Number', value: user.personalInfo.passportNumber },
              { label: 'Passport Issue Date', value: user.personalInfo.passportIssueDate },
              { label: 'Passport Expiry Date', value: user.personalInfo.passportExpiryDate },
              { label: 'Passport Place of Issue', value: user.personalInfo.passportPlaceOfIssue }
            ])}
            
            <Separator className="my-6" />
            
            {renderInfoSection('Contact Information', [
              { label: 'Address', value: user.personalInfo.address },
              { label: 'City', value: user.personalInfo.city },
              { label: 'Postal Code', value: user.personalInfo.postalCode },
              { label: 'Country', value: user.personalInfo.country },
              { label: 'Phone', value: user.personalInfo.phone }
            ])}
            
            <Button 
              onClick={() => navigate('/user/personal-info')}
              variant="outline"
              className="mt-6"
            >
              Update Personal Information
            </Button>
          </>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">Please complete your personal information</p>
            <Button onClick={() => navigate('/user/personal-info')}>
              Fill Personal Information
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Profile;