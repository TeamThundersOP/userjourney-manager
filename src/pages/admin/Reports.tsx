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
      // In a real app, this would be an API call
      // For now, we'll get reports from localStorage
      const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
      return reports
        .map((report: any) => ({
          ...report,
          status: report.status || 'Pending', // Default status if not set
        }))
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
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
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
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default Reports;