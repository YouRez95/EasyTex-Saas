import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import SectionTabs from "./sections-tabs";

const AddSectionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus size={20} className="mr-2" />
          <span>Add Section</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-start min-w-[900px]">
        <DialogHeader>
          <DialogTitle>Add Sections</DialogTitle>
          <DialogDescription>
            Add New Sections to your document.
          </DialogDescription>
        </DialogHeader>
        {/* MY Section Tabs */}
        <SectionTabs />
      </DialogContent>
    </Dialog>
  );
};

export default AddSectionDialog;
