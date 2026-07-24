import { useSeo } from '@/hooks/useSeo';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';

export function NotFound() {
  useSeo({
    title: 'Page not found - Nexora AI',
    description: 'The page you were looking for could not be found.',
    path: '/404',
    noindex: true,
  });

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <p className="text-7xl font-bold text-gradient-light sm:text-8xl">404</p>
        <h1 className="max-w-xl text-3xl font-bold text-white sm:text-4xl">
          This workflow ran into a dead end
        </h1>
        <p className="max-w-md text-lg text-ink-300">
          The page you're looking for doesn't exist or may have moved. Let's get you back on track.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/" variant="primary" size="lg" className="bg-white text-ink-900 hover:bg-ink-100">
            Back to home
          </Button>
          <Button
            to="/contact"
            variant="secondary"
            size="lg"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
          >
            Contact support
          </Button>
        </div>
      </Container>
    </section>
  );
}
