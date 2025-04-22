import { useEffect, useState } from "react";
import { useSectionsStore } from "./store";

const EditorContent = ({ isLoading }: { isLoading: boolean }) => {
  const [pdfURL, setPdfURL] = useState<string | null>(null);
  const { lastResponse } = useSectionsStore();

  useEffect(() => {
    // Clean up previous URL when component unmounts or data changes
    return () => {
      if (pdfURL) {
        window.URL.revokeObjectURL(pdfURL);
      }
    };
  }, []);

  useEffect(() => {
    // Only create blob when we have new response data
    if (!lastResponse?.data) {
      // Clear previous URL if no data
      if (pdfURL) {
        window.URL.revokeObjectURL(pdfURL);
        setPdfURL(null);
      }
      return;
    }

    // Create and set PDF URL
    const blob = new Blob([lastResponse.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // Clean up previous URL before setting new one
    if (pdfURL) {
      window.URL.revokeObjectURL(pdfURL);
    }

    setPdfURL(url);

    // Clean up URL object when component unmounts or data changes
    return () => {
      window.URL.revokeObjectURL(url);
    };
  }, [lastResponse]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-3">Loading content...</span>
      </div>
    );
  }

  return (
    <div
      className="scale-75 shadow-lg border"
      style={{ width: "210mm", height: "297mm" }}
    >
      {pdfURL ? (
        <iframe
          src={`${pdfURL}#toolbar=0&navpanes=0&scrollbar=0`}
          width="100%"
          height="100%"
          title="PDF Preview"
        />
      ) : (
        <p className="flex items-center justify-center h-full text-gray-500">
          No content to display
        </p>
      )}
    </div>
  );
};

export default EditorContent;
