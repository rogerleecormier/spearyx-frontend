import { Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { Logo } from '@/components/brand';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isDev?: boolean;
}

export function Header({ isDev = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-precision-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-precision-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="md" showText={false} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {/* Main Navigation Links */}
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/tools/raci-generator">RACI Generator</Link>
              </Button>

              {/* Search bar placeholder - to be added later */}
              <div className="relative">
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
            </div>

            {/* Dev Navigation - Only show in dev mode */}
            {isDev && (
              <div className="flex items-center space-x-4 border-l border-precision-200 pl-4 dark:border-precision-700">
                <span className="text-xs uppercase tracking-wide text-precision-500 dark:text-precision-400">
                  Dev Mode
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/typography-guide">Typography</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/cards-guide">Cards</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/styles-guide">Styles</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/data">Server Data</Link>
                  </Button>
                </div>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t border-precision-200 py-4 dark:border-precision-800 md:hidden">
            <div className="space-y-4">
              {/* Main Navigation for mobile */}
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/tools/raci-generator" onClick={toggleMobileMenu}>
                    RACI Generator
                  </Link>
                </Button>
              </div>

              {/* Search bar for mobile */}
              <div className="relative">
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

              {/* Dev Navigation for mobile */}
              {isDev && (
                <div className="border-t border-precision-200 pt-4 dark:border-precision-800">
                  <div className="mb-3 text-xs uppercase tracking-wide text-precision-500 dark:text-precision-400">
                    Dev Mode
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/typography-guide" onClick={toggleMobileMenu}>
                        Typography Guide
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/cards-guide" onClick={toggleMobileMenu}>
                        Cards Guide
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/styles-guide" onClick={toggleMobileMenu}>
                        Styles Guide
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/data" onClick={toggleMobileMenu}>
                        Server Data
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
