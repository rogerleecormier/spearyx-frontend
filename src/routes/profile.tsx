import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@/components/layout';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSession } from '@/hooks/useSession';

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const { session, isAuthenticated } = useSession();

  if (!isAuthenticated || !session) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <Card className="mx-auto w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You must be logged in to view this page.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Card className="mx-auto w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Manage your account information and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Account Information</h3>
              <Separator />
              <div className="grid grid-cols-1 gap-4 pt-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email Address
                  </label>
                  <div className="font-mono text-sm">{session.email}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Account Status
                  </label>
                  <div className="flex items-center gap-2">
                    <Badge variant={session.isPaid ? 'default' : 'secondary'}>
                      {session.isPaid ? 'Paid' : 'Free'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    User Role
                  </label>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={session.isAdmin ? 'destructive' : 'outline'}
                    >
                      {session.isAdmin ? 'Administrator' : 'Member'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Preferences</h3>
              <Separator />
              <div className="pt-4 text-sm text-muted-foreground">
                <p>
                  Profile preferences and additional settings will be available
                  here in future updates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
