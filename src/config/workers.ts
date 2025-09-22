/**
 * Cloudflare Workers configuration
 *
 * SETUP INSTRUCTIONS:
 * 1. Deploy your worker: cd workers/ai-raci-generator && npm run deploy
 * 2. Configure routes for both spearyx.com and www.spearyx.com domains
 * 3. The frontend will always use the production worker URL
 *
 * ROUTES CONFIGURED:
 * - spearyx.com/api/raci-ai/*
 * - www.spearyx.com/api/raci-ai/*
 * - spearyx.com/auth/*
 * - www.spearyx.com/auth/*
 */

export const WORKER_ENDPOINTS = {
  AI_RACI_GENERATOR: {
    production: 'https://spearyx.com/api/raci-ai/',
    production_www: 'https://www.spearyx.com/api/raci-ai/',
  },
  AUTH_API: {
    production: 'https://spearyx.com/auth',
    production_www: 'https://www.spearyx.com/auth',
  },
} as const;

/**
 * Gets the worker URL - always uses production for AI services
 * Supports both spearyx.com and www.spearyx.com domains
 */
export function getWorkerUrl(
  workerName: keyof typeof WORKER_ENDPOINTS,
  useWww = false
): string {
  const endpoints = WORKER_ENDPOINTS[workerName];

  // Always use production worker for AI services
  // This ensures consistent AI behavior and avoids local setup complexity
  return useWww ? endpoints.production_www : endpoints.production;
}

/**
 * Worker configuration options
 */
export const WORKER_CONFIG = {
  timeout: 60000, // 60 seconds - AI requests can take longer
  retries: 1, // Reduce retries since worker might be slow
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Spearyx-RACI-Generator/1.0',
  },
} as const;
