import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Download, Redo, Save, Undo } from "lucide-react";
import { useSectionsStore } from "./store";
import { useSectionsService } from "@/lib/api/useSectionsService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LeaveConfirmModal } from "./leave-confirm-modal";

type FileEditorHeaderProps = {
  folderSlug: string;
  fileId: string;
};

const FileEditorHeader = ({ folderSlug, fileId }: FileEditorHeaderProps) => {
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { sections, hasUnsavedChanges, setHasUnsavedChanges } =
    useSectionsStore();
  const { saveSectionsToFile } = useSectionsService();
  const saveSectionMutation = useMutation({
    mutationFn: saveSectionsToFile,
    onSuccess: () => {
      console.log("sections saved successful");
      queryClient.invalidateQueries({
        queryKey: ["sections", folderSlug, fileId],
      });
    },
    onError: (error) => {
      console.log("sections saved failed", error);
    },
  });

  const handleSaveSections = () => {
    if (!sections || sections.length === 0) return;
    saveSectionMutation.mutate({ sections, folderSlug, fileId });
    setHasUnsavedChanges(false);
  };
  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowLeaveModal(true);
    } else {
      router.push("/dashboard/folders/" + folderSlug);
    }
  };

  const handleLeaveAnyway = () => {
    setHasUnsavedChanges(false);
    setShowLeaveModal(false);
    router.push("/dashboard/folders/" + folderSlug);
  };

  const handleCancelLeave = () => {
    setShowLeaveModal(false);
  };

  return (
    <>
      <LeaveConfirmModal
        open={showLeaveModal}
        onLeave={handleLeaveAnyway}
        onCancel={handleCancelLeave}
      />

      <header className="h-[60px] bg-background border-b flex items-center justify-between px-10">
        {/* Back Button */}
        <div className="items-center flex gap-3" onClick={handleBack}>
          <div className="border h-7 w-7 flex items-center justify-center p-1 rounded-full border-foreground cursor-pointer">
            <ArrowLeft size={20} className="text-foreground" />
          </div>
          <p className="mt-1">Back To Folder</p>
        </div>

        {/* Landscape and page size */}
        <div className="flex items-center gap-5">
          <div>
            <Tabs defaultValue="A4" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="A4">A4</TabsTrigger>
                <TabsTrigger value="A5">A5</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <Tabs defaultValue="portrait" className="w-[400px]">
              <TabsList>
                <TabsTrigger
                  value="portrait"
                  className="flex items-center gap-2"
                >
                  <div>Portrait</div>
                  <div className="w-3 h-4 bg-muted-foreground" />
                </TabsTrigger>
                <TabsTrigger
                  value="landscape"
                  className="flex items-center gap-2"
                >
                  <div>Landscape</div>
                  <div className="w-4 h-3 bg-muted-foreground" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Undo/Redo and Save and download */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Button variant={"outline"}>
              <Undo size={20} />
            </Button>

            <Button variant={"outline"}>
              <Redo size={20} />
            </Button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Button onClick={handleSaveSections}>
                Save
                <Save size={20} />
              </Button>
              <Button variant={"secondary"}>
                Download
                <Download size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default FileEditorHeader;
