import { styled } from "@stitches/react";
import { Link } from "react-router-dom";

export const Button = styled("div", {
  color: "#ffffff",
  "&:hover": {
    color: "#0fff50",
    textDecoration: "none",
    outline: "none",
    cursor: "pointer",
  },
  textTransform: "uppercase",
  padding: 5,
  border: "solid 1px #0fff50",
  borderRadius: 5,
  backgroundColor: "transparent",
  userSelect: "none",
});

export const LinkButton = styled(Link, {
  color: "#ffffff",
  "&:hover": {
    color: "#0fff50",
  },
  textTransform: "uppercase",
  padding: 5,
  border: "solid 1px #0fff50",
  borderRadius: 5,
});

export const DelButton = styled("div", {
  "&:hover": {
    color: "#0fff50",
    cursor: "pointer",
  },
  position: "absolute",
  top: 5,
  left: 10,
});
