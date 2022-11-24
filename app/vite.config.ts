import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { resolve } from "path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  base: "https://oswida.github.io/cyber/app/dist/",
  plugins: [vanillaExtractPlugin(), solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
});
