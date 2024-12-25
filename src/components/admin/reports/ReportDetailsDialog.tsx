import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ReportDetailsDialogProps {
  report: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (status: string) => void;
}

export const ReportDetailsDialog = ({
  report,
  isOpen,
  onOpenChange,
  onStatusChange,
}: ReportDetailsDialogProps) => {
  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <div>{report.type}</div>
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <div>{report.date}</div>
          </div>
          <div className="space-y-2">
            <Label>Sender</Label>
            <div>{report.sender}</div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <div className="text-sm text-gray-600">{report.description}</div>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={report.status} onValueChange={onStatusChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};