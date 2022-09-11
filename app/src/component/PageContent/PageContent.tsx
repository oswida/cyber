import { styled } from "@stitches/react";

export const PageContent = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  flexWrap: "wrap",
  overflowY: "auto",

  marginTop: "2.5rem",
  height: "calc(100vh - 5rem)",
  gap: 10,
});
