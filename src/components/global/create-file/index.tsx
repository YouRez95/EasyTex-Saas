"use client";
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  createFileSchema,
  CreateFileSchemaType,
  createFolderSchema,
  CreateFolderSchemaType,
} from "@/lib/schemas/folderSchema";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_COLORS } from "@/constants/folder-colors";
import { Textarea } from "@/components/ui/textarea";
import { useCreateFolder } from "@/hooks/useCreateFolder";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CreateFileTrigger from "./create-file-trigger";
import { useCreateFile } from "@/hooks/useCreateFile";

export default function CreateFileDialog({
  folderId,
  slug,
}: {
  folderId: string;
  slug: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useCreateFile();
  const form = useForm<CreateFileSchemaType>({
    resolver: zodResolver(createFileSchema),
    defaultValues: {
      fileName: "",
    },
  });

  function onSubmit(values: CreateFileSchemaType) {
    mutate(
      { fileData: values, folderId, folderSlug: slug },
      {
        onSuccess: (data) => {
          setIsOpen(false);
          toast.success("File created successfully");
          // router.push(`/dashboard/folders/${slug}/${data?.data.id}`);
        },
        onError: (error) => {
          console.log(error);
          toast.error(error.message);
        },
      }
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full max-w-[350px]">
        <CreateFileTrigger />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create a new File</DialogTitle>
              <DialogDescription className="sr-only">
                Create Files to sort files and have quick access to documents
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="fileName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File name</FormLabel>
                    <FormControl>
                      <Input placeholder="File name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"} type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isPending} type="submit">
                Create File
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
