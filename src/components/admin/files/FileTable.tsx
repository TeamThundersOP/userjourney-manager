import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserFile } from "@/types/userFile";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface FileTableProps {
  files: UserFile[];
  onDownload: (file: UserFile) => void;
  onDelete: (file: UserFile) => void;
}

const FileTable = ({ files, onDownload, onDelete }: FileTableProps) => {
  const getCategoryColor = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      'cv': 'bg-blue-500',
      'right to work': 'bg-green-500',
      'travel documents': 'bg-yellow-500',
      'passport': 'bg-purple-500',
      'pcc': 'bg-pink-500',
      'visa': 'bg-orange-500',
      'other documents': 'bg-gray-500'
    };
    return categoryMap[category.toLowerCase()] || 'bg-gray-500';
  };

  const formatCategoryName = (category: string): string => {
    const specialCases: { [key: string]: string } = {
      'cv': 'CV',
      'pcc': 'PCC',
    };

    if (specialCases[category.toLowerCase()]) {
      return specialCases[category.toLowerCase()];
    }

    return category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleDownload = async (file: UserFile) => {
    try {
      const { data, error } = await supabase.storage
        .from('user_files')
        .download(file.file_path);

      if (error) {
        throw error;
      }

      // Create a download link
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Failed to download file");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Upload Date</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow key={file.id}>
            <TableCell className="font-medium">{file.name}</TableCell>
            <TableCell>{file.type}</TableCell>
            <TableCell>
              <Badge 
                className={`${getCategoryColor(file.category)} text-white`}
              >
                {formatCategoryName(file.category)}
              </Badge>
            </TableCell>
            <TableCell>{new Date(file.uploaded_at).toLocaleDateString()}</TableCell>
            <TableCell>{file.size}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(file)}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(file)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FileTable;