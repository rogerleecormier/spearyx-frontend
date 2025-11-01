import { defineNitroConfig } from 'nitropack/config';

export default defineNitroConfig({
  // Handle Node.js compatibility for Cloudflare Workers
  node: false,

  // Externalize vite to prevent bundling/parsing issues
  rollupConfig: {
    external: (id) => {
      // Explicitly externalize vite and its subpaths
      if (id === 'vite' || id.startsWith('vite/')) {
        return true;
      }
      // Let Nitro handle other externals with its default logic
      return undefined;
    },
  },
  
  // Additional hook to ensure vite externalization works in all presets
  hooks: {
    'rollup:before': (nitro, config) => {
      const existingExternal = config.external;
      config.external = (id, parentId, isResolved) => {
        if (id === 'vite' || id?.startsWith('vite/')) {
          return true;
        }
        if (typeof existingExternal === 'function') {
          return existingExternal(id, parentId, isResolved);
        }
        if (Array.isArray(existingExternal)) {
          return existingExternal.includes(id);
        }
        return false;
      };
    },
  },
});
