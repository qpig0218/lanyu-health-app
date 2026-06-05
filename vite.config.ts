import { defineConfig } from 'vite';

// 自訂網域 (lanyu-health.theoneai.com.tw) 從根路徑服務，故 base = '/'。
// public/ 內的 CNAME、.nojekyll、manifest.json、assets/ 會被原樣複製到 dist 根。
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    target: 'es2020',
    cssMinify: true,
    sourcemap: false,
  },
  server: {
    port: 4173,
    host: true,
  },
});
