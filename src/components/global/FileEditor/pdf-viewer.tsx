import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Set the worker source using a CDN URL or local path
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.mjs";

interface PDFViewerProps {
  pdfUrl: string; // URL or Blob URL of the PDF
  scale?: number; // Optional scale factor for higher resolution
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, scale = 0.5 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const renderTaskRef = useRef<any | null>(null);

  useEffect(() => {
    const loadPdf = async () => {
      if (!canvasRef.current || !pdfUrl) return;
      console.log("Loading PDF from:", pdfUrl);

      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);

        const page = await pdf.getPage(currentPage);
        console.log("Page loaded successfully");

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) {
          console.error("Canvas context is not available");
          return;
        }

        const container = canvas.parentElement; // Get the parent container
        if (!container) return;

        const containerWidth = container.clientWidth; // Get the container's width
        const viewport = page.getViewport({ scale: 1 }); // Use scale 1 by default

        // Calculate the correct scale to fit the container width
        const scale = containerWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        // Adjust for high-resolution displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = scaledViewport.width * dpr;
        canvas.height = scaledViewport.height * dpr;
        canvas.style.width = `${scaledViewport.width}px`;
        canvas.style.height = `${scaledViewport.height}px`;

        context.scale(dpr, dpr);

        // Cancel any ongoing render task
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        // Start a new render task and store it in the ref
        renderTaskRef.current = page.render({
          canvasContext: context,
          viewport: scaledViewport,
        });
        await renderTaskRef.current.promise;
        console.log("Page rendered successfully");
      } catch (error) {
        // Handle the cancellation error gracefully
        if (error instanceof pdfjsLib.RenderingCancelledException) {
          console.log("Rendering was cancelled:", error.message);
        } else {
          console.error("Error loading or rendering PDF:", error);
        }
      }
    };

    loadPdf();

    // Cleanup function to cancel any ongoing render task
    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdfUrl, currentPage, scale]);

  return (
    <div style={{ width: "100%", overflow: "auto" }}>
      <canvas ref={canvasRef} style={{ display: "block", margin: "0 auto" }} />
      {numPages && (
        <div>
          <p>
            Page {currentPage} of {numPages}
          </p>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, numPages))
            }
            disabled={currentPage === numPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
