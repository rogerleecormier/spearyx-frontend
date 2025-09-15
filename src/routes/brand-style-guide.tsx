import { createFileRoute } from '@tanstack/react-router';
import { BrandStyleLibrary } from '../components/BrandStyleLibrary';

export const Route = createFileRoute('/brand-style-guide')({
  component: BrandStyleGuide,
});

function BrandStyleGuide() {
  return <BrandStyleLibrary />;
}
