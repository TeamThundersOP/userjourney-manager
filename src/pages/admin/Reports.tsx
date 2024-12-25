import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("");
  const [filterDate, setFilterDate] = useState<Date>();
  const [filterSender, setFilterSender] = useState<string>("");

  // Mock reports data with automatic refresh
  const { data: reports, refetch } = useQuery({
    queryKey: ['reports'],
    queryFn: () => {
      // Mock data for demonstration
      return [
        { id: 1, type: 'Bug Report', status: 'Open', date: '2024-03-15', sender: 'john@example.com', description: 'Users are experiencing login issues on mobile devices.' },
        { id: 2, type: 'Feature Request', status: 'In Progress', date: '2024-03-14', sender: 'jane@example.com', description: 'Add dark mode support to the application.' },
        { id: 3, type: 'Support Ticket', status: 'Closed', date: '2024-03-13', sender: 'mike@example.com', description: 'Password reset functionality not working.' },
        { id: 4, type: 'Bug Report', status: 'Open', date: '2024-03-12', sender: 'sarah@example.com', description: 'Performance issues in the dashboard.' },
        { id: 5, type: 'Feature Request', status: 'Open', date: '2024-03-11', sender: 'alex@example.com', description: 'Request for multi-language support.' },
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
      setSelectedReport({ ...selectedReport, status: newStatus });
      toast.success("Report status updated successfully");
      refetch();
    }
  };

  const filteredReports = reports?.filter((report) => {
    const matchesType = filterType ? report.type === filterType : true;
    const matchesDate = filterDate
      ? report.date === format(filterDate, 'yyyy-MM-dd')
      : true;
    const matchesSender = filterSender
      ? report.sender.toLowerCase().includes(filterSender.toLowerCase())
      : true;
    return matchesType && matchesDate && matchesSender;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="Bug Report">Bug Report</SelectItem>
              <SelectItem value="Feature Request">Feature Request</SelectItem>
              <SelectItem value="Support Ticket">Support Ticket</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-[200px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filterDate ? format(filterDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filterDate}
                onSelect={setFilterDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Input
            placeholder="Search by sender email"
            value={filterSender}
            onChange={(e) => setFilterSender(e.target.value)}
            className="w-full md:w-[300px]"
          />

          {(filterType || filterDate || filterSender) && (
            <Button
              variant="outline"
              onClick={() => {
                setFilterType("");
                setFilterDate(undefined);
                setFilterSender("");
              }}
              className="w-full md:w-auto"
            >
              Clear Filters
            </Button>
          )}
        </CardContent>
      </Card>
      
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
                <TableHead>Sender</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports?.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.sender}</TableCell>
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
            <DialogDescription>
              View and update the report status
            </DialogDescription>
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
                <p className="font-medium">Sender</p>
                <p className="text-sm text-muted-foreground">{selectedReport.sender}</p>
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