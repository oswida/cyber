import { createTheme } from "@vanilla-extract/css";

export const runtimeColors = {
  yellow: "#f2f230",
  pink: "#e949f5",
  neonpink: "#ff00ff",
  green: "#0fff50",
  neongreen: "#00ff00",
  darkblue: "#2c84fa",
  blue: "#3f99ff",
  neonblue: "#00ffff",
  red: "#ff1818",
  fontPrimary: "#ffffff",
  background: "#27262b",
  background100: "#080c12",
  background100a70: "#080c1270",
  background100aee: "#080c12ef",
  background200: "#12171d",
  background300: "#567091",
};

export const [themeClass, themeVars] = createTheme({
  fontFamily: "Oxanium,Arial, Helvetica, sans-serif",
  fontSizes: {
    small: "13px",
    standard: "15px",
    bigger: "18px",
    large: "20px",
  },
  colors: {
    yellow: "#f2f230",
    pink: "#e949f5",
    neonpink: "#ff00ff",
    green: "#0fff50",
    neongreen: "#00ff00",
    darkblue: "#2c84fa",
    blue: "#3f99ff",
    neonblue: "#00ffff",
    red: "#ff1818",
    fontPrimary: "#ffffff",
    background: "#27262b",
    background100: "#080c12",
    background100a70: "#080c1270",
    background100aee: "#080c12ef",
    background200: "#12171d",
    background300: "#567091",
  },
});
