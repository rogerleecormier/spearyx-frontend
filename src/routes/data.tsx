import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Body, Card, ElevatedCard, Hero, Title } from '@/components/brand';
import { Layout } from '@/components/layout';
import { getServerData } from '@/lib/server/server-data';

// For server-side calls, we need to import the server function properly
// This will be handled by TanStack Start's server function system

import { Button } from '../components/ui/button';
import { useLogger } from '../lib/useLogger';

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

    // Call the server function - on server side this runs directly, on client side it makes HTTP call
    const serverFunctionData = await getServerData({ count: 3 });

    return {
      serverData,
      serverFunctionData,
    };
  },
});

function DataPage() {
  const { serverData, serverFunctionData } = Route.useLoaderData();
  const log = useLogger('DataPage');

  // Client-side query to demonstrate hydration
  const { data: clientData, refetch } = useSuspenseQuery({
    queryKey: ['client-data'],
    queryFn: async () => {
      log.info('Starting client-side data fetch');
      const startTime = performance.now();

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const endTime = performance.now();
      const duration = endTime - startTime;

      log.performance('Client data fetch', duration);
      log.info('Client-side data fetch completed');

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
    <Layout>
      <div className="min-h-screen bg-precision-50 py-12 dark:bg-precision-900">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <Hero>Server-Side Rendering Demo</Hero>
            <Body className="mt-4">
              This page demonstrates SSR capabilities with TanStack Start
            </Body>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Server-Side Data (from loader) */}
            <Card>
              <Title>Server-Side Data (SSR)</Title>
              <div className="mt-4 space-y-2">
                <Body>
                  <strong>Message:</strong> {serverData.message}
                </Body>
                <Body>
                  <strong>Timestamp:</strong>{' '}
                  {new Date(serverData.timestamp).toLocaleString()}
                </Body>
                <Body>
                  <strong>Server-Side:</strong>{' '}
                  {serverData.isServerSide ? '✅ Yes' : '❌ No'}
                </Body>
              </div>
            </Card>

            {/* Server Function Data */}
            <Card>
              <Title>Server Function Data</Title>
              <div className="mt-4 space-y-2">
                <Body>
                  <strong>Total Items:</strong> {serverFunctionData.total}
                </Body>
                <Body>
                  <strong>Server Time:</strong>{' '}
                  {new Date(serverFunctionData.serverTime).toLocaleString()}
                </Body>
                <div className="mt-4">
                  <Body>
                    <strong>Items:</strong>
                  </Body>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    {serverFunctionData.items.map((item: ServerItem) => (
                      <li
                        key={item.id}
                        className="text-precision-600 dark:text-precision-400"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Client-Side Data */}
            <ElevatedCard className="md:col-span-2">
              <Title>Client-Side Data (Hydrated)</Title>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <Body>
                    <strong>Message:</strong> {clientData.message}
                  </Body>
                  <Body>
                    <strong>Timestamp:</strong>{' '}
                    {new Date(clientData.timestamp).toLocaleString()}
                  </Body>
                  <Body>
                    <strong>Server-Side:</strong>{' '}
                    {clientData.isServerSide ? '✅ Yes' : '❌ No'}
                  </Body>
                </div>
                <Button
                  onClick={() => {
                    log.userAction('refresh_client_data');
                    refetch();
                  }}
                  className="shrink-0"
                >
                  Refresh Client Data
                </Button>
              </div>
            </ElevatedCard>
          </div>
        </div>
      </div>
    </Layout>
  );
}
