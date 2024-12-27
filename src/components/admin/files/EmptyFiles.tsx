import { FileText } from "lucide-react";

const EmptyFiles = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
      <FileText className="h-12 w-12 mb-2" />
      <p>No files uploaded yet</p>
    </div>
  );
};

export default EmptyFiles;