import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { createApp } from 'vinxi'

export default createApp({
  routers: [
    {
      name: 'public',
      type: 'spa',
      handler: './src/index.html',
      target: 'browser',
      plugins: () => [
        TanStackRouterVite(),
        react(),
      ],
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
