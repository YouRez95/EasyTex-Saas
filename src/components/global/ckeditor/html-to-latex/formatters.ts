/**
 * Format a paragraph element with proper alignment and spacing
 * @param node The paragraph element
 * @param content The processed content of the paragraph
 * @param isNestedInList Whether this paragraph is in a list context
 * @param isFirstParagraphInListItem Whether this is the first paragraph in a list item
 * @returns Formatted LaTeX string
 */
export const formatParagraph = (
  node: Element,
  content: string,
  isNestedInList: boolean,
  isFirstParagraphInListItem: boolean
): string => {
  const style = node.getAttribute("style") || "";

  // Handle special alignments
  if (style.includes("text-align:center")) {
    return `\\begin{center}${content}\\end{center}`;
  }
  if (style.includes("text-align:right"))
    return `\\begin{flushright}${content}\\end{flushright}`;
  if (style.includes("text-align:justify"))
    return isNestedInList && !isFirstParagraphInListItem
      ? content
      : `${content}`;

  // Default paragraph behavior
  return isNestedInList && !isFirstParagraphInListItem
    ? content
    : `${content}\\newline `;
};

/**
 * Convert standard HTML tags to their LaTeX equivalents
 * @param tagName The HTML tag name
 * @param content The processed content inside the tag
 * @returns LaTeX string or null if no direct conversion exists
 */
export const standardTagConversion = (
  tagName: string,
  content: string
): string | null => {
  const tagMap: Record<string, string> = {
    strong: `\\textbf{${content}}`,
    b: `\\textbf{${content}}`,
    em: `\\textit{${content}}`,
    i: `\\textit{${content}}`,
    br: "\\\\ ",
    ol: `\\begin{enumerate}${content}\\end{enumerate}`,
    ul: `\\begin{itemize}${content}\\end{itemize}`,
    li: `\\item ${content}`,
  };

  return tagMap[tagName] || null;
};
