import { defineNitroConfig } from 'nitropack/config';

export default defineNitroConfig({
  rollupConfig: {
    external: (id: string) => {
      // Externalize vite and its subpaths to prevent bundling
      if (id === 'vite' || id.startsWith('vite/')) {
        return true;
      }
      // Allow default handling for Node built-ins and other packages
      return undefined;
    },
  },
});
