import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Report = () => {
  const [report, setReport] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userId = localStorage.getItem('userId');
    const reports = JSON.parse(localStorage.getItem('reports') || '[]');
    
    const newReport = {
      id: Date.now(),
      userId,
      content: report,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('reports', JSON.stringify([...reports, newReport]));
    setReport("");
    toast.success("Report submitted successfully");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Submit Report</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>New Report</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Write your report here..."
              value={report}
              onChange={(e) => setReport(e.target.value)}
              className="min-h-[200px]"
              required
            />
            <Button type="submit">Submit Report</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;