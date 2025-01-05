import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateUserDialog = ({ open, onOpenChange }: CreateUserDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // First check if email already exists in candidates table
      const { data: existingUsers, error: queryError } = await supabase
        .from('candidates')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (queryError) {
        console.error('Error checking existing user:', queryError);
        toast({
          title: "Error",
          description: "Failed to check if user exists. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (existingUsers) {
        toast({
          title: "Error",
          description: "A user with this email already exists.",
          variant: "destructive",
        });
        return;
      }

      // Call the edge function to create the user
      const response = await supabase.functions.invoke('create-user', {
        body: { email, password }
      });

      if (response.error) {
        const errorData = JSON.parse(response.error.message);
        toast({
          title: "Error",
          description: errorData.message || "Failed to create user. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "User created successfully and can log in immediately.",
      });

      queryClient.invalidateQueries({ queryKey: ['users'] });
      setEmail("");
      setPassword("");
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Enter the details for the new user below. The account will be automatically confirmed.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create User"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;