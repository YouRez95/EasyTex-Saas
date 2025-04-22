import { MathMLToLaTeX } from "mathml-to-latex";

/**
 * Converts MathML elements to LaTeX format
 * @param mathNode MathML DOM element
 * @returns LaTeX math expression
 */

export const convertMathML = (mathNode: Element): string => {
  if (!mathNode?.outerHTML) return "";
  try {
    const cleanMathML = mathNode.outerHTML.replace(/\u00A0/g, " ");
    let latexMath = MathMLToLaTeX.convert(cleanMathML);

    // Replace \frac with \dfrac
    latexMath = latexMath.replace(/\\frac/g, "\\dfrac");

    // Use single $ for inline math and double $$ for block math
    return mathNode.getAttribute("display") === "block"
      ? `$$${latexMath}$$`
      : `$${latexMath}$`;
  } catch (e) {
    console.warn("Failed to convert MathML to LaTeX:", e);
    return "";
  }
};
