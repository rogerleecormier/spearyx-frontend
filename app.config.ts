import { defineConfig } from 'vinxi/config'
import { cloudflarePages } from 'vinxi/cloudflare-pages'

export default defineConfig({
  server: {
    preset: cloudflarePages({
      entry: './src/app.tsx',
    }),
  },
})
