import { type ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
  isDev?: boolean;
}

export function Layout({ children, isDev }: LayoutProps) {
  // Automatically detect dev mode if not explicitly set
  const isDevMode = isDev ?? import.meta.env.DEV;
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header isDev={isDevMode} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
