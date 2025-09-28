// vite.config.ts
import { cloudflare } from '@cloudflare/vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ command: _command, mode }) => {
  // Detect if this is an SSR build based on command line arguments or mode
  const isSSR = process.argv.includes('--ssr') || mode === 'ssr'

  return {
  base: '/',
  server: {
    port: 5173,
    fs: { allow: ['.'] },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    // Let TanStack Start own the React plugin lifecycle
    tanstackStart({
      customViteReactPlugin: true,
    }),
    react(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),

    // Keep Cloudflare plugin last - only for SSR builds
    ...(isSSR ? [cloudflare()] : []),
  ],
  build: {
    // IMPORTANT: split client/server outputs
    outDir: isSSR ? 'dist/server' : 'dist/client',
    // Emit client manifest so server can find hashed entry
    manifest: !isSSR,
    // For SSR builds, we need to ensure assets are available
    ...(isSSR && {
      rollupOptions: {
        external: (id) => {
          if (id.startsWith('node:')) return true
          // Keep client assets external for SSR
          if (id.includes('assets/')) return true
          return false
        },
      },
    }),

    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 1,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: { safari10: true },
    },
    rollupOptions: {
      // Define explicit entry for each side
      input: isSSR ? 'src/entry-server.tsx' : 'src/entry-client.tsx',
      external: (id) => {
        if (id.startsWith('node:')) return true
        return false
      },
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) return
        if (warning.code === 'DUPLICATE_OBJECT_KEY' || warning.message.includes('Duplicate key')) return
        if (warning.message.includes('Readable') && warning.message.includes('__vite-browser-external')) return
        warn(warning)
      },
    },
    chunkSizeWarningLimit: 2000,
    target: 'es2022',
  },
  define: {
    global: 'globalThis',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  esbuild: {
    define: {
      global: 'globalThis',
    },
  },
  }
})
