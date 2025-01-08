import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Report } from "@/types/reports";
import { Skeleton } from "@/components/ui/skeleton";

export const ReportsList = () => {
  const { user } = useUser();

  const { data: userReports = [], isLoading, error } = useQuery({
    queryKey: ["userReports", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return [];
      }

      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reports:", error);
        throw error;
      }

      return data as Report[];
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error loading reports: {error.message}</p>
      </div>
    );
  }

  if (!userReports.length) {
    return (
      <Card>
        <CardContent className="p-4 text-center text-gray-500">
          No reports found
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
        <div className="space-y-4">
          {userReports.map((report: Report) => (
            <div key={report.id} className="p-4 border rounded-lg space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{report.type}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(report.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    report.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : report.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : report.status === "Resolved"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {report.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{report.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};