import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [], // <-- É exatamente dessa linha vazia que a Cloudflare precisa
  build: {
    outDir: 'dist',
  }
});
