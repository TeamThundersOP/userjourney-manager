import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ReportFilters } from "@/components/admin/reports/ReportFilters";
import { ReportsTable } from "@/components/admin/reports/ReportsTable";
import { ReportDetailsDialog } from "@/components/admin/reports/ReportDetailsDialog";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<Date>();
  const [filterSender, setFilterSender] = useState<string>("");

  const { data: reports, refetch } = useQuery({
    queryKey: ['reports'],
    queryFn: () => {
      return [
        { id: 1, type: 'Bug Report', status: 'Open', date: '2024-03-15', sender: 'john@example.com', description: 'Users are experiencing login issues on mobile devices.' },
        { id: 2, type: 'Feature Request', status: 'In Progress', date: '2024-03-14', sender: 'jane@example.com', description: 'Add dark mode support to the application.' },
        { id: 3, type: 'Support Ticket', status: 'Closed', date: '2024-03-13', sender: 'mike@example.com', description: 'Password reset functionality not working.' },
        { id: 4, type: 'Bug Report', status: 'Open', date: '2024-03-12', sender: 'sarah@example.com', description: 'Performance issues in the dashboard.' },
        { id: 5, type: 'Feature Request', status: 'Open', date: '2024-03-11', sender: 'alex@example.com', description: 'Request for multi-language support.' },
      ];
    },
    refetchInterval: 5000,
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
    const matchesType = filterType === "all" ? true : 
      report.type === (
        filterType === "bug" ? "Bug Report" :
        filterType === "feature" ? "Feature Request" :
        filterType === "support" ? "Support Ticket" : ""
      );
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
      
      <ReportFilters
        filterType={filterType}
        setFilterType={setFilterType}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        filterSender={filterSender}
        setFilterSender={setFilterSender}
      />
      
      <ReportsTable
        reports={filteredReports || []}
        onViewReport={handleViewReport}
      />

      <ReportDetailsDialog
        report={selectedReport}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Reports;