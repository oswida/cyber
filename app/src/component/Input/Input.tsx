import { styled } from "~/common";

export const Input = styled("input", {
  "-moz-appearance": "textfield",
  appearance: "textfield",
  "& .-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  fontFamily: "Oxanium !important",
  background: "$background",
  color: "$fontPrimary",
  outline: "none",
  border: "none",
  fontSize: "$3",
  padding: 3,
  "&[disabled]": {
    opacity: 0.3,
  },
  variants: {
    small: {
      true: {
        fontSize: "$2",
      },
    },
    border: {
      none: {
        border: "none",
      },
      down: {
        borderBottom: "solid 1px $darkblue",
      },
    },
    center: {
      true: {
        textAlign: "center",
      },
    },
  },
});
