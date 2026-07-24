import { Container } from '@/components/Container';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { HOW_IT_WORKS } from '@/utils/constants';

export function HowItWorks() {
  return (
    <section className="section bg-ink-50" aria-labelledby="howitworks-heading">
      <Container className="flex flex-col items-center gap-4 text-center mx-auto max-w-3xl">
        <span className="eyebrow">How it works</span>
        <h2 id="howitworks-heading" className="text-3xl font-bold text-ink-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          From idea to automation in four steps
        </h2>
        <p className="text-lg text-ink-500 leading-relaxed max-w-2xl">
          No engineering queue. No deployment pipeline. Just a canvas, your tools, and a
          few minutes.
        </p>
      </Container>

      <Container className="mt-16">
        <ol className="relative grid gap-8 lg:grid-cols-4">
          <div
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent lg:block"
            aria-hidden="true"
          />
          {HOW_IT_WORKS.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 120} className="relative">
              <div className="flex flex-col items-start gap-4">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-ink-100">
                  <Icon name={step.icon} className="h-7 w-7 text-brand-600" aria-hidden="true" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-ink-900">{step.title}</h3>
                <p className="text-ink-500 leading-relaxed text-[0.95rem]">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
