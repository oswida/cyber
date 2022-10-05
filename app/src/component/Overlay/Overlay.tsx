import { styled } from "~/common";

export const Overlay = styled("div", {
  width: "100vw",
  height: "100vh",
  minWidth: "100vw",
  minHeight: "100vh",
  backgroundColor: "black",
  zIndex: 1000,
  position: "fixed",
  top: 0,
  left: 0,
  backdropFilter: "blur(10px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
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
