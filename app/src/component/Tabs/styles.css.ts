import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const TabsRootStyle = style({
  fontFamily: themeVars.fontFamily,
});

export const TabsTriggerGroupStyle = style({
  fontFamily: themeVars.fontFamily,
  backgroundColor: themeVars.colors.background,
  marginBottom: 10,
});

export const TabsTriggerStyle = style({
  fontFamily: themeVars.fontFamily,
  backgroundColor: themeVars.colors.background,
  outline: "none",
  border: "none",
  marginRight: 5,
  padding: "5px 10px",
  color: themeVars.colors.fontPrimary,
  borderRadius: 5,
  textTransform: "uppercase",
  fontSize: themeVars.fontSizes.small,
  selectors: {
    "&[data-selected]": {
      color: themeVars.colors.green,
      borderBottom: `solid 1px ${themeVars.colors.green}`,
    },
  },
});
