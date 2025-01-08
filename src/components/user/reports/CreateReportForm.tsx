import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const CreateReportForm = () => {
  const { user } = useUser();
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const queryClient = useQueryClient();

  const submitReport = useMutation({
    mutationFn: async (reportData: { type: string; description: string }) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      const newReport = {
        user_id: user.id,
        type: reportData.type,
        description: reportData.description,
        status: "Pending",
      };

      const { data, error } = await supabase
        .from("reports")
        .insert([newReport])
        .select()
        .single();

      if (error) {
        console.error("Error submitting report:", error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Report submitted successfully");
      setDescription("");
      setType("");
      queryClient.invalidateQueries({ queryKey: ["userReports", user?.id] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Failed to submit report");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!type) {
      toast.error("Please select a report type");
      return;
    }

    if (!description.trim()) {
      toast.error("Please provide a description");
      return;
    }

    submitReport.mutate({ type, description });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-2">
              Report Type
            </label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bug Report">Bug Report</SelectItem>
                <SelectItem value="Feature Request">Feature Request</SelectItem>
                <SelectItem value="Support Ticket">Support Ticket</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              className="w-full min-h-[200px] p-4 border rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe your issue in detail..."
              required
            />
          </div>
          <Button type="submit" disabled={submitReport.isPending}>
            {submitReport.isPending ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};