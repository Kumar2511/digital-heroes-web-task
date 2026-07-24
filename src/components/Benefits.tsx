import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { HOME_BENEFITS } from '@/utils/constants';

export function Benefits() {
  return (
    <section className="section bg-white" aria-labelledby="benefits-heading">
      <Container className="flex flex-col items-center gap-4 text-center mx-auto max-w-3xl">
        <span className="eyebrow">Benefits</span>
        <h2
  id="benefits-heading"
  className="text-3xl font-bold text-ink-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
>
  Transform the Way Your Business Works
</h2>

<p className="text-lg text-ink-500 leading-relaxed max-w-2xl">
  Nexora AI helps organizations streamline operations, improve collaboration,
  and automate repetitive processes so teams can focus on innovation and growth.
</p>
      </Container>

      <Container className="mt-14">
        <ul className="grid gap-6 lg:grid-cols-3">
          {HOME_BENEFITS.map((benefit, i) => (
            <Reveal as="li" key={benefit.title} delay={i * 100}>
              <Card className="flex h-full flex-col gap-5 p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-soft">
                  <Icon name={benefit.icon} className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-ink-900">{benefit.title}</h3>
                  <p className="mt-2 text-ink-500 leading-relaxed">{benefit.description}</p>
                </div>
                {benefit.stat && (
                  <div className="mt-auto border-t border-ink-100 pt-5">
                    <div className="text-2xl font-bold text-gradient">{benefit.stat}</div>
                    <div className="text-sm text-ink-500">{benefit.statLabel}</div>
                  </div>
                )}
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
