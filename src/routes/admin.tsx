import { Link, createFileRoute } from '@tanstack/react-router';

import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useSession } from '@/hooks/useSession';
import { Database, Layout as LayoutIcon, Palette, ShieldCheck, Type, Users } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

function AdminPage() {
  const { session, isAuthenticated, isAdmin } = useSession();

  if (!isAuthenticated || !isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You need administrator privileges to access this page.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    );
  }

  const adminLinks = [
    {
      title: 'Users',
      description: 'Manage user accounts and permissions',
      href: '/admin-users',
      icon: Users,
    },
    {
      title: 'Typography',
      description: 'Typography guide and design system',
      href: '/typography-guide',
      icon: Type,
    },
    {
      title: 'Cards',
      description: 'Card components and layouts',
      href: '/cards-guide',
      icon: LayoutIcon,
    },
    {
      title: 'Styles',
      description: 'Style guide and design tokens',
      href: '/styles-guide',
      icon: Palette,
    },
    {
      title: 'Server Data',
      description: 'Server data and API endpoints',
      href: '/data',
      icon: Database,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Welcome back, {session.email}. Access development tools and administrative functions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminLinks.map((link) => (
            <Card key={link.href} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <link.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                </div>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to={link.href}>Access {link.title}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}