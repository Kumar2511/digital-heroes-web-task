import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { FeatureCard } from '@/components/FeatureCard';
import { Reveal } from '@/components/Reveal';
import { HOME_FEATURES } from '@/utils/constants';

export function Features() {
  return (
    <section className="section bg-ink-50" aria-labelledby="features-heading">
      <SectionTitle
        eyebrow="Features"
        title="Everything you need to automate the busywork"
        description="A complete platform for designing, running, and monitoring the workflows that keep your operations moving — with AI built into every step."
      />
      <Container className="mt-14">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_FEATURES.map((feature, i) => (
            <Reveal as="li" key={feature.title} delay={(i % 3) * 100}>
              <FeatureCard feature={feature} className="h-full" />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
