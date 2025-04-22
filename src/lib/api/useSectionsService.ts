import {
  SectionWithOrder,
  useSectionsStore,
} from "@/components/global/FileEditor/store";
import { useApi } from "./axiosApi";

export const useSectionsService = () => {
  const api = useApi();
  const { setLastResponse } = useSectionsStore();

  // WIP: When i save new data Update the cache also here or in the mutate header
  const saveSectionsToFile = async ({
    sections,
    folderSlug,
    fileId,
  }: {
    sections: SectionWithOrder[];
    folderSlug: string;
    fileId: string;
  }) => {
    const response = await api.post(
      `/folders/files/save/${folderSlug}/${fileId}`,
      { sections }
    );
    return response.data;
  };

  const getSectionsFromFile = async ({
    folderSlug,
    fileId,
  }: {
    folderSlug: string;
    fileId: string;
  }) => {
    const response = await api.get(
      `/folders/files/sections/${folderSlug}/${fileId}`
    );

    console.log("response from backend", response);
    return response.data;
  };

  const compileSections = async (sections: SectionWithOrder[] | null) => {
    try {
      // Important: Send sections as empty array when null to get placeholder PDF
      const response = await api.post(
        "/compiler",
        {
          sections: sections ? JSON.stringify(sections) : [],
        },
        { responseType: "arraybuffer" }
      );

      setLastResponse({ success: true, data: response.data });
      return response.data;
    } catch (error) {
      const errorMessage = (error as Error).message;
      setLastResponse({ success: false, error: errorMessage });
      throw error;
    }
  };

  return { saveSectionsToFile, getSectionsFromFile, compileSections };
};
