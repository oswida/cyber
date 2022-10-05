import { styled } from "@stitches/react";

export const PageContent = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "start",
  justifyContent: "center",
  width: "calc(100% - 40px)",
  flexWrap: "wrap",
  gap: 10,
  flex: 1,
});
