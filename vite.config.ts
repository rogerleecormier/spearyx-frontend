import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { createApp } from 'vinxi'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default createApp({
  routers: [
    {
      name: 'public',
      type: 'spa',
      handler: './src/index.html',
      target: 'browser',
      plugins: () => [
        TanStackRouterVite({
          routesDirectory: './src/routes',
          generatedRouteTree: './src/routeTree.gen.ts',
          quoteStyle: 'single',
          semicolons: true,
        }),
        react(),
      ],
    },
  ],
})
