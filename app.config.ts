import { defineConfig } from '@tanstack/start/config';

export default defineConfig({
  server: {
    preset: 'cloudflare-pages',
    compatibilityDate: '2024-11-19',
  },
});
