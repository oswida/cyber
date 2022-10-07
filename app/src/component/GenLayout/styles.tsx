import { styled } from "@stitches/react";
import { Link } from "react-router-dom";

export const Root = styled("div", {
  backgroundColor: "#27262b",
  color: "#ffffff",
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

export const NavBar = styled("div", {
  minHeight: "2rem",
  padding: "0.5rem",
  borderBottom: "solid 1px #0fff50",
  width: "98%",
  display: "flex",
  justifyItems: "center",
  flexDirection: "row",
  gap: 10,
  position: "relative",
  top: 0,
  flexWrap: "nowrap",
  overflow: "auto",
  scrollbarWidth: "none",
});

export const TextLink = styled(Link, {
  color: "#ffffff",
  "&:hover": {
    color: "#0fff50",
  },
  textTransform: "uppercase",
});
