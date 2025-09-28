import { createServer } from '../entry-server';

export default {
  async fetch(
    request: Request,
    env: Record<string, unknown> & {
      ASSETS: { fetch: (request: Request) => Promise<Response> };
    },
    ctx: ExecutionContext
  ) {
    try {
      return await createServer({ request, env, ctx });
    } catch (err: unknown) {
      console.error('SSR crash:', err instanceof Error ? err.stack : err);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
