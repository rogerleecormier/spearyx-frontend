import { Link } from '@tanstack/react-router';
import { Loader2, LogOut, Menu, ShieldCheck, User, X } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Logo } from '@/components/brand';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getWorkerUrl } from '@/config/workers';
import { useSession } from '@/hooks/useSession';

interface HeaderProps {
  isDev?: boolean;
}

const PROTECTED_TOOL_PATH = '/tools/raci';
const LOGOUT_PATH = '/cdn-cgi/access/logout';

export function Header({ isDev = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session, isAuthenticated, isAdmin, isPending, isFetching } =
    useSession();

  // Get the auth API URL and construct login URL
  const authApiUrl =
    import.meta.env.VITE_AUTH_API_URL || getWorkerUrl('AUTH_API');
  const LOGIN_PATH = `${authApiUrl}/session?redirect=${encodeURIComponent(
    typeof window !== 'undefined' ? window.location.origin + '/app' : '/app'
  )}`;

  const isLoadingSession = isPending || isFetching;

  const userLabel = session.email ?? 'Authenticated user';
  const avatarFallback = useMemo(
    () => userLabel.charAt(0).toUpperCase() || 'U',
    [userLabel]
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-precision-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-precision-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <Logo size="md" showText={false} />
          </Link>

          <nav className="hidden items-center space-x-8 md:flex">
            <div className="flex items-center space-x-6">
            </div>
          </nav>

          <div className="hidden items-center md:flex">
            {isLoadingSession && (
              <Button variant="ghost" size="sm" disabled className="gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking Access
              </Button>
            )}

            {!isLoadingSession && !isAuthenticated && (
              <Button variant="default" size="sm" asChild>
                <a href={LOGIN_PATH}>Log In</a>
              </Button>
            )}

            {isAuthenticated && (
              <>
                <Button variant="ghost" size="sm" asChild className="mr-4">
                  <Link to={PROTECTED_TOOL_PATH}>RACI Generator</Link>
                </Button>
                <div className="relative mr-4">
                  <input
                    type="text"
                    placeholder="Search tools..."
                    className="w-64 rounded-lg border border-precision-300 bg-background px-4 py-2 pl-10 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-precision-700"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-4 w-4 text-precision-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </>
            )}

            {!isLoadingSession && isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <span className="max-w-[180px] truncate text-sm font-medium">
                      {session.email}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        Signed in
                      </span>
                      <span className="truncate text-sm font-semibold">
                        {session.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>
                    <div className="flex w-full items-center justify-between text-muted-foreground">
                      <span>Status</span>
                      <span className="font-medium">
                        {session.isPaid ? 'Paid' : 'Free'}
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer hover:bg-accent">
                      <User className="h-4 w-4" /> Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2 cursor-pointer hover:bg-accent">
                        <ShieldCheck className="h-4 w-4" /> Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href={LOGOUT_PATH} className="flex items-center gap-2 cursor-pointer hover:bg-accent">
                      <LogOut className="h-4 w-4" /> Log Out
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-precision-200 py-4 dark:border-precision-800 md:hidden">
            <div className="space-y-4">
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to={PROTECTED_TOOL_PATH} onClick={closeMobileMenu}>
                    RACI Generator
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link to="/profile" onClick={closeMobileMenu} className="cursor-pointer hover:bg-accent">
                    <User className="h-4 w-4 mr-2" /> Profile Settings
                  </Link>
                </Button>
                {isAdmin && (
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link to="/admin" onClick={closeMobileMenu} className="cursor-pointer hover:bg-accent">
                      <ShieldCheck className="h-4 w-4 mr-2" /> Admin
                    </Link>
                  </Button>
                )}
              </div>

              <div className="border-t border-precision-200 pt-4 dark:border-precision-800">
                {isLoadingSession && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Checking Access
                  </div>
                )}

                {!isLoadingSession && !isAuthenticated && (
                  <Button className="w-full" asChild>
                    <a href={LOGIN_PATH}>Log In</a>
                  </Button>
                )}

                {isAuthenticated && (
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Search tools..."
                      className="w-full rounded-lg border border-precision-300 bg-background px-4 py-2 pl-10 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-precision-700"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-4 w-4 text-precision-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {!isLoadingSession && isAuthenticated && (
                  <div className="flex flex-col gap-3">
                    <div>
                      <div className="text-xs uppercase text-muted-foreground">
                        Signed in
                      </div>
                      <div className="text-sm font-medium">{session.email}</div>
                      <div className="text-xs text-muted-foreground">
                        {isAdmin ? 'Administrator' : 'Member'}
                      </div>
                    </div>
                    <div className="space-y-2">
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <a
                        href={LOGOUT_PATH}
                        className="flex items-center justify-center gap-2"
                      >
                        <LogOut className="h-4 w-4" /> Log Out
                      </a>
                    </Button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </header>
  );
}
