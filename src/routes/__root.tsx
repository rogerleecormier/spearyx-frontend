import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useState } from 'react';

function RootComponent() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
