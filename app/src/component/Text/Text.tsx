import { styled } from "@stitches/react";

export const Text = styled("div", {
  variants: {
    size: {
      regular: {
        fontSize: "1rem",
      },
      small: {
        fontSize: "0.8rem",
      },
    },
    weight: {
      400: {
        fontWeight: 400,
      },
      700: {
        fontWeight: 700,
      },
    },
    color: {
      white: {
        color: "#ffffff",
      },
      pink: {
        color: "#e949f5",
      },
      blue: {
        color: "#2c84fa",
      },
      yellow: {
        color: "#f2f230",
      },
      green: {
        color: "#0fff50",
      },
    },
  },
  defaultVariants: {
    weight: 400,
    color: "white",
    size: "regular",
  },
});
