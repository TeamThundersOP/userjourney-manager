import { User } from "@/types/user";
import { UserFile } from "@/types/userFile";
import { toast } from "sonner";

export const getUserFiles = (userId: number): UserFile[] => {
  try {
    // Get all files from localStorage
    const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
    console.log('All files from localStorage:', allFiles); // Debug log
    
    // Filter files for specific user and ensure userId comparison works with both string and number types
    const userFiles = allFiles.filter((file) => {
      const fileUserId = typeof file.userId === 'string' ? parseInt(file.userId) : file.userId;
      const targetUserId = typeof userId === 'string' ? parseInt(userId as string) : userId;
      return fileUserId === targetUserId;
    });
    
    console.log('Filtered user files:', userFiles); // Debug log
    return userFiles;
  } catch (error) {
    console.error('Error parsing user files:', error);
    return [];
  }
};

export const saveUserFile = (file: UserFile) => {
  try {
    const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
    const updatedFiles = [...allFiles, file];
    localStorage.setItem('userFiles', JSON.stringify(updatedFiles));
    console.log('Saved file to localStorage:', file); // Debug log
    return true;
  } catch (error) {
    console.error('Error saving file:', error);
    return false;
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
    // Remove file data
    localStorage.removeItem(`file_${file.id}`);
    
    // Get and update files list
    const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
    const updatedFiles = allFiles.filter((f) => f.id !== file.id);
    localStorage.setItem('userFiles', JSON.stringify(updatedFiles));
    
    console.log('Updated files after deletion:', updatedFiles); // Debug log
    
    toast.success(`${file.name} deleted successfully`);
    return updatedFiles.filter((f) => {
      const fileUserId = typeof f.userId === 'string' ? parseInt(f.userId) : f.userId;
      const targetUserId = typeof file.userId === 'string' ? parseInt(file.userId) : file.userId;
      return fileUserId === targetUserId;
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    toast.error("Error deleting file");
    return [];
  }
};