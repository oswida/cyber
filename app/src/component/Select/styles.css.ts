import { ListItemStyle } from "./../../route/TrackView/styles.css";
import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";

export const SelectTriggerStyle = style({
  fontFamily: themeVars.fontFamily,
  fontSize: themeVars.fontSizes.standard,
  color: themeVars.colors.fontPrimary,
  outline: "none",
  padding: 5,
  textTransform: "uppercase",
  borderRadius: 5,
  backgroundColor: themeVars.colors.background,
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `solid 1px ${themeVars.colors.blue}`,
});

export const SelectMenuStyle = style({
  backgroundColor: themeVars.colors.background,
  border: `solid 1px ${themeVars.colors.blue}`,
  borderRadius: 5,
  padding: 10,
});
