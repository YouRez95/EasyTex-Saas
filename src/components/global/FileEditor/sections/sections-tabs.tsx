import { DUMMY_SECTIONS } from "@/constants/dummy-sections";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { useSectionsStore } from "../store";
import { Section } from "@/lib/section-types/base";

const SECTIONS = ["boxes", "rules", "tables"];

const SectionTabs = () => {
  const [sectionType, setSectionType] = useState<string>("boxes");
  const { addSections } = useSectionsStore();

  // WIP: Replace The Dummy Sections with the sections from the database
  const SECTIONS_CONTENT = DUMMY_SECTIONS.filter(
    (section) => section.type === sectionType
  ).map((section) => ({ ...section, config: JSON.parse(section.config) }));

  return (
    <div className="w-full flex flex-col gap-4">
      <ul className="flex gap-7 justify-start bg-transparent p-0 rounded-none border-b-2">
        {SECTIONS.map((section) => (
          <li
            key={section}
            className={cn(
              "border-primary pb-2 cursor-pointer",
              sectionType === section && "border-b-2"
            )}
            value={section}
            onClick={() => setSectionType(section)}
          >
            {section}
          </li>
        ))}
      </ul>
      <div className="flex justify-start gap-3 items-start">
        {SECTIONS_CONTENT.map((content) => (
          <div
            key={content.id}
            className="border w-72 p-2 h-72 flex items-center justify-center hover:bg-muted cursor-pointer relative"
            onClick={() => addSections(content.config as Section)}
          >
            <Image
              src={content.image}
              alt={content.title}
              width={200}
              height={200}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionTabs;
