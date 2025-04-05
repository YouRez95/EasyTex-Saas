import { isAxiosError } from "axios";
import { CreateFileSchemaType } from "../schemas/folderSchema";
import { createApiClient } from "./axiosClient";

export const fetchFiles = async <T>(token: string, folderId: string) => {
  const apiClient = createApiClient(token);
  const response = await apiClient.get<T>(`/folders/files/${folderId}`);
  return response.data;
};

export const createFile = async <T>(
  token: string,
  fileData: CreateFileSchemaType,
  folderId: string
) => {
  const apiClient = createApiClient(token);
  try {
    const response = await apiClient.post<T>("/folders/files", {
      fileName: fileData.fileName,
      parentFolder: folderId,
    });
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
