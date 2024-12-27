import { User } from "@/types/user";
import { UserFile } from "@/types/userFile";
import { toast } from "sonner";

export const getUserFiles = (userId: number): UserFile[] => {
  try {
    const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
    return allFiles.filter((file) => String(file.userId) === String(userId));
  } catch (error) {
    console.error('Error parsing user files:', error);
    return [];
  }
};

export const handleFileDownload = async (file: UserFile) => {
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

export const handleFileDelete = (file: UserFile): UserFile[] => {
  try {
    localStorage.removeItem(`file_${file.id}`);
    const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
    const updatedFiles = allFiles.filter((f) => f.id !== file.id);
    localStorage.setItem('userFiles', JSON.stringify(updatedFiles));
    toast.success(`${file.name} deleted successfully`);
    return updatedFiles.filter((f) => String(f.userId) === String(file.userId));
  } catch (error) {
    console.error('Error deleting file:', error);
    toast.error("Error deleting file");
    return [];
  }
};