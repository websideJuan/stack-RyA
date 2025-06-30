import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/stack-RyA/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        operario: resolve(__dirname, "src/operario.html")
      },
    },
  },
});
