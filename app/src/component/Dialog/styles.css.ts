import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "~/common/theme.css";

export const DialogBackdropStyle = recipe({
  base: {
    width: "100vw",
    height: "100vh",
    minWidth: "100vw",
    minHeight: "100vh",
    backgroundColor: "black",
    position: "fixed",
    top: 0,
    left: 0,
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    opacity: {
      less: {
        opacity: 0.9,
      },
      more: {
        opacity: 0.95,
      },
      full: {
        opacity: 1,
      },
    },
  },
  defaultVariants: {
    opacity: "less",
  },
});

export const DialogUnderlayStyle = style({
  outline: "none",
  border: "none",
  width: "100vw",
  height: "100vh",
  minWidth: "100vw",
  minHeight: "100vh",
  backgroundColor: "transparent",
  position: "fixed",
  top: 0,
  left: 0,
});

export const DialogContentStyle = style({
  outline: "none",
  border: "none",
});

export const CloseButtonStyle = style({
  border: "none",
  outline: "none",
  height: 30 * 0.8,
  width: 30,
  color: themeVars.colors.pink,
  fontSize: 25,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
  userSelect: "none",
});
