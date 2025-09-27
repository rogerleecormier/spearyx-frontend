import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 5173,
    fs: { allow: ['.'] },
  },
  plugins: [
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart({ 
      customViteReactPlugin: true
    }),
    react(),
  ],
  ssr: {
    // Handle "use client" directives in SSR build
    noExternal: [
      '@tanstack/react-query',
      'exceljs',
      'pptxgenjs',
      'docx',
      '@react-pdf/renderer',
      'html-to-image',
    ],
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress "use client" directive warnings for TanStack React Query
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) {
          return;
        }
        warn(warning);
      },
      external: [
        // Externalize Node.js dependencies for server builds
        'exceljs',
        'pptxgenjs',
      ],
      output: {
        manualChunks(id) {
          // Export libraries - split into separate chunks for better caching
          if (id.includes('@react-pdf/renderer')) return 'export-pdf';
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

          // Chart libraries
          if (id.includes('recharts')) {
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
  optimizeDeps: {
    // Pre-bundle light dependencies only
    include: [
      'react',
      'react-dom',
      '@tanstack/react-router',
      '@tanstack/react-query',
      'exceljs',
      // Packages with side effects that should not be tree-shaken
      '@floating-ui/react-dom',
      'aria-hidden',
      'react-remove-scroll',
      'tiny-warning',
      '@tanstack/store',
      '@tanstack/history',
      'isbot',
      '@tanstack/query-core',
      '@tanstack/react-store',
      '@radix-ui/primitive',
    ],
    // Exclude heavy export libraries from pre-bundling to enable lazy loading
    exclude: [
      '@react-pdf/renderer',
      'docx',
      'html-to-image',
      'pptxgenjs',
      'file-saver',
      'jszip',
    ],
    // Force re-optimization
    force: true,
  },
})
