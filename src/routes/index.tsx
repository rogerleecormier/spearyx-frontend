import { createFileRoute, Link } from '@tanstack/react-router';
import { Logo } from '../components/logo';
import { Button } from '../components/ui/button';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center space-y-8 p-8">
        <div className="flex justify-center">
          <Logo size={120} className="text-slate-800 dark:text-slate-200" />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100">
            Spearyx
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Precision targeting meets innovative solutions. Coming soon to
            revolutionize your experience.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="animate-pulse">
            <div className="w-4 h-4 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-slate-500 dark:text-slate-500">
            Stay tuned for updates
          </div>
          <Link to="/data">
            <Button
              variant="outline"
              className="text-slate-700 dark:text-slate-300"
            >
              View SSR Demo →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
