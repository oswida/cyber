import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "~/common";

export const ButtonStyle = recipe({
  base: {
    fontFamily: themeVars.fontFamily,
    fontSize: themeVars.fontSizes.standard,
    color: themeVars.colors.fontPrimary,
    outline: "none",
    border: "none",
    textTransform: "uppercase",
    borderRadius: 5,
    backgroundColor: "transparent",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    selectors: {
      "&:hover": {
        backgroundColor: themeVars.colors.background200,
        textDecoration: "none",
        cursor: "pointer",
      },
    },
  },
  variants: {
    size: {
      bigger: {
        padding: 5,
        paddingLeft: 7,
        paddingRight: 7,
        fontSize: themeVars.fontSizes.bigger,
      },
      standard: {
        padding: 5,
        paddingLeft: 7,
        paddingRight: 7,
        fontSize: themeVars.fontSizes.standard,
      },
      small: {
        padding: 2,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: themeVars.fontSizes.small,
      },
    },
    noupper: {
      true: {
        textTransform: "none",
      },
    },
    border: {
      standard: {
        border: `solid 1px ${themeVars.colors.blue}`,
      },
      underline: {
        borderBottom: `solid 1px ${themeVars.colors.blue}`,
      },
      none: {
        border: "none",
      },
    },
    color: {
      green: {
        borderColor: themeVars.colors.green,
        color: themeVars.colors.green,
        selectors: {
          "&:hover": {
            fontWeight: "bolder",
          },
        },
      },
      ghost: {
        backgroundColor: themeVars.colors.background,
      },
      filled: {
        backgroundColor: themeVars.colors.pink,
        color: "black",
        selectors: {
          "&:hover": {
            backgroundColor: themeVars.colors.pink,
          },
        },
      },
    },
  },
  defaultVariants: {
    size: "standard",
    border: "standard",
    color: undefined,
    noupper: undefined,
  },
});
