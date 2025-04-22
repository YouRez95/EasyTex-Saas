"use client";

import EditorContent from "./editor-content";
import FileEditorHeader from "./file-editor-header";
import FileEditorSidebar from "./file-editor-sidebar";
import { useSectionsStore } from "./store";
import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSectionsService } from "@/lib/api/useSectionsService";

type FileEditorProps = {
  folderSlug: string;
  fileId: string;
};

export default function FileEditor({ folderSlug, fileId }: FileEditorProps) {
  const {
    sections,
    setSections,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    resetStore,
  } = useSectionsStore();
  const { getSectionsFromFile, compileSections } = useSectionsService();
  const [isCompiling, setIsCompiling] = useState(false);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const compilationRequested = useRef(false);
  const previousFileId = useRef(fileId);

  // Reset state when fileId changes
  useEffect(() => {
    if (previousFileId.current !== fileId) {
      // Clear previous data
      resetStore();
      setIsInitialLoadComplete(false);
      compilationRequested.current = false;
      previousFileId.current = fileId;
    }
  }, [fileId, resetStore]);

  // Load sections from backend
  const { data, isLoading: isLoadingSections } = useQuery({
    queryFn: () => getSectionsFromFile({ folderSlug, fileId }),
    queryKey: ["sections", folderSlug, fileId],
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
    // Ensure we're not using stale data
    enabled: previousFileId.current === fileId,
  });

  // Handle initial data loading
  useEffect(() => {
    if (data && !isInitialLoadComplete) {
      setSections(data.sections || null);
      setIsInitialLoadComplete(true);
      compilationRequested.current = true;
    }
  }, [data, setSections, isInitialLoadComplete]);

  // Trigger compilation only when necessary
  useEffect(() => {
    // Set compilation flag when sections change after initial load
    if (isInitialLoadComplete && !compilationRequested.current) {
      compilationRequested.current = true;
    }
  }, [sections, isInitialLoadComplete]);

  // Handle actual compilation, separated from section changes
  useEffect(() => {
    // Skip if compilation not needed or already in progress
    if (!compilationRequested.current || isCompiling) return;

    const compileData = async () => {
      try {
        setIsCompiling(true);
        await compileSections(sections);
        compilationRequested.current = false;

        // if (hasUnsavedChanges) {
        //   setHasUnsavedChanges(false);
        // }
      } catch (error) {
        console.error("Compilation error:", error);
      } finally {
        setIsCompiling(false);
      }
    };

    // Small delay to avoid rapid successive compilations
    const timer = setTimeout(compileData, 300);
    return () => clearTimeout(timer);
  }, [compilationRequested.current, isCompiling, compileSections, sections]);

  useEffect(() => {
    console.log("hasUnsavedChanges", hasUnsavedChanges);
  }, [hasUnsavedChanges]);

  // Calculate loading state combining initial load and compilation
  const isLoading = isLoadingSections || isCompiling || !isInitialLoadComplete;

  return (
    <div className="h-full">
      <FileEditorHeader folderSlug={folderSlug} fileId={fileId} />
      <div className="flex items-start h-[calc(100%-60px)]">
        <aside className="flex h-full">
          <FileEditorSidebar />
        </aside>

        <main className="flex-1 h-full flex items-center justify-center">
          <EditorContent isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
}
