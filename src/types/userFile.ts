export interface UserFile {
  id: number;
  userId: string | null;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
  category: string;
}