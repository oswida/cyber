import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { themeVars } from "./common";

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  fontFamily: "Oxanium,Arial, Helvetica, sans-serif",
  fontSize: themeVars.fontSizes.standard,
});

export const appStyle = style({
  backgroundColor: themeVars.colors.background,
  color: themeVars.colors.fontPrimary,
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
});
