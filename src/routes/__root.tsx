import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
  Link,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useState, type ReactNode } from 'react';

import appStyles from '../index.css?url';

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-primary text-9xl font-bold">404</h1>
        <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-block rounded-md px-6 py-3 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'description',
        content:
          'Generate professional RACI matrices with Spearyx. Share, export, and collaborate with confidence.',
      },
      {
        name: 'theme-color',
        content: '#111827',
      },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: appStyles },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground">
        <div id="root">{children}</div>
        <Scripts />
      </body>
    </html>
  );
}
