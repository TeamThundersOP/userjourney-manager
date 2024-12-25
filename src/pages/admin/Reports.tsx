import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock reports data with automatic refresh
  const { data: reports, refetch } = useQuery({
    queryKey: ['reports'],
    queryFn: () => {
      // Mock data for demonstration
      return [
        { id: 1, type: 'Bug Report', status: 'Open', date: '2024-03-15', description: 'Users are experiencing login issues on mobile devices.' },
        { id: 2, type: 'Feature Request', status: 'In Progress', date: '2024-03-14', description: 'Add dark mode support to the application.' },
        { id: 3, type: 'Support Ticket', status: 'Closed', date: '2024-03-13', description: 'Password reset functionality not working.' },
        { id: 4, type: 'Bug Report', status: 'Open', date: '2024-03-12', description: 'Performance issues in the dashboard.' },
        { id: 5, type: 'Feature Request', status: 'Open', date: '2024-03-11', description: 'Request for multi-language support.' },
      ];
    },
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleStatusChange = (newStatus: string) => {
    if (selectedReport) {
      // In a real application, this would be an API call
      setSelectedReport({ ...selectedReport, status: newStatus });
      toast.success("Report status updated successfully");
      refetch(); // Refresh the reports list
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports?.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewReport(report)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div>
                <p className="font-medium">Type</p>
                <p className="text-sm text-muted-foreground">{selectedReport.type}</p>
              </div>
              <div>
                <p className="font-medium">Description</p>
                <p className="text-sm text-muted-foreground">{selectedReport.description}</p>
              </div>
              <div>
                <p className="font-medium">Date</p>
                <p className="text-sm text-muted-foreground">{selectedReport.date}</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <Select
                  value={selectedReport.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;