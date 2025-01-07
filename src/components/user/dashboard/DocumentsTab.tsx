import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DocumentsTab = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleUpload = () => {
    // Handle upload logic
    setIsUploadDialogOpen(false);
  };

  const handleDelete = () => {
    // Handle delete logic
    setIsDeleteDialogOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsUploadDialogOpen(true)}>Upload Document</Button>
      <Button onClick={() => setIsDeleteDialogOpen(true)}>Delete Document</Button>
      
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Choose a file to upload for your documentation.
            </DialogDescription>
          </DialogHeader>
          <input type="file" />
          <Button onClick={handleUpload}>Submit</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this document? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentsTab;
