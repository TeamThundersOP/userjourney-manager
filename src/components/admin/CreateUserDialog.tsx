import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { User } from "lucide-react";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateUserDialog = ({ open, onOpenChange }: CreateUserDialogProps) => {
  const [username, setUsername] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser = {
      id: Date.now(),
      email: username,
      password: tempPassword,
      status: "Pending",
      personalInfo: {
        email: username,
      },
      files: []
    };

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

    toast({
      title: "Success",
      description: "Candidate created successfully",
    });

    queryClient.invalidateQueries({ queryKey: ['users'] });

    setUsername("");
    setTempPassword("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6" />
            <DialogTitle>Create New Candidate</DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Temporary Password</label>
            <Input
              type="password"
              placeholder="Enter temporary password"
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
            Create Candidate
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;