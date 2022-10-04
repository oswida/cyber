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
      center: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
      },
    },
    size: {
      regular: {
        lineHeight: "1.2rem",
        fontSize: "1rem",
      },
      middle: {
        lineHeight: "1rem",
        fontSize: "0.9rem",
      },
      small: {
        lineHeight: "0.8rem",
        fontSize: "0.8rem",
      },
      xsmall: {
        lineHeight: "0.6rem",
        fontSize: "0.6rem",
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
      primary: {
        color: "$fontPrimary",
      },
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
