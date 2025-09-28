import { useRouter } from '@tanstack/react-router';
import { AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import type { AppRouter } from '../../router';

export function DevelopmentSetup() {
  const [copiedEnv, setCopiedEnv] = useState(false);
  const router = useRouter() as AppRouter;

  const envContent = `# Auth API Configuration
# Use your production auth worker
VITE_AUTH_API_URL=https://spearyx.com/auth

# Development mode flag
VITE_ENVIRONMENT=development`;

  const copyEnvContent = () => {
    navigator.clipboard.writeText(envContent);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Development Setup</h1>
          <p className="text-muted-foreground">
            Configure your local environment to work with the auth system
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Not Configured</AlertTitle>
          <AlertDescription>
            The frontend is running in development mode but cannot connect to
            the auth API. Follow the setup steps below to enable authentication.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Option 1: Use Mock Authentication</CardTitle>
              <CardDescription>
                The simplest way to test the frontend without setting up the
                backend
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The frontend is currently using mock authentication data. You
                have admin access as:
              </p>
              <div className="rounded-md bg-muted p-3">
                <code className="text-sm">dev@localhost.com (Admin)</code>
              </div>
              <p className="text-sm text-muted-foreground">
                This allows you to test all features including the admin panel
                with mock data.
              </p>
              <Button asChild className="w-full">
                <a href="/app">Continue with Mock Auth</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Option 2: Connect to Production Auth</CardTitle>
              <CardDescription>
                Use your deployed auth worker for full Cloudflare Access
                authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="mb-2 font-medium">
                    1. Create environment file
                  </h4>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">
                      {envContent}
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute right-2 top-2"
                      onClick={copyEnvContent}
                    >
                      {copiedEnv ? 'Copied!' : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Create a <code>.env.local</code> file in the project root
                    with this content
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-2 font-medium">2. Restart the frontend</h4>
                  <div className="rounded-md bg-muted p-3">
                    <code className="text-xs">npm run dev</code>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    The frontend will now connect to your production auth worker
                    at <code>spearyx.com/auth</code>
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-2 font-medium">3. Authentication Flow</h4>
                  <p className="text-xs text-muted-foreground">
                    • Login will redirect through Cloudflare Access
                    <br />
                    • You'll authenticate with your configured identity provider
                    <br />
                    • New users start with 'pending' role and need admin
                    approval
                    <br />• Admins can promote users through the admin panel
                  </p>
                </div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <a
                  href="https://developers.cloudflare.com/cloudflare-one/identity/users/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Cloudflare Access Docs
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-medium">Environment</h4>
                <p className="text-sm text-muted-foreground">Development</p>
              </div>
              <div>
                <h4 className="font-medium">Auth API URL</h4>
                <p className="text-sm text-muted-foreground">
                  {router.authApiUrl || 'Not configured (using fallback)'}
                </p>
              </div>
              <div>
                <h4 className="font-medium">Authentication Mode</h4>
                <p className="text-sm text-muted-foreground">
                  {router.authApiUrl
                    ? 'Real Auth Worker'
                    : 'Mock Authentication'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
