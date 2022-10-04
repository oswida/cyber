import { styled } from "~/common";

export const Textarea = styled("div", {
  fontFamily: "Oxanium !important",
  background: "$background",
  color: "$fontPrimary",
  outline: "none",
  lineHeight: "1.1em",
  fontSize: "$2",
  padding: 5,
  "&[disabled]": {
    opacity: 0.3,
  },
  textAlign: "left",
  variants: {
    small: {
      true: {
        fontSize: "$1",
      },
    },
    border: {
      none: {
        border: "none",
      },
      down: {
        borderBottom: "solid 1px $darkblue",
      },
      full: {
        border: "solid 1px $darkblue",
        borderRadius: 5,
      },
    },
  },
  defaultVariants: {
    border: "none",
  },
});
