// app.config.ts
// Export the config directly to avoid depending on '@tanstack/start/config' types at build time.
export default {
  server: {
    preset: 'cloudflare-pages',
  },
} as const;
