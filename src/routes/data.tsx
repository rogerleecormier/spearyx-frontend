import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Button } from '../components/ui/button';
import { getServerData } from './server-data';

interface ServerItem {
  id: number;
  name: string;
  timestamp: string;
}

export const Route = createFileRoute('/data')({
  component: DataPage,
  loader: async () => {
    // Simulate server-side data fetching during SSR
    // In a real app, this would call an API or database
    const serverData = {
      message: 'Hello from the server!',
      timestamp: new Date().toISOString(),
      userAgent: 'Server-side rendered',
      isServerSide: true,
    };

    const serverFunctionData = await getServerData({ count: 3 });

    return {
      serverData,
      serverFunctionData,
    };
  },
});

function DataPage() {
  const { serverData, serverFunctionData } = Route.useLoaderData();

  // Client-side query to demonstrate hydration
  const { data: clientData, refetch } = useSuspenseQuery({
    queryKey: ['client-data'],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        message: 'Hello from the client!',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        isServerSide: false,
      };
    },
    initialData: serverData,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-100">
            Server-Side Rendering Demo
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            This page demonstrates SSR capabilities with TanStack Start
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Server-Side Data (from loader) */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
            <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
              Server-Side Data (SSR)
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Message:</strong> {serverData.message}
              </p>
              <p>
                <strong>Timestamp:</strong>{' '}
                {new Date(serverData.timestamp).toLocaleString()}
              </p>
              <p>
                <strong>Server-Side:</strong>{' '}
                {serverData.isServerSide ? '✅ Yes' : '❌ No'}
              </p>
            </div>
          </div>

          {/* Server Function Data */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
            <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
              Server Function Data
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Total Items:</strong> {serverFunctionData.total}
              </p>
              <p>
                <strong>Server Time:</strong>{' '}
                {new Date(serverFunctionData.serverTime).toLocaleString()}
              </p>
              <div className="mt-4">
                <strong>Items:</strong>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  {serverFunctionData.items.map((item: ServerItem) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Client-Side Data */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800 md:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
              Client-Side Data (Hydrated)
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2 text-sm">
                <p>
                  <strong>Message:</strong> {clientData.message}
                </p>
                <p>
                  <strong>Timestamp:</strong>{' '}
                  {new Date(clientData.timestamp).toLocaleString()}
                </p>
                <p>
                  <strong>Server-Side:</strong>{' '}
                  {clientData.isServerSide ? '✅ Yes' : '❌ No'}
                </p>
              </div>
              <Button onClick={() => refetch()} className="shrink-0">
                Refresh Client Data
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
