import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  build: {
    outDir: "build",
    //   rollupOptions: {
    //     output:{
    //         manualChunks(id) {
    //             if (id.includes('node_modules')) {
    //                 return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //             }
    //         }
    //     }
    // }
  },
  server: {
    open: true,
    port: 3000,
  },
});
