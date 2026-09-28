import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    open: true,
    /* public/ me image daalne par dev server crash ho jaata tha
       (Windows EBUSY). Wahan watch band kar diya. */
    watch: {
      ignored: ["**/public/**", "**/dist/**"],
    },
  },

  build: {
    /* images ko compress mat karo — already webp me hain */
    assetsInlineLimit: 0,
  },
});
