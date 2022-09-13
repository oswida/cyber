import { styled } from "@stitches/react";

export const PageContent = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "calc(100%-20px)",
  flexWrap: "wrap",
  overflowY: "auto",
  padding: 20,
  marginTop: "2.5rem",
  height: "calc(100vh - 5rem - 50px )",
  gap: 10,
});
