import { User } from "@/types/user";
import { UserFile } from "@/types/userFile";
import { toast } from "sonner";

export const getUserFiles = (userId: string | number): UserFile[] => {
  try {
    const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
    console.log('All files from localStorage:', allFiles);
    console.log('Looking for files with userId:', userId);
    
    // Ensure we're working with strings for comparison
    const targetUserId = userId?.toString();
    
    const userFiles = allFiles.filter(file => {
      // Handle potential null/undefined userId
      if (!file.userId) return false;
      
      const fileUserId = file.userId.toString();
      console.log(`Comparing file ${file.name} - fileUserId: ${fileUserId} with targetUserId: ${targetUserId}`);
      return fileUserId === targetUserId;
    });
    
    console.log('Filtered files:', userFiles);
    return userFiles;
  } catch (error) {
    console.error('Error parsing user files:', error);
    return [];
  }
};

export const saveUserFile = (file: UserFile) => {
  try {
    const allFiles = JSON.parse(localStorage.getItem('userFiles') || '[]') as UserFile[];
    
    // Check if a file with the same category exists for this user
    const existingFileIndex = allFiles.findIndex((f) => {
      const fileUserId = f.userId?.toString();
      const newFileUserId = file.userId?.toString();
      return fileUserId === newFileUserId && f.category === file.category;
    });

    if (existingFileIndex !== -1) {
      // Remove the old file data
      localStorage.removeItem(`file_${allFiles[existingFileIndex].id}`);
      // Replace the old file with the new one
      allFiles[existingFileIndex] = file;
    } else {
      // Add new file
      allFiles.push(file);
    }

    localStorage.setItem('userFiles', JSON.stringify(allFiles));
    console.log('Saved/Updated file:', file);
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
    
    console.log('Updated files after deletion:', updatedFiles);
    
    toast.success(`${file.name} deleted successfully`);
    
    // Filter files for the specific user
    return updatedFiles.filter(f => {
      const fileUserId = f.userId?.toString();
      const targetUserId = file.userId?.toString();
      return fileUserId === targetUserId;
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    toast.error("Error deleting file");
    return [];
  }
};