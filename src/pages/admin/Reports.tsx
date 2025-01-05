import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ReportsTable } from "@/components/admin/reports/ReportsTable";
import { ReportDetailsDialog } from "@/components/admin/reports/ReportDetailsDialog";
import { ReportFilters } from "@/components/admin/reports/ReportFilters";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState<Date>();
  const [filterSender, setFilterSender] = useState("");
  const [filterId, setFilterId] = useState("");

  const { data: reports } = useQuery({
    queryKey: ['reports', filterType, filterDate, filterSender, filterId],
    queryFn: () => {
      // Get reports from localStorage
      const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
      
      // Get users to map their emails
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      return reports
        .map((report: any) => {
          // Find the user who created the report
          const user = users.find((u: any) => u.id === report.userId);
          console.log('Report userId:', report.userId);
          console.log('Found user:', user);
          
          return {
            ...report,
            status: report.status || 'Pending',
            sender: user?.email || 'Unknown User', // Use optional chaining
          };
        })
        .filter((report: any) => {
          const matchesType = filterType === "all" || report.type === filterType;
          const matchesDate = !filterDate || report.date === filterDate.toISOString().split('T')[0];
          const matchesSender = !filterSender || 
            report.sender.toLowerCase().includes(filterSender.toLowerCase());
          const matchesId = !filterId || 
            report.id.toString() === filterId;
          
          return matchesType && matchesDate && matchesSender && matchesId;
        });
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-araboto-bold text-primary">Reports</h1>
          <p className="text-muted-foreground">
            View and manage user reports
          </p>
        </div>
      </div>
      
      <ReportFilters
        filterType={filterType}
        setFilterType={setFilterType}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        filterSender={filterSender}
        setFilterSender={setFilterSender}
        filterId={filterId}
        setFilterId={setFilterId}
      />

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