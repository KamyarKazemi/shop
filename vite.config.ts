import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ command }) => {
  const isServer = command === "build" && process.env.VITE_SSR === "true";

  return {
    root: ".", // important for Express SSR

    plugins: [
      react({
        jsxImportSource: "react",
      }),
      tailwindcss(),
    ],

    // *** SSR entry points ***
    build: {
      // Output ALL builds into /dist but separated by client/server mode
      outDir: path.resolve(__dirname, "dist"),

      ssr: isServer ? "src/entry-server.jsx" : false,

      rollupOptions: isServer
        ? {
            input: {
              server: "src/entry-server.jsx",
            },
            output: {
              entryFileNames: `server/[name].js`,
              format: "esm",
            },
          }
        : {
            input: {
              client: "src/entry-client.jsx",
            },
            output: {
              manualChunks: {
                vendor: ["react", "react-dom", "react-router-dom"],
                redux: ["@reduxjs/toolkit", "react-redux"],
                motion: ["motion"],
                icons: ["react-icons"],
              },
              entryFileNames: `client/[name].js`,
              chunkFileNames: `client/chunks/[name]-[hash].js`,
              assetFileNames: `client/assets/[name]-[hash].[ext]`,
            },
          },

      // client build settings
      cssCodeSplit: !isServer,
      target: "ES2020",
      minify: isServer ? false : "terser",
      reportCompressedSize: true,
      chunkSizeWarningLimit: 500,
    },

    // Needed so Express can import server output
    ssr: {
      noExternal: true,
    },

    // Client runtime prebundles
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
  };
});
