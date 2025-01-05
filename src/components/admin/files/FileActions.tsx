import { UserFile } from "@/types/userFile";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface FileActionsProps {
  onFileChange: (files: UserFile[]) => void;
}

const FileActions = ({ onFileChange }: FileActionsProps) => {
  const queryClient = useQueryClient();

  const handleDownload = async (file: UserFile) => {
    try {
      const fileData = localStorage.getItem(`file_${file.id}`);
      
      if (!fileData) {
        toast.error("File data not found");
        return;
      }

      const base64Response = await fetch(fileData);
      const blob = await base64Response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
      toast.success(`Downloading ${file.name}`);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error("Error downloading file");
    }
  };

  const handleDelete = (file: UserFile) => {
    try {
      localStorage.removeItem(`file_${file.id}`);
      
      const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
      const updatedFiles = allFiles.filter((f) => f.id !== file.id);
      localStorage.setItem('userFiles', JSON.stringify(updatedFiles));
      
      onFileChange(updatedFiles);
      
      queryClient.invalidateQueries({ queryKey: ['userFiles'] });
      toast.success(`${file.name} deleted successfully`);
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error("Error deleting file");
    }
  };

  return { handleDownload, handleDelete };
};

export default FileActions;