import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Redo, Save, Undo } from "lucide-react";

const FileEditorHeader = () => {
  return (
    <header className="h-[60px] bg-background border-b flex items-center justify-between px-10">
      {/* Back Button */}
      <div className="items-center flex gap-3">
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
              <TabsTrigger value="portrait" className="flex items-center gap-2">
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
            <Button>
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
  );
};

export default FileEditorHeader;
