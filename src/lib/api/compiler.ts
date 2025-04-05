import { Section } from "../section-types/base";
import { createApiClient } from "./axiosClient";

export const sendSectionsToBackend = async (
  token: string,
  sections: Section[]
): Promise<{ success: boolean; data?: any; error?: string }> => {
  const apiClient = createApiClient(token);
  try {
    const response = await apiClient.post(
      "/compiler",
      {
        sections: JSON.stringify(sections),
      },
      { responseType: "arraybuffer" }
    );

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};
