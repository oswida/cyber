import { createStitches } from "@stitches/react";

export const themeColors = {
  yellow: "#f2f230",
  pink: "#e949f5",
  green: "#0fff50",
  darkblue: "#2c84fa",
  blue: "#3f99ff",
  red: "#ff1818",

  fontPrimary: "#ffffff",
  background: "#000000",

  background100: "#080c12",
  background200: "#12171d",
  backgground300: "#567091",
};

export const { styled, css, createTheme, keyframes, theme, globalCss } =
  createStitches({
    theme: {
      colors: themeColors,
      radii: {
        0: "0px",
        1: "5px",
      },
      space: {
        0: 0,
        1: "4px",
        2: "8px",
        3: "16px",
        4: "32px",
        5: "64px",
        6: "128px",
      },
      fontSizes: {
        0: "12px",
        1: "14px",
        2: "17px",
        3: "19px",
        4: "21px",
        5: "24px",
        6: "27px",
      },
    },
  });
