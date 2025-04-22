import { isAxiosError } from "axios";
import { CreateFileSchemaType } from "../schemas/folderSchema";
import { useApi } from "./axiosApi";

export const useFilesService = () => {
  const api = useApi();

  // 
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

  const fetchFiles = async <T>(folderId: string) => {
    const response = await api.get<T>(`/folders/files/${folderId}`);
    return response.data;
  };

  const createFile = async <T>(
    fileData: CreateFileSchemaType,
    folderId: string
  ) => {
    try {
      const response = await api.post<T>("/folders/files", {
        fileName: fileData.fileName,
        parentFolder: folderId,
      });
      return response.data;
    } catch (error) {
      return handleApiError(error)
    }
  };

  return { fetchFiles, createFile };
};
