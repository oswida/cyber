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
  opacity: 0.9,
  backdropFilter: "blur(10px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
