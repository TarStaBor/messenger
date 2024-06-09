import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: "dist",
  },
  publicDir: './static',
  server: {
    port: 3000,
  },
});


