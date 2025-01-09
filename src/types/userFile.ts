export interface UserFile {
  id: number;
  userId: string | number | null;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
  category: string;
}