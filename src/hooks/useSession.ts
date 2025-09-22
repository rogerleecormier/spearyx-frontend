import { useQuery } from '@tanstack/react-query';

import {
    bootstrapSession,
    checkAccess,
    createAnonymousSession,
    fetchSession,
    type AccessCheckResponse,
    type SessionPayload,
} from '../lib/session';

export const SESSION_QUERY_KEY = ['session'] as const;
export const ACCESS_CHECK_QUERY_KEY = ['access-check'] as const;

function withAdminFlag(session: SessionPayload) {
  return {
    ...session,
    isAdmin: session.roles.includes('admin'),
  };
}

function withAccessLevel(session: SessionPayload, accessData?: AccessCheckResponse) {
  return {
    ...session,
    hasContentAccess: accessData?.hasContentAccess ?? false,
    accessLevel: accessData?.accessLevel ?? 'none',
  };
}

export function useSession() {
  const sessionQuery = useQuery({
    queryKey: SESSION_QUERY_KEY,
    staleTime: 60 * 1000,
    retry: false,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const session = await fetchSession();

      if (!session.authenticated) {
        return session;
      }

      if (session.userId) {
        return session;
      }

      return bootstrapSession({ noCache: true });
    },
  });

  const accessQuery = useQuery({
    queryKey: ACCESS_CHECK_QUERY_KEY,
    staleTime: 30 * 1000,
    retry: false,
    refetchOnWindowFocus: true,
    enabled: sessionQuery.data?.authenticated === true,
    queryFn: () => checkAccess(),
  });

  const sessionData = sessionQuery.data ?? createAnonymousSession();
  const dataWithFlags = withAdminFlag(sessionData);
  const dataWithAccess = withAccessLevel(dataWithFlags, accessQuery.data);

  const isPending = sessionQuery.isPending || (sessionData.authenticated && accessQuery.isPending);
  const isFetching = sessionQuery.isFetching || (sessionData.authenticated && accessQuery.isFetching);
  const isError = sessionQuery.isError || accessQuery.isError;
  const error = sessionQuery.error || accessQuery.error;

  return {
    ...sessionQuery,
    isPending,
    isFetching,
    isError,
    error,
    data: dataWithAccess,
    session: dataWithAccess,
    isAuthenticated: dataWithAccess.authenticated,
    isAdmin: dataWithAccess.isAdmin,
    hasContentAccess: dataWithAccess.hasContentAccess,
    accessLevel: dataWithAccess.accessLevel,
    refetch: () => {
      sessionQuery.refetch();
      if (sessionData.authenticated) {
        accessQuery.refetch();
      }
    },
  };
}
