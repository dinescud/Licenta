import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/manifest.json",
          dest: ".",
        },
        {
          src: "public/warning.html",
          dest: ".",
        },
      ],
    }),
  ],
  build: {
    target: 'esnext',
    sourcemap: true,
    minify: false,
    cssCodeSplit: false,
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: "index.html",
        scanHistory: './scanHistory.html',
        statistics: './statistics.html',
        settings: './settings.html',
        // <-- Add background.js as a separate entry (so it outputs as background.js)
        background: './background.js',
      },
      output: {
        // Ensure background.js is emitted at the top level
        entryFileNames: (chunk) => {
          if (chunk.name === "background") return "background.js";
          return "[name].js";
        },
      },
    },
  },
});