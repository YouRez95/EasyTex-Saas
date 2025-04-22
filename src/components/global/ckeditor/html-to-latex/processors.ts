import { formatParagraph, standardTagConversion } from "./formatters";
import { convertMathML } from "./math-converter";

// Track if we're processing the first paragraph in a list item
let isFirstParagraphInListItem = false;

/**
 * Process a DOM node and convert it to LaTeX
 * @param node The DOM node to process
 * @param isNestedInList Whether this node is inside a list
 * @returns LaTeX string representation
 */
export const processElement = (node: Node, isNestedInList = false): string => {
  // console.log("Processing node:", node);
  // Handle text nodes
  if (node.nodeType === Node.TEXT_NODE) {
    return processTextNode(node);
  }

  // Skip non-element nodes
  if (!(node instanceof Element)) {
    return "";
  }

  const tagName = node.tagName.toLowerCase();

  // Handle list items with multiple paragraphs
  if (tagName === "li") {
    return processListItem(node);
  }

  // Special element handlers
  if (tagName === "math") return convertMathML(node);

  if (tagName === "div" && node.classList.contains("multicol-container")) {
    return handleMulticols(node);
  }

  // Paragraph formatting
  if (tagName === "p") {
    return formatParagraph(
      node,
      processChildren(node, isNestedInList),
      isNestedInList,
      isFirstParagraphInListItem
    );
  }

  // Process children and apply standard tag conversion
  const children = processChildren(
    node,
    isNestedInList || ["ol", "ul"].includes(tagName)
  );
  return standardTagConversion(tagName, children) || children;
};

/**
 * Process all child nodes of an element
 * @param node The parent element
 * @param isNestedInList Whether we're in a list context
 * @returns Combined LaTeX string of all children
 */
const processChildren = (node: Node, isNestedInList = false): string => {
  return Array.from(node.childNodes)
    .map((child) => processElement(child, isNestedInList))
    .join("");
};

/**
 * Process a list item element with special handling for paragraphs and nested lists
 * @param node The list item element
 * @param isNestedInList Whether this list is nested in another list
 * @returns LaTeX string representation
 */
const processListItem = (node: Element): string => {
  // Get all direct child paragraphs and lists
  const paragraphs = Array.from(node.children).filter(
    (child) => child.tagName.toLowerCase() === "p"
  );

  const nestedLists = Array.from(node.children).filter((child) =>
    ["ol", "ul"].includes(child.tagName.toLowerCase())
  );

  if (paragraphs.length > 0) {
    // Process the first paragraph as a list item
    isFirstParagraphInListItem = true;
    const firstPContent = processElement(paragraphs[0], true);
    isFirstParagraphInListItem = false;

    // Process remaining paragraphs with proper newlines
    const remainingContent = paragraphs
      .slice(1)
      .map((p) => `\\newline ${processElement(p, true)}`)
      .join("");

    // Process any nested lists separately
    const nestedListContent = nestedLists
      .map((list) => processElement(list, true))
      .join("");

    return `\\item ${firstPContent}${remainingContent}${nestedListContent}`;
  }

  // Default processing for list items without paragraphs
  return `\\item ${processChildren(node, true)}`;
};

/**
 * Processes multicolumn container elements
 * @param node DOM element with multicol-container class
 * @returns LaTeX multicols environment
 */
export const handleMulticols = (node: Element): string => {
  // Get direct children that are multicolumn items
  const columns = Array.from(node.children).filter((child) =>
    child.classList.contains("multicol-item")
  );

  const numCols = columns.length;

  // Process each column separately, maintaining proper nesting
  const processedColumns = columns.map((col, index) => {
    // Process the column content
    const content = processElement(col);

    // Add columnbreak after each column except the last one
    return index < columns.length - 1
      ? content + "\\vfill\\columnbreak "
      : content;
  });

  // Combine into multicols environment
  return `\\begin{multicols}{${numCols}}${processedColumns.join(
    ""
  )}\\end{multicols}`;
};

/**
 * Process a text node, cleaning up spaces and special characters
 * @param node The text node to process
 * @returns Cleaned text content
 */
export const processTextNode = (node: Node): string =>
  (node.textContent || "").replace(/\u00A0/g, " ");

/**
 * Applies post-processing rules to clean up and format the LaTeX output
 * @param latex Raw LaTeX string
 * @returns Cleaned LaTeX string
 */
export const postProcessLatex = (latex: string): string => {
  return (
    latex
      // Replace non-breaking spaces with regular spaces
      .replace(/\u00A0/g, " ")

      // Remove HTML entities
      .replace(/&[a-z]+;/g, "")

      // Fix column breaks
      .replace(/\\columnbreak(\w)/g, "\\columnbreak $1")

      // Fix item spacing with nested environments
      .replace(/\\item\s+\\begin{(enumerate|itemize)}/g, "\\item\\begin{$1}")

      // Normalize multiple newlines
      .replace(/\\newline\s*\\newline\s*/g, "\\newline ")

      // Fix spacing around environments
      .replace(/\\newline\s*(\\begin\{[^}]+\})/g, "$1")
      .replace(/(\\end\{[^}]+\})\s*\\newline/g, "$1 ")

      // Ensure space after newline command
      .replace(/\\newline(?!\s)/g, "\\newline ")

      // Ensure space after line break
      .replace(/\\\\(?!\s)/g, "\\\\ ")

      // Fix spacing around environment commands
      .replace(/(\\end\{[^}]+\})(\w)/g, "$1 $2")
      .replace(/(\\begin\{[^}]+\})(\w)/g, "$1 $2")

      // Normalize multiple spaces
      .replace(/\s{2,}/g, " ")

      // Trim whitespace
      .replace(/\s+$/gm, "")
      .replace(/^\s+/gm, "")

      // Remove redundant newlines after item commands
      .replace(/\\item\s*\\newline\s*/g, "\\item ")
  );
};
