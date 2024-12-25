import { useState } from "react";
import { ReportFilters } from "@/components/admin/reports/ReportFilters";
import { ReportsTable } from "@/components/admin/reports/ReportsTable";
import { ReportDetailsDialog } from "@/components/admin/reports/ReportDetailsDialog";
import { useQuery } from "@tanstack/react-query";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<Date>();
  const [filterSender, setFilterSender] = useState<string>("");

  // Initialize reports in localStorage if it doesn't exist
  if (!localStorage.getItem('reports')) {
    localStorage.setItem('reports', JSON.stringify([]));
  }

  const { data: reports, refetch } = useQuery({
    queryKey: ['reports'],
    queryFn: () => {
      const storedReports = localStorage.getItem('reports');
      return storedReports ? JSON.parse(storedReports) : [];
    },
    refetchInterval: 5000, // Refresh every 5 seconds to catch new reports
  });

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleStatusChange = (newStatus: string) => {
    if (selectedReport) {
      const updatedReports = reports.map((report: any) => 
        report.id === selectedReport.id 
          ? { ...report, status: newStatus }
          : report
      );
      localStorage.setItem('reports', JSON.stringify(updatedReports));
      setSelectedReport({ ...selectedReport, status: newStatus });
      refetch();
    }
  };

  const filteredReports = reports?.filter((report: any) => {
    const matchesType = filterType === "all" ? true : 
      report.type.toLowerCase() === (
        filterType === "bug" ? "bug report" :
        filterType === "feature" ? "feature request" :
        filterType === "support" ? "support ticket" : ""
      ).toLowerCase();
    
    const matchesDate = filterDate
      ? report.date === filterDate.toISOString().split('T')[0]
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