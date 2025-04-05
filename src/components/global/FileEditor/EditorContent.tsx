import { useEffect, useState } from "react";
import { useSectionsStore } from "./store";
import PDFViewer from "./pdf-viewer";

const EditorContent = () => {
  const [pdfURL, setPdfURL] = useState<string | null>(null);

  const { lastResponse } = useSectionsStore();

  useEffect(() => {
    if (!lastResponse?.data) return;
    const blob = new Blob([lastResponse.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    setPdfURL(url);

    return () => window.URL.revokeObjectURL(url);
  }, [lastResponse]);

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
        />
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
    // <div className="shadow-lg border max-w-[600px] flex-1 max-h-[600px] overflow-auto">
    //   {pdfURL ? <PDFViewer pdfUrl={pdfURL} /> : <p>Loading PDF...</p>}
    // </div>
  );
};

export default EditorContent;
