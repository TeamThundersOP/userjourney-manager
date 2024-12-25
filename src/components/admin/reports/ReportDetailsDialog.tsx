import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

interface Report {
  id: number;
  type: string;
  status: string;
  date: string;
  sender: string;
  description: string;
}

interface ReportDetailsDialogProps {
  report: Report | null;
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
          <DialogDescription>View and update the report status</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Type</p>
            <p className="text-sm text-muted-foreground">{report.type}</p>
          </div>
          <div>
            <p className="font-medium">Description</p>
            <p className="text-sm text-muted-foreground">{report.description}</p>
          </div>
          <div>
            <p className="font-medium">Date</p>
            <p className="text-sm text-muted-foreground">{report.date}</p>
          </div>
          <div>
            <p className="font-medium">Sender</p>
            <p className="text-sm text-muted-foreground">{report.sender}</p>
          </div>
          <div>
            <p className="font-medium">Status</p>
            <Select value={report.status} onValueChange={onStatusChange}>
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
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};