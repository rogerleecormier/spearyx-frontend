import { createFileRoute } from '@tanstack/react-router';

import { ComingSoon } from '../components/ComingSoon';
import { Layout } from '../components/layout';
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
    <Layout>
      <ComingSoon />
    </Layout>
  );
}
