import { createServerRoute } from '@tanstack/react-start/server';

export const getServerData = createServerRoute().methods({
  GET: async ({ request }: { request: Request }) => {
    // Get query parameters
    const url = new URL(request.url);
    const count = parseInt(url.searchParams.get('count') || '1');

    // This simulates server-side data processing
    const items = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Server Item ${i + 1}`,
      timestamp: new Date().toISOString(),
    }));

    return {
      items,
      serverTime: new Date().toISOString(),
      total: items.length,
    };
  },
});
