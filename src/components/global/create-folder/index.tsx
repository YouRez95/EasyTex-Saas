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

export default function CreateFolderDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createFolder, isPending } = useCreateFolder();
  const form = useForm<CreateFolderSchemaType>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      folderName: "",
      folderDescription: "",
      folderColor: "#FF5733",
    },
  });

  function onSubmit(values: CreateFolderSchemaType) {
    createFolder(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        asChild
        className="w-full h-full flex items-center justify-center cursor-pointer"
      >
        <div>
          <Plus className="w-10 h-10" />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create a new Folder</DialogTitle>
              <DialogDescription className="sr-only">
                Create Folders to sort files and have quick access to documents
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="folderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Folder name</FormLabel>
                    <FormControl>
                      <Input placeholder="Folder name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="folderDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="This is a folder for my courses"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="folderColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Folder color</FormLabel>
                    <FormControl>
                      <div>
                        <Input type="hidden" {...field} value={field.value} />
                        <div className="flex items-start gap-2">
                          {DEFAULT_COLORS.map((color) => (
                            <button
                              key={color}
                              type="button"
                              className={`w-6 h-6 rounded-full border-2 ${
                                field.value === color
                                  ? "border-primary"
                                  : "border-transparent"
                              }`}
                              style={{ backgroundColor: color }}
                              onClick={() => field.onChange(color)}
                            />
                          ))}
                        </div>
                      </div>
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
                Create Folder
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
