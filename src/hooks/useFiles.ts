import { fetchFiles } from "@/lib/api/documents";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export function useFiles(folderId: string) {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchToken = async () => {
      const newToken = await getToken();
      if (isMounted) setToken(newToken);
    };

    fetchToken();
    return () => {
      isMounted = false;
    };
  }, [getToken]);

  return useQuery({
    queryKey: ["files", folderId],
    queryFn: () => fetchFiles<GetFilesResponse>(token!, folderId),
    enabled: !!token,
  });
}
