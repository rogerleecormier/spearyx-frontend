import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { ChevronDown, Loader2, RefreshCcw, ShieldX } from 'lucide-react';
import { useState } from 'react';

import { NotAuthorized } from '@/components/auth/NotAuthorized';
import { Layout } from '@/components/layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { SESSION_QUERY_KEY, useSession } from '@/hooks/useSession';
import {
    fetchAdminUsers,
    toggleUserPaid,
    updateUserRole,
    type AdminUserSummary,
    type TogglePaidPayload,
    type UpdateRolePayload,
} from '@/lib/session';

const ADMIN_USERS_QUERY_KEY = ['admin', 'users'] as const;

export const Route = createFileRoute('/admin/users')({
  component: AdminUsersPage,
});

function AdminUsersPage() {
  const queryClient = useQueryClient();
  const { session, isAuthenticated, isAdmin, isPending, isFetching } = useSession();
  const [mutationError, setMutationError] = useState<string | null>(null);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);

  const isLoadingSession = isPending || isFetching;

  const usersQuery = useQuery({
    queryKey: ADMIN_USERS_QUERY_KEY,
    queryFn: () => fetchAdminUsers(),
    enabled: isAdmin,
    refetchOnWindowFocus: false,
  });

  const toggleMutation = useMutation({
    mutationFn: (payload: TogglePaidPayload) => toggleUserPaid(payload),
    onMutate: ({ userId }) => {
      setPendingUserId(userId);
      setMutationError(null);
    },
    onError: (error: unknown) => {
      setMutationError(error instanceof Error ? error.message : 'Unable to update user.');
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<AdminUserSummary[]>(ADMIN_USERS_QUERY_KEY, (previous) => {
        if (!previous) return [updatedUser];
        return previous
          .map((user) => (user.id === updatedUser.id ? updatedUser : user))
          .sort((a, b) => a.email.localeCompare(b.email));
      });

      if (updatedUser.id === session.userId) {
        queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
      }
    },
    onSettled: () => {
      setPendingUserId(null);
    },
  });

  const roleUpdateMutation = useMutation({
    mutationFn: (payload: UpdateRolePayload) => updateUserRole(payload),
    onMutate: ({ userId }) => {
      setPendingUserId(userId);
      setMutationError(null);
    },
    onError: (error: unknown) => {
      setMutationError(error instanceof Error ? error.message : 'Unable to update user role.');
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<AdminUserSummary[]>(ADMIN_USERS_QUERY_KEY, (previous) => {
        if (!previous) return [updatedUser];
        return previous
          .map((user) => (user.id === updatedUser.id ? updatedUser : user))
          .sort((a, b) => a.email.localeCompare(b.email));
      });

      if (updatedUser.id === session.userId) {
        queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
      }
    },
    onSettled: () => {
      setPendingUserId(null);
    },
  });

  const isLoadingUsers = usersQuery.isLoading || usersQuery.isFetching;

  if (isLoadingSession) {
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

  if (!isAdmin) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center bg-muted/40 p-4">
          <Card className="w-full max-w-md border-dashed text-center">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl font-semibold">
                <ShieldX className="h-6 w-6 text-amber-500" />
                Admin access required
              </CardTitle>
              <CardDescription>
                You need the admin role to view the user directory.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link to="/tools/raci">Back to tools</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const users = usersQuery.data ?? [];

  return (
    <Layout>
      <div className="container mx-auto flex flex-col gap-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">User directory</h1>
            <p className="text-sm text-muted-foreground">
              Manage Access-provisioned users and toggle paid status.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => usersQuery.refetch()}
              disabled={isLoadingUsers}
            >
              {usersQuery.isFetching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Refreshing
                </>
              ) : (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
                </>
              )}
            </Button>
          </div>
        </div>

        {usersQuery.isError && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {usersQuery.error instanceof Error ? usersQuery.error.message : 'Failed to load users.'}
          </div>
        )}

        {mutationError && (
          <div className="rounded-md border border-amber-400 bg-amber-50 p-3 text-sm text-amber-900">
            {mutationError}
          </div>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-semibold">Users</CardTitle>
              <CardDescription>
                {users.length === 0
                  ? 'No users have signed in yet.'
                  : `${users.length} ${users.length === 1 ? 'user' : 'users'} provisioned.`}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {isLoadingUsers ? (
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading users...
              </div>
            ) : (
              <UsersTable
                users={users}
                onTogglePaid={(payload) => toggleMutation.mutate(payload)}
                onUpdateRole={(payload) => roleUpdateMutation.mutate(payload)}
                pendingUserId={pendingUserId}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

interface UsersTableProps {
  users: AdminUserSummary[];
  pendingUserId: string | null;
  onTogglePaid: (payload: TogglePaidPayload) => void;
  onUpdateRole: (payload: UpdateRolePayload) => void;
}

function UsersTable({ users, pendingUserId, onTogglePaid, onUpdateRole }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No users to display yet.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead>Access Level</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Paid</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.email}</TableCell>
            <TableCell>
              <code className="rounded bg-muted px-1 py-0.5 text-xs">{user.id}</code>
            </TableCell>
            <TableCell>
              <AccessLevelDropdown
                user={user}
                onUpdateRole={onUpdateRole}
                disabled={pendingUserId === user.id}
              />
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {user.roles.length === 0 ? (
                  <Badge variant="outline">default</Badge>
                ) : (
                  user.roles.map((role) => (
                    <Badge key={role} variant={role === 'admin' ? 'default' : 'outline'}>
                      {role}
                    </Badge>
                  ))
                )}
              </div>
            </TableCell>
            <TableCell>{formatTimestamp(user.createdAt)}</TableCell>
            <TableCell className="text-right">
              <Switch
                checked={user.isPaid}
                onCheckedChange={(checked) =>
                  onTogglePaid({ userId: user.id, isPaid: checked })
                }
                disabled={pendingUserId === user.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

interface AccessLevelDropdownProps {
  user: AdminUserSummary;
  onUpdateRole: (payload: UpdateRolePayload) => void;
  disabled?: boolean;
}

function AccessLevelDropdown({ user, onUpdateRole, disabled }: AccessLevelDropdownProps) {
  const currentRole = getCurrentAccessLevel(user);
  
  const roleOptions: Array<{
    value: UpdateRolePayload['role'];
    label: string;
    description: string;
  }> = [
    { value: 'pending', label: 'Pending', description: 'No content access' },
    { value: 'verified', label: 'Verified', description: 'Basic content access' },
    { value: 'premium', label: 'Premium', description: 'Full content access' },
    { value: 'moderator', label: 'Moderator', description: 'Content moderation tools' },
    { value: 'admin', label: 'Admin', description: 'Full system access' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          className="h-8 justify-between min-w-[120px]"
        >
          <span>{getRoleLabel(currentRole)}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {roleOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onUpdateRole({ userId: user.id, role: option.value })}
            disabled={disabled || currentRole === option.value}
            className="flex flex-col items-start gap-1"
          >
            <span className="font-medium">{option.label}</span>
            <span className="text-xs text-muted-foreground">{option.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getCurrentAccessLevel(user: AdminUserSummary): UpdateRolePayload['role'] {
  // Determine access level based on roles - matches backend role hierarchy
  if (user.roles.includes('admin')) return 'admin';
  if (user.roles.includes('moderator')) return 'moderator';
  if (user.roles.includes('premium')) return 'premium';
  if (user.roles.includes('verified')) return 'verified';
  return 'pending';
}

function getRoleLabel(role: UpdateRolePayload['role']): string {
  switch (role) {
    case 'pending': return 'Pending';
    case 'verified': return 'Verified';
    case 'premium': return 'Premium';
    case 'moderator': return 'Moderator';
    case 'admin': return 'Admin';
    default: return 'Unknown';
  }
}

function formatTimestamp(value: string) {
  if (!value) {
    return 'Unknown';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

