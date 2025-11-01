import { defineNitroConfig } from 'nitropack/config';

export default defineNitroConfig({
  // Externalize vite to prevent bundling/parsing issues
  externals: {
    external: ['vite'],
  },
  
  // Handle Node.js compatibility for Cloudflare Workers
  node: false,
});
