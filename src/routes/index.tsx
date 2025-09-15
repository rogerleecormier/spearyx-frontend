import { createFileRoute } from '@tanstack/react-router';

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

  return <ComingSoon />;
}
