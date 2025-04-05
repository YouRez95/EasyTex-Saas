import { fetchFolders } from "@/lib/api/folders";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export function useFolders() {
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
    queryKey: ["folders"],
    queryFn: () => fetchFolders<GetFoldersResponse>(token!),
    enabled: !!token,
  });
}
