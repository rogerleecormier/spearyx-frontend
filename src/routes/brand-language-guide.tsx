import { createFileRoute } from '@tanstack/react-router';

import { BrandLanguageGuide } from '../components/BrandLanguageGuide';
import { useLogger } from '../lib/useLogger';

export const Route = createFileRoute('/brand-language-guide')({
  component: BrandLanguageGuideRoute,
});

function BrandLanguageGuideRoute() {
  const log = useLogger('BrandLanguageGuide');

  // Log page view
  log.pageView('/brand-language-guide');
  log.info('Brand language guide page loaded');

  return <BrandLanguageGuide />;
}
