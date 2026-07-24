import { Container } from '@/components/Container';
import { TRUSTED_COMPANIES } from '@/utils/constants';

export function TrustedBy() {
  return (
    <section className="border-y border-ink-200/70 bg-white py-12" aria-label="Trusted by companies">
      <Container>
        <p className="text-center text-sm font-medium uppercase tracking-wider text-ink-400">
          Trusted by fast-moving teams at
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16">
          {TRUSTED_COMPANIES.map((name) => (
            <li key={name} className="text-xl font-bold tracking-tight text-ink-400 grayscale transition-all duration-300 hover:text-ink-700 hover:grayscale-0">
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
