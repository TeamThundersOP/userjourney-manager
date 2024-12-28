import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/user";

const CreateUserForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    temporaryPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser: User = {
      id: Date.now(),
      email: formData.username,
      status: "Pending",
      personalInfo: {
        givenName: "",
        familyName: "",
        fullName: ""
      }
    };

    // Save to localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

    toast({
      title: "Success",
      description: "Candidate created successfully",
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Enter username"
            required
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="temporaryPassword">Temporary Password</Label>
          <Input
            id="temporaryPassword"
            type="password"
            placeholder="Enter temporary password"
            required
            value={formData.temporaryPassword}
            onChange={(e) => setFormData({ ...formData, temporaryPassword: e.target.value })}
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
        Create Candidate
      </Button>
    </form>
  );
};

export default CreateUserForm;