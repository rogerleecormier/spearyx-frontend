import { createFileRoute } from '@tanstack/react-router';

import { BrandStyleLibrary } from '../components/BrandStyleLibrary';
import { useLogger } from '../lib/useLogger';

export const Route = createFileRoute('/brand-style-guide')({
  component: BrandStyleGuide,
});

function BrandStyleGuide() {
  const log = useLogger('BrandStyleGuide');

  // Log page view
  log.pageView('/brand-style-guide');
  log.info('Brand style guide page loaded');

  return <BrandStyleLibrary />;
}
