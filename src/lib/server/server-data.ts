import { createServerFn } from '@tanstack/react-start/server';
import { z } from 'zod';

const getServerDataSchema = z.object({
  count: z.number().optional(),
});

export const getServerData = createServerFn({
  method: 'GET',
})
  .validator(getServerDataSchema)
  .handler(async ({ data }) => {
    // This simulates server-side data processing
    const count = data.count || 1;
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
  });
