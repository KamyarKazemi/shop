import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable fast refresh with optimization
      jsxImportSource: "react",
    }),
    tailwindcss(),
  ],
  build: {
    // Optimize chunks and code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"],
          motion: ["motion"],
          icons: ["react-icons"],
        },
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Target modern browsers for better optimization
    target: "ES2020",
    // Optimize for smaller bundle size
    minify: "terser",
    // Enable report compressed size
    reportCompressedSize: true,
    // Chunk size warning threshold
    chunkSizeWarningLimit: 500,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@reduxjs/toolkit",
      "react-redux",
      "motion",
      "react-icons",
      "axios",
    ],
  },
});
