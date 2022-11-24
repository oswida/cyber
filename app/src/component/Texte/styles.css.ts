import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "~/common";

export const TexteStyle = recipe({
  base: {
    color: themeVars.colors.fontPrimary,
  },
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
      bigger: {
        lineHeight: "1.3rem",
        fontSize: "1.2rem",
      },
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
        color: themeVars.colors.fontPrimary,
      },
      white: {
        color: "#ffffff",
      },
      pink: {
        color: themeVars.colors.pink,
      },
      blue: {
        color: themeVars.colors.blue,
      },
      yellow: {
        color: themeVars.colors.yellow,
      },
      green: {
        color: themeVars.colors.green,
      },
    },
    clickable: {
      true: {
        cursor: "pointer",
        selectors: {
          "&:hover": {
            fontWeight: "bold",
          },
        },
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
