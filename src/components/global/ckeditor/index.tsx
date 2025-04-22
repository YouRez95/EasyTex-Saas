"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClassicEditor,
  Alignment,
  Essentials,
  Autoformat,
  Bold,
  Italic,
  BlockQuote,
  CloudServices,
  FontSize,
  Image,
  List,
  Paragraph,
  Table,
  TableCaption,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TableColumnResize,
  Underline,
  Indent,
  IndentBlock,
} from "ckeditor5";
import MathType from "@wiris/mathtype-ckeditor5/dist/index.js";
import "ckeditor5/ckeditor5.css";

import { convertHtmlToLatex } from "./html-to-latex/index";
import { Multicols } from "./utils/plugins";
type EditorInstance = Awaited<ReturnType<typeof ClassicEditor.create>>;

type CkEditorContentProps = {
  hanldeSaveContent: (data: string) => void;
  content: string;
};

export default function CkEditorContent({
  hanldeSaveContent,
  content,
}: CkEditorContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<EditorInstance | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [editorInitialized, setEditorInitialized] = useState(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (editorInitialized) return;

    let isMounted = true;
    setEditorInitialized(true);

    // Wait for next render cycle to ensure DOM is stable
    setTimeout(() => {
      if (!containerRef.current || !isMounted) return;

      // Create a dedicated element for the editor outside React's control
      const editorElement = document.createElement("div");
      editorElement.className = "ckeditor-instance";
      editorElement.innerHTML = content;

      // Append to container
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(editorElement);

      ClassicEditor.create(editorElement, {
        extraPlugins: [Multicols],
        indentBlock: {
          offset: 1,
          unit: "em",
        },
        licenseKey: "GPL",
        plugins: [
          Essentials,
          Alignment,
          Autoformat,
          Bold,
          Italic,
          BlockQuote,
          CloudServices,
          FontSize,
          Image,
          List,
          IndentBlock,
          Paragraph,
          Table,
          TableCaption,
          TableCellProperties,
          TableProperties,
          TableToolbar,
          TableColumnResize,
          Underline,
          Indent,
          MathType,
        ],
        toolbar: {
          items: [
            "fontsize",
            "indent",
            "outdent",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "alignment",
            "numberedList",
            "bulletedList",
            "|",
            "MathType",
            "ChemType",
            "|",
            "insertTable",
            "undo",
            "redo",
            "multicols",
            "exitMulticols",
          ],
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
            "toggleTableCaption",
          ],
          tableToolbar: ["bold", "italic"],
        },
      })
        .then((editor) => {
          if (!isMounted) {
            editor.destroy();
            return;
          }

          editorInstance.current = editor;
          setIsEditorReady(true);

          // No change listener to avoid issues
        })
        .catch((error) => {
          console.error("Editor initialization failed:", error);
        });
    }, 0);

    return () => {
      isMounted = false;

      // Safely destroy the editor
      if (editorInstance.current) {
        const editor = editorInstance.current;

        try {
          editor
            .destroy()
            .then(() => console.log("Editor destroyed successfully"))
            .catch((e) => console.error("Error destroying editor:", e));

          editorInstance.current = null;
        } catch (e) {
          console.error("Error during editor cleanup:", e);
        }
      }

      // Clean up the container
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }

      setIsEditorReady(false);
      setEditorInitialized(false);
    };
  }, []);

  const getEditorContent = () => {
    if (!editorInstance.current) {
      console.warn("Editor not initialized yet");
      return;
    }

    try {
      const data = editorInstance.current.getData();
      console.log("HTML", data);
      if (!data) return;

      // const output = convertHtmlToLatex(data);
      // console.log("Latex", output);
      hanldeSaveContent(data);
    } catch (error) {
      console.error("Error getting editor content:", error);
    }
  };

  return (
    <div className="editor">
      <div ref={containerRef} className="editor-container" />
      <button
        onClick={getEditorContent}
        disabled={!isEditorReady}
        style={{ marginTop: "10px" }}
      >
        Show
      </button>
    </div>
  );
}
