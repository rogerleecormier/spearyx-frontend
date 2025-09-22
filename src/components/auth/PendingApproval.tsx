import { Clock, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface PendingApprovalProps {
  email?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function PendingApproval({
  email,
  onRefresh,
  isRefreshing,
}: PendingApprovalProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md border-dashed border-amber-200">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl font-semibold text-amber-800">
            <Clock className="h-6 w-6" />
            Pending approval
          </CardTitle>
          <CardDescription>
            Your account is awaiting approval from an administrator to access
            content.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {email && (
            <div className="rounded-md bg-amber-50 p-3 text-sm">
              <div className="flex items-center gap-2 text-amber-800">
                <Mail className="h-4 w-4" />
                <span className="font-medium">{email}</span>
              </div>
              <p className="mt-1 text-xs text-amber-700">
                This is the email address associated with your account.
              </p>
            </div>
          )}

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">What happens next?</strong>
            </p>
            <ul className="space-y-1 text-xs">
              <li>• An administrator will review your request</li>
              <li>• You'll be notified when your access is approved</li>
              <li>• You can then access all available content and tools</li>
            </ul>
          </div>

          {onRefresh && (
            <Button
              variant="outline"
              className="w-full"
              onClick={onRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? 'Checking...' : 'Check status again'}
            </Button>
          )}

          <p className="text-center text-xs text-muted-foreground">
            If you believe this is an error, please contact your administrator.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
