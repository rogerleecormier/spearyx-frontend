import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from '@/hooks/useSession';

export const Route = createFileRoute('/debug-auth')({
  component: AuthDebug,
});

function AuthDebug() {
  const { session, isAuthenticated, hasContentAccess, accessLevel, isPending, error } = useSession();
  const [testResult, setTestResult] = useState<string>('');

  const testAuthWorker = async () => {
    try {
      setTestResult('Testing...');
      
      const authUrl = import.meta.env.VITE_AUTH_API_URL || 'https://spearyx.com/auth';
      console.log('🔍 Testing fetch to:', `${authUrl}/session`);
      
      const response = await fetch(`${authUrl}/session`, {
        method: 'GET',
        headers: {
          'X-Mock-Email': 'dev@localhost.com',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      console.log('🔍 Response received:', response.status, response.statusText);
      console.log('🔍 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        setTestResult(`Status: ${response.status} ${response.statusText}\nError: ${errorText}`);
        return;
      }

      const data = await response.json();
      setTestResult(`Status: ${response.status}\nResponse: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error('🔍 Fetch error:', error);
      setTestResult(`Error: ${error instanceof Error ? error.message : String(error)}\nCheck browser console for more details.`);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Auth Debug Page</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Environment Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Auth API URL:</strong> {import.meta.env.VITE_AUTH_API_URL || 'Not set'}</p>
          <p><strong>Environment:</strong> {import.meta.env.VITE_ENVIRONMENT || 'Not set'}</p>
          <p><strong>Dev Mode:</strong> {import.meta.env.DEV ? 'Yes' : 'No'}</p>
          <p><strong>All Env Vars:</strong></p>
          <pre className="bg-muted p-2 rounded text-xs overflow-auto" suppressHydrationWarning>
            {JSON.stringify(import.meta.env, null, 2)}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Loading:</strong> {isPending ? 'Yes' : 'No'}</p>
          <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
          <p><strong>Has Content Access:</strong> {hasContentAccess ? 'Yes' : 'No'}</p>
          <p><strong>Access Level:</strong> {accessLevel || 'None'}</p>
          <p><strong>Email:</strong> {session.email || 'None'}</p>
          <p><strong>Roles:</strong> {session.roles?.join(', ') || 'None'}</p>
          {error && <p><strong>Error:</strong> {error.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Direct Auth Worker Test</CardTitle>
          <CardDescription>Test direct connection to auth worker</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testAuthWorker}>Test Auth Worker</Button>
          {testResult && (
            <pre className="bg-muted p-4 rounded-md text-sm overflow-auto max-h-64">
              {testResult}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}