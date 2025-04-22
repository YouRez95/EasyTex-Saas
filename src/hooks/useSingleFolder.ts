import { useQuery } from "@tanstack/react-query";
import { useFoldersService } from "@/lib/api/useFoldersService";

export function useSingleFolder({ slug }: { slug: string }) {
  const {fetchFolder} = useFoldersService();
  return useQuery({
    queryKey: ["folders", slug],
    queryFn: () => fetchFolder<GetSingleFolderResponse>(slug),
    refetchOnWindowFocus: false,
  });
}
