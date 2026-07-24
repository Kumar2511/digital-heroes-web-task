import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { cx } from '@/utils/format';

interface CTAProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTA({
  title = 'Start automating in minutes',
  description = 'Build your first workflow today. Free for 14 days — no credit card, no engineering ticket, no catch.',
  primaryLabel = 'Start free trial',
  primaryHref = '/contact',
  secondaryLabel = 'Talk to sales',
  secondaryHref = '/contact',
  className,
}: CTAProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Container className={cx('my-8', className)}>
      <div
        ref={ref}
        className={cx(
          'relative overflow-hidden rounded-4xl bg-ink-900 px-6 py-16 text-center sm:px-16 sm:py-20',
          'transition-all duration-700',
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center gap-6">
          <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {title}
          </h2>
          <p className="max-w-xl text-lg text-ink-300">{description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to={primaryHref} variant="primary" size="lg" className="bg-white text-ink-900 hover:bg-ink-100">
              {primaryLabel}
            </Button>
            <Button
              to={secondaryHref}
              variant="secondary"
              size="lg"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
            >
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
