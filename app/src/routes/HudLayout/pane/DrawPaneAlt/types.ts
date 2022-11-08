export const IMAGE_QUALITY = 0.6;

export type SketchState = {
  tool: string;
  lineColor: string;
  lineWidth: number;
  value: any;
};

export const ToolType = {
  Circle: "circle",
  Line: "line",
  Arrow: "arrow",
  Pencil: "pencil",
  Rectangle: "rectangle",
  RectangleLabel: "rectangle-label",
  Select: "select",
  Pan: "pan",
  Triangle: "triangle",
  Remove: "remove",
  Text: "text",
  Ellipse: "ellipse",
  DefaultTool: "default-tool",
  Polygon: "polygon",
  Pointer: "pointer",
};
