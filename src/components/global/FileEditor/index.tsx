"use client";

import { useAuth } from "@clerk/nextjs";
import EditorContent from "./EditorContent";
import FileEditorHeader from "./FileEditorHeader";
import FileEditorSidebar from "./FileEditorSidebar";
import { useSectionsStore } from "./store";
import { useEffect } from "react";

type FileEditorProps = {
  folderSlug: string;
  fileId: string;
};

export default function FileEditor({ folderSlug, fileId }: FileEditorProps) {
  const { getToken } = useAuth();
  const { sections, submitSections } = useSectionsStore();

  useEffect(() => {
    console.log("Fetching token");
    const fetchToken = async () => {
      const token = await getToken();
      if (token) {
        await submitSections(token);
      }
    };
    fetchToken();
  }, [getToken, sections]);

  return (
    <div className="h-full">
      <FileEditorHeader />
      <div className="flex items-start h-[calc(100%-60px)]">
        <aside className="flex h-full">
          <FileEditorSidebar />
        </aside>

        <main className="flex-1 h-full flex items-center justify-center">
          <EditorContent />
        </main>
      </div>
    </div>
  );
}
