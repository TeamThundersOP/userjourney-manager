import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

const Reports = () => {
  // Mock reports data with automatic refresh
  const { data: reports } = useQuery({
    queryKey: ['reports'],
    queryFn: () => {
      // Mock data for demonstration
      return [
        { id: 1, type: 'Bug Report', status: 'Open', date: '2024-03-15' },
        { id: 2, type: 'Feature Request', status: 'In Progress', date: '2024-03-14' },
        { id: 3, type: 'Support Ticket', status: 'Closed', date: '2024-03-13' },
        { id: 4, type: 'Bug Report', status: 'Open', date: '2024-03-12' },
        { id: 5, type: 'Feature Request', status: 'Open', date: '2024-03-11' },
      ];
    },
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports?.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>{report.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;