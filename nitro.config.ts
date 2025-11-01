import { defineNitroConfig } from 'nitropack/config';

export default defineNitroConfig({
  rollupConfig: {
    external: (id: string) => {
      // Externalize vite and its subpaths to prevent bundling
      if (id === 'vite' || id.startsWith('vite/')) {
        return true;
      }
      return false;
    },
  },
});
