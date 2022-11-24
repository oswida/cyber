import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { resolve } from "path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "https://oswida.github.io/cyber/app/dist/",
  plugins: [
    vanillaExtractPlugin(),
    solidPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: "src/locales/*",
          dest: "locales",
        },
      ],
    }),
  ],
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
