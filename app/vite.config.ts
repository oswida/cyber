import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://oswida.github.io/cyber/app/dist/",
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-macros"],
      },
    }),
  ],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
});
