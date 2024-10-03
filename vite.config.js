import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // For Vercel deployment
  resolve: {
    alias: {
      // Add more aliases as needed
      "@": "/src", // Alias to use '@' as a shorthand for '/src' folder
    },
  },
  build: {
    outDir: "dist", // Output directory for the build files
  },
});
