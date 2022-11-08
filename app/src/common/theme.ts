import { createStitches } from "@stitches/react";

export const themeColors = {
  yellow: "#f2f230",
  pink: "#e949f5",
  green: "#0fff50",
  darkblue: "#2c84fa",
  blue: "#3f99ff",
  red: "#ff1818",

  fontPrimary: "#ffffff",
  background: "#27262b",

  background100: "#080c12",
  background100a70: "#080c1270",
  background100aee: "#080c12ef",
  background200: "#12171d",
  background300: "#567091",
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
        0: "10px !important",
        1: "12px !important",
        2: "14px !important",
        3: "17px !important",
        4: "19px !important",
        5: "21px !important",
        6: "24px !important",
      },
    },
  });
