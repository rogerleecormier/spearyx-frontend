import { getWorkerUrl } from '../config/workers';

export interface SessionPayload {
  authenticated: boolean;
  email?: string;
  userId?: string;
  roles: string[];
  isPaid: boolean;
  hasContentAccess?: boolean;
  accessLevel?: 'none' | 'basic' | 'premium' | 'admin';
}

export interface SessionFetchOptions {
  signal?: AbortSignal;
  /**
   * Forward a Cloudflare Access JWT when cookies cannot be sent (e.g. cross-origin dev).
   */
  accessJwt?: string;
}

export interface BootstrapOptions extends SessionFetchOptions {
  /**
   * When true the request bypasses any intermediate caches.
   */
  noCache?: boolean;
}

export interface TogglePaidPayload {
  userId: string;
  isPaid: boolean;
}

export interface UpdateRolePayload {
  userId: string;
  role: 'pending' | 'verified' | 'premium' | 'moderator' | 'admin';
}

export interface AccessCheckResponse {
  hasContentAccess: boolean;
  accessLevel: 'none' | 'basic' | 'premium' | 'admin';
  // Also includes full session data from backend
  authenticated: boolean;
  email?: string;
  userId?: string;
  roles: string[];
  isPaid: boolean;
}

export interface AdminUserSummary {
  id: string;
  email: string;
  isPaid: boolean;
  roles: string[];
  createdAt: string;
}

const BASE_URL = normalizeBaseUrl(import.meta.env.VITE_AUTH_API_URL) || getWorkerUrl('AUTH_API');

// Debug logging
console.log('🔧 Environment VITE_AUTH_API_URL:', import.meta.env.VITE_AUTH_API_URL);
console.log('🔧 Normalized BASE_URL:', BASE_URL);
console.log('🔧 Worker fallback URL:', getWorkerUrl('AUTH_API'));

function normalizeBaseUrl(url?: string) {
  if (!url) return undefined;
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function createAnonymousSession(): SessionPayload {
  return {
    authenticated: false,
    roles: [],
    isPaid: false,
    hasContentAccess: false,
    accessLevel: 'none',
  };
}

function ensureBaseUrl(action: string) {
  if (!BASE_URL) {
    throw new Error(`Auth API URL is required to ${action}. Configure VITE_AUTH_API_URL or ensure worker endpoints are available.`);
  }

  return BASE_URL;
}

function createAuthHeaders(accessJwt?: string) {
  const headers = new Headers();

  if (accessJwt) {
    headers.set('CF-Access-Jwt-Assertion', accessJwt);
  }

  return headers;
}

async function parseSessionResponse(response: Response): Promise<SessionPayload> {
  if (response.status === 401) {
    return createAnonymousSession();
  }

  if (!response.ok) {
    throw new Error(`Auth API request failed (${response.status}).`);
  }

  const data = (await response.json()) as Partial<SessionPayload>;

  return {
    authenticated: Boolean(data.authenticated),
    email: data.email,
    userId: data.userId,
    roles: Array.isArray(data.roles) ? (data.roles as string[]) : [],
    isPaid: Boolean(data.isPaid),
    hasContentAccess: Boolean(data.hasContentAccess),
    accessLevel: data.accessLevel || 'none',
  };
}

function normalizeAdminUser(record: Record<string, unknown>): AdminUserSummary {
  const id = typeof record?.id === 'string' ? record.id : typeof record?.userId === 'string' ? record.userId : '';
  const email = typeof record?.email === 'string' ? record.email : '';
  const createdAt = typeof record?.createdAt === 'string' ? record.createdAt : '';

  if (!id || !email) {
    throw new Error('Invalid user record returned by auth API.');
  }

  return {
    id,
    email,
    isPaid: Boolean(record?.isPaid),
    roles: Array.isArray(record?.roles) ? record.roles.map(String) : [],
    createdAt,
  };
}

export async function fetchSession(options: SessionFetchOptions = {}): Promise<SessionPayload> {
  if (!BASE_URL) {
    if (import.meta.env.DEV) {
      console.warn('Auth API URL is not configured; treating session as unauthenticated.');
      // In development without auth API, provide a mock session for testing
      return createMockDevSession();
    }
    return createAnonymousSession();
  }

  const headers = createAuthHeaders(options.accessJwt);
  
  // In development mode with production auth, add mock email header if no auth JWT is present
  // This allows testing the production auth worker without full Cloudflare Access setup
  if (import.meta.env.DEV && import.meta.env.VITE_ENVIRONMENT === 'development' && 
      !headers.get('CF-Access-Jwt-Assertion') && !headers.get('Authorization')) {
    headers.set('X-Mock-Email', 'dev@localhost.com');
  }

  console.log('🔍 Fetching session from:', `${BASE_URL}/session`);
  console.log('🔍 Headers:', Object.fromEntries(headers.entries()));

  const response = await fetch(`${BASE_URL}/session`, {
    method: 'GET',
    credentials: 'include',
    headers,
    signal: options.signal,
  });

  console.log('🔍 Session response:', response.status, response.statusText);
  
  return parseSessionResponse(response);
}

function createMockDevSession(): SessionPayload {
  return {
    authenticated: true,
    email: 'dev@localhost.com',
    userId: 'dev-user-123',
    roles: ['admin'], // Give admin role for development
    isPaid: true,
    hasContentAccess: true,
    accessLevel: 'admin',
  };
}

export async function bootstrapSession(options: BootstrapOptions = {}): Promise<SessionPayload> {
  if (!BASE_URL) {
    if (import.meta.env.DEV) {
      console.warn('Auth API URL is not configured; skipping /bootstrap call.');
      return createMockDevSession();
    }
    return createAnonymousSession();
  }

  const headers = createAuthHeaders(options.accessJwt);
  
  // In development mode with production auth, add mock email header if no auth JWT is present
  if (import.meta.env.DEV && import.meta.env.VITE_ENVIRONMENT === 'development' && 
      !headers.get('CF-Access-Jwt-Assertion') && !headers.get('Authorization')) {
    headers.set('X-Mock-Email', 'dev@localhost.com');
  }

  const requestInit: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers,
    signal: options.signal,
  };

  if (options.noCache) {
    requestInit.cache = 'no-store';
  }

  const response = await fetch(`${BASE_URL}/bootstrap`, requestInit);

  return parseSessionResponse(response);
}

export async function fetchAdminUsers(options: SessionFetchOptions = {}): Promise<AdminUserSummary[]> {
  if (!BASE_URL) {
    if (import.meta.env.DEV) {
      // Return mock users for development
      return [
        {
          id: 'dev-user-123',
          email: 'dev@localhost.com',
          isPaid: true,
          roles: ['admin'],
          createdAt: new Date().toISOString(),
        },
        {
          id: 'test-user-456',
          email: 'test@example.com',
          isPaid: false,
          roles: ['pending'],
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
        {
          id: 'user-789',
          email: 'user@example.com',
          isPaid: false,
          roles: ['verified'],
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
      ];
    }
    throw new Error('Auth API URL is required to fetch admin users. Configure VITE_AUTH_API_URL or ensure worker endpoints are available.');
  }

  const baseUrl = ensureBaseUrl('fetch admin users');

  const headers = createAuthHeaders(options.accessJwt);
  
  // In development mode with production auth, add mock email header if no auth JWT is present
  if (import.meta.env.DEV && import.meta.env.VITE_ENVIRONMENT === 'development' && 
      !headers.get('CF-Access-Jwt-Assertion') && !headers.get('Authorization')) {
    headers.set('X-Mock-Email', 'dev@localhost.com');
  }

  const response = await fetch(`${baseUrl}/admin/users`, {
    method: 'GET',
    credentials: 'include',
    headers,
    signal: options.signal,
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (response.status === 403) {
    throw new Error('Forbidden');
  }

  if (!response.ok) {
    throw new Error(`Failed to load admin users (${response.status}).`);
  }

  const payload = (await response.json()) as { users?: unknown } | undefined;

  if (!payload?.users || !Array.isArray(payload.users)) {
    return [];
  }

  return payload.users.map((user) => normalizeAdminUser(user as Record<string, unknown>)).sort((a, b) => a.email.localeCompare(b.email));
}

export async function toggleUserPaid(
  payload: TogglePaidPayload,
  options: SessionFetchOptions = {}
): Promise<AdminUserSummary> {
  const baseUrl = ensureBaseUrl('toggle user paid status');

  const headers = createAuthHeaders(options.accessJwt);
  headers.set('Content-Type', 'application/json');

  const response = await fetch(`${baseUrl}/admin/toggle-paid`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify(payload),
    signal: options.signal,
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (response.status === 403) {
    throw new Error('Forbidden');
  }

  if (!response.ok) {
    throw new Error(`Failed to update paid status (${response.status}).`);
  }

  const body = (await response.json()) as { user?: unknown } | undefined;

  if (!body?.user) {
    throw new Error('Auth API returned an empty user payload.');
  }

  return normalizeAdminUser(body.user as Record<string, unknown>);
}

export async function checkAccess(options: SessionFetchOptions = {}): Promise<AccessCheckResponse> {
  if (!BASE_URL) {
    if (import.meta.env.DEV) {
      // Return mock access data for development
      const mockSession = createMockDevSession();
      return {
        ...mockSession,
        hasContentAccess: mockSession.hasContentAccess!,
        accessLevel: mockSession.accessLevel!,
        authenticated: mockSession.authenticated,
        roles: mockSession.roles,
        isPaid: mockSession.isPaid,
      };
    }
    return { 
      hasContentAccess: false, 
      accessLevel: 'none',
      authenticated: false,
      roles: [],
      isPaid: false,
    };
  }

  const baseUrl = ensureBaseUrl('check access');

  const headers = createAuthHeaders(options.accessJwt);
  
  // In development mode with production auth, add mock email header if no auth JWT is present
  if (import.meta.env.DEV && import.meta.env.VITE_ENVIRONMENT === 'development' && 
      !headers.get('CF-Access-Jwt-Assertion') && !headers.get('Authorization')) {
    headers.set('X-Mock-Email', 'dev@localhost.com');
  }

  const response = await fetch(`${baseUrl}/check-access`, {
    method: 'GET',
    credentials: 'include',
    headers,
    signal: options.signal,
  });

  if (response.status === 401) {
    return { 
      hasContentAccess: false, 
      accessLevel: 'none',
      authenticated: false,
      roles: [],
      isPaid: false,
    };
  }

  if (!response.ok) {
    throw new Error(`Failed to check access (${response.status}).`);
  }

  const data = (await response.json()) as Partial<AccessCheckResponse>;
  
  return {
    hasContentAccess: Boolean(data.hasContentAccess),
    accessLevel: data.accessLevel ?? 'none',
    authenticated: Boolean(data.authenticated),
    email: data.email,
    userId: data.userId,
    roles: Array.isArray(data.roles) ? (data.roles as string[]) : [],
    isPaid: Boolean(data.isPaid),
  };
}

export async function updateUserRole(
  payload: UpdateRolePayload,
  options: SessionFetchOptions = {}
): Promise<AdminUserSummary> {
  const baseUrl = ensureBaseUrl('update user role');

  const headers = createAuthHeaders(options.accessJwt);
  headers.set('Content-Type', 'application/json');

  const response = await fetch(`${baseUrl}/admin/update-role`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify(payload),
    signal: options.signal,
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (response.status === 403) {
    throw new Error('Forbidden');
  }

  if (!response.ok) {
    throw new Error(`Failed to update user role (${response.status}).`);
  }

  const body = (await response.json()) as { user?: unknown } | undefined;

  if (!body?.user) {
    throw new Error('Auth API returned an empty user payload.');
  }

  return normalizeAdminUser(body.user as Record<string, unknown>);
}





