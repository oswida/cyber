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

export const SelectableItemStyle = recipe({
  base: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "transparent",
    width: "calc(100% - 10px)",
    display: "flex",
    gap: 5,
    marginBottom: 5,
  },
  variants: {
    selected: {
      true: {
        backgroundColor: themeVars.colors.background200,
      },
    },
  },
});

export const SubEditRootStyle = style({
  backgroundColor: themeVars.colors.background100,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: 10,
  borderRadius: 5,
  border: `solid 1px ${themeVars.colors.green}`,
  height: "calc(100vh - 80px)",
  width: "350px",
  position: "absolute",
  right: 0,
  top: "30px",
});
