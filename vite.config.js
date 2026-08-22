import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * The three typefaces that set text in the first viewport.
 *
 * Matched against the emitted (hashed) asset filenames, so the preload survives
 * a font version bump without anyone remembering to update a hard-coded path.
 *
 * JetBrains Mono is deliberately absent. It is the largest of the four at 40KB
 * and only ever sets small uppercase labels against a monospace fallback of
 * near-identical metrics, so its swap is the one the reader cannot see —
 * preloading it would spend the most bandwidth on the least visible change.
 */
const CRITICAL_FONTS = [/^sora-latin-/, /^manrope-latin-/, /^instrument-serif-latin-400-normal/];

/**
 * Chunks that are dynamically imported but wanted immediately.
 *
 * `HomeBelow` is split from the entry so that parsing the rest of the landing
 * page does not stand between the browser and the masthead — but its *bytes* are
 * wanted straight away, and a dynamic import is invisible to the preload
 * scanner: the browser cannot learn the chunk exists until the entry bundle has
 * downloaded, parsed and run. That is the serial round trip this whole pass
 * exists to remove, so it is declared here and preloaded from the document head
 * alongside React and MUI. Only the parsing waits.
 */
const EAGER_CHUNKS = [/^HomeBelow-/];

/**
 * Emits the document head's critical preloads: the above-the-fold typefaces,
 * and the chunks that are dynamically imported but wanted straight away.
 *
 * Fonts declared in a stylesheet are only requested once the browser has built
 * enough of the render tree to know a glyph in their range is actually needed.
 * On this page that meant the entire JavaScript bundle had to download, parse,
 * execute and render first: the four faces went on the wire at ~1.1s and landed
 * at ~1.8s, so the masthead was set in the fallback face for the whole of the
 * opening second and then re-set once the real ones arrived. Preloaded from the
 * document head, they are discovered in the first HTML parse and download
 * alongside React.
 */
function injectCriticalPreloads() {
  return {
    name: 'elim-inject-critical-preloads',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      /* `ctx.bundle` is the emitted output, so the hashed filenames are already
         final by the time this runs. */
      handler(html, ctx) {
        const bundle = ctx?.bundle ?? {};
        const basename = (file) => file.split('/').pop();

        const fonts = Object.keys(bundle)
          .filter((file) => file.endsWith('.woff2'))
          .filter((file) => CRITICAL_FONTS.some((re) => re.test(basename(file))));

        if (!fonts.length) {
          this.warn('No critical fonts matched — the masthead will load them off the render tree.');
        }

        /* The eager chunks, plus whatever they statically import — a preload for
           a chunk whose own dependencies stay undiscovered just moves the round
           trip one level down. */
        const eager = new Set();
        for (const [file, chunk] of Object.entries(bundle)) {
          if (chunk.type !== 'chunk') continue;
          if (!EAGER_CHUNKS.some((re) => re.test(basename(file)))) continue;
          eager.add(file);
          for (const dep of chunk.imports ?? []) eager.add(dep);
        }
        /* Anything the entry already lists is spoken for — and the entry itself
           is already a `<script src>`, which a `modulepreload` beside it would
           only duplicate. The entry's own list is authoritative. */
        for (const file of [...eager]) {
          if (bundle[file]?.isEntry || html.includes(`"/${file}"`)) eager.delete(file);
        }
        if (!eager.size) {
          this.warn('No eager chunks matched — the rest of the landing page will be discovered late.');
        }

        const tags = [
          ...fonts.map(
            (file) => `    <link rel="preload" as="font" type="font/woff2" href="/${file}" crossorigin />`,
          ),
          ...[...eager].map((file) => `    <link rel="modulepreload" crossorigin href="/${file}">`),
        ].join('\n');

        if (!tags) return html;
        return html.replace(
          '<link rel="manifest" href="/site.webmanifest" />',
          `${tags}\n    <link rel="manifest" href="/site.webmanifest" />`,
        );
      },
    },
  };
}

/**
 * Production build is tuned for a Contabo VPS behind Nginx:
 * - deterministic vendor chunks so long-lived assets stay cached across releases
 * - modern browser target (smaller output, native async/await)
 * - hashed filenames grouped by type for simple cache-control rules
 */
export default defineConfig({
  plugins: [react(), injectCriticalPreloads()],
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
          const path = id.split('\\').join('/');
          if (!path.includes('/node_modules/')) return undefined;
          if (/\/node_modules\/(@mui|@emotion)\//.test(path)) return 'vendor-mui';
          if (/\/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(path)) return 'vendor-react';
          // Everything else is left to the bundler: forcing a catch-all "vendor"
          // chunk would drag lazily-loaded dependency trees into the initial
          // preload list.
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
