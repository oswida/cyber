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
  height: 40,
  width: "calc(100% - 20px)",
  position: "fixed",
  overflow: "hidden",
  top: 0,
  left: 0,
  backgroundColor: "$background",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: 10,
  paddingRight: 10,
  gap: 10,
});

export const HudPane = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
  padding: 5,
  width: "calc(100% - 10px)",
  height: "calc(100% - 10px)",
  minHeight: "max-content",
  backgroundColor: "$background",
  color: "$fontPrimary",
  userSelect: "none",
});
