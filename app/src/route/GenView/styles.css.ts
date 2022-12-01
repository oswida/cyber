import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "~/common";

export const LayoutRootStyle = style({
  backgroundColor: themeVars.colors.background,
  color: themeVars.colors.fontPrimary,
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  height: "100vh",
  minHeight: "100vh",
  maxHeight: "100vh",
  maxWidth: "100vw",
  margin: 0,
  padding: 0,
  overflow: "hidden",
});

export const NavbarStyle = style({
  minHeight: "1.2rem",
  padding: "0.5rem",
  borderBottom: `solid 1px ${themeVars.colors.green}`,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  gap: 10,
  position: "relative",
  top: 0,
  flexWrap: "nowrap",
  overflow: "auto",
  scrollbarWidth: "none",
});

export const LayoutContentStyle = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "max-content",
  flexWrap: "wrap",
  gap: "10px",
  padding: "5px",
  overflow: "auto",
  height: "calc(100vh - 60px)",
});

export const CardRootStyle = recipe({
  base: {
    padding: 10,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px 0px",
    outlineOffset: 2,
    marginTop: 3,
    minHeight: "max-content",
    minWidth: 350,
    maxWidth: 350,
    height: 330,
  },
  variants: {
    color: {
      yellow: {
        outline: `solid 1px ${themeVars.colors.yellow}`,
        borderBottom: `solid 1px ${themeVars.colors.yellow}`,
        borderRight: `solid 1px ${themeVars.colors.yellow}`,
      },
      pink: {
        outline: `solid 1px ${themeVars.colors.pink}`,
        borderBottom: `solid 1px ${themeVars.colors.pink}`,
        borderRight: `solid 1px ${themeVars.colors.pink}`,
      },
      blue: {
        outline: `solid 1px ${themeVars.colors.blue}`,
        borderBottom: `solid 1px ${themeVars.colors.blue}`,
        borderRight: `solid 1px ${themeVars.colors.blue}`,
      },
      green: {
        outline: `solid 1px ${themeVars.colors.green}`,
        borderBottom: `solid 1px ${themeVars.colors.green}`,
        borderRight: `solid 1px ${themeVars.colors.green}`,
      },
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

export const CardTitleStyle = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 350,
    flexWrap: "wrap",
    textTransform: "uppercase",
    paddingBottom: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  variants: {
    color: {
      yellow: {
        color: themeVars.colors.yellow,
        borderBottom: `solid 1px ${themeVars.colors.yellow}`,
      },
      pink: {
        color: themeVars.colors.pink,
        borderBottom: `solid 1px ${themeVars.colors.pink}`,
      },
      blue: {
        color: themeVars.colors.blue,
        borderBottom: `solid 1px ${themeVars.colors.blue}`,
      },
      green: {
        color: themeVars.colors.green,
        borderBottom: `solid 1px ${themeVars.colors.green}`,
      },
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

export const CardRowStyle = style({
  marginLeft: 10,
  marginRight: 10,
  gap: 5,
  alignItems: "center",
  marginBottom: 10,
});
