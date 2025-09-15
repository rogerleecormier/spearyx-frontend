import { defineConfig } from '@tanstack/router-vite-plugin'

export default defineConfig({
  routeTreeFile: './src/routeTree.gen.ts',
  routesDirectory: './src/routes',
  generatedRouteTree: './src/routeTree.gen.ts',
  quoteStyle: 'single',
  semicolons: true,
  autoCodeSplitting: true,
})
