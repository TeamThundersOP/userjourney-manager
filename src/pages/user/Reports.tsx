import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Reports = () => {
  const [issue, setIssue] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the report to your backend
    toast({
      title: "Report Submitted",
      description: "We'll get back to you soon regarding your issue.",
    });
    setIssue("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="issue" className="block text-sm font-medium mb-2">
              Describe your issue
            </label>
            <textarea
              id="issue"
              className="w-full min-h-[200px] p-4 border rounded-md"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Please describe any issues or problems you're experiencing..."
              required
            />
          </div>
          <Button type="submit">Submit Report</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Reports;