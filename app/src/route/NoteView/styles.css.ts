import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";

export const ListRootStyle = style({
  border: `1px solid ${themeVars.colors.darkblue}`,
  borderRadius: 5,
  padding: 5,
  height: 300,
  width: "95%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 2,
  flex: 1,
  marginBottom: 10,
  overflowY: "auto",
});

export const PreviewRootStyle = style({
  background: themeVars.colors.background,
  outline: "none",
  backgroundColor: themeVars.colors.background100a70,
  borderRadius: 10,
  padding: 5,
  height: 200,
  width: "calc(95% - 10px)",
  overflow: "auto",
});

export const ListItemStyle = recipe({
  base: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 5,
    width: "calc(100% - 20px)",
    alignItems: "center",
    padding: "5px",
    paddingRight: "10px",
    paddingLeft: "10px",
    backgroundColor: themeVars.colors.background,
  },
  variants: {
    selected: {
      true: {
        backgroundColor: themeVars.colors.background200,
      },
    },
  },
});
