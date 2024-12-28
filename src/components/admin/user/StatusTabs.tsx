import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StatusTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const StatusTabs = ({ activeTab, onTabChange }: StatusTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full max-w-[500px] grid-cols-4">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default StatusTabs;