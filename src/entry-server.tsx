// src/entry-server.tsx
/// <reference types="@cloudflare/workers-types" />
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { renderToReadableStream } from 'react-dom/server';

import { createRouter } from './router';

// Look up hashed client entry from Vite manifest served by Pages/Assets
async function resolveClientEntry(
  request: Request,
  env: Record<string, unknown> & {
    ASSETS: { fetch: (request: Request) => Promise<Response> };
  }
): Promise<string> {
  try {
    // Build a URL relative to the incoming request, then ask Assets for it
    const url = new URL('/manifest.json', request.url);
    const res = await env.ASSETS.fetch(new Request(url, { method: 'GET' }));
    if (res.ok) {
      const manifest = (await res.json()) as Record<string, { file: string }>;
      const file = manifest['src/entry-client.tsx']?.file;
      if (file) return `/${file}`;
    }
  } catch (e) {
    // will fall back
  }
  // Fallback if manifest missing / local dev
  return '/assets/entry-client.js';
}

async function htmlShell(body: ReadableStream, clientEntryHref: string) {
  const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Spearyx</title>
</head>
<body>
<div id="root">`;
  const tail = `</div>
<script type="module" src="${clientEntryHref}"></script>
</body>
</html>`;

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  await writer.write(new TextEncoder().encode(head));
  const reader = body.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value) await writer.write(value);
  }
  await writer.write(new TextEncoder().encode(tail));
  await writer.close();

  return readable;
}

export async function createServer({
  request,
  env,
  ctx,
}: {
  request: Request;
  env: Record<string, unknown> & {
    ASSETS: { fetch: (request: Request) => Promise<Response> };
  };
  ctx: ExecutionContext;
}) {
  const authApiUrl = env.VITE_AUTH_API_URL as string;

  const router = createRouter({
    request,
    env,
    ctx,
    authApiUrl,
  });

  const app = (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );

  const reactStream = await renderToReadableStream(app);
  const clientEntryHref = await resolveClientEntry(request, env);
  const full = await htmlShell(reactStream, clientEntryHref);

  return new Response(full, {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
