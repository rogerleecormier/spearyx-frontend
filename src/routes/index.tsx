import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@/components/layout';

import { ComingSoon } from '../components/ComingSoon';
import { useLogger } from '../lib/useLogger';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const log = useLogger('HomePage');

  // Log page view
  log.pageView('/');
  log.info('Home page loaded');

  return (
    <Layout isDev={false}>
      <ComingSoon />
    </Layout>
  );
}
