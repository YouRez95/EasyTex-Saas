import { postProcessLatex, processElement } from "./processors";

/**
 * Converts HTML content to LaTeX format
 * @param html The HTML string to convert
 * @returns Converted LaTeX string
 */
export const convertHtmlToLatex = (html: string): string => {
  // Parse HTML to DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Process all nodes in the document body
  let latex = Array.from(doc.body.childNodes)
    .map((node) => processElement(node))
    .join("")
    .trim();

  // Apply post-processing to clean up and format the LaTeX
  return postProcessLatex(latex);
};
