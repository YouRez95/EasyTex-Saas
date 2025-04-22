import { isAxiosError } from "axios";
import { CreateFolderSchemaType } from "../schemas/folderSchema";
import { useApi } from "./axiosApi";

export const useFoldersService = () => {
  const api = useApi();

  // Standardize error handling
  const handleApiError = (error: unknown) => {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occurred"
      );
    }
    throw new Error("An unexpected error occurred");
  };

  const createFolder = async <T>(folderData: CreateFolderSchemaType) => {
    try {
      const response = await api.post<T>("/folders", folderData);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const fetchFolder = async <T>(slug: string): Promise<T> => {
    try {
      const response = await api.get<T>(`/folders/${slug}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const fetchFolders = async <T>(): Promise<T> => {
    try {
      const response = await api.get<T>("/folders");
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  return { createFolder, fetchFolder, fetchFolders };
};
