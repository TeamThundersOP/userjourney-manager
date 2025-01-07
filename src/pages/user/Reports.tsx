import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Report } from "@/types/reports";
import { Skeleton } from "@/components/ui/skeleton";

const Reports = () => {
  const { user } = useUser();
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const queryClient = useQueryClient();

  const { data: userReports = [], isLoading, error } = useQuery({
    queryKey: ['userReports', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return [];
      }

      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reports:', error);
        throw error;
      }

      return data as Report[];
    },
    enabled: !!user?.id
  });

  const submitReport = useMutation({
    mutationFn: async (reportData: { type: string; description: string }) => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const newReport = {
        user_id: user.id,
        type: reportData.type,
        description: reportData.description,
        status: 'Pending'
      };

      const { data, error } = await supabase
        .from('reports')
        .insert([newReport])
        .select()
        .single();

      if (error) {
        console.error('Error submitting report:', error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Report submitted successfully");
      setDescription("");
      setType("");
      queryClient.invalidateQueries({ queryKey: ['userReports', user?.id] });
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      toast.error("Failed to submit report");
    }
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

  if (!user?.id) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error loading reports: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
            <Button 
              type="submit" 
              disabled={submitReport.isPending}
            >
              {submitReport.isPending ? 'Submitting...' : 'Submit Report'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {userReports && userReports.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userReports.map((report: Report) => (
                <div
                  key={report.id}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{report.type}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(report.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-sm rounded-full ${
                      report.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      report.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      report.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4 text-center text-gray-500">
            No reports found
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reports;