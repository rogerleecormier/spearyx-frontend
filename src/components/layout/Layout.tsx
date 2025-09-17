import { type ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
  isDev?: boolean;
}

export function Layout({ children, isDev = false }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header isDev={isDev} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
