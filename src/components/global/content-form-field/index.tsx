import React, { useState, useRef, useEffect } from "react";
import CkEditorContent from "../ckeditor";
import sanitizeHtml from "sanitize-html";

interface ContentFormFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const ContentFormField = ({
  value,
  onChange,
}: ContentFormFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSave = (html: string) => {
    onChange(html);
    setIsOpen(false);
  };

  // Close modal when clicking outside (but not on MathType modals)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return;

      const target = event.target as HTMLElement;

      // Check for MathType specific elements
      const isMathTypeElement =
        target.closest(".wrs_modal_dialogContainer") ||
        target.closest(".wrs_popupmessage_overlay_envolture") ||
        target.closest(".wrs_modal_title_bar") ||
        target.closest(".ck-mathtype-modal") ||
        target.closest(".ck-balloon-panel") ||
        target.closest(".cke_dialog") ||
        target.closest('[id^="wrs_modal"]') ||
        target.closest('[class^="wrs_"]');

      // Don't close if clicking on MathType elements
      if (isMathTypeElement) {
        return;
      }

      // Close only if clicking outside the modal content
      if (modalRef.current && !modalRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Trigger element */}
      <div
        className="h-24 overflow-hidden w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {value ? (
          // <div className="text-left">{value}</div>
          <div
            className="text-left"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(value) }}
          />
        ) : (
          <div className="text-muted-foreground">Click to add content...</div>
        )}
      </div>

      {/* Custom Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[90vw] max-w-5xl max-h-[90vh] overflow-auto"
          >
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Enter Content</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4">
              <CkEditorContent hanldeSaveContent={handleSave} content={value} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
