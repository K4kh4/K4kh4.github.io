import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  root: './src',
  base: './',
  publicDir: '../public',
  server: {
    port: 5173,
    open: true,
    cors: true,
  },
  build: {
    outDir: '../',
    assetsDir: 'assets',
    emptyOutDir: false, // Don't delete everything in root
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
        // Copy data folder to root
        mkdirSync('data', { recursive: true });
        copyFileSync('src/data/colors.json', 'data/colors.json');
        copyFileSync('src/data/portfolio.json', 'data/portfolio.json');
      }
    }
  ]
});
