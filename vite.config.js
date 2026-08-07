import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Production build is tuned for a Contabo VPS behind Nginx:
 * - deterministic vendor chunks so long-lived assets stay cached across releases
 * - modern browser target (smaller output, native async/await)
 * - hashed filenames grouped by type for simple cache-control rules
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const path = id.replace(/\\/g, '/');
          if (!path.includes('/node_modules/')) return undefined;
          if (/\/node_modules\/(three|@react-three)\//.test(path)) return 'vendor-three';
          if (/\/node_modules\/(@mui|@emotion)\//.test(path)) return 'vendor-mui';
          if (/\/node_modules\/(framer-motion|motion|motion-dom|motion-utils|lenis)\//.test(path)) return 'vendor-motion';
          if (/\/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(path)) return 'vendor-react';
          // Everything else is left to the bundler: forcing a catch-all "vendor"
          // chunk would drag the lazily-loaded WebGL dependency tree into the
          // initial preload list.
          return undefined;
        },
        assetFileNames: (info) => {
          const name = info.names?.[0] ?? '';
          if (/\.(woff2?|ttf|otf|eot)$/i.test(name)) return 'assets/fonts/[name]-[hash][extname]';
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) return 'assets/img/[name]-[hash][extname]';
          return 'assets/[ext]/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
