import { Progress } from "@/components/ui/progress";

interface PhaseProgressProps {
  progress: number;
  items: { key: string; value: boolean | string }[];
}

const PhaseProgress = ({ progress, items }: PhaseProgressProps) => {
  return (
    <div className="space-y-4">
      <Progress value={progress} className="mb-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {items.map(({ key, value }) => (
          <div key={key} className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              typeof value === 'string' 
                ? value === 'approved' 
                  ? 'bg-green-500' 
                  : value === 'rejected'
                  ? 'bg-red-500'
                  : 'bg-yellow-500'
                : value 
                ? 'bg-green-500' 
                : 'bg-gray-300'
            }`} />
            <span className="text-sm capitalize">
              {typeof value === 'string' && key === 'visaStatus'
                ? `Visa Status: ${value}` 
                : key.replace(/([A-Z])/g, ' $1')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseProgress;