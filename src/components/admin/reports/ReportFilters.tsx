import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface ReportFiltersProps {
  filterType: string;
  setFilterType: (value: string) => void;
  filterDate: Date | undefined;
  setFilterDate: (date: Date | undefined) => void;
  filterSender: string;
  setFilterSender: (value: string) => void;
  filterId: string;
  setFilterId: (value: string) => void;
}

export const ReportFilters = ({
  filterType,
  setFilterType,
  filterDate,
  setFilterDate,
  filterSender,
  setFilterSender,
  filterId,
  setFilterId,
}: ReportFiltersProps) => {
  const clearFilters = () => {
    setFilterType("all");
    setFilterDate(undefined);
    setFilterSender("");
    setFilterId("");
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="bug">Bug Report</SelectItem>
            <SelectItem value="feature">Feature Request</SelectItem>
            <SelectItem value="support">Support Ticket</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-[200px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filterDate ? format(filterDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filterDate}
              onSelect={setFilterDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Input
          placeholder="Search by ID"
          value={filterId}
          onChange={(e) => setFilterId(e.target.value)}
          className="w-full md:w-[200px]"
          type="number"
        />

        <Input
          placeholder="Search by sender email"
          value={filterSender}
          onChange={(e) => setFilterSender(e.target.value)}
          className="w-full md:w-[300px]"
        />

        {(filterType !== "all" || filterDate || filterSender || filterId) && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full md:w-auto"
          >
            Clear Filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
};