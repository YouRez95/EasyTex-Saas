import { createFolder } from "@/lib/api/folders";
import { CreateFolderSchemaType } from "@/lib/schemas/folderSchema";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFolder() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (folderData: CreateFolderSchemaType) => {
      const token = await getToken();
      if (!token) return;
      return createFolder<CreateFolderResponse>(token, folderData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
}
