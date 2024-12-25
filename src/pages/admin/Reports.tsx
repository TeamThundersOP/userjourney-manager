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
      // Get reports from localStorage or return empty array if none exist
      return JSON.parse(localStorage.getItem('reports') || '[]');
    },
    refetchInterval: 5000,
  });

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleStatusChange = (newStatus: string) => {
    if (selectedReport) {
      // Update report status in localStorage
      const updatedReports = reports.map((report: any) => 
        report.id === selectedReport.id 
          ? { ...report, status: newStatus }
          : report
      );
      localStorage.setItem('reports', JSON.stringify(updatedReports));
      setSelectedReport({ ...selectedReport, status: newStatus });
      toast.success("Report status updated successfully");
      refetch();
    }
  };

  const filteredReports = reports?.filter((report: any) => {
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