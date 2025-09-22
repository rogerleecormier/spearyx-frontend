import { Link, createFileRoute } from '@tanstack/react-router';
import { CheckCircle2, Crown, Loader2, Shield } from 'lucide-react';

import { NotAuthorized } from '@/components/auth/NotAuthorized';
import { PendingApproval } from '@/components/auth/PendingApproval';
import { Layout } from '@/components/layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from '@/hooks/useSession';

export const Route = createFileRoute('/app')({
  component: AppLanding,
});

function AppLanding() {
  const { session, isAuthenticated, hasContentAccess, accessLevel, isPending, isFetching, refetch } = useSession();
  const isLoading = isPending || isFetching;

  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Checking your Access session...
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <NotAuthorized loginPath="/app" />
      </Layout>
    );
  }

  // Show pending approval for users without content access
  if (!hasContentAccess || accessLevel === 'none') {
    return (
      <Layout>
        <PendingApproval 
          email={session.email}
          onRefresh={refetch}
          isRefreshing={isLoading}
        />
      </Layout>
    );
  }

  // Show content for users with access
  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-xl border-precision-200">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl font-semibold">
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              Welcome to Spearyx
            </CardTitle>
            <CardDescription>
              You have {accessLevel} access to the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-center">
            <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
              <div className="font-medium text-foreground">{session.email}</div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <AccessLevelBadge level={accessLevel} />
                {session.roles.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {session.roles.join(', ')}
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild>
                  <Link to="/tools/raci">Open RACI Generator</Link>
                </Button>
                <Button variant="outline" onClick={() => refetch()}>
                  Refresh session
                </Button>
              </div>

              {/* Premium features notice */}
              {accessLevel === 'basic' && (
                <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
                  <p className="font-medium">Want more features?</p>
                  <p className="text-xs mt-1">
                    Upgrade to premium for advanced tools and priority support.
                  </p>
                </div>
              )}

              {/* Admin tools */}
              {accessLevel === 'admin' && (
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Admin Tools
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/admin/users">Manage Users</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

interface AccessLevelBadgeProps {
  level?: string;
}

function AccessLevelBadge({ level }: AccessLevelBadgeProps) {
  switch (level) {
    case 'none':
      return (
        <Badge variant="secondary" className="text-xs">
          Pending
        </Badge>
      );
    case 'basic':
      return (
        <Badge variant="outline" className="text-xs text-green-700 border-green-200">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Basic Access
        </Badge>
      );
    case 'premium':
      return (
        <Badge variant="default" className="text-xs bg-blue-600">
          <Crown className="w-3 h-3 mr-1" />
          Premium
        </Badge>
      );
    case 'admin':
      return (
        <Badge variant="default" className="text-xs bg-red-600">
          <Shield className="w-3 h-3 mr-1" />
          Admin
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="text-xs">
          {level || 'Unknown'}
        </Badge>
      );
  }
}

