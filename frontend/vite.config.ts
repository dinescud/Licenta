import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        }
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
        popup: './index.html',
        scanHistory: './scanHistory.html',
        statistics: './statistics.html',
        settings: './settings.html',
      },
    },
  },
});