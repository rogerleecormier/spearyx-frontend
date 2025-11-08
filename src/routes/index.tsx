import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@/components/layout';
import { ComingSoon } from '../components/ComingSoon';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <Layout>
      <ComingSoon />
    </Layout>
  );
}
