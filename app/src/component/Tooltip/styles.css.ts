import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const TooltipButtonStyle = style({
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  margin: 0,
  padding: 0,
  boxShadow: "none",
  fontFamily: themeVars.fontFamily,
});

export const TooltipStyle = style({
  backgroundColor: themeVars.colors.background,
  borderRadius: "10px",
  padding: "5px 10px",
  wordWrap: "break-word",
  boxShadow: `0 0 20px ${themeVars.colors.fontPrimary}`,
});
