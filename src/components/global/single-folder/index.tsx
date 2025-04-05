"use client";

import LastFiles from "@/components/global/last-files";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSingleFolder } from "@/hooks/useSingleFolder";
import {
  EllipsisVertical,
  FileText,
  Filter,
  Folder,
  Search,
  Users,
} from "lucide-react";
import CreateFileDialog from "../create-file";
import AllFiles from "./all-files";

export default function SingleFolder({ folderSlug }: { folderSlug: string }) {
  // WIP: Handle the not found folder
  const { data, error, isPending } = useSingleFolder({ slug: folderSlug });

  console.log("single folder", data, error, isPending);

  if (isPending) return <div>Loading...</div>;

  if (!data?.data) return;
  const {
    children,
    color,
    description,
    name,
    createdAt,
    documents,
    id: folderId,
  } = data.data;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font font-medium flex items-center gap-2">
          <span
            className="w-5 h-5 rounded-full block"
            style={{ backgroundColor: color }}
          />
          <span className="text-primary">Folder:</span>
          <span>{name}</span>
        </h1>

        <div className="flex gap-4">
          <Button variant={"outline"} className="">
            Edit
          </Button>
          <Button variant={"destructive"} className="">
            Delete
          </Button>
        </div>
      </div>

      {description && (
        <div>
          <h2 className="text-lg font-medium">Description</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      )}

      <div className="flex items-center gap-5">
        <CreateFileDialog folderId={folderId} slug={folderSlug} />

        <div className="space-y-3 border rounded-md p-3 w-full max-w-[350px] relative hover:shadow hover:bg-muted cursor-pointer">
          <span className="absolute top-2 right-2">+</span>
          <div className="bg-primary w-fit p-1 rounded-lg">
            <Folder className="w-6 h-6 text-secondary font-thin" />
          </div>
          <p className="font-medium text-lg">New folder</p>
        </div>

        <div className="space-y-3 border rounded-md p-3 w-full max-w-[350px] relative hover:shadow hover:bg-muted cursor-pointer">
          <span className="absolute top-2 right-2">+</span>
          <div className="bg-primary w-fit p-1 rounded-lg">
            <Users className="w-6 h-6 text-secondary font-thin" />
          </div>
          <p className="font-medium text-lg">New team</p>
        </div>
      </div>

      <div className="grid gap-2">
        <h2 className="text-lg font-medium">Recently modified</h2>
        <div className="flex items-center gap-5">
          <div className="flex border p-3 rounded-md items-center gap-2 hover:shadow hover:bg-muted cursor-pointer max-w-[300px] w-full relative">
            <EllipsisVertical className="absolute w-4 h-4 top-1 right-1 text-muted-foreground" />
            <div className="bg-muted p-1 rounded-lg">
              <FileText className="w-6 h-6 font-thin text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm truncate">Nombre-relatifs.tex</span>
              <span className="text-sm text-muted-foreground">
                Today, 10:45 AM
              </span>
            </div>
          </div>

          <div className="flex border p-3 rounded-md items-center gap-2 hover:shadow hover:bg-muted cursor-pointer max-w-[300px] w-full relative">
            <EllipsisVertical className="absolute w-4 h-4 top-1 right-1 text-muted-foreground" />
            <div className="bg-muted p-1 rounded-lg">
              <FileText className="w-6 h-6 font-thin text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm truncate">Nombre-relatifs.tex</span>
              <span className="text-sm text-muted-foreground">
                Today, 10:45 AM
              </span>
            </div>
          </div>

          <div className="flex border p-3 rounded-md items-center gap-2 hover:shadow hover:bg-muted cursor-pointer max-w-[300px] w-full relative">
            <EllipsisVertical className="absolute w-4 h-4 top-1 right-1 text-muted-foreground" />
            <div className="bg-muted p-1 rounded-lg">
              <FileText className="w-6 h-6 font-thin text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm truncate">Nombre-relatifs.tex</span>
              <span className="text-sm text-muted-foreground">
                Today, 10:45 AM
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">All Files</h2>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-[250px] hidden md:flex">
              <Input
                className="bg-background rounded-md w-full pl-9"
                placeholder="Search"
              />
              <Search
                size={20}
                className="text-primary absolute left-2 top-[50%] translate-y-[-50%]"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-5 h-5" />
              Filters
            </Button>
          </div>
        </div>
        <AllFiles folderId={folderId} folders={children} files={documents} folderSlug={folderSlug} />
      </div>
    </>
  );
}
