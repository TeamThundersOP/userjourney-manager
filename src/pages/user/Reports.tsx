import { CreateReportForm } from "@/components/user/reports/CreateReportForm";
import { ReportsList } from "@/components/user/reports/ReportsList";

const Reports = () => {
  return (
    <div className="space-y-6">
      <CreateReportForm />
      <ReportsList />
    </div>
  );
};

export default Reports;