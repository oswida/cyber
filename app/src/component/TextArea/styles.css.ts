import { themeVars } from "~/common/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const TextAreaStyle = recipe({
  base: {
    userSelect: "contain",
    fontFamily: themeVars.fontFamily,
    background: themeVars.colors.background,
    color: themeVars.colors.fontPrimary,
    outline: "none",
    lineHeight: "1.1em",
    fontSize: themeVars.fontSizes.bigger,
    padding: 5,
    borderRadius: 5,
    textAlign: "left",
    overflow: "auto",
    selectors: {
      "&[disabled]": {
        opacity: 0.3,
      },
    },
  },
  variants: {
    small: {
      true: {
        fontSize: themeVars.fontSizes.standard,
      },
    },
    border: {
      none: {
        border: "none",
      },
      down: {
        borderBottom: `solid 1px ${themeVars.colors.darkblue}`,
      },
      full: {
        border: `solid 1px ${themeVars.colors.darkblue}`,
        borderRadius: 5,
      },
    },
  },
  defaultVariants: {
    border: "none",
  },
});
