import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const WhiteboardRootStyle = style({
  backgroundColor: themeVars.colors.background,
  width: "calc(100vw - 285px)",
  height: "calc(100vh - 155px)",
  overflow: "auto",
});

export const WhiteboardToolsStyle = style({
  alignItems: "center",
  justifyContent: "space-between",
  gap: 20,
  backgroundColor: themeVars.colors.background,
  padding: 6,
  borderBottom: `solid 1px ${themeVars.colors.background300}`,
  display: "flex",
});
