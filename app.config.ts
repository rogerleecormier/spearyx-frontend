import { createApp } from 'vinxi';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default createApp({
  server: {
    rollupConfig: {
      external: ['vite'],
    },
  },
  routers: [
    {
      name: 'public',
      type: 'static',
      dir: './public',
      base: '/',
    },
    {
      name: 'client',
      type: 'client',
      handler: './src/entry-client.tsx',
      target: 'browser',
      base: '/',
      plugins: () => [
        tsConfigPaths({
          projects: ['./tsconfig.json'],
        }),
        tanstackStart({ customViteReactPlugin: true }),
        react(),
      ],
    },
    {
      name: 'ssr',
      type: 'http',
      handler: './src/entry-server.tsx',
      target: 'server',
      base: '/',
      plugins: () => [
        tsConfigPaths({
          projects: ['./tsconfig.json'],
        }),
        tanstackStart({ customViteReactPlugin: true }),
        react(),
      ],
    },
  ],
});
