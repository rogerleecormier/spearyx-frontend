import { cloudflare } from '@cloudflare/vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '/',
  server: {
    port: 5173,
    fs: { allow: ['.'] },
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  plugins: [
    tanstackStart({
      customViteReactPlugin: true,
    }),
    react(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    cloudflare(),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // Avoid aggressive compression that might create duplicate keys
        passes: 1,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: {
        // Be more conservative with mangling to avoid issues
        safari10: true,
      },
    },
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress "use client" directive warnings for TanStack React Query
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) {
          return;
        }
        // Suppress duplicate object key warnings that might come from minified dependencies
        if (warning.code === 'DUPLICATE_OBJECT_KEY' || warning.message.includes('Duplicate key')) {
          return;
        }
        warn(warning);
      },
    },
    // Increase chunk size warning limit since we're optimizing with manual chunks
    chunkSizeWarningLimit: 2000,
  },
  define: {
    // Fix for jszip compatibility with pptxgenjs
    global: 'globalThis',
    // Ensure require is available for compatibility
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  // Additional configuration for problematic packages
  esbuild: {
    define: {
      global: 'globalThis',
    },
  },
})
