import { defineConfig } from 'vite';

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
});
