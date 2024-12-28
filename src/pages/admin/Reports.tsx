import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ReportsTable } from "@/components/admin/reports/ReportsTable";
import { ReportDetailsDialog } from "@/components/admin/reports/ReportDetailsDialog";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: reports } = useQuery({
    queryKey: ['reports'],
    queryFn: () => {
      // In a real app, this would be an API call
      // For now, we'll get reports from localStorage
      const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
      return reports.map((report: any) => ({
        ...report,
        status: report.status || 'Pending', // Default status if not set
      }));
    },
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleStatusChange = (newStatus: string) => {
    if (selectedReport) {
      // Update report status in localStorage
      const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
      const updatedReports = reports.map((report: any) => 
        report.id === selectedReport.id 
          ? { ...report, status: newStatus }
          : report
      );
      localStorage.setItem('userReports', JSON.stringify(updatedReports));
      
      // Update selected report
      setSelectedReport({ ...selectedReport, status: newStatus });
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          View and manage user reports
        </p>
      </div>
      
      <ReportsTable
        reports={reports || []}
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