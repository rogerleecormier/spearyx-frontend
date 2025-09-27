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
      customViteReactPlugin: true
    }),
    react(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
  ],
  ssr: {
    // Handle "use client" directives in SSR build
    noExternal: [
      '@tanstack/react-query',
      'exceljs',
      'pptxgenjs',
      'docx',
      'html-to-image',
    ],
  },
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
      external: [
        // Externalize Node.js dependencies for server builds
        'exceljs',
        'jszip',
        // Externalize chart libraries to avoid minification issues
        'recharts',
        'd3',
        'd3-array',
        'd3-scale',
        'd3-shape',
        'd3-color',
        'd3-format',
        'd3-time',
        'd3-time-format',
        // Externalize PDF renderer to avoid minification issues
        '@react-pdf/renderer',
        'react-pdf',
      ],
      output: {
        manualChunks(id) {
          // Export libraries - split into separate chunks for better caching
          if (id.includes('docx')) return 'export-docx';
          if (id.includes('exceljs')) return 'export-xlsx';
          if (id.includes('html-to-image')) return 'export-image';
          if (id.includes('pptxgenjs')) return 'export-pptx';

          // TanStack libraries
          if (id.includes('@tanstack/react-router') || id.includes('@tanstack/react-query')) {
            return 'tanstack-vendor';
          }

          // UI libraries - split Radix UI components
          if (id.includes('@radix-ui/')) {
            return 'ui-vendor';
          }

          // Form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform/resolvers')) {
            return 'form-vendor';
          }

          // Utility libraries
          if (id.includes('date-fns') || id.includes('zod') || id.includes('clsx') || id.includes('tailwind-merge')) {
            return 'utils-vendor';
          }

          // Chart libraries (exclude recharts and d3 since they're externalized)
          if (id.includes('victory') || id.includes('chart')) {
            return 'chart-vendor';
          }

          // Icon libraries
          if (id.includes('lucide-react')) {
            return 'icons-vendor';
          }

          // Animation libraries
          if (id.includes('framer-motion') || id.includes('embla-carousel')) {
            return 'animation-vendor';
          }

          // File processing libraries
          if (id.includes('file-saver') || id.includes('jszip')) {
            return 'file-processing-vendor';
          }

          // Let TanStack Start handle React dependencies
          return undefined;
        },
        chunkFileNames: (chunkInfo) => {
          // Custom naming for export chunks
          if (chunkInfo.name?.includes('export')) {
            return 'assets/export/[name]-[hash].js';
          }
          return 'assets/[name]-[hash].js';
        },
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
