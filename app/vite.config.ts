import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://oswida.github.io/cyber/app/dist",
  plugins: [react()],
});
