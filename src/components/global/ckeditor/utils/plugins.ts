import { ButtonView, createDropdown, Editor, Plugin } from "ckeditor5";
import { Element } from "@ckeditor/ckeditor5-engine";

export class Multicols extends Plugin {
  init() {
    console.log("Multicols was initialized");
    const editor = this.editor;

    // 🔹 Step 1: Register custom elements in the CKEditor schema
    editor.model.schema.register("multicolContainer", {
      allowWhere: "$block",
      isLimit: true,
      // Allow attributes inside container
      allowAttributes: ["alignment"],
    });

    editor.model.schema.register("multicolItem", {
      allowIn: "multicolContainer",
      // Allow content of a root (including lists, etc.)
      allowContentOf: "$root",
      // Allow attributes for alignment
      allowAttributes: ["alignment"],
    });

    // 🔹 Step 2: Define how CKEditor converts them to HTML
    editor.conversion.for("upcast").elementToElement({
      model: "multicolContainer",
      view: {
        name: "div",
        classes: ["multicol-container"],
      },
    });

    editor.conversion.for("upcast").elementToElement({
      model: "multicolItem",
      view: {
        name: "div",
        classes: ["multicol-item"],
      },
    });

    editor.conversion.for("downcast").elementToElement({
      model: "multicolContainer",
      view: (_, { writer }) => {
        return writer.createContainerElement("div", {
          class: "multicol-container",
        });
      },
    });

    editor.conversion.for("downcast").elementToElement({
      model: "multicolItem",
      view: (_, { writer }) => {
        return writer.createContainerElement("div", {
          class: "multicol-item",
        });
      },
    });

    // Add support for alignment in multicolItem
    editor.conversion.attributeToAttribute({
      model: {
        name: "multicolItem",
        key: "alignment",
        values: ["left", "center", "right", "justify"],
      },
      view: {
        left: { key: "style", value: "text-align:left" },
        center: { key: "style", value: "text-align:center" },
        right: { key: "style", value: "text-align:right" },
        justify: { key: "style", value: "text-align:justify" },
      },
    });

    // 🔹 Step 3: Add the dropdown button to the toolbar
    editor.ui.componentFactory.add("multicols", () => {
      const dropdownView = createDropdown(editor.locale);
      dropdownView.buttonView.set({
        label: "Insert Columns",
        withText: true,
        tooltip: true,
      });

      const twoColsButton = new ButtonView(editor.locale);
      twoColsButton.set({ label: "2 Columns", withText: true });
      twoColsButton.on("execute", () => insertColumns(editor, 2));

      const threeColsButton = new ButtonView(editor.locale);
      threeColsButton.set({ label: "3 Columns", withText: true });
      threeColsButton.on("execute", () => insertColumns(editor, 3));

      // Add buttons to the dropdown panel
      dropdownView.panelView.children.add(twoColsButton);
      dropdownView.panelView.children.add(threeColsButton);

      return dropdownView;
    });

    editor.ui.componentFactory.add("exitMulticols", () => {
      const button = new ButtonView();
      button.set({
        label: "Exit Columns",
        withText: true,
      });

      button.on("execute", () => {
        exitColumns(editor);
      });

      return button;
    });

    // 🔹 Step 4: Setup integrations with other features like lists
    this._setupFeatureIntegrations(editor);
  }

  // Setup integrations with other plugins/features in a safer way
  _setupFeatureIntegrations(editor: Editor) {
    // Only try to integrate with list if the schema already has listItem defined
    if (editor.model.schema.isRegistered("listItem")) {
      // Now it's safe to extend existing schema
      editor.model.schema.extend("listItem", {
        allowIn: "multicolItem",
      });
    }

    // Add support for other block elements commonly used in CKEditor
    // These elements are likely to be available in most CKEditor builds
    // const commonElements = [
    //   "heading1",
    //   "heading2",
    //   "heading3",
    //   "heading4",
    //   "heading5",
    //   "heading6",
    //   "image",
    // ];

    // commonElements.forEach((elementName) => {
    //   if (editor.model.schema.isRegistered(elementName)) {
    //     editor.model.schema.extend(elementName, {
    //       allowIn: "multicolItem",
    //     });
    //   }
    // });
  }
}

// 🔹 Step 5: Insert column layout into the editor
function insertColumns(editor: Editor, cols: number) {
  console.log(`Inserting ${cols} columns`);

  editor.model.change((writer) => {
    const divWrapper = writer.createElement("multicolContainer");

    for (let i = 0; i < cols; i++) {
      const colDiv = writer.createElement("multicolItem");
      // Add a paragraph in each column by default
      const paragraph = writer.createElement("paragraph");
      writer.append(paragraph, colDiv);
      writer.append(colDiv, divWrapper);
    }

    editor.model.insertContent(divWrapper);

    // Place the cursor in the first paragraph of the first column
    const firstColumn = divWrapper.getChild(0) as Element;

    if (firstColumn && firstColumn.childCount > 0) {
      const firstChild = firstColumn.getChild(0) as Element;
      writer.setSelection(firstChild, 0);
    }
  });
}

function exitColumns(editor: Editor) {
  editor.model.change((writer) => {
    const selection = editor.model.document.selection;
    const position = selection.getFirstPosition();

    if (!position) return;

    const parentElement = position.parent;
    // Find the nearest multicolContainer
    let container = parentElement;
    while (container && !container.is("element", "multicolContainer")) {
      container = container.parent as Element;
    }

    if (container) {
      const newParagraph = writer.createElement("paragraph");

      // Insert the new paragraph after the container
      editor.model.insertContent(
        newParagraph,
        writer.createPositionAfter(container)
      );

      // Move the selection to the new paragraph
      writer.setSelection(newParagraph, "in");
    }
  });
}
