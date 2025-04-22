import { useQuery } from "@tanstack/react-query";
import { useFoldersService } from "@/lib/api/useFoldersService";
export function useGetFolders() {
  const  {fetchFolders} = useFoldersService()
  return useQuery({
    queryKey: ["folders"],
    queryFn: () => fetchFolders<GetFoldersResponse>(),
  });
}
