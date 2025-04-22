import { useFilesService } from "@/lib/api/useFilesService";
import { CreateFileSchemaType } from "@/lib/schemas/folderSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateFile() {
  const queryClient = useQueryClient();
  const { createFile } = useFilesService();

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
      return createFile<CreateFileResponse>(fileData, folderId);
    },
    onSuccess: (data, variables) => {
      const { folderSlug } = variables;
      queryClient.setQueryData(
        ["folders", folderSlug],
        (oldData: GetSingleFolderResponse) => {
          if (!oldData) return;
          const documents: Document[] = [
            data?.data!,
            ...oldData.data.documents,
          ];
          return {
            ...oldData,
            data: {
              ...oldData.data,
              documents,
            },
          };
        }
      );

      toast.success("File created successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
}
