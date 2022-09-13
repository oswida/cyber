import { createStitches } from "@stitches/react";

export const themeColors = {
  yellow: "#f2f230",
  pink: "#e949f5",
  green: "#0fff50",
  darkblue: "#2c84fa",
  blue: "#3f99ff",
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
        0: "14px",
        1: "17px",
        2: "19px",
        3: "21px",
        4: "24px",
        5: "27px",
        6: "35px",
        7: "58px",
      },
    },
  });
