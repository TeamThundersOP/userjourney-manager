import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface Report {
  id: number;
  type: string;
  status: string;
  date: string;
  sender: string;
  description: string;
}

interface ReportsTableProps {
  reports: Report[];
  onViewReport: (report: Report) => void;
}

export const ReportsTable = ({ reports, onViewReport }: ReportsTableProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports?.map((report) => (
              <Card key={report.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">#{report.id}</p>
                      <p className="text-sm text-muted-foreground">{report.type}</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {report.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      From: {report.sender}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Date: {report.date}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => onViewReport(report)}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports?.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {report.status}
                    </span>
                  </TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.sender}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewReport(report)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};