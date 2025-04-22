import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const LeaveConfirmModal = ({
  open,
  onLeave,
  onCancel,
}: {
  open: boolean;
  onLeave: () => void;
  onCancel: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You have unsaved changes</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to leave without saving?</p>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Don't leave
          </Button>
          <Button variant="destructive" onClick={onLeave}>
            Leave anyway
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
