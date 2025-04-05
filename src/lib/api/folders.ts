import { AxiosError, isAxiosError } from "axios";
import { CreateFolderSchemaType } from "../schemas/folderSchema";
import { createApiClient } from "./axiosClient";

export const fetchFolders = async <T>(token: string): Promise<T> => {
  const apiClient = createApiClient(token);
  const response = await apiClient.get<T>("/folders");
  return response.data;
};

export const fetchFolder = async <T>(
  token: string,
  slug: string
): Promise<T> => {
  const apiClient = createApiClient(token);
  const response = await apiClient.get<T>(`/folders/${slug}`);
  return response.data;
};

export const createFolder = async <T>(
  token: string,
  folderData: CreateFolderSchemaType
) => {
  const apiClient = createApiClient(token);
  try {
    const response = await apiClient.post<T>("/folders", folderData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An unknown error occurred"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
