import { styled } from "~/common";

export const HudRoot = styled("div", {
  width: "100vw",
  height: "calc(100vh - 40px)",
  position: "fixed",
  top: 40,
  left: 0,
  backgroundColor: "$background",
});

export const HudToolbar = styled("div", {
  height: 36,
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: "$background",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: 2,
  gap: 10,
});

export const HudPane = styled("div", {
  width: 100,
  height: 100,
  backgroundColor: "$background",
  color: "$fontPrimary",
  padding: 5,
  userSelect: "none",
});
