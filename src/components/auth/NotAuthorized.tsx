import { Link } from '@tanstack/react-router';
import { Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getWorkerUrl } from '@/config/workers';

import { DevelopmentSetup } from './DevelopmentSetup';

interface NotAuthorizedProps {
  loginPath?: string;
}

export function NotAuthorized({ loginPath = '/app' }: NotAuthorizedProps) {
  // In development mode without auth API configured, show setup guide
  if (import.meta.env.DEV && !import.meta.env.VITE_AUTH_API_URL) {
    return <DevelopmentSetup />;
  }

  // Get the auth API URL - use configured URL or fallback to worker URL
  const authApiUrl =
    import.meta.env.VITE_AUTH_API_URL || getWorkerUrl('AUTH_API');
  const loginUrl = `${authApiUrl}/session?redirect=${encodeURIComponent(
    (typeof window !== 'undefined' ? window.location.origin : '') + loginPath
  )}`;

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md border-dashed">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold">
            Not authorized
          </CardTitle>
          <CardDescription>
            {import.meta.env.DEV
              ? 'Connect to your auth worker to enable full authentication.'
              : 'You need to be signed in with Cloudflare Access to view this page.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {import.meta.env.DEV ? (
            <>
              <Button asChild className="w-full">
                <Link to="/dev-setup">
                  <Settings className="mr-2 h-4 w-4" />
                  Setup Development Auth
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to={loginPath}>Continue with Mock Auth</Link>
              </Button>
            </>
          ) : (
            <Button asChild className="w-full">
              <a href={loginUrl}>Log In</a>
            </Button>
          )}
          <p className="text-center text-xs text-muted-foreground">
            {import.meta.env.DEV
              ? 'Mock auth provides admin access for testing all features.'
              : 'The login button redirects to an Access-protected endpoint to validate your session.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
