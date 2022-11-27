import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "~/common/theme.css";

export const InputStyle = recipe({
  base: {
    boxShadow: "none",
    outline: "none",
    border: "none",
    padding: "3px 7px",
    fontFamily: themeVars.fontFamily,
    fontSize: themeVars.fontSizes.bigger,
    appearance: "textfield",
    backgroundColor: themeVars.colors.background,
    color: themeVars.colors.fontPrimary,
    borderRadius: 5,
  },
  variants: {
    transparent: {
      true: {
        backgroundColor: "transparent",
      },
    },
    underline: {
      true: {
        borderBottom: `solid 1px ${themeVars.colors.fontPrimary}`,
      },
      blue: {
        borderBottom: `solid 1px ${themeVars.colors.blue}`,
      },
    },
    isTitle: {
      true: {
        fontWeight: "bold",
        fontSize: themeVars.fontSizes.large,
      },
    },
    center: {
      true: {
        textAlign: "center",
      },
    },
    small: {
      true: {
        fontSize: themeVars.fontSizes.small,
      },
    },
    middle: {
      true: {
        fontSize: themeVars.fontSizes.standard,
      },
    },
  },
});

export const InputButtonStyle = recipe({
  base: {
    appearance: "textfield",
    fontFamily: themeVars.fontFamily,
    fontSize: themeVars.fontSizes.bigger,
    color: themeVars.colors.fontPrimary,
    outline: "none",
    border: `solid 1px ${themeVars.colors.blue}`,
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "transparent",
    selectors: {
      "&:hover": {
        color: themeVars.colors.blue,
        textDecoration: "none",
        cursor: "pointer",
      },
    },
  },
  variants: {
    size: {
      standard: {
        padding: 5,
        paddingLeft: 7,
        paddingRight: 7,
      },
      small: {
        padding: 2,
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: themeVars.fontSizes.small,
      },
    },
  },
  defaultVariants: {
    size: "standard",
  },
});
