import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, LayoutTemplate, Shapes, TableOfContents } from "lucide-react";
import FileEditorSections from "./file-editor-sections";

const FileEditorSidebar = () => {
  return (
    <Tabs className="flex h-full bg-background" defaultValue={"sections"}>
      <TabsList className="flex flex-col h-full bg-background border-r rounded-none  py-5 gap-3 justify-start">
        <TabsTrigger
          value="sections"
          className="data-[state=active]:shadow-none rounded-none flex flex-col data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground/80"
        >
          <TableOfContents size={20} />
          <span className="text-[10px] font-medium">Sections</span>
        </TabsTrigger>

        <TabsTrigger
          value="templates"
          className="data-[state=active]:shadow-none rounded-none flex flex-col data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground/80"
        >
          <Book size={20} />
          <span className="text-[10px] font-medium">Templates</span>
        </TabsTrigger>

        <TabsTrigger
          value="layouts"
          className="data-[state=active]:shadow-none rounded-none flex flex-col data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground/80"
        >
          <LayoutTemplate size={20} />
          <span className="text-[10px] font-medium">Layouts</span>
        </TabsTrigger>

        <TabsTrigger
          value="shapes"
          className="data-[state=active]:shadow-none rounded-none flex flex-col data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground/80"
        >
          <Shapes size={20} />
          <span className="text-[10px] font-medium">Shapes</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="sections"
        className="border-r h-full rounded-none m-0 w-[300px]"
      >
        <FileEditorSections />
      </TabsContent>
      <TabsContent
        value="templates"
        className="border-r h-full rounded-none m-0 w-[300px]"
      >
        Templates Here...
      </TabsContent>
      <TabsContent
        value="layouts"
        className="border-r h-full rounded-none m-0 w-[300px]"
      >
        Layouts Here...
      </TabsContent>
      <TabsContent
        value="shapes"
        className="border-r h-full rounded-none m-0 w-[300px]"
      >
        Shapes Here...
      </TabsContent>
    </Tabs>
  );
};

export default FileEditorSidebar;
