import { UserFile } from "@/types/userFile";

const API_URL = 'http://localhost:3000';

export const uploadFile = async (file: File, userId: string | number | null, category: string): Promise<UserFile> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', String(userId));
  formData.append('category', category);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  return response.json();
};

export const downloadFile = async (fileId: number): Promise<Blob> => {
  const response = await fetch(`${API_URL}/download/${fileId}`);
  
  if (!response.ok) {
    throw new Error('Failed to download file');
  }

  return response.blob();
};

export const deleteFile = async (fileId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/files/${fileId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete file');
  }
};

export const getUserFiles = async (userId: string | number): Promise<UserFile[]> => {
  const response = await fetch(`${API_URL}/files/user/${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user files');
  }

  return response.json();
};