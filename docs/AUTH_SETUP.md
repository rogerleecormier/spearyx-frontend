# Authentication Environment

Configure the frontend to talk to the Cloudflare Access auth worker via the following Vite environment variable:

```bash
# .env.local
VITE_AUTH_API_URL="https://<your-worker-dev-or-route-url>"
```

- When running locally, point this URL at `wrangler dev` for the portable auth worker (e.g. `http://127.0.0.1:8787`).
- In production, reference the deployed worker route (for example `https://api.spearyx.com/auth`).
- The `useSession` hook automatically calls `/session` and `/bootstrap` on that worker and forwards cookies/Access headers.

See `workers/auth-api/README.md` for worker bindings, D1 migrations, and JWT configuration.
