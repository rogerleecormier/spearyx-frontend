import { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

export interface RouterContext {
  queryClient: QueryClient;
  request?: Request;
  env?: Record<string, unknown>;
  ctx?: ExecutionContext;
  authApiUrl?: string;
}

// Extended router type that includes our custom context
export type AppRouter = ReturnType<typeof createRouter> & {
  authApiUrl?: string;
};

export function createRouter(additionalContext?: Partial<RouterContext>) {
  const queryClient = new QueryClient();

  const router = createTanStackRouter({
    routeTree,
    context: {
      queryClient,
      ...additionalContext,
    },
    defaultPreload: 'intent',
    scrollRestoration: true,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: AppRouter;
  }

  interface RouterContext {
    queryClient: QueryClient;
    request?: Request;
    env?: Record<string, unknown>;
    ctx?: ExecutionContext;
    authApiUrl?: string;
  }
}
