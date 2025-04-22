import { useFoldersService } from "@/lib/api/useFoldersService";
import { CreateFolderSchemaType } from "@/lib/schemas/folderSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useCreateFolder() {
  const { createFolder } = useFoldersService();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (folderData: CreateFolderSchemaType) => {
      return createFolder<CreateFolderResponse>(folderData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      router.push(`/dashboard/folders/${data?.data.slug}`);
      toast.success("Your folder has been created successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
}
