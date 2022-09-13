import { styled } from "@stitches/react";

export const Text = styled("div", {
  variants: {
    align: {
      right: {
        display: "flex",
        width: "100%",
        justifyContent: "end",
      },
      left: {
        textAlign: "left",
      },
    },
    size: {
      regular: {
        lineHeight: "1.2rem",
        fontSize: "1rem",
      },
      small: {
        lineHeight: "0.8rem",
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
        color: "$pink",
      },
      blue: {
        color: "$blue",
      },
      yellow: {
        color: "$yellow",
      },
      green: {
        color: "$green",
      },
    },
  },
  defaultVariants: {
    weight: 400,
    color: "white",
    size: "regular",
    align: "left",
  },
});
