import { Section } from "@/lib/section-types/base";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type SectionWithOrder = Section & { order: number };

type SectionStore = {
  sections: SectionWithOrder[] | null;
  hasUnsavedChanges: boolean;
  selectedSection: SectionWithOrder | null;
  lastResponse: { success: boolean; data?: any; error?: string } | null;

  // Actions
  resetStore: () => void; // Added reset functionality
  setLastResponse: (
    response: { success: boolean; data?: any; error?: string } | null
  ) => void;
  setSections: (sections: SectionWithOrder[] | null) => void;
  setHasUnsavedChanges: (value: boolean) => void;
  setSelectedSection: (section: SectionWithOrder | null) => void;
  addSection: (section: Section) => void;
  editSection: (section: Section, order: number) => void;
  reorderSections: (sections: Section[]) => void;
  removeSection: (sectionId: string) => void;
};

export const useSectionsStore = create<SectionStore>()(
  subscribeWithSelector((set) => ({
    sections: null,
    lastResponse: null,
    selectedSection: null,
    hasUnsavedChanges: false,

    // Reset store to initial state
    resetStore: () =>
      set({
        sections: null,
        lastResponse: null,
        selectedSection: null,
        hasUnsavedChanges: false,
      }),

    setSections: (sections) => set({ sections }),

    setLastResponse: (response) => set({ lastResponse: response }),

    setSelectedSection: (section) => set({ selectedSection: section }),

    setHasUnsavedChanges: (value) => set({ hasUnsavedChanges: value }),

    addSection: (section) =>
      set((state) => {
        if (!state.sections) {
          return {
            sections: [{ ...section, order: 1 }],
            hasUnsavedChanges: true,
          };
        }

        return {
          sections: [
            ...state.sections,
            { ...section, order: state.sections.length + 1 },
          ],
          hasUnsavedChanges: true,
        };
      }),

    editSection: (newData, order) =>
      set((state) => ({
        sections:
          state.sections?.map((section) =>
            section.order === order ? { ...newData, order } : section
          ) || null,
        hasUnsavedChanges: true,
      })),

    removeSection: (sectionId) =>
      set((state) => {
        if (!state.sections) return state;

        const filteredSections = state.sections.filter(
          (s) => s.id !== sectionId
        );

        // Reorder remaining sections to ensure continuous ordering
        const reorderedSections = filteredSections.map((section, index) => ({
          ...section,
          order: index + 1,
        }));

        return {
          sections: reorderedSections,
          hasUnsavedChanges: true,
        };
      }),

    reorderSections: (sections) =>
      set({
        sections: sections.map((section, index) => ({
          ...section,
          order: index + 1,
        })),
        hasUnsavedChanges: true,
      }),
  }))
);
