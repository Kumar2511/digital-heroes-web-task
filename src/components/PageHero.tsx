import type { ReactNode } from 'react';
import { Container } from '@/components/Container';
import { cx } from '@/utils/format';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  return (
    <section className={cx('relative overflow-hidden bg-ink-950', className)}>
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative flex flex-col items-center gap-6 py-20 text-center sm:py-28">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-200 ring-1 ring-inset ring-white/15">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-lg text-ink-300 leading-relaxed">{description}</p>
        )}
        {children && <div className="mt-2">{children}</div>}
      </Container>
    </section>
  );
}
