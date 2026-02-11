import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  root: './',
  base: './',
  publicDir: 'public',
  server: {
    port: 5173,
    open: true,
    cors: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'gsap': ['gsap'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['three', 'gsap'],
  },
  plugins: [
    {
      name: 'copy-data',
      closeBundle() {
        // Copy data folder to dist
        mkdirSync('dist/data', { recursive: true });
        copyFileSync('data/colors.json', 'dist/data/colors.json');
        copyFileSync('data/portfolio.json', 'dist/data/portfolio.json');
      }
    }
  ]
});
