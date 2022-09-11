import { styled } from "@stitches/react";
import { Text } from "~/component";

export const NpcBoard = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flexWrap: "wrap",
  overflow: "auto",
  height: "fit-content",
  marginTop: "3rem",
  marginBottom: "4rem",
  minHeight: "min-content",
  gap: 5,
});
