import { RouterProvider } from '@tanstack/react-router';
import { hydrateRoot } from 'react-dom/client';

import { createRouter } from './router';

const router = createRouter();

// For client-side hydration, we need to use the router with a memory history
// or browser history depending on the setup
hydrateRoot(
  document.getElementById('app')!,
  <RouterProvider router={router} />
);
