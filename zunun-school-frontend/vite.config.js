import { defineConfig } from "vite";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss("./tailwind.config.js"),
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
  ],
  server: {
    open: true,
  },
});
