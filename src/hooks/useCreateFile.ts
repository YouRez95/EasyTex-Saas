import { createFile } from "@/lib/api/documents";
import { createFolder } from "@/lib/api/folders";
import {
  CreateFileSchemaType,
  CreateFolderSchemaType,
} from "@/lib/schemas/folderSchema";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFile() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      fileData,
      folderId,
      folderSlug,
    }: {
      fileData: CreateFileSchemaType;
      folderId: string;
      folderSlug: string;
    }) => {
      const token = await getToken();
      if (!token) return;
      return createFile<CreateFileResponse>(token, fileData, folderId);
    },
    onSuccess: (data, variables) => {
      const { folderSlug } = variables;
      queryClient.setQueryData(["folders", folderSlug], (oldData: GetSingleFolderResponse) => {
        if (!oldData) return;
        const documents: Document[] = [data?.data!, ...oldData.data.documents];
        return {
          ...oldData,
          data: {
            ...oldData.data,
            documents,
          },
        };
      });
    }
  });
}
