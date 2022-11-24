import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "~/common";

export const TrackViewRootStyle = style({
  border: `1px solid ${themeVars.colors.darkblue}`,
  borderRadius: 5,
  padding: 5,
  height: "calc(100vh - 160px)",
  width: "97%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 2,
  marginBottom: 10,
  overflowY: "auto",
  alignSelf: "center",
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
