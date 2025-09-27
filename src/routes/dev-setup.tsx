import { createFileRoute } from '@tanstack/react-router';

import { DevelopmentSetup } from '../components/auth/DevelopmentSetup';

export const Route = createFileRoute('/dev-setup')({
  component: DevelopmentSetup,
});
