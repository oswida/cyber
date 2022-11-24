import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const HudRootStyle = style({
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

export const HudNavbarStyle = style({
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

export const DiceViewRootStyle = style({
  padding: "2px 5px",
  height: "calc(100vh - 70px)",
  // borderRight: `solid 1px ${themeVars.colors.blue}`,
  borderRadius: 5,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 10,
  width: 260,
});

export const WorkViewRootStyle = style({
  padding: "2px 5px",
  height: "calc(100vh - 70px)",
  borderLeft: `solid 1px ${themeVars.colors.green}`,
  borderRadius: 5,
  flex: 1,
});

export const RollInfoStyle = style({
  border: `solid 1px ${themeVars.colors.yellow}`,
  marginTop: 10,
  padding: 10,
  borderRadius: 5,
  width: "90%",
  position: "relative",
});

export const RollHistoryStyle = style({
  border: `1px solid ${themeVars.colors.darkblue}`,
  borderRadius: 5,
  padding: 5,
  height: 200,
  width: "calc(100% - 10px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 2,
  flex: 1,
  overflow: "auto",
});
