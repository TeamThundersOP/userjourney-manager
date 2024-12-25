import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Reports = () => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!type || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    const reports = JSON.parse(localStorage.getItem('reports') || '[]');
    const newReport = {
      id: Date.now(),
      type,
      description,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      sender: localStorage.getItem('userEmail') || 'anonymous',
    };

    localStorage.setItem('reports', JSON.stringify([...reports, newReport]));
    
    setType("");
    setDescription("");
    toast.success("Report submitted successfully");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Submit a Report</CardTitle>
          <CardDescription>
            Let us know if you're experiencing any issues or have concerns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type of Report</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bug Report">Technical Issue</SelectItem>
                  <SelectItem value="Feature Request">Feature Request</SelectItem>
                  <SelectItem value="Support Ticket">Support Ticket</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide details about your report..."
                className="min-h-[150px]"
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;