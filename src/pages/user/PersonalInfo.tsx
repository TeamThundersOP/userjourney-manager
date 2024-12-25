import PersonalInfoForm from '@/components/user/personal-info/PersonalInfoForm';

const PersonalInfo = () => {
  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <PersonalInfoForm />
      </div>
    </div>
  );
};

export default PersonalInfo;