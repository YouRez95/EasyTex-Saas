export const DUMMY_SECTIONS = [
  {
    id: 1,
    type: "boxes",
    image: "/sections_images/shadowBox.png",
    title: "Shadowbox",
    config: `{
      "id": "section-1",
      "title": "Shadowbox",
      "align": "center",
      "space": {
        "top": "0",
        "bottom": "0"
      },
      "type": "shadowbox",
      "content": "This is a shadowbox section.",
      "width": "10",
      "height": "5",
      "textAlign": "default",
      "fontSize": "default",
      "color": "#000000",
      "fontStyle": "default"
    }`,
  },
  {
    id: 2,
    type: "boxes",
    image: "/sections_images/normalBox.png",
    title: "normalbox",
    config: `{
      "id": "section-2",
      "align": "default",
      "title": "Normal Box",
      "space": {
        "top": "0",
        "bottom": "0"
      },
      "type": "normalbox",
      "content": "This is a normal box section.",
      "textAlign": "default",
      "fontSize": "default",
      "fontStyle": "default",
      "width": "",
      "height": "",
      "colback": {
        "type": "single",
        "color": "#ffffff"
      },
      "colframe": {
        "type": "single",
        "color": "#000000"
      }
    }`,
  },
  {
    id: 3,
    type: "rules",
    image: "/sections_images/normalLine.png",
    title: "Normal Line",
    config: `{
      "id": "rule-1",
      "title": "Normal Line",
      "align": "center",
      "space": {
        "top": "0",
        "bottom": "0"
      },
      "type": "rule",
      "width": "10",
      "thickness": "1",
      "style": "solid",
      "color": "#000000"
    }`,
  },
  {
    id: 4,
    type: "rules",
    image: "/sections_images/dottedLine.png",
    title: "Dotted Line",
    config: `{
      "id": "rule-2",
      "title": "Dotted Line",
      "align": "center",
      "space": {
        "top": "0",
        "bottom": "0"
      },
      "type": "rule",
      "style": "dotted",
      "color": "#000000"
    }`,
  },
  {
    id: 5,
    type: "rules",
    image: "/sections_images/solidLine.png",
    title: "Solid Line",
    config: `{
      "id": "rule-3",
      "title": "Solid Line",
      "align": "center",
      "space": {
        "top": "0",
        "bottom": "0"
      },
      "type": "rule",
      "style": "solid",
      "color": "#000000"
    }`,
  },
];
