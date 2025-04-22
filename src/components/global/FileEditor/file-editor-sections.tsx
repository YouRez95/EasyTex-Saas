import { Button } from "@/components/ui/button";
import { ArrowLeft, GripVertical, Plus } from "lucide-react";
import Rule from "./sections/rule";
import { Separator } from "@/components/ui/separator";
import ShadowBox from "./sections/shadowBox";
import AddSectionDialog from "./sections/add-section-dialog";
import { useSectionsStore } from "./store";
import { NormalBox } from "./sections/normalBox";

const SECTION_COMPONENTS: Record<string, React.FC> = {
  shadowbox: ShadowBox,
  rule: Rule,
  normalbox: NormalBox,
};

const FileEditorSections = () => {
  const { sections, selectedSection, setSelectedSection } = useSectionsStore();

  const SectionComponent = selectedSection
    ? SECTION_COMPONENTS[selectedSection.type]
    : null;

  return (
    <div className="mx-4 pt-2 pb-9 overflow-y-auto h-full scrollbar-hide">
      <div className="flex flex-col gap-2 my-5">
        <h1 className="text-medium font-bold">Sections</h1>
        <p className="text-muted-foreground text-sm">
          Add, edit, and reorder sections easily.
        </p>
      </div>
      <Separator className="mb-4" />

      {!selectedSection && (
        <div className="flex flex-col gap-2">
          {sections &&
            sections.map((section, index) => (
              <Button
                key={index}
                className="flex items-center justify-between active:cursor-grab"
                onClick={() => setSelectedSection(section)}
              >
                <p className="">{section.title + " " + section.order}</p>
                <GripVertical size={20} className="" />
              </Button>
            ))}

          <AddSectionDialog />
        </div>
      )}

      {selectedSection && (
        <div className="space-y-4">
          <div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setSelectedSection(null)}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </Button>
          </div>

          {SectionComponent && <SectionComponent />}
        </div>
      )}
    </div>
  );
};

export default FileEditorSections;
