import { styled } from "~/common";

export const Textarea = styled("textarea", {
  resize: "vertical",
  fontFamily: "Oxanium !important",
  background: "$background",
  color: "$fontPrimary",
  outline: "none",
  fontSize: "$2",
  padding: 5,
  "&[disabled]": {
    opacity: 0.3,
  },
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
    resize: {
      none: {},
      vertical: {
        resize: "vertical",
      },
      horizontal: {
        resize: "horizontal",
      },
      both: {
        resize: "both",
      },
    },
  },
  defaultVariants: {
    resize: "none",
    border: "none",
  },
});
