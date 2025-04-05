"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useFolders } from "@/hooks/useFolders";
import { FolderRoot } from "lucide-react";
import Link from "next/link";

export default function FoldersScrollable() {
  const { data, isPending } = useFolders();

  if (isPending) return <FoldersScrollableSkeleton />;

  if (data?.data && data?.data.length === 0) return <FoldersScrollableEmpty />;
  return (
    <div className="flex gap-4 h-full overflow-x-scroll scrollbar-hide">
      {data?.data &&
        data?.data.map((folder, index) => (
          <Link href={`/dashboard/folders/${folder.slug}`} key={folder.id}>
            <div
              key={folder.id}
              className="h-full rounded-xl w-[150px] md:w-[250px] flex-shrink-0 flex flex-col justify-between p-3"
              style={{ backgroundColor: folder.color }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg">{index}</h3>
                <p className="text-white text-lg font-medium">:</p>
              </div>

              <div className="flex flex-col gap-1">
                <FolderRoot className="w-16 h-16 text-white" />
                <p className="text-white text-sm font-medium truncate">
                  {folder.name}
                </p>
                <p className="text-white text-sm font-medium truncate">
                  {folder.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-primary-foreground">
                <p className="text-sm font-medium">Created at:</p>
                <p className="text-sm font-medium">
                  {new Date(folder.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

const FoldersScrollableSkeleton = () => {
  return (
    <div className="flex gap-4 h-full overflow-x-scroll scrollbar-hide">
      <Skeleton className="h-full bg-primary/20 rounded-xl w-[150px] md:w-[250px] flex-shrink-0" />
      <Skeleton className="h-full bg-primary/20 rounded-xl w-[150px] md:w-[250px] flex-shrink-0" />
      <Skeleton className="h-full bg-primary/20 rounded-xl w-[150px] md:w-[250px] flex-shrink-0" />
      <Skeleton className="h-full bg-primary/20 rounded-xl w-[150px] md:w-[250px] flex-shrink-0" />
    </div>
  );
};

const FoldersScrollableEmpty = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-sm text-primary">No folders found</p>
    </div>
  );
};
