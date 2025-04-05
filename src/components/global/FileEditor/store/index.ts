import { sendSectionsToBackend } from "@/lib/api/compiler";
import { Section } from "@/lib/section-types/base";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type SectionWithOrder = Section & { order: number };

type SectionStore = {
  sections: SectionWithOrder[] | [];
  selectedSection: SectionWithOrder | null;
  lastResponse: { success: boolean; data?: any; error?: string } | null;
  setSelectedSection: (section: SectionWithOrder | null) => void;
  addSections: (section: Section) => void;
  editSections: (section: Section, order: number) => void;
  reorderSections: (sections: Section[]) => void;
  removeSection: (section: Section) => void;
  submitSections: (token: string) => Promise<void>;
};

export const useSectionsStore = create<SectionStore>()(
  subscribeWithSelector((set) => ({
    sections: [],
    lastResponse: null,
    selectedSection: null,
    setSelectedSection: (section) => set({ selectedSection: section }),
    addSections: (section) =>
      set((state) => ({
        sections: [
          ...state.sections,
          { ...section, order: state.sections.length + 1 },
        ],
      })),
    editSections: (newData, order) => {
      set((state) => ({
        sections: state.sections.map((section) =>
          section.order === order ? { ...newData, order } : section
        ),
      }));
    },
    removeSection: (section) =>
      set((state) => ({
        sections: state.sections.filter((s) => s.id !== section.id),
      })),
    //  WIP: Reorder sections
    reorderSections: (sections) => {},
    submitSections: async (token: string) => {
      const sections = useSectionsStore.getState().sections;
      const response = await sendSectionsToBackend(
        token as string,
        sections as Section[]
      );

      useSectionsStore.setState({ lastResponse: response });
    },
  }))
);

// useSectionsStore.subscribe(
//   (state) => [state.sections, state.token],
//   async ([sections, token], previousState) => {
//     if (!token || !sections) return;

//     // Check if sections or token have changed
//     const [prevSections, prevToken] = previousState || [];
//     if (prevSections === sections && prevToken === token) {
//       return; // Skip if sections and token haven't changed
//     }
//     const response = await sendSectionsToBackend(
//       token as string,
//       sections as Section[]
//     );

//     useSectionsStore.setState({ lastResponse: response });
//   },
//   { fireImmediately: true } // Fire immediately to send the first request
// );
